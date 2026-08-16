from pypdf import PdfReader


def extract_pdf_text(pdf_path):

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:

            text += page_text + "\n"

    if text.strip():

        return text
    
    images=convert_from_path(pdf_path)

    ocr_text=""

    for image in images:

        ocr_text += pytesseract.image_to_string(image)

    return ocr_text