import fitz  # PyMuPDF
import os

def extract_all_text_and_save(pdf_path, output_path=None):
    if not os.path.exists(pdf_path):
        print("PDF file not found.")
        return

    doc = fitz.open(pdf_path)
    full_text = ""

    for page in doc:
        full_text += page.get_text()

    doc.close()

    # Set default output path if not provided
    if not output_path:
        base_name = os.path.splitext(os.path.basename(pdf_path))[0]
        output_path = f"{base_name}_text.txt"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_text.strip())

    print(f"Text extracted and saved to: {output_path}")

# Example usage
extract_all_text_and_save("./cv.pdf")
