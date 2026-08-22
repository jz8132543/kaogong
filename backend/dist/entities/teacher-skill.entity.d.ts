import { QuestionAnalysis } from './question-analysis.entity';
export declare class TeacherSkill {
    id: string;
    name: string;
    style_description: string;
    prompt_template: string;
    external_source_url: string;
    last_synced_at: Date;
    analyses: QuestionAnalysis[];
    created_at: Date;
    updated_at: Date;
}
