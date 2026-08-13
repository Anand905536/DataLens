from extract_text import extract_pdf_text
from chunker import chunk_text
from embeddings import create_embedding
from vector_store import add_chunk


def ingest_document(pdf_path):

    text = extract_pdf_text(pdf_path)

    chunks = chunk_text(text)

    for index, chunk in enumerate(chunks):

        vector = create_embedding(chunk)

        metadata = {
            "chunk_number": index
        }

        add_chunk(
            text=chunk,
            vector=vector,
            metadata=metadata
        )

    print("Document indexed successfully.")