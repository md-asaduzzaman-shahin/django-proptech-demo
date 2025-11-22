import os
import google.generativeai as genai  # We installed this in Step 1
from dotenv import load_dotenv

# Load the secrets from .env
load_dotenv()

def generate_property_description(prop):
    """
    The Master Switchboard.
    It checks .env to see which free or paid brain you want to use.
    """
    provider = os.getenv("AI_PROVIDER", "MOCK").upper()
    
    print(f"--- Generating description using {provider} ---")

    if provider == "GEMINI":
        return _generate_with_gemini(prop)
    elif provider == "GROK":
        return _generate_with_grok(prop)
    else:
        return _generate_mock(prop)

def _generate_mock(prop):
    """
    FREE & OFFLINE: Uses simple text templates.
    """
    return (
        f"Check out this fantastic {prop.property_type} in {prop.suburb}! "
        f"It offers {prop.size_sqm}sqm of premium space. "
        f"Contact us for a viewing today."
    )

def _generate_with_gemini(prop):
    """
    FREE (Tier): Uses Google's Gemini API.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Error: Gemini API Key missing in .env file."
    
    try:
        genai.configure(api_key=api_key)
        
        # USING THE MODEL YOU FOUND IN SHELL
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = (
            f"Write a 2-sentence real estate listing for a {prop.property_type} "
            f"at {prop.address}, {prop.suburb}. Size: {prop.size_sqm}sqm. "
            f"Make it sound professional and exciting."
        )
        
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Gemini Error: {e}")
        return _generate_mock(prop)
    
    
def _generate_with_grok(prop):
    """
    Placeholders for Grok (xAI).
    Grok is compatible with OpenAI libraries, so you can often reuse that code.
    """
    return "Grok integration pending API access."