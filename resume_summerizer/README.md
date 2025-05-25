# Activate your virtual environment first

source venv/bin/activate # Linux/macOS
venv\Scripts\activate # Windows

# Export dependencies

pip freeze > requirements.txt

fastapi dev main.py
