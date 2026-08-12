from typing import Optional
from pydantic import BaseModel,Field

class MedicalValue(BaseModel):
    name:str
    value:Optional[float]=None
    unit:Optional[str]=None

class ExtractedReport(BaseModel):
    report_type:str
    report_date:Optional[str]=None
    patient_name:Optional[str]=None
    values: list[MedicalValue] = Field(default_factory=list)
    summary:Optional[str]=None
