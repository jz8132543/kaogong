import { Question } from './question.entity';
import { TeacherSkill } from './teacher-skill.entity';
export declare class QuestionAnalysis {
    id: string;
    question: Question;
    teacherSkill: TeacherSkill;
    analysis_content: any;
    token_cost: number;
    created_at: Date;
}
