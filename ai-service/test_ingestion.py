from chunker import chunk_text
from embeddings import create_embedding
from vector_store import create_collection,add_chunk

text = """
CBC REPORT

Patient: Test Patient

Report Date: 5 August 2025

Complete Blood Count (CBC)

Hemoglobin: 10.8 g/dL

WBC: 5600 /uL

Platelets: 82,000 /uL

RBC: 3.8 million/uL

Hematocrit: 32.5 %

MCV: 85 fL

Synthetic test document for application development only.
"""

create_collection()
chunks=chunk_text(text)
print("Number of chunks:",len(chunks))

for index,chunk in enumerate(chunks):

    print("\n-------------------")
    print("CHUNK",index+1)
    print(chunk)

    vector=create_embedding(chunk)


    metadata={
          "fileName": "test-cbc-report.pdf",
        "page": 1,
        "chunkIndex": index
    }

    add_chunk(
        text=chunk,
        vector=vector,
        metadata=metadata
    )

    print("\nDocument ingestion completed")