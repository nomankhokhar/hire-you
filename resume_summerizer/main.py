from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

# Load Gemini API key from environment variable
YOUR_API_KEY = os.getenv('YOUR_API_KEY')

client = genai.Client(api_key=YOUR_API_KEY)

response = client.models.generate_content(
    model="gemini-2.0-flash", contents="If I give the Resume to you, can you summarize it for me? What are the key points I should know about this person? Please summarize it in a few sentences.",
)
print(response.text)