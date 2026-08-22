import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAnalysis } from '../entities/question-analysis.entity';
import { QuestionsService } from '../questions/questions.service';
import { SkillsService } from '../skills/skills.service';
import OpenAI from 'openai';

@Injectable()
export class AnalysisService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(QuestionAnalysis)
    private analysisRepository: Repository<QuestionAnalysis>,
    private questionsService: QuestionsService,
    private skillsService: SkillsService,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.LLM_API_KEY || 'sk-mock-key',
      baseURL: process.env.LLM_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });
  }

  async askSocrates(questionId: string, userMessage: string, model: string = 'qwen-max', teacher: any = { name: '公考名师', style_description: '幽默风趣', prompt_template: '通过苏格拉底式提问引导学生思考' }) {
    const question = await this.questionsService.findOne(questionId);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const systemPrompt = `
你是一位名为“${teacher.name}”的公考名师。
你的教学风格是：${teacher.style_description}。
你的特殊要求：${teacher.prompt_template}。

当前考题详情：
题干：${question.content}
选项：${JSON.stringify(question.options)}
正确答案：${question.correct_answer}

请基于你的风格，针对学生可能遇到的困惑进行引导式提问或解答。
如果学生要求直接给答案，请先进行苏格拉底式追问引导，然后再解答。
`;

    let aiReply = '';
    
    if (this.openai.apiKey === 'sk-mock-key') {
       aiReply = `[Mock Response] 作为 ${teacher.name}，关于这道题（ID: ${questionId}），我给你的提示是：先排除错误项，你觉得哪几个选项最离谱？`;
    } else {
       try {
         const chatCompletion = await this.openai.chat.completions.create({
           model: process.env.LLM_MODEL || model,
           messages: [
             { role: 'system', content: systemPrompt },
             { role: 'user', content: userMessage || '老师，这道题怎么破？' }
           ],
         });
         aiReply = chatCompletion.choices[0].message.content || '我好像没想好怎么回答...';
       } catch (e) {
         console.error('LLM API Error:', e);
         aiReply = '老师现在的网络不太好，稍后再试一次吧（API请求失败）。';
       }
    }

    const tokensCost = 150; 
    console.log(`[Token Deducted] Cost ${tokensCost} tokens for user...`);

    return {
      success: true,
      data: {
        content: aiReply,
        tokens_consumed: tokensCost,
        model_used: model
      }
    };
  }
}
