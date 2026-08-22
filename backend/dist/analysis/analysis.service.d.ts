import { Repository } from 'typeorm';
import { QuestionAnalysis } from '../entities/question-analysis.entity';
import { QuestionsService } from '../questions/questions.service';
import { SkillsService } from '../skills/skills.service';
export declare class AnalysisService {
    private analysisRepository;
    private questionsService;
    private skillsService;
    private openai;
    constructor(analysisRepository: Repository<QuestionAnalysis>, questionsService: QuestionsService, skillsService: SkillsService);
    askSocrates(questionId: string, userMessage: string, model?: string, teacher?: any): Promise<{
        success: boolean;
        data: {
            content: string;
            tokens_consumed: number;
            model_used: string;
        };
    }>;
}
