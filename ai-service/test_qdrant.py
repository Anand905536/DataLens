from embeddings import create_embedding
from vector_store import create_collection, add_chunk


create_collection()

text = "Motorola generated ₹42.5 lakh in sales during 2023."

vector = create_embedding(text)

metadata = {
    "fileName": "sales-2023.pdf",
    "page": 14,
    "year": 2023
}

add_chunk(
    text=text,
    vector=vector,
    metadata=metadata
)