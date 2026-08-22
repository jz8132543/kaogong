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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../entities/question.entity");
const teacher_skill_entity_1 = require("../entities/teacher-skill.entity");
const question_analysis_entity_1 = require("../entities/question-analysis.entity");
let QuestionsService = class QuestionsService {
    questionsRepository;
    skillsRepository;
    analysisRepository;
    constructor(questionsRepository, skillsRepository, analysisRepository) {
        this.questionsRepository = questionsRepository;
        this.skillsRepository = skillsRepository;
        this.analysisRepository = analysisRepository;
    }
    async createQuestion(data) {
        const question = this.questionsRepository.create(data);
        return this.questionsRepository.save(question);
    }
    async findAll(tags) {
        const query = this.questionsRepository.createQueryBuilder('q')
            .leftJoinAndSelect('q.analyses', 'a')
            .leftJoinAndSelect('a.teacherSkill', 's');
        if (tags && tags.length > 0) {
        }
        return query.getMany();
    }
    async findOne(id) {
        return this.questionsRepository.findOne({
            where: { id },
            relations: {
                analyses: {
                    teacherSkill: true
                }
            }
        });
    }
    async addAnalysis(questionId, skillId, content, tokenCost) {
        const question = await this.questionsRepository.findOneBy({ id: questionId });
        const skill = await this.skillsRepository.findOneBy({ id: skillId });
        if (!question || !skill)
            throw new Error('Question or Skill not found');
        const analysis = this.analysisRepository.create({
            question,
            teacherSkill: skill,
            analysis_content: content,
            token_cost: tokenCost
        });
        return this.analysisRepository.save(analysis);
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_skill_entity_1.TeacherSkill)),
    __param(2, (0, typeorm_1.InjectRepository)(question_analysis_entity_1.QuestionAnalysis)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map