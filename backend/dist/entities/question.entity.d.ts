import { QuestionAnalysis } from './question-analysis.entity';
export declare class Question {
    id: string;
    content: string;
    media_assets: any;
    options: any;
    correct_answer: string;
    tags: string[];
    analyses: QuestionAnalysis[];
    created_at: Date;
    updated_at: Date;
}
