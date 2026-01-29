import os
import requests
import json
import argparse
import sys

# Configuration
API_KEY = os.environ.get("NVIDIA_API_KEY", "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")
BASE_URL = "https://integrate.api.nvidia.com/v1"

def list_models():
    """Lists available models from NVIDIA NIM."""
    print("Fetching available models...")
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json"
    }
    try:
        response = requests.get(f"{BASE_URL}/models", headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            models = data.get("data", [])
            print(f"Found {len(models)} models.")
            for model in models:
                print(f"- {model['id']}")
            return models
        else:
            print(f"Error fetching models: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"Exception listing models: {e}")
        return []

def chat(model, prompt, system_prompt=None):
    """Sends a chat request to the specified model."""
    print(f"\nUsing model: {model}")
    print(f"Prompt: {prompt[:50]}...")
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 1024,
        "stream": False
    }
    
    try:
        response = requests.post(f"{BASE_URL}/chat/completions", headers=headers, json=payload, timeout=30)
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            print("\n--- Response ---")
            print(content)
            print("----------------")
            return content
        else:
            print(f"Error generating response: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Exception during chat: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="NVIDIA NIM Tool")
    parser.add_argument("--list", action="store_true", help="List available models")
    parser.add_argument("--model", type=str, help="Model ID to use")
    parser.add_argument("--prompt", type=str, help="User prompt")
    parser.add_argument("--system", type=str, help="System prompt")
    
    args = parser.parse_args()
    
    if args.list:
        list_models()
    elif args.model and args.prompt:
        chat(args.model, args.prompt, args.system)
    else:
        # Default behavior if no args: list then ask for prompt (interactive simulation)
        # But for automation, we just print help
        parser.print_help()

if __name__ == "__main__":
    main()
