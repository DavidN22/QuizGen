import axios from 'axios';

export async function generateQuiz(topic: string) {
  const res = await axios.get(`/generate?topic=${encodeURIComponent(topic)}`);
  return res.data;
}

export async function gradeQuiz(quizId: string, answers: Record<number, string>) {
  const res = await axios.post(`/grade?quizId=${quizId}`, { answers });
  return res.data;
}
