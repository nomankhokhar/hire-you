from dotenv import load_dotenv
import os
from google import genai

# Load environment variables
load_dotenv()

# Load Gemini API key
YOUR_API_KEY = os.getenv('YOUR_API_KEY')

# Initialize Gemini client
client = genai.Client(api_key=YOUR_API_KEY)

# Read CV text from file
with open("cv_text.txt", "r", encoding="utf-8") as f:
    cv_text = f.read()

# Define prompt with embedded CV text
prompt = (
    "If I give the Resume to you, can you summarize it for me? "
    "What are the key points I should know about this person? "
    "Please summarize it in a few sentences.\n\nResume:\n" + cv_text
)

# Send to Gemini for summarization
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=prompt,
)

# Print response
print(response.text)
