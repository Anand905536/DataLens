from fastapi import FastAPI, UploadFile, File,HTTPException
from vector_store import client,COLLECTION_NAME
# from typing import List
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
def upload_pdf(file: UploadFile = File(...)):

    print("Uploading:", file.filename)

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Saved to:", file_path)

    ingest_document(file_path)

    print("Ingestion finished")

    return {
        "message": "Document indexed successfully",
        "uploaded_file": file.filename
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




# delete function 
@app.delete("/documents/{file_name}")
def delete_document(file_name:str):

    records,_=client.scroll(
        collection_name=COLLECTION_NAME,
        limit=10000
    )

    point_ids=[]

    for record in records:

        current_file=record.payload.get(
            "file_name",
            record.payload.get("fileName")
        )

        if current_file==file_name:

            point_ids.append(record.id)

    if not point_ids:

        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )        

    client.delete(
        collection_name=COLLECTION_NAME,
        points_selector=point_ids
    )


    return {
        "message":f"{file_name} deleted successfully"
    }
