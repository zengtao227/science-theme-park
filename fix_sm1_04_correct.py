#!/usr/bin/env python3
"""正确修复 SM1-04"""

file_path = "src/app/chamber/sm1-04/page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 在 useLanguage 后添加翻译对象（使用 t() 而不是 tObj）
insert_pos = content.find('const { t, currentLanguage } = useLanguage();')
if insert_pos != -1:
    end_pos = content.find('\n', insert_pos) + 1
    
    translation_obj = '''
  // Pre-extract all translations
  const sm1_04_t = {
    scenarios: {
      balance: t("sm1_04.scenarios.balance"),
      solve: t("sm1_04.scenarios.solve"),
      transform: t("sm1_04.scenarios.transform"),
      applications: t("sm1_04.scenarios.applications"),
    },
    problems: {
      bal_add_both: t("sm1_04.problems.bal_add_both"),
      bal_subtract_both: t("sm1_04.problems.bal_subtract_both"),
      bal_multiply_both: t("sm1_04.problems.bal_multiply_both"),
      bal_divide_both: t("sm1_04.problems.bal_divide_both"),
      bal_simple_check: t("sm1_04.problems.bal_simple_check"),
      bal_two_steps: t("sm1_04.problems.bal_two_steps"),
      bal_negative_result: t("sm1_04.problems.bal_negative_result"),
      bal_fraction_coeff: t("sm1_04.problems.bal_fraction_coeff"),
      bal_both_sides_x: t("sm1_04.problems.bal_both_sides_x"),
      bal_distribute: t("sm1_04.problems.bal_distribute"),
      bal_complex_both: t("sm1_04.problems.bal_complex_both"),
      bal_fractions: t("sm1_04.problems.bal_fractions"),
      bal_parentheses_both: t("sm1_04.problems.bal_parentheses_both"),
      bal_decimal_coeff: t("sm1_04.problems.bal_decimal_coeff"),
      bal_negative_coeff: t("sm1_04.problems.bal_negative_coeff"),
      bal_nested_parens: t("sm1_04.problems.bal_nested_parens"),
      bal_three_fractions: t("sm1_04.problems.bal_three_fractions"),
      bal_complex_distribute: t("sm1_04.problems.bal_complex_distribute"),
      bal_reciprocal: t("sm1_04.problems.bal_reciprocal"),
      bal_proportion: t("sm1_04.problems.bal_proportion"),
      sol_one_step_add: t("sm1_04.problems.sol_one_step_add"),
      sol_one_step_sub: t("sm1_04.problems.sol_one_step_sub"),
      sol_one_step_mult: t("sm1_04.problems.sol_one_step_mult"),
      sol_one_step_div: t("sm1_04.problems.sol_one_step_div"),
      sol_negative_simple: t("sm1_04.problems.sol_negative_simple"),
      sol_two_steps: t("sm1_04.problems.sol_two_steps"),
      sol_combine_like: t("sm1_04.problems.sol_combine_like"),
      sol_distribute_simple: t("sm1_04.problems.sol_distribute_simple"),
      sol_both_sides: t("sm1_04.problems.sol_both_sides"),
      sol_fraction_simple: t("sm1_04.problems.sol_fraction_simple"),
      sol_decimal_simple: t("sm1_04.problems.sol_decimal_simple"),
      sol_negative_coeff: t("sm1_04.problems.sol_negative_coeff"),
      sol_parentheses: t("sm1_04.problems.sol_parentheses"),
      sol_fraction_both: t("sm1_04.problems.sol_fraction_both"),
      sol_complex_combine: t("sm1_04.problems.sol_complex_combine"),
      sol_nested_distribute: t("sm1_04.problems.sol_nested_distribute"),
      sol_three_terms: t("sm1_04.problems.sol_three_terms"),
      sol_fraction_complex: t("sm1_04.problems.sol_fraction_complex"),
      sol_proportion: t("sm1_04.problems.sol_proportion"),
      sol_reciprocal: t("sm1_04.problems.sol_reciprocal"),
      tra_isolate_x: t("sm1_04.problems.tra_isolate_x"),
      tra_expand_simple: t("sm1_04.problems.tra_expand_simple"),
      tra_factor_simple: t("sm1_04.problems.tra_factor_simple"),
      tra_combine_terms: t("sm1_04.problems.tra_combine_terms"),
      tra_distribute: t("sm1_04.problems.tra_distribute"),
      tra_expand_binomial: t("sm1_04.problems.tra_expand_binomial"),
      tra_factor_gcf: t("sm1_04.problems.tra_factor_gcf"),
      tra_simplify_fraction: t("sm1_04.problems.tra_simplify_fraction"),
      tra_expand_nested: t("sm1_04.problems.tra_expand_nested"),
      tra_factor_difference: t("sm1_04.problems.tra_factor_difference"),
      tra_complex_combine: t("sm1_04.problems.tra_complex_combine"),
      tra_expand_trinomial: t("sm1_04.problems.tra_expand_trinomial"),
      tra_factor_trinomial: t("sm1_04.problems.tra_factor_trinomial"),
      tra_simplify_complex: t("sm1_04.problems.tra_simplify_complex"),
      tra_expand_cube: t("sm1_04.problems.tra_expand_cube"),
      tra_factor_grouping: t("sm1_04.problems.tra_factor_grouping"),
      tra_rationalize: t("sm1_04.problems.tra_rationalize"),
      tra_complete_square: t("sm1_04.problems.tra_complete_square"),
      tra_partial_fractions: t("sm1_04.problems.tra_partial_fractions"),
      tra_nested_complex: t("sm1_04.problems.tra_nested_complex"),
      app_age_problem: t("sm1_04.problems.app_age_problem"),
      app_distance_problem: t("sm1_04.problems.app_distance_problem"),
      app_mixture_problem: t("sm1_04.problems.app_mixture_problem"),
      app_work_problem: t("sm1_04.problems.app_work_problem"),
      app_number_problem: t("sm1_04.problems.app_number_problem"),
      app_geometry_perimeter: t("sm1_04.problems.app_geometry_perimeter"),
      app_money_problem: t("sm1_04.problems.app_money_problem"),
      app_consecutive_numbers: t("sm1_04.problems.app_consecutive_numbers"),
      app_rate_problem: t("sm1_04.problems.app_rate_problem"),
      app_percent_problem: t("sm1_04.problems.app_percent_problem"),
      app_investment_problem: t("sm1_04.problems.app_investment_problem"),
      app_mixture_percent: t("sm1_04.problems.app_mixture_percent"),
      app_work_together: t("sm1_04.problems.app_work_together"),
      app_distance_rate: t("sm1_04.problems.app_distance_rate"),
      app_geometry_area: t("sm1_04.problems.app_geometry_area"),
      app_age_complex: t("sm1_04.problems.app_age_complex"),
      app_number_consecutive: t("sm1_04.problems.app_number_consecutive"),
      app_mixture_alloy: t("sm1_04.problems.app_mixture_alloy"),
      app_investment_compound: t("sm1_04.problems.app_investment_compound"),
      app_work_pipes: t("sm1_04.problems.app_work_pipes"),
      tra_negative_coeff: t("sm1_04.problems.tra_negative_coeff"),
      tra_negative_move: t("sm1_04.problems.tra_negative_move"),
      tra_proportion_cross: t("sm1_04.problems.tra_proportion_cross"),
      tra_three_fractions: t("sm1_04.problems.tra_three_fractions"),
      tra_two_moves: t("sm1_04.problems.tra_two_moves"),
    },
  };
'''
    
    content = content[:end_pos] + translation_obj + content[end_pos:]

# 2. 修改 buildStagePool 函数签名
content = content.replace(
    'const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): EquationQuest[] => {',
    'const buildStagePool = useCallback((tObj: typeof sm1_04_t, difficulty: Difficulty, stage: Stage): EquationQuest[] => {'
)

# 3. 替换所有 t() 调用为 tObj.
replacements = [
    ('t("sm1_04.scenarios.balance")', 'tObj.scenarios.balance'),
    ('t("sm1_04.scenarios.solve")', 'tObj.scenarios.solve'),
    ('t("sm1_04.scenarios.transform")', 'tObj.scenarios.transform'),
    ('t("sm1_04.scenarios.applications")', 'tObj.scenarios.applications'),
]

# 添加所有 problems 的替换
problems = [
    "bal_add_both", "bal_subtract_both", "bal_multiply_both", "bal_divide_both", "bal_simple_check",
    "bal_two_steps", "bal_negative_result", "bal_fraction_coeff", "bal_both_sides_x", "bal_distribute",
    "bal_complex_both", "bal_fractions", "bal_parentheses_both", "bal_decimal_coeff", "bal_negative_coeff",
    "bal_nested_parens", "bal_three_fractions", "bal_complex_distribute", "bal_reciprocal", "bal_proportion",
    "sol_one_step_add", "sol_one_step_sub", "sol_one_step_mult", "sol_one_step_div", "sol_negative_simple",
    "sol_two_steps", "sol_combine_like", "sol_distribute_simple", "sol_both_sides", "sol_fraction_simple",
    "sol_decimal_simple", "sol_negative_coeff", "sol_parentheses", "sol_fraction_both", "sol_complex_combine",
    "sol_nested_distribute", "sol_three_terms", "sol_fraction_complex", "sol_proportion", "sol_reciprocal",
    "tra_isolate_x", "tra_expand_simple", "tra_factor_simple", "tra_combine_terms", "tra_distribute",
    "tra_expand_binomial", "tra_factor_gcf", "tra_simplify_fraction", "tra_expand_nested", "tra_factor_difference",
    "tra_complex_combine", "tra_expand_trinomial", "tra_factor_trinomial", "tra_simplify_complex", "tra_expand_cube",
    "tra_factor_grouping", "tra_rationalize", "tra_complete_square", "tra_partial_fractions", "tra_nested_complex",
    "app_age_problem", "app_distance_problem", "app_mixture_problem", "app_work_problem", "app_number_problem",
    "app_geometry_perimeter", "app_money_problem", "app_consecutive_numbers", "app_rate_problem", "app_percent_problem",
    "app_investment_problem", "app_mixture_percent", "app_work_together", "app_distance_rate", "app_geometry_area",
    "app_age_complex", "app_number_consecutive", "app_mixture_alloy", "app_investment_compound", "app_work_pipes",
    "tra_negative_coeff", "tra_negative_move", "tra_proportion_cross", "tra_three_fractions", "tra_two_moves",
]

for problem in problems:
    replacements.append((f't("sm1_04.problems.{problem}")', f'tObj.problems.{problem}'))

for old, new in replacements:
    content = content.replace(old, new)

# 4. 更新 buildPool
content = content.replace(
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(difficulty, stage), [buildStagePool]);',
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(sm1_04_t, difficulty, stage), [sm1_04_t]);'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ SM1-04 修复完成")
