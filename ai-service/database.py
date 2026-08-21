import os 
from pymongo import AsyncMongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI=os.getenv("MONGO_URI")

DATABASE_NAME=os.getenv("DATABASE_NAME")

client=AsyncMongoClient(MONGO_URI)

db=client[DATABASE_NAME]  

chats_collection=db["chats"]
messages_collection=db["messages"]