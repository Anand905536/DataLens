import os
from dotenv import load_dotenv
from openai import OpenAI

from schemas import ExtractedReport

load_dotenv()

client=OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

SYSTEM_PROMPT="""
You are a medical document information extraction system.

Your job is to extract factual information explicitly present
in the supplied medical document.

You are NOT a doctor and must NOT diagnose the patient.

Rules:

1. Never invent a value.
2. If information is missing, return null where appropriate.
3. Preserve the report date when available.
4. Identify the report type.
5. Extract laboratory values explicitly present in the document.
6. Convert numeric values to numbers where appropriate.
7. Do not infer values that are not present.
8. Do not provide medical advice.
9. Return only structured information.
"""


def extract_report(text:str)->ExtractedReport:

    response=client.responses.parse(
        model="openai/gpt-oss-120b",
        instructions=SYSTEM_PROMPT,
        input=text,
        text_format=ExtractedReport,
    )

    if response.output_parsed is None:
        raise ValueError(
            "LLM did not return structured report data"
        )

    return response.output_parsed