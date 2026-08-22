"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_analysis_entity_1 = require("../entities/question-analysis.entity");
const questions_service_1 = require("../questions/questions.service");
const skills_service_1 = require("../skills/skills.service");
const openai_1 = __importDefault(require("openai"));
let AnalysisService = class AnalysisService {
    analysisRepository;
    questionsService;
    skillsService;
    openai;
    constructor(analysisRepository, questionsService, skillsService) {
        this.analysisRepository = analysisRepository;
        this.questionsService = questionsService;
        this.skillsService = skillsService;
        this.openai = new openai_1.default({
            apiKey: process.env.LLM_API_KEY || 'sk-mock-key',
            baseURL: process.env.LLM_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        });
    }
    async askSocrates(questionId, userMessage, model = 'qwen-max', teacher = { name: '公考名师', style_description: '幽默风趣', prompt_template: '通过苏格拉底式提问引导学生思考' }) {
        const question = await this.questionsService.findOne(questionId);
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
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
        }
        else {
            try {
                const chatCompletion = await this.openai.chat.completions.create({
                    model: process.env.LLM_MODEL || model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage || '老师，这道题怎么破？' }
                    ],
                });
                aiReply = chatCompletion.choices[0].message.content || '我好像没想好怎么回答...';
            }
            catch (e) {
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
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_analysis_entity_1.QuestionAnalysis)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        questions_service_1.QuestionsService,
        skills_service_1.SkillsService])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map