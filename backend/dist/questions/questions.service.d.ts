import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { TeacherSkill } from '../entities/teacher-skill.entity';
import { QuestionAnalysis } from '../entities/question-analysis.entity';
export declare class QuestionsService {
    private questionsRepository;
    private skillsRepository;
    private analysisRepository;
    constructor(questionsRepository: Repository<Question>, skillsRepository: Repository<TeacherSkill>, analysisRepository: Repository<QuestionAnalysis>);
    createQuestion(data: Partial<Question>): Promise<Question>;
    findAll(tags?: string[]): Promise<Question[]>;
    findOne(id: string): Promise<Question | null>;
    addAnalysis(questionId: string, skillId: string, content: any, tokenCost: number): Promise<QuestionAnalysis>;
}
