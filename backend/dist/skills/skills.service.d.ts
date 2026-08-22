import { Repository } from 'typeorm';
import { TeacherSkill } from '../entities/teacher-skill.entity';
export declare class SkillsService {
    private readonly skillsRepository;
    private readonly logger;
    constructor(skillsRepository: Repository<TeacherSkill>);
    findAll(): Promise<TeacherSkill[]>;
    syncFromExternal(url: string, name: string): Promise<TeacherSkill>;
}
