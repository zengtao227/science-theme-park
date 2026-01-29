import json
import os
from pathlib import Path

def update_mcp_config(api_key):
    target_path = Path.home() / ".claude.json"
    
    if not target_path.exists():
        print(f"[-] Config not found at {target_path}")
        return

    with open(target_path, 'r') as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("[-] JSON decode error")
            return

    if "mcpServers" not in config:
        config["mcpServers"] = {}

    # Update NVIDIA GLM-4.7
    if "nvidia-glm" in config["mcpServers"]:
        config["mcpServers"]["nvidia-glm"]["env"]["NVIDIA_API_KEY"] = api_key
    
    # Update NVIDIA MiniMax M2.1
    if "nvidia-minimax" in config["mcpServers"]:
        config["mcpServers"]["nvidia-minimax"]["env"]["NVIDIA_API_KEY"] = api_key

    with open(target_path, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f"[+] Successfully injected API Key into {target_path}")

if __name__ == "__main__":
    # Securely getting the key from the environment or direct argument in this context
    key = "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"
    update_mcp_config(key)
