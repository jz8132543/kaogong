export interface Analysis {
  id: string;
  teacherSkill: { name: string; prompt_template: string };
  text_explanation: string;
  token_cost?: number;
}

export interface Question {
  id: string;
  content: string;
  media_assets: string[];
  options: Record<string, string>;
  correct_answer: string;
  tags: string[];
  analyses: Analysis[];
}

export interface PracticeState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>; // questionId -> selectedOption
  isSubmitted: boolean;
  timeSpent: number; // in seconds
}

export type PracticeAction =
  | { type: 'INIT_DATA'; payload: Question[] }
  | { type: 'SELECT_OPTION'; payload: { questionId: string; option: string } }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'SUBMIT_EXAM' }
  | { type: 'TICK_TIMER' };

export function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'INIT_DATA':
      return { 
        ...state, 
        questions: action.payload, 
        currentIndex: 0, 
        answers: {}, 
        isSubmitted: false, 
        timeSpent: 0 
      };
    case 'SELECT_OPTION':
      if (state.isSubmitted) return state; // 锁定状态防误触
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionId]: action.payload.option }
      };
    case 'GO_TO_QUESTION':
      if (action.payload < 0 || action.payload >= state.questions.length) return state;
      return { ...state, currentIndex: action.payload };
    case 'SUBMIT_EXAM':
      return { ...state, isSubmitted: true };
    case 'TICK_TIMER':
      if (state.isSubmitted) return state;
      return { ...state, timeSpent: state.timeSpent + 1 };
    default:
      return state;
  }
}
