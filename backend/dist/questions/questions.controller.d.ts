import { QuestionsService } from './questions.service';
import { Question } from '../entities/question.entity';
import { AnalysisService } from '../analysis/analysis.service';
import { SkillsService } from '../skills/skills.service';
export declare class QuestionsController {
    private readonly questionsService;
    private readonly analysisService;
    private readonly skillsService;
    constructor(questionsService: QuestionsService, analysisService: AnalysisService, skillsService: SkillsService);
    findAll(tags?: string): Promise<any>;
    findOne(id: string): Promise<Question | null>;
    create(data: Partial<Question>): Promise<Question>;
    parseOCR(file: Express.Multer.File): Promise<any>;
    triggerAnalysis(id: string): Promise<{
        success: boolean;
        message: string;
        results: {
            success: boolean;
            data: {
                content: string;
                tokens_consumed: number;
                model_used: string;
            };
        }[];
    }>;
}
