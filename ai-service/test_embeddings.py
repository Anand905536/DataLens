from embeddings import create_embeddings
text="Motorola sold 150 phones in 2023 so what you are a service man who doesn't want his job anymore"

vector=create_embeddings(text)

print("vector dimensions :",len(vector))
print("First 10 values:",vector[:10])