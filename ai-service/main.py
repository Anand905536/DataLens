from fastapi import FastAPI, UploadFile, File
from vector_store import client,COLLECTION_NAME
from typing import List
import shutil
import os

from ingest import ingest_document
from ask import ask_questions

app = FastAPI()


@app.get("/")
def home():

    return {
        "message": "DataLens API is running"
    }


@app.post("/upload")
def upload_pdf(files: List[UploadFile] = File(...)):

    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    uploaded_files = []

    for file in files:

        file_path = os.path.join(
            upload_dir,
            file.filename
        )

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        ingest_document(file_path)

        uploaded_files.append(
            file.filename
        )

    return {
        "message": "Documents indexed successfully",
        "files": uploaded_files
    }


@app.post("/ask")
def ask(question: str):

    answer = ask_questions(question)

    return {
        "answer": answer
    }

@app.get("/documents")
def get_documents():

    records,_=client.scroll(
        collection_name=COLLECTION_NAME,
        limit=1000
    )

    documents=set()

    for record in records:

        file_name=record.payload.get(
            "file_name",
            record.payload.get("fileName")
        )

        if file_name:
            documents.add(file_name)
            
    return{
        "documents":list(documents)
    }
