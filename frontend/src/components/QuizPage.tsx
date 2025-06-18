import { useState } from 'react';
import QuizGenerator from './QuizGenerator';
import QuizTaker from './QuizTaker';
import QuizBenefits from './QuizBenefits';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizData {
  quizId: string;
  questions: Question[];
}

const QuizPage = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-20 flex flex-col items-center">
      {!quiz ? (
        <>
          <QuizGenerator onQuizGenerated={setQuiz} />
          <QuizBenefits />
        </>
      ) : (
        <QuizTaker quiz={quiz} onReset={() => setQuiz(null)} />
      )}
    </div>
  );
};


export default QuizPage;
