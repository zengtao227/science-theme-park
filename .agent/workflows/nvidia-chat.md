---
description: Call NVIDIA AI models for complex reasoning, translation, or creative tasks
---

# NVIDIA Model Invocation Workflow (Update: 2026-02-19)

## 何时使用
当需要调用性能卓越的 NVIDIA 服务器托管模型（如 GLM-5, MiniMax, DeepSeek V3）完成以下任务时：
- **复杂推理**：使用 `glm5` 或 `thinking` 模型。
- **中文任务**：GLM 和 MiniMax 对中文理解极佳。
- **代码辅助**：Qwen-Coder 或 DeepSeek-V3。

## 调用方法

### 方法 1: 使用 curl 直接调用 (最稳健)
```bash
curl -s -X POST "https://integrate.api.nvidia.com/v1/chat/completions" \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-ai/glm5",
    "messages": [{"role": "user", "content": "你好"}],
    "temperature": 0.6
  }'
```

### 方法 2: 使用自定义 Python 脚本
若 `/Users/zengtao/mcp-servers/nvidia-bridge/nvidia_chat.py` 存在，请确保其中模型 ID 已按下列列表更新。

## 推荐模型列表 (最新验证)

| 别名 | 完整模型 ID (API 使用) | 推荐用途 |
|------|----------------------|---------|
| `glm5` | `z-ai/glm5` | **智谱最新旗舰**，全能推理，强烈推荐 |
| `minimax` | `minimaxai/minimax-m2.1` | **MiniMax 最新版**，中文逻辑强 |
| `deepseek-v3` | `deepseek-ai/deepseek-v3.2` | **DeepSeek 最新 V3**，极高性价比/性能比 |
| `qwen-think` | `qwen/qwen3-next-80b-a3b-thinking` | **阿里最新推理模型**，带思维链 |
| `llama-70b` | `meta/llama-3.3-70b-instruct` | Meta 最新 3.3 版本 |

## API 配置信息
- **API Key**: `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`
- **Base URL**: `https://integrate.api.nvidia.com/v1`
- **状态**: ✅ 已验证可用 (2026-02-19)

## 注意事项
1. **MCP Tool 状态**: 系统预装的 `mcp_chat-nvidia` 插件目前汇报 410 错误，请忽略它。
2. **命名空间**: 模型 ID 必须包含厂家前缀（如 `z-ai/`），否则会报错 404。
3. **速率建议**: 免费模型有并发限制，建议在处理大量任务时加入重试机制。
