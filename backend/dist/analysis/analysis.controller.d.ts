import { AnalysisService } from './analysis.service';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
    askQuestion(questionId: string, body: {
        query: string;
        model?: string;
        teacherId?: string;
    }): Promise<{
        success: boolean;
        data: {
            content: string;
            tokens_consumed: number;
            model_used: string;
        };
    }>;
}
