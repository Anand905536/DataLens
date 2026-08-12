from pypdf import PdfReader
from llm_extractor import extract_report

pdf_path="../server/uploads/1786423126880-test-cbc-report.pdf"

reader=PdfReader(pdf_path)

text=""

for page in reader.pages:
    page_text=page.extract_text()

    if page_text:
        text+=page_text+"\n"

    print("===========EXTRACTED TEXT=============")
    result=extract_report(text)
    print(result.model_dump_json(indent=2))
