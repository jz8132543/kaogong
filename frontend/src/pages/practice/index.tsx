import { View, Text, Button, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { useReducer, useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { practiceReducer, Question } from './reducer';
import Timer from './components/Timer';
import QuestionCard from './components/QuestionCard';
import AnswerDrawer from './components/AnswerDrawer';
import AnalysisPanel from './components/AnalysisPanel';
import './index.scss';

import { API } from '../../utils/api';
import './index.scss';

export default function PracticeIndex() {
  const [state, dispatch] = useReducer(practiceReducer, {
    questions: [],
    currentIndex: 0,
    answers: {},
    isSubmitted: false,
    timeSpent: 0
  });

  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    API.get('/api/questions').then((res: any) => {
      if (res && res.length > 0) {
        // 后端 options 可能是数组 [{ id: 'A', text: '...' }]，转换成 frontend 期望的 Record
        const formattedQuestions = res.map((q: any) => {
          let formattedOptions = q.options;
          if (Array.isArray(q.options)) {
            formattedOptions = {};
            q.options.forEach((opt: any) => {
              formattedOptions[opt.id] = opt.text;
            });
          }
          // 后端字段叫 answer，前端 Mock 用的 correct_answer
          return {
            ...q,
            options: formattedOptions,
            correct_answer: q.answer || q.correct_answer
          };
        });
        // 读取本地缓存的答题进度（防断网丢失）
        const cachedAnswers = Taro.getStorageSync('practice_answers') || {};
        dispatch({ type: 'INIT_DATA', payload: formattedQuestions });
        
        // 恢复缓存的答案
        Object.keys(cachedAnswers).forEach(qId => {
          dispatch({ type: 'SELECT_OPTION', payload: { questionId: qId, option: cachedAnswers[qId] } });
        });
      } else {
        Taro.showToast({ title: '暂无题目', icon: 'none' });
      }
    }).catch(err => {
      console.error('Failed to load questions:', err);
      Taro.showToast({ title: '加载题库失败', icon: 'none' });
    });
  }, []);

  if (state.questions.length === 0) {
    return <View className='loading'>加载题库中...</View>;
  }

  const currentQuestion = state.questions[state.currentIndex];
  
  // 答题与翻页交互
  const handleSelectOption = (option: string) => {
    dispatch({ type: 'SELECT_OPTION', payload: { questionId: currentQuestion.id, option } });
    
    // 实时缓存答案到本地，防中断
    const newAnswers = { ...state.answers, [currentQuestion.id]: option };
    Taro.setStorageSync('practice_answers', newAnswers);
    
    // 如果是练习模式，自动翻到下一题（此处为了展示解析，若已交卷则不翻页）
    if (!state.isSubmitted && state.currentIndex < state.questions.length - 1) {
      setTimeout(() => {
        dispatch({ type: 'GO_TO_QUESTION', payload: state.currentIndex + 1 });
      }, 300); // 加一点延迟让用户看到选中效果
    }
  };

  const handleSubmit = () => {
    Taro.showModal({
      title: '交卷确认',
      content: '是否确认交卷？交卷后将锁定答题并显示解析。',
      success: (res) => {
        if (res.confirm) {
          dispatch({ type: 'SUBMIT_EXAM' });
          setDrawerVisible(false);
          Taro.showToast({ title: '交卷成功', icon: 'success' });
          Taro.removeStorageSync('practice_answers'); // 交卷后清空缓存
          
          // 提交答题记录至 Stats 服务绘制热力图
          const tags = state.questions.flatMap(q => q.tags || []);
          API.post('/api/stats/record', {
            userId: Taro.getStorageSync('user')?.id || 'mock_user_id',
            isCorrect: true, // 简化示例，实际应遍历对比计算
            tags
          }).catch(console.error);
        }
      }
    });
  };

  return (
    <View className='practice-page'>
      {/* 顶部控制栏 */}
      <View className='header-bar'>
        <Timer 
          timeSpent={state.timeSpent} 
          onTick={() => dispatch({ type: 'TICK_TIMER' })}
          isPaused={state.isSubmitted}
        />
        <View className='right-controls'>
          <Text className='progress-text'>{state.currentIndex + 1} / {state.questions.length}</Text>
          <View className='answer-card-btn' onClick={() => setDrawerVisible(true)}>
            <Text className='icon'>📝</Text>
            <Text>答题卡</Text>
          </View>
        </View>
      </View>

      {/* 滑动题干区 */}
      <ScrollView className='main-scroll' scrollY>
        <Swiper
          className='question-swiper'
          current={state.currentIndex}
          onChange={(e) => dispatch({ type: 'GO_TO_QUESTION', payload: e.detail.current })}
          duration={300}
        >
          {state.questions.map(q => (
            <SwiperItem key={q.id}>
              <QuestionCard 
                question={q}
                selectedOption={state.answers[q.id]}
                onSelectOption={handleSelectOption}
                isSubmitted={state.isSubmitted}
              />
            </SwiperItem>
          ))}
        </Swiper>

        {/* 交卷后自动显示的解析面板 */}
        {state.isSubmitted && currentQuestion.analyses && (
          <AnalysisPanel questionId={currentQuestion.id} analyses={currentQuestion.analyses} />
        )}
      </ScrollView>

      {/* 底部功能区（交卷前显示） */}
      {!state.isSubmitted && (
        <View className='bottom-bar'>
          <Button 
            className='nav-btn' 
            disabled={state.currentIndex === 0}
            onClick={() => dispatch({ type: 'GO_TO_QUESTION', payload: state.currentIndex - 1 })}
          >上一题</Button>
          
          <Button 
            className='nav-btn primary' 
            onClick={() => setDrawerVisible(true)}
          >交卷</Button>

          <Button 
            className='nav-btn' 
            disabled={state.currentIndex === state.questions.length - 1}
            onClick={() => dispatch({ type: 'GO_TO_QUESTION', payload: state.currentIndex + 1 })}
          >下一题</Button>
        </View>
      )}

      {/* 答题卡抽屉 */}
      <AnswerDrawer 
        questions={state.questions}
        answers={state.answers}
        currentIndex={state.currentIndex}
        isSubmitted={state.isSubmitted}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSelectQuestion={(idx) => dispatch({ type: 'GO_TO_QUESTION', payload: idx })}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
