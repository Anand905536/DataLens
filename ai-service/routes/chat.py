from datetime import datetime,timezone
from bson import ObjectId
from fastapi import APIRouter,HTTPException
from database import chats_collection,messages_collection
from models.chat import CreateChatRequest,SendMessagesRequest
from ask import ask_questions
from fastapi import APIRouter,Query
from typing import Dict,Any,List
from fastapi import Query

router=APIRouter(prefix="/chats",tags=["Chats"])

def now():
    return datetime.now(timezone.utc)


# create chat
@router.post("")
async def create_chat(data:CreateChatRequest,user_id:str):
    chat={
        "user_id":user_id,
        "title":data.title,
        "created_at":now(),
        "updated_at":now()
    }
    result=await chats_collection.insert_one(chat)
    return {
        "chat_id":str(result.inserted_id),
        "title":data.title
    }

# get all chats
@router.get("")
async def get_chats(
    user_id: str,
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page")
) -> List[Dict[str, Any]]:  # <--- Updated return type
    chats = []
    
    skip = (page - 1) * limit

    cursor = (
        chats_collection.find({"user_id": user_id})
        .sort("updated_at", -1)
        .skip(skip)
        .limit(limit)
    )

    async for chat in cursor:
        chats.append({
            "chat_id": str(chat["_id"]),
            "title": chat.get("title", ""),
            "created_at": chat.get("created_at"),
            "updated_at": chat.get("updated_at")
        })

    return chats

#get one chat
@router.get("/{chat_id}")
async def get_chat(chat_id:str,user_id:str):
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid chat ID"
        )
    chat =await chats_collection.find_one({
        "_id":ObjectId(chat_id),
        "user_id":user_id
    })

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )
    messages=[]

    cursor=messages_collection.find(
        {"chat_id":chat_id}
    ).sort("created_at",1)

    async for message in cursor:
        messages.append({
            "message_id":str(message["_id"]),
            "role":message["role"],
            "content":message["content"],
            "created_at":message["created_at"]
        })


    return {
        "chat_id":chat_id,
        "title":chat["title"],
        "messages":messages
    }


# post message
@router.post("/{chat_id}/messages")
async def send_message(chat_id:str,data:SendMessagesRequest,user_id:str):
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid chat Id"
        )

    # chech that check belongs to the user
    chat=await chats_collection.find_one({
        "_id":ObjectId(chat_id),
        "user_id":user_id
    })

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    #  save user's message
    user_message={
        "chat_id":chat_id,
        "user_id":user_id,
        "role":"user",
        "content":data.content,
        "created_at":now()
    }

    await messages_collection.insert_one(user_message)

    # existing AI function
    result= ask_questions(data.content)
    ai_answer=result["answer"]

    assistant_message={
        "chat_id":chat_id,
        "user_id":user_id,
        "role":"assistant",
        "content":ai_answer,
        "created_at":now()
    }
    
    await messages_collection.insert_one(assistant_message)

    # update chat time Stamp
    await chats_collection.update_one(
        {"_id":ObjectId(chat_id)},
        {
            "$set":{"updated_at":now()}
        }
    )

    return {
        "chat_id":chat_id,
        "question":data.content,
        "answer":ai_answer
    }

    