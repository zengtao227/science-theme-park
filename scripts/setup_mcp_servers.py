import json
import os
from pathlib import Path

def update_mcp_config():
    # Common MCP configuration paths
    possible_paths = [
        Path.home() / "Library/Application Support/antigravity/mcp-config.json",
        Path.home() / ".antigravity/mcp-config.json",
        Path.home() / "Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json",
        Path.cwd() / ".agent/mcp-config.json",
        Path.home() / ".claude.json"
    ]

    target_path = None
    for p in possible_paths:
        if p.exists():
            target_path = p
            break
    
    if not target_path:
        print("[-] MCP configuration file not found in common locations.")
        # Create a default one in the current directory if not found
        target_path = Path.cwd() / ".agent/mcp-config.json"
        target_path.parent.mkdir(parents=True, exist_ok=True)
        config = {"mcpServers": {}}
        print(f"[!] Creating new config at: {target_path}")
    else:
        print(f"[+] Found MCP config at: {target_path}")
        with open(target_path, 'r') as f:
            try:
                config = json.load(f)
            except json.JSONDecodeError:
                config = {"mcpServers": {}}

    if "mcpServers" not in config:
        config["mcpServers"] = {}

    # Define the latest models for 2026
    # Note: These IDs are based on the latest releases
    glm_model = "thudm/glm-4-7" 
    minimax_model = "minimax/m2.1"

    # Add NVIDIA GLM-4.7
    config["mcpServers"]["nvidia-glm"] = {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-nvidia"],
        "env": {
            "NVIDIA_MODEL": glm_model
        },
        "description": "NVIDIA NIM - Z.ai GLM-4.7 (Reasoning & Coding)"
    }

    # Add NVIDIA MiniMax M2.1
    config["mcpServers"]["nvidia-minimax"] = {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-nvidia"],
        "env": {
            "NVIDIA_MODEL": minimax_model
        },
        "description": "NVIDIA NIM - MiniMax M2.1 (Multilingual & Agentic)"
    }

    # Save the updated config
    with open(target_path, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f"[+] Successfully added GLM-4.7 and MiniMax-M2.1 to {target_path}")
    print("[!] Please ensure your NVIDIA_API_KEY is set in your environment variables.")

if __name__ == "__main__":
    update_mcp_config()
