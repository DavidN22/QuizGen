from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from agents import Agent, Runner
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizQuestion(BaseModel):
    id: int
    text: str
    options: list[str]
    correctAnswer: str

class GeneratedQuiz(BaseModel):
    questions: list[QuizQuestion]

quiz_generator_agent = Agent(
    name="Quiz Generator",
    instructions=(
        "Generate a 5-question multiple-choice quiz on the given topic. "
        "Each question should clearly state four options labeled A, B, C, D, "
        "and explicitly indicate the correct answer (A, B, C, or D). Be sure to double check for the correct answer. " 
    ),
    output_type=GeneratedQuiz,
)
@app.post("/generate-quiz")
async def generate_quiz(request: Request):
    data = await request.json()
    topic = data.get("topic", "General Knowledge")

    result = await Runner.run(quiz_generator_agent, f"Generate a quiz on {topic}")
    generated_quiz = result.final_output_as(GeneratedQuiz)

    return generated_quiz.model_dump()
