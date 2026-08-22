"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SkillsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_skill_entity_1 = require("../entities/teacher-skill.entity");
let SkillsService = SkillsService_1 = class SkillsService {
    skillsRepository;
    logger = new common_1.Logger(SkillsService_1.name);
    constructor(skillsRepository) {
        this.skillsRepository = skillsRepository;
    }
    async findAll() {
        return this.skillsRepository.find();
    }
    async syncFromExternal(url, name) {
        this.logger.log(`Syncing skill [${name}] from ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch skill from ${url}: ${response.statusText}`);
        }
        const promptTemplate = await response.text();
        let skill = await this.skillsRepository.findOne({ where: { name } });
        if (!skill) {
            skill = this.skillsRepository.create({
                name,
                prompt_template: promptTemplate,
                style_description: 'Auto synced'
            });
        }
        else {
            skill.prompt_template = promptTemplate;
            skill.last_synced_at = new Date();
        }
        return this.skillsRepository.save(skill);
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = SkillsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_skill_entity_1.TeacherSkill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
//# sourceMappingURL=skills.service.js.map