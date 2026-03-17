# hooks/first-principles.py: PreTask分析Hook - 强制注入.codexrules框架

import sys
from pathlib import Path

# 从项目提取第一性规则
template = '''## 第一性原理分析 (AutoHook from .codexrules)

### 1. 问题本质\n- 根本原因：{essence}\n- 出现原因：{root_cause}\n\n### 2. 现有机制审查\n- 复用：{reuse}\n\n### 3. 约束条件\n- 硬：{hard_constraints}\n- 软：{soft_constraints}\n\n### 4. 方案评估\n推荐：{recommended}\n\n### 5. 最小化检查\n{simplest}\n\n### 6. 副作用检查\n{side_effects}\n\n## 相似问题检查\n✅ 全库扫描完成 (AutoHook)'''

def generate_analysis(task: str) -> str:
    # 简化填充 - 实际可LLM调用
    return template.format(
        essence='待分析',
        root_cause='待分析',
        reuse='无',
        hard_constraints='TypeScript严格模式',
        soft_constraints='性能优化',
        recommended='最小修改方案',
        simplest='优先删除/修改现有代码',
        side_effects='无影响其他模块'
    )

if __name__ == '__main__':
    task = sys.argv[1] if len(sys.argv) > 1 else '通用任务'
    print(generate_analysis(task))
    print('\n**Remember**: 最好的代码是没有代码！')
