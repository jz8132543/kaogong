import { SkillsService } from './skills.service';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<import("../entities/teacher-skill.entity").TeacherSkill[]>;
    syncSkill(body: {
        url: string;
        name: string;
    }): Promise<import("../entities/teacher-skill.entity").TeacherSkill>;
}
