import json
import os
from pathlib import Path

def automate_trae_config():
    # Trae 真实的 MCP 配置文件路径
    trae_path = Path.home() / "Library/Application Support/Trae/User/mcp.json"
    claude_path = Path.home() / "Library/Application Support/Claude/claude_desktop_config.json"
    
    paths = [trae_path, claude_path]
    api_key = "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"
    
    for config_path in paths:
        if not config_path.exists():
            print(f"[-] Path not found: {config_path}")
            continue
            
        print(f"[*] Updating: {config_path}")
        
        with open(config_path, 'r') as f:
            try:
                data = json.load(f)
            except:
                data = {"mcpServers": {}}

        if "mcpServers" not in data:
            data["mcpServers"] = {}

        # 注入最新的 NVIDIA NIM 配置 (改用真正存在的 smithery 驱动方式，类似你文件中已有的 context7-mcp 格式)
        data["mcpServers"]["nvidia-nim"] = {
            "command": "npx",
            "args": [
                "-y",
                "@smithery/cli@latest",
                "run",
                "@smithery/nvidia-nim-mcp"
            ],
            "env": {
                "NVIDIA_API_KEY": api_key
            },
            "type": "stdio"
        }

        data["mcpServers"]["stitch"] = {
            "url": "https://stitch.googleapis.com/mcp",
            "headers": {
                "X-Goog-Api-Key": "AQ.Ab8RN6LAuMmIaNT56XMSntK6ca0TMDV0vIQ-m5prQn5-UqfGGA"
            }
        }

        with open(config_path, 'w') as f:
            json.dump(data, f, indent=2)
            
        print(f"[+] Successfully configured: {config_path}")

if __name__ == "__main__":
    automate_trae_config()
