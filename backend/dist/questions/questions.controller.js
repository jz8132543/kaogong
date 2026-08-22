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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const questions_service_1 = require("./questions.service");
const analysis_service_1 = require("../analysis/analysis.service");
const skills_service_1 = require("../skills/skills.service");
let QuestionsController = class QuestionsController {
    questionsService;
    analysisService;
    skillsService;
    constructor(questionsService, analysisService, skillsService) {
        this.questionsService = questionsService;
        this.analysisService = analysisService;
        this.skillsService = skillsService;
    }
    async findAll(tags) {
        if (tags) {
            const tagArray = tags.split(',');
            return this.questionsService.findByTags(tagArray);
        }
        return this.questionsService.findAll();
    }
    async findOne(id) {
        return this.questionsService.findOne(id);
    }
    async create(data) {
        return this.questionsService.createQuestion(data);
    }
    async parseOCR(file) {
        if (!file)
            throw new Error('No file provided');
        const formData = new FormData();
        const blob = new Blob([file.buffer], { type: file.mimetype });
        formData.append('file', blob, file.originalname);
        try {
            const response = await fetch('http://localhost:8000/api/ocr', {
                method: 'POST',
                body: formData,
            });
            return response.json();
        }
        catch (e) {
            console.error(e);
            throw new Error('OCR 引擎连接失败，请确认 FastAPI 是否已启动');
        }
    }
    async triggerAnalysis(id) {
        const skills = await this.skillsService.findAll();
        if (!skills || skills.length === 0) {
            throw new common_1.HttpException('No teachers available', common_1.HttpStatus.BAD_REQUEST);
        }
        const targetTeachers = skills.slice(0, 2);
        const promises = targetTeachers.map(teacher => {
            return this.analysisService.askSocrates(id, '老师，请给我这道题最详细的解析。', 'qwen-max', teacher);
        });
        try {
            const results = await Promise.all(promises);
            return {
                success: true,
                message: `成功为题目 ${id} 生成了 ${targetTeachers.length} 位名师的解析`,
                results
            };
        }
        catch (e) {
            throw new common_1.HttpException('AI 批量解析生成失败', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('ocr-parse'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "parseOCR", null);
__decorate([
    (0, common_1.Post)(':id/trigger-analysis'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "triggerAnalysis", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, common_1.Controller)('api/questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService,
        analysis_service_1.AnalysisService,
        skills_service_1.SkillsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map