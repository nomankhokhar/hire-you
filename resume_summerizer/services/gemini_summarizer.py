import os
from dotenv import load_dotenv
from google import genai

# Load API key from environment
load_dotenv()
API_KEY = os.getenv("YOUR_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=API_KEY)

def summarize_resume_from_file(cv_text: str) -> str:
    if not cv_text.strip():
        raise ValueError("Input text is empty.")

    prompt = (
        "If I give the Resume to you, can you summarize it for me? "
        "What are the key points I should know about this person? "
        "Please summarize it in a few sentences.\n\nResume:\n" + cv_text
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    return response.text.strip()
