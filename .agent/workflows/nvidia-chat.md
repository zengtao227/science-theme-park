---
description: Call NVIDIA AI models for complex reasoning, translation, or creative tasks
---

# NVIDIA Model Invocation Workflow

## 何时使用
当用户要求调用 NVIDIA 模型、DeepSeek、或需要外部 AI 助手完成以下任务时使用：
- 复杂推理任务
- 翻译任务
- 创意写作
- 代码生成辅助
- 学术研究问题

## 调用方法

### 方法 1: 使用 CLI 工具 (推荐)
```bash
# 基本用法
python3 /Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py "你的问题"

# 使用特定模型
python3 /Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py -m qwen "你的问题"
python3 /Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py -m llama-70b "你的问题"
python3 /Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py -m qwen-coder "代码相关问题"

# 查看可用模型
python3 /Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py --list-models
```

### 方法 2: 直接 curl 调用
```bash
curl -s -X POST "https://integrate.api.nvidia.com/v1/chat/completions" \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "你的问题"}],
    "temperature": 0.7,
    "max_tokens": 2048
  }'
```

## 可用模型

| 别名 | 完整模型名 | 推荐用途 |
|------|-----------|---------|
| `llama` | meta/llama-3.1-8b-instruct | 通用对话，快速响应 |
| `llama-70b` | meta/llama-3.1-70b-instruct | 复杂推理，高质量输出 |
| `qwen` | qwen/qwq-32b | 中文任务，推理能力强 |
| `qwen-coder` | qwen/qwen2.5-coder-32b-instruct | 代码生成和分析 |
| `mistral` | mistralai/mistral-7b-instruct-v0.3 | 欧洲语言，快速 |
| `phi` | microsoft/phi-3-medium-128k-instruct | 长上下文任务 |
| `glm` | thudm/chatglm3-6b | 中文对话 |

## API 配置信息
- **API Key**: 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
- **Endpoint**: https://integrate.api.nvidia.com/v1/chat/completions
- **状态**: ✅ 已验证可用 (2026-02-06)

## 注意事项
1. 环境预装的 `chat-nvidia` MCP 工具目前不可用 (410 错误)
2. 使用上述 CLI 工具或 curl 命令作为替代方案
3. 部分大模型 (如 nemotron-70b) 可能需要额外权限
