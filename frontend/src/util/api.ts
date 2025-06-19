import axios from 'axios';

// Select backend URL based on window.location.hostname
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_URL = isLocalhost
  ? ''
  : 'https://quiz-gen-backend.vercel.app';

export async function generateQuiz(topic: string) {
  const res = await axios.get(`${BASE_URL}/generate?topic=${encodeURIComponent(topic)}`);
  return res.data;
}

export async function gradeQuiz(quizId: string, answers: Record<number, string>) {
  const res = await axios.post(`${BASE_URL}/grade?quizId=${quizId}`, { answers });
  return res.data;
}
