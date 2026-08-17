from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from qdrant_client.models import Filter
import uuid

import os

client = QdrantClient(
    url=os.getenv["QDRANT_URL"],
    api_key=os.getenv["QDRANT_API_KEY"]
)

COLLECTION_NAME = "documents"

def create_collection():

    collections = client.get_collections().collections

    collection_names = [
        collection.name
        for collection in collections
    ]

    if COLLECTION_NAME not in collection_names:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

        print("Collection created")

    else:

        print("Collection already exists")


def add_chunk(text, vector, metadata):

    point = PointStruct(
        id=str(uuid.uuid4()),
        vector=vector,
        payload={
            "text": text,
            **metadata
        }
    )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[point]
    )

    print("Chunk added")

def search_chunks(query_vector,limit=30):

    results=client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit
    )  

    return results.points