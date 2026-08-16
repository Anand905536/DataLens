from retriever import retrieve
from openai import OpenAI 
from dotenv import load_dotenv
import os

load_dotenv()

client=OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def ask_questions(question):
    chunks=retrieve(question)
    context='\n\n'.join(
        [chunk["text"] for chunk in chunks]
    )

    sources=list(
        set(
            [chunk["source"] for chunk in chunks]
        )
    )
    
    prompt=f"""

use only the provided context

Context:
{context}

Question:
{question}


if the answer is not present in the context,reply exactly:

i couldn't find this information int he uploaded documents.
"""
    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
     )
    answer = response.choices[0].message.content

    return {
        "answer":answer,
        "sources":sources
    }