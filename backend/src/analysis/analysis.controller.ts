import { Controller, Post, Body, Param } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('api/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post(':questionId/ask')
  async askQuestion(
    @Param('questionId') questionId: string,
    @Body() body: { query: string; model?: string; teacherId?: string }
  ) {
    if (!body.query) {
      throw new Error('Query text is required.');
    }
    
    let teacher = { name: '公考名师', style_description: '幽默风趣', prompt_template: '通过苏格拉底式提问引导学生思考' };
    
    // 如果前端传了 teacherId, 我们理论上应该在 Controller 或 Service 里去查询
    // 这里为了演示，我们先在 AnalysisService 内部组装（由外部传入 teacher 结构体或直接由 Service 去查）
    
    return this.analysisService.askSocrates(questionId, body.query, body.model, teacher);
  }
}
