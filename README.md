# Proptech AI Demo (Django + Gemini)

A commercial property listing platform built with Django REST Framework. 
It features an **AI Service Layer** that automatically generates marketing descriptions for new properties using Large Language Models.

## Key Features
* **AI-Powered:** Automatically writes listing descriptions upon saving.
* **Modular Service Layer:** Decoupled architecture allowing hot-swapping between **OpenAI**, **Google Gemini (2.5 Flash)**, or a local **Mock** generator.
* **Cost-Efficient:** Currently configured to use Google Gemini 2.5 Flash for high-speed, zero-cost generation.
* **Secure:** API keys managed via `.env` (not hardcoded).

## Tech Stack
* Python 3.12
* Django 5.0 & Django REST Framework
* Google Generative AI (Gemini 2.5)
* Python-dotenv for security

## How to Run
1.  Clone the repo
2.  `pip install -r requirements.txt`
3.  Create a `.env` file in root 
`AI_PROVIDER=GEMINI`
`GEMINI_API_KEY=...`
4.  `python manage.py runserver`