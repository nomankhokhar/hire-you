import os
from fastapi import FastAPI, UploadFile, File, Form
from services.pdf_extractor import extract_all_text_and_save
from services.gemini_summarizer import summarize_resume_from_file
from db.mongodb import db
from db.models import JobPost
from datetime import datetime


app = FastAPI()

@app.get("/ping")
def read_root():
    return {"ping": "pong"}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-resume")
async def upload_resume(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    file: UploadFile = File(...)
):
    # Ensure it's a PDF
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are allowed."}

    # Sanitize filename
    file_name = name.replace(" ", "_").lower() + "_" + file.filename
    file_path = os.path.join(UPLOAD_DIR, file_name)

    # Save the uploaded PDF
    with open(file_path, "wb") as f:
        f.write(await file.read())


    # Extract and save text
    text = extract_all_text_and_save(file_path)
    if not text:
        return {"error": "Failed to extract text from the PDF."}
    summery = summarize_resume_from_file(text)

    os.remove(file_path)  # Clean up the uploaded file after processing

    return {
        "message": "Your Resume is uploaded",
        "data": {
            "name": name,
            "email": email,
            "phone": phone,
            "extracted_text": summery
        }
    }


@app.post("/upload-job-post")
async def create_job(job: JobPost):
    now = datetime.utcnow()
    job_data = job.dict()
    job_data["createdAt"] = now
    job_data["updatedAt"] = now

    result = await db["jobs"].insert_one(job_data)
    return {"id": str(result.inserted_id)}