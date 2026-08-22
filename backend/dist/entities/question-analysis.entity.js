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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnalysis = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const teacher_skill_entity_1 = require("./teacher-skill.entity");
let QuestionAnalysis = class QuestionAnalysis {
    id;
    question;
    teacherSkill;
    analysis_content;
    token_cost;
    created_at;
};
exports.QuestionAnalysis = QuestionAnalysis;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionAnalysis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.analyses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], QuestionAnalysis.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_skill_entity_1.TeacherSkill, skill => skill.analyses, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_skill_id' }),
    __metadata("design:type", teacher_skill_entity_1.TeacherSkill)
], QuestionAnalysis.prototype, "teacherSkill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], QuestionAnalysis.prototype, "analysis_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuestionAnalysis.prototype, "token_cost", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionAnalysis.prototype, "created_at", void 0);
exports.QuestionAnalysis = QuestionAnalysis = __decorate([
    (0, typeorm_1.Entity)('question_analyses')
], QuestionAnalysis);
//# sourceMappingURL=question-analysis.entity.js.map