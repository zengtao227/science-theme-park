#!/usr/bin/env python3
"""最终修复 SM1-04 - 正确的执行顺序"""

import re

file_path = "src/app/chamber/sm1-04/page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 步骤 1: 修改 buildStagePool 函数签名
old_sig = 'const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): EquationQuest[] => {'
new_sig = 'const buildStagePool = useCallback((tObj: typeof sm1_04_t, difficulty: Difficulty, stage: Stage): EquationQuest[] => {'

if old_sig in content:
    content = content.replace(old_sig, new_sig)
    print("✓ 更新 buildStagePool 函数签名")

# 步骤 2: 替换 buildStagePool 内部的所有 t() 调用为 tObj.
# 找到 buildStagePool 函数的开始和结束位置
buildpool_start = content.find(new_sig)
if buildpool_start == -1:
    buildpool_start = content.find(old_sig)

# 找到对应的结束位置（下一个 }, [）
buildpool_end = content.find('}, []);', buildpool_start)

if buildpool_start != -1 and buildpool_end != -1:
    # 只在 buildStagePool 函数内部替换
    before = content[:buildpool_start]
    buildpool_section = content[buildpool_start:buildpool_end + 7]  # 包括 }, []);
    after = content[buildpool_end + 7:]
    
    # 替换场景
    buildpool_section = buildpool_section.replace('t("sm1_04.scenarios.applications")', 'tObj.scenarios.applications')
    buildpool_section = buildpool_section.replace('t("sm1_04.scenarios.balance")', 'tObj.scenarios.balance')
    buildpool_section = buildpool_section.replace('t("sm1_04.scenarios.solve")', 'tObj.scenarios.solve')
    buildpool_section = buildpool_section.replace('t("sm1_04.scenarios.transform")', 'tObj.scenarios.transform')
    
    # 替换问题
    problems = [
        "app_age_ratio", "app_age_simple", "app_age_sum", "app_boat_current", "app_bus_ticket",
        "app_compound_mixture", "app_consecutive_numbers", "app_distance_simple", "app_investment_interest",
        "app_mixture_problem", "app_novartis_samples", "app_price_discount", "app_profit_loss",
        "app_rectangle_perimeter", "app_rhine_time", "app_roche_concentration", "app_speed_distance",
        "app_train_meeting", "app_tram_tickets", "app_work_rate", "bal_add_both", "bal_both_sides_x",
        "bal_complex_both", "bal_complex_distribute", "bal_decimal_coeff", "bal_distribute", "bal_divide_both",
        "bal_fraction_coeff", "bal_fractions", "bal_multiply_both", "bal_negative_coeff", "bal_negative_result",
        "bal_nested_parens", "bal_parentheses_both", "bal_proportion", "bal_reciprocal", "bal_simple_check",
        "bal_subtract_both", "bal_three_fractions", "bal_two_steps", "sol_combine_like", "sol_complex_distribute",
        "sol_decimal_coeff", "sol_decimal_complex", "sol_distribute_simple", "sol_fraction_both",
        "sol_fraction_result", "sol_negative_both", "sol_negative_coeff", "sol_negative_simple",
        "sol_nested_parens", "sol_one_step_add", "sol_one_step_div", "sol_one_step_mult", "sol_one_step_sub",
        "sol_proportion_eq", "sol_three_terms", "sol_two_step_1", "sol_two_step_2", "sol_x_both_sides",
        "tra_both_expand", "tra_collect_terms", "tra_complex_collect", "tra_decimal_expand", "tra_double_expand",
        "tra_expand_first", "tra_fraction_clear", "tra_fractions_lcd", "tra_isolate_x", "tra_mixed_complex",
        "tra_move_both", "tra_move_constant", "tra_move_variable", "tra_multi_step", "tra_negative_coeff",
        "tra_negative_move", "tra_nested_complex", "tra_proportion_cross", "tra_three_fractions", "tra_two_moves",
    ]
    
    for p in problems:
        buildpool_section = buildpool_section.replace(f't("sm1_04.problems.{p}")', f'tObj.problems.{p}')
    
    content = before + buildpool_section + after
    print("✓ 替换 buildStagePool 内部的翻译调用")

# 步骤 3: 在 useLanguage 后插入翻译对象（使用 t() 而不是 tObj）
insert_marker = 'const { t, currentLanguage } = useLanguage();'
insert_pos = content.find(insert_marker)

if insert_pos != -1:
    end_pos = content.find('\n', insert_pos) + 1
    
    translation_obj = '''
  // Pre-extract all translations
  const sm1_04_t = {
    scenarios: {
      applications: t("sm1_04.scenarios.applications"),
      balance: t("sm1_04.scenarios.balance"),
      solve: t("sm1_04.scenarios.solve"),
      transform: t("sm1_04.scenarios.transform"),
    },
    problems: {
      app_age_ratio: t("sm1_04.problems.app_age_ratio"),
      app_age_simple: t("sm1_04.problems.app_age_simple"),
      app_age_sum: t("sm1_04.problems.app_age_sum"),
      app_boat_current: t("sm1_04.problems.app_boat_current"),
      app_bus_ticket: t("sm1_04.problems.app_bus_ticket"),
      app_compound_mixture: t("sm1_04.problems.app_compound_mixture"),
      app_consecutive_numbers: t("sm1_04.problems.app_consecutive_numbers"),
      app_distance_simple: t("sm1_04.problems.app_distance_simple"),
      app_investment_interest: t("sm1_04.problems.app_investment_interest"),
      app_mixture_problem: t("sm1_04.problems.app_mixture_problem"),
      app_novartis_samples: t("sm1_04.problems.app_novartis_samples"),
      app_price_discount: t("sm1_04.problems.app_price_discount"),
      app_profit_loss: t("sm1_04.problems.app_profit_loss"),
      app_rectangle_perimeter: t("sm1_04.problems.app_rectangle_perimeter"),
      app_rhine_time: t("sm1_04.problems.app_rhine_time"),
      app_roche_concentration: t("sm1_04.problems.app_roche_concentration"),
      app_speed_distance: t("sm1_04.problems.app_speed_distance"),
      app_train_meeting: t("sm1_04.problems.app_train_meeting"),
      app_tram_tickets: t("sm1_04.problems.app_tram_tickets"),
      app_work_rate: t("sm1_04.problems.app_work_rate"),
      bal_add_both: t("sm1_04.problems.bal_add_both"),
      bal_both_sides_x: t("sm1_04.problems.bal_both_sides_x"),
      bal_complex_both: t("sm1_04.problems.bal_complex_both"),
      bal_complex_distribute: t("sm1_04.problems.bal_complex_distribute"),
      bal_decimal_coeff: t("sm1_04.problems.bal_decimal_coeff"),
      bal_distribute: t("sm1_04.problems.bal_distribute"),
      bal_divide_both: t("sm1_04.problems.bal_divide_both"),
      bal_fraction_coeff: t("sm1_04.problems.bal_fraction_coeff"),
      bal_fractions: t("sm1_04.problems.bal_fractions"),
      bal_multiply_both: t("sm1_04.problems.bal_multiply_both"),
      bal_negative_coeff: t("sm1_04.problems.bal_negative_coeff"),
      bal_negative_result: t("sm1_04.problems.bal_negative_result"),
      bal_nested_parens: t("sm1_04.problems.bal_nested_parens"),
      bal_parentheses_both: t("sm1_04.problems.bal_parentheses_both"),
      bal_proportion: t("sm1_04.problems.bal_proportion"),
      bal_reciprocal: t("sm1_04.problems.bal_reciprocal"),
      bal_simple_check: t("sm1_04.problems.bal_simple_check"),
      bal_subtract_both: t("sm1_04.problems.bal_subtract_both"),
      bal_three_fractions: t("sm1_04.problems.bal_three_fractions"),
      bal_two_steps: t("sm1_04.problems.bal_two_steps"),
      sol_combine_like: t("sm1_04.problems.sol_combine_like"),
      sol_complex_distribute: t("sm1_04.problems.sol_complex_distribute"),
      sol_decimal_coeff: t("sm1_04.problems.sol_decimal_coeff"),
      sol_decimal_complex: t("sm1_04.problems.sol_decimal_complex"),
      sol_distribute_simple: t("sm1_04.problems.sol_distribute_simple"),
      sol_fraction_both: t("sm1_04.problems.sol_fraction_both"),
      sol_fraction_result: t("sm1_04.problems.sol_fraction_result"),
      sol_negative_both: t("sm1_04.problems.sol_negative_both"),
      sol_negative_coeff: t("sm1_04.problems.sol_negative_coeff"),
      sol_negative_simple: t("sm1_04.problems.sol_negative_simple"),
      sol_nested_parens: t("sm1_04.problems.sol_nested_parens"),
      sol_one_step_add: t("sm1_04.problems.sol_one_step_add"),
      sol_one_step_div: t("sm1_04.problems.sol_one_step_div"),
      sol_one_step_mult: t("sm1_04.problems.sol_one_step_mult"),
      sol_one_step_sub: t("sm1_04.problems.sol_one_step_sub"),
      sol_proportion_eq: t("sm1_04.problems.sol_proportion_eq"),
      sol_three_terms: t("sm1_04.problems.sol_three_terms"),
      sol_two_step_1: t("sm1_04.problems.sol_two_step_1"),
      sol_two_step_2: t("sm1_04.problems.sol_two_step_2"),
      sol_x_both_sides: t("sm1_04.problems.sol_x_both_sides"),
      tra_both_expand: t("sm1_04.problems.tra_both_expand"),
      tra_collect_terms: t("sm1_04.problems.tra_collect_terms"),
      tra_complex_collect: t("sm1_04.problems.tra_complex_collect"),
      tra_decimal_expand: t("sm1_04.problems.tra_decimal_expand"),
      tra_double_expand: t("sm1_04.problems.tra_double_expand"),
      tra_expand_first: t("sm1_04.problems.tra_expand_first"),
      tra_fraction_clear: t("sm1_04.problems.tra_fraction_clear"),
      tra_fractions_lcd: t("sm1_04.problems.tra_fractions_lcd"),
      tra_isolate_x: t("sm1_04.problems.tra_isolate_x"),
      tra_mixed_complex: t("sm1_04.problems.tra_mixed_complex"),
      tra_move_both: t("sm1_04.problems.tra_move_both"),
      tra_move_constant: t("sm1_04.problems.tra_move_constant"),
      tra_move_variable: t("sm1_04.problems.tra_move_variable"),
      tra_multi_step: t("sm1_04.problems.tra_multi_step"),
      tra_negative_coeff: t("sm1_04.problems.tra_negative_coeff"),
      tra_negative_move: t("sm1_04.problems.tra_negative_move"),
      tra_nested_complex: t("sm1_04.problems.tra_nested_complex"),
      tra_proportion_cross: t("sm1_04.problems.tra_proportion_cross"),
      tra_three_fractions: t("sm1_04.problems.tra_three_fractions"),
      tra_two_moves: t("sm1_04.problems.tra_two_moves"),
    },
  };
'''
    
    content = content[:end_pos] + translation_obj + content[end_pos:]
    print("✓ 插入翻译对象")

# 步骤 4: 更新 buildPool
old_buildpool = 'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(difficulty, stage), [buildStagePool]);'
new_buildpool = 'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(sm1_04_t, difficulty, stage), [sm1_04_t]);'

if old_buildpool in content:
    content = content.replace(old_buildpool, new_buildpool)
    print("✓ 更新 buildPool 依赖数组")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ SM1-04 修复完成")
