import { View, Text, Button } from '@tarojs/components';
import { Question } from '../reducer';
import './AnswerDrawer.scss';

interface AnswerDrawerProps {
  questions: Question[];
  answers: Record<string, string>;
  currentIndex: number;
  isSubmitted: boolean;
  visible: boolean;
  onClose: () => void;
  onSelectQuestion: (index: number) => void;
  onSubmit: () => void;
}

export default function AnswerDrawer({
  questions,
  answers,
  currentIndex,
  isSubmitted,
  visible,
  onClose,
  onSelectQuestion,
  onSubmit
}: AnswerDrawerProps) {
  
  if (!visible) return null;

  return (
    <View className='drawer-overlay' onClick={onClose}>
      <View className='drawer-content' onClick={(e) => e.stopPropagation()}>
        <View className='drawer-header'>
          <Text className='title'>答题卡</Text>
          <Text className='close-btn' onClick={onClose}>✕</Text>
        </View>

        <View className='grid-container'>
          {questions.map((q, idx) => {
            const hasAnswered = !!answers[q.id];
            const isCorrect = hasAnswered && answers[q.id] === q.correct_answer;
            const isCurrent = currentIndex === idx;

            let itemClass = 'grid-item';
            if (isCurrent) itemClass += ' current';
            
            if (isSubmitted) {
              if (isCorrect) itemClass += ' correct';
              else if (hasAnswered) itemClass += ' wrong';
              else itemClass += ' missed';
            } else {
              if (hasAnswered) itemClass += ' answered';
            }

            return (
              <View 
                key={q.id} 
                className={itemClass}
                onClick={() => {
                  onSelectQuestion(idx);
                  onClose();
                }}
              >
                {idx + 1}
              </View>
            );
          })}
        </View>

        {!isSubmitted && (
          <View className='drawer-footer'>
            <Button className='submit-btn' onClick={onSubmit}>
              确认交卷
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
