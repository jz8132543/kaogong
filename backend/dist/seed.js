"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const questions_service_1 = require("./questions/questions.service");
const skills_service_1 = require("./skills/skills.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const questionsService = app.get(questions_service_1.QuestionsService);
    const skillsService = app.get(skills_service_1.SkillsService);
    console.log('--- Seeding Teacher Skills ---');
    const skillsRepo = app.get('TeacherSkillRepository');
    let wangSkill = await skillsRepo.findOne({ where: { name: '老王' } });
    if (!wangSkill) {
        wangSkill = await skillsRepo.save(skillsRepo.create({
            name: '老王',
            style_description: '风格幽默且一针见血',
            prompt_template: '作为老王，你说话风格幽默且一针见血，必须教学生用【代入法】和【碾压法】解题。'
        }));
    }
    console.log('--- Seeding Questions ---');
    const q1 = await questionsService.createQuestion({
        content: '下列句子中，有语病的一句是：\nA. 这种无纺布袋环保、实用，是现代人出行的首选。\nB. 无论外界怎么阻挠，我们也不能停止对未知科学领域的探索。\nC. 阅读不仅能增长知识，甚至还能陶冶情操，让我们的内心更加丰富。\nD. 在大家共同的努力下，终于圆满完成了这项艰巨的任务。',
        tags: ['语病辨析', '行测'],
        options: [
            { id: 'A', text: '这种无纺布袋环保、实用，是现代人出行的首选。' },
            { id: 'B', text: '无论外界怎么阻挠，我们也不能停止对未知科学领域的探索。' },
            { id: 'C', text: '阅读不仅能增长知识，甚至还能陶冶情操，让我们的内心更加丰富。' },
            { id: 'D', text: '在大家共同的努力下，终于圆满完成了这项艰巨的任务。' }
        ],
        correct_answer: 'D',
        media_assets: []
    });
    const q2 = await questionsService.createQuestion({
        content: '观察下方给定的立体图形，它的主视图应当是：\n[IMAGE:0]',
        tags: ['空间重构', '图形推理'],
        options: [
            { id: 'A', text: '[IMAGE:1]' },
            { id: 'B', text: '[IMAGE:2]' },
            { id: 'C', text: '[IMAGE:3]' },
            { id: 'D', text: '[IMAGE:4]' }
        ],
        correct_answer: 'C',
        media_assets: [
            { url: 'https://dummyimage.com/300x200/1890ff/fff.png&text=3D-Shape', type: 'image' },
            { url: 'https://dummyimage.com/100x100/ebedf0/333.png&text=A', type: 'image' },
            { url: 'https://dummyimage.com/100x100/ebedf0/333.png&text=B', type: 'image' },
            { url: 'https://dummyimage.com/100x100/ebedf0/333.png&text=C(Ans)', type: 'image' },
            { url: 'https://dummyimage.com/100x100/ebedf0/333.png&text=D', type: 'image' },
        ]
    });
    console.log('--- Seeding Analyses ---');
    if (wangSkill) {
        await questionsService.addAnalysis(q1.id, wangSkill.id, {
            text_explanation: '这道题选D。D项“在大家共同的努力下，终于圆满完成了这项艰巨的任务”缺少主语，可以去掉“在”和“下”，或者在“终于”前面加上主语（比如“我们”）。因此语病明显。',
            video_url: null
        }, 50);
        await questionsService.addAnalysis(q2.id, wangSkill.id, {
            text_explanation: '选C。立体图形从正面看，会发现左侧有两个凸起，右侧平滑。老王的“投影碾压法”告诉我们，把所有面压扁，答案跃然纸上！',
            video_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        }, 120);
    }
    console.log('Seed completed successfully!');
    await app.close();
}
bootstrap().catch(err => {
    console.error('Seed failed!', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map