from embeddings import create_embedding
from vector_store import search_chunks


def retrieve(question):

    query_vector = create_embedding(question)

    results = search_chunks(query_vector)

    chunks = []

    for result in results:

        chunks.append(
            {
                "text": result.payload["text"],
                "source": result.payload.get(
                    "file_name",
                    result.payload.get("fileName", "Unknown")
                )
            }
        )

    return chunks