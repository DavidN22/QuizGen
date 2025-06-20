from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from agents import (
    Agent,
    Runner,
    AsyncOpenAI,
    OpenAIChatCompletionsModel,
    GuardrailFunctionOutput,
    RunContextWrapper,
    input_guardrail,
    InputGuardrailTripwireTriggered,
)

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

# Models
class QuizQuestion(BaseModel):
    text: str
    options: list[str]
    correctAnswer: str

class GeneratedQuiz(BaseModel):
    questions: list[QuizQuestion]

class SaftyGuardrail(BaseModel):
    text: str
    is_safe: bool

# Clients
gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_client = AsyncOpenAI(
    base_url="https://generativelanguage.googleapis.com/v1beta",
    api_key=gemini_api_key
)

# Guardrail agent
guardrail_agent = Agent(
    name="Guardrail check",
    instructions="Determine if the input topic is safe and follows AI policies. If it is inappropriate, restricted, or harmful, set is_safe to false.",
    output_type=SaftyGuardrail,
    model=OpenAIChatCompletionsModel(
        model="gemini-2.5-flash-preview-05-20",
        openai_client=gemini_client,
    ),
)
# Guardrail function to check safety and throw and error if the topic is not safe or breaks AI model policies
@input_guardrail
async def safety_guardrail(
    ctx: RunContextWrapper[None], agent: Agent, input: str
) -> GuardrailFunctionOutput:
    result = await Runner.run(guardrail_agent, input, context=ctx.context)
    return GuardrailFunctionOutput(
        output_info=result.final_output,
        tripwire_triggered=not result.final_output.is_safe,
    )

# Main quiz generator agent
quiz_generator_agent = Agent(
    name="Quiz Generator",
    instructions=(
        "Generate a 5-question multiple-choice quiz on the given topic. "
        "Each question should have four plain answer options (as strings, not prefixed with A, B, C, or D). "
        "Include the correct answer as a letter (A, B, C, or D) in a `correctAnswer` field for each question. "
        "Do not include any question IDs or labels next to the options."
        "If the topic is vague like generate history quiz as opposed to history decifer the topic, as the user might start" \
        "the prompt with generate rather than the topic directly."
    ),
    input_guardrails=[safety_guardrail],
    model=OpenAIChatCompletionsModel(
        model="gemini-2.5-flash-preview-05-20",
        openai_client=gemini_client,
    ),
    output_type=GeneratedQuiz,
)

# Endpoint
@app.post("/generate-quiz")
async def generate_quiz(request: Request):
    data = await request.json()
    topic = data.get("topic", "General Knowledge")

    try:
        result = await Runner.run(quiz_generator_agent, f"Generate a quiz on {topic}")
        generated_quiz = result.final_output_as(GeneratedQuiz)
        return generated_quiz.model_dump()

    except InputGuardrailTripwireTriggered:
        return JSONResponse(
            status_code=400,
            content={"error": "This topic is not allowed. Please choose a different one."}
        )
