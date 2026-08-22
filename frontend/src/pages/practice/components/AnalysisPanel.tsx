import { View, Text, Input, Button, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import { Analysis } from '../reducer';
import { API } from '../../../utils/api';
import './AnalysisPanel.scss';

interface AnalysisPanelProps {
  questionId: string;
  analyses: Analysis[];
}

export default function AnalysisPanel({ questionId, analyses }: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [askContent, setAskContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiReplies, setAiReplies] = useState<Record<string, string[]>>({});

  if (!analyses || analyses.length === 0) return null;

  const currentAnalysis = analyses[activeTab];
  const currentTeacherName = currentAnalysis.teacherSkill?.name || '名师';
  const currentReplies = aiReplies[currentAnalysis.id] || [];

  const handleAsk = async () => {
    if (!askContent.trim()) return;
    const query = askContent;
    setAskContent('');
    setLoading(true);

    try {
      const res: any = await API.post(`/api/analysis/${questionId}/ask`, { query, model: 'qwen-max' });
      if (res.success) {
        setAiReplies(prev => ({
          ...prev,
          [currentAnalysis.id]: [...(prev[currentAnalysis.id] || []), `【你】: ${query}`, `【${currentTeacherName}】: ${res.data.content}`]
        }));
        Taro.showToast({ title: `消耗了 ${res.data.tokens_consumed} 点数`, icon: 'none' });
      }
    } catch (err) {
      console.error(err);
      Taro.showToast({ title: 'AI 请求失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='analysis-panel'>
      <View className='panel-header'>
        <Text className='panel-title'>名师解析</Text>
      </View>
      
      {/* 老师流派 Tab 切换 */}
      <View className='teacher-tabs'>
        {analyses.map((analysis, index) => (
          <View 
            key={analysis.id} 
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <Text>{analysis.teacherSkill?.name || '默认'}</Text>
          </View>
        ))}
      </View>

      {/* 解析正文 */}
      <View className='analysis-content'>
        <Text className='content-text'>{currentAnalysis.text_explanation}</Text>
      </View>

      {/* AI 追问历史 */}
      {currentReplies.length > 0 && (
        <ScrollView className='ai-replies-area' scrollY>
          {currentReplies.map((reply, i) => (
            <View key={i} className={`reply-item ${reply.startsWith('【你】') ? 'user' : 'ai'}`}>
              <Text>{reply}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* AI 苏格拉底追问闭环 */}
      <View className='ai-ask-box'>
        <View className='ask-hint'>
          <Text>没看懂？向 {currentTeacherName} (AI) 追问</Text>
          <Text className='token-cost'>消耗 5 点数/次</Text>
        </View>
        <View className='input-area'>
          <Input 
            className='ask-input' 
            placeholder='例如：第二步公式是怎么推导的？' 
            value={askContent}
            onInput={(e) => setAskContent(e.detail.value)}
          />
          <Button className='ask-btn' loading={loading} onClick={handleAsk}>发送</Button>
        </View>
      </View>
    </View>
  );
}
