import { View, Text, Image } from '@tarojs/components';
import { Question } from '../reducer';
import './QuestionCard.scss';

interface QuestionCardProps {
  question: Question;
  selectedOption?: string;
  onSelectOption: (option: string) => void;
  isSubmitted: boolean;
}

export default function QuestionCard({ question, selectedOption, onSelectOption, isSubmitted }: QuestionCardProps) {
  
  // 核心功能：多模态图文混排解析器
  // 将 "文字文字[IMAGE:0]文字文字[IMAGE:1]" 解析为 React 节点数组
  const renderContent = () => {
    if (!question.content) return null;
    
    // 正则匹配 [IMAGE:x]
    const regex = /\[IMAGE:(\d+)\]/g;
    const parts = question.content.split(regex);
    
    return parts.map((part, index) => {
      // index 为奇数时是正则的捕获组，即数字
      if (index % 2 === 1) {
        const imageIndex = parseInt(part, 10);
        const imageUrl = question.media_assets?.[imageIndex];
        if (imageUrl) {
          return (
            <Image 
              key={`img-${index}`} 
              src={imageUrl} 
              mode='widthFix' 
              className='question-image' 
            />
          );
        }
        return <Text key={`err-${index}`}>[图片丢失]</Text>;
      }
      // 偶数时是普通文本
      return <Text key={`text-${index}`} className='question-text'>{part}</Text>;
    });
  };

  const optionsKeys = Object.keys(question.options || {});

  return (
    <View className='question-card'>
      <View className='tags-bar'>
        {question.tags?.map(tag => (
          <Text key={tag} className='tag'>{tag}</Text>
        ))}
      </View>
      
      <View className='content-area'>
        {renderContent()}
      </View>

      <View className='options-area'>
        {optionsKeys.map(key => {
          const isSelected = selectedOption === key;
          const isCorrect = question.correct_answer === key;
          
          let optionClass = 'option-item';
          if (isSelected) optionClass += ' selected';
          
          // 如果已交卷，标注正确与错误项
          if (isSubmitted) {
            if (isCorrect) optionClass += ' correct-answer';
            else if (isSelected && !isCorrect) optionClass += ' wrong-answer';
          }

          return (
            <View 
              key={key} 
              className={optionClass}
              onClick={() => onSelectOption(key)}
            >
              <View className='option-letter'>{key}</View>
              <Text className='option-text'>{question.options[key]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
