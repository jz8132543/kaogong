"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const question_entity_1 = require("./entities/question.entity");
const teacher_skill_entity_1 = require("./entities/teacher-skill.entity");
const question_analysis_entity_1 = require("./entities/question-analysis.entity");
const pledge_entity_1 = require("./entities/pledge.entity");
const user_stats_entity_1 = require("./entities/user_stats.entity");
const questions_module_1 = require("./questions/questions.module");
const skills_module_1 = require("./skills/skills.module");
const analysis_module_1 = require("./analysis/analysis.module");
const payments_module_1 = require("./payments/payments.module");
const stats_module_1 = require("./stats/stats.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: 5432,
                username: 'kaogong_user',
                password: 'kaogong_password',
                database: 'kaogong_db',
                entities: [user_entity_1.User, question_entity_1.Question, teacher_skill_entity_1.TeacherSkill, question_analysis_entity_1.QuestionAnalysis, pledge_entity_1.PledgeContract, user_stats_entity_1.UserStat],
                synchronize: true,
            }),
            questions_module_1.QuestionsModule,
            skills_module_1.SkillsModule,
            analysis_module_1.AnalysisModule,
            payments_module_1.PaymentsModule,
            stats_module_1.StatsModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map