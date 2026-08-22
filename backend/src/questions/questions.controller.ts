import { Controller, Get, Post, Body, Query, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionsService } from './questions.service';
import { Question } from '../entities/question.entity';
import { AnalysisService } from '../analysis/analysis.service';
import { SkillsService } from '../skills/skills.service';

@Controller('api/questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly analysisService: AnalysisService,
    private readonly skillsService: SkillsService
  ) {}

  @Get()
  async findAll(@Query('tags') tags?: string) {
    if (tags) {
      const tagArray = tags.split(',');
      return this.questionsService.findByTags(tagArray);
    }
    return this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async create(@Body() data: Partial<Question>) {
    return this.questionsService.createQuestion(data);
  }

  @Post('ocr-parse')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async parseOCR(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('No file provided');
    
    // Node.js 原生 fetch 上传文件至 FastAPI (端口8000)
    const formData = new FormData();
    const blob = new Blob([file.buffer as any], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    try {
      const response = await fetch('http://localhost:8000/api/ocr', {
        method: 'POST',
        body: formData,
      });
      return response.json();
    } catch (e) {
      console.error(e);
      throw new Error('OCR 引擎连接失败，请确认 FastAPI 是否已启动');
    }
  }

  @Post(':id/trigger-analysis')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async triggerAnalysis(@Param('id') id: string) {
    // 寻找两名随机名师或默认的两名老师
    const skills = await this.skillsService.findAll();
    if (!skills || skills.length === 0) {
      throw new HttpException('No teachers available', HttpStatus.BAD_REQUEST);
    }
    
    const targetTeachers = skills.slice(0, 2); // 选前两个老师进行并发解析
    
    // 多线程并发调用（由于 JS 异步特性，Promise.all 即可）
    const promises = targetTeachers.map(teacher => {
      // 通过苏格拉底系统模拟用户默认提问 "请给出这道题的详细解析"
      return this.analysisService.askSocrates(id, '老师，请给我这道题最详细的解析。', 'qwen-max', teacher);
    });

    try {
      const results = await Promise.all(promises);
      return {
        success: true,
        message: `成功为题目 ${id} 生成了 ${targetTeachers.length} 位名师的解析`,
        results
      };
    } catch (e) {
      throw new HttpException('AI 批量解析生成失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
