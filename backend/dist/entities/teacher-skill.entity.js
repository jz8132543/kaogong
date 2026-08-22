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
exports.TeacherSkill = void 0;
const typeorm_1 = require("typeorm");
const question_analysis_entity_1 = require("./question-analysis.entity");
let TeacherSkill = class TeacherSkill {
    id;
    name;
    style_description;
    prompt_template;
    external_source_url;
    last_synced_at;
    analyses;
    created_at;
    updated_at;
};
exports.TeacherSkill = TeacherSkill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TeacherSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], TeacherSkill.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TeacherSkill.prototype, "style_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TeacherSkill.prototype, "prompt_template", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], TeacherSkill.prototype, "external_source_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TeacherSkill.prototype, "last_synced_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_analysis_entity_1.QuestionAnalysis, analysis => analysis.teacherSkill),
    __metadata("design:type", Array)
], TeacherSkill.prototype, "analyses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TeacherSkill.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TeacherSkill.prototype, "updated_at", void 0);
exports.TeacherSkill = TeacherSkill = __decorate([
    (0, typeorm_1.Entity)('teacher_skills')
], TeacherSkill);
//# sourceMappingURL=teacher-skill.entity.js.map