from pdf2image import convert_from_path
import pytesseract

pdf_path = "../server/uploads/10marksheetankit.pdf"

images=convert_from_path(pdf_path)

text=pytesseract.image_to_string(images[0])

print(text)