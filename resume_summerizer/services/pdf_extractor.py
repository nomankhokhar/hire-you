import fitz  # PyMuPDF
import os

def extract_all_text_and_save(pdf_path):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError("PDF file not found.")

    doc = fitz.open(pdf_path)
    full_text = "".join(page.get_text() for page in doc)
    doc.close()

    return full_text.strip()
