from pydantic import BaseModel


class CreateChatRequest(BaseModel):
       title:str="new chat"


class SendMessagesRequest(BaseModel):
       content:str