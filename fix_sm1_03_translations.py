#!/usr/bin/env python3
"""批量替换 SM1-03 中的 t() 调用为 tObj."""

import re

file_path = "src/app/chamber/sm1-03/page.tsx"

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换所有 scenario 和 context 中的 t() 调用
replacements = [
    # Scenarios
    ('t("sm1_03.scenarios.number_line")', 'tObj.scenarios.number_line'),
    ('t("sm1_03.scenarios.rationals")', 'tObj.scenarios.rationals'),
    ('t("sm1_03.scenarios.quadrants")', 'tObj.scenarios.quadrants'),
    
    # NUMBER_LINE problems
    ('t("sm1_03.problems.nl_identify_neg3")', 'tObj.problems.nl_identify_neg3'),
    ('t("sm1_03.problems.nl_identify_5")', 'tObj.problems.nl_identify_5'),
    ('t("sm1_03.problems.nl_temp_neg2")', 'tObj.problems.nl_temp_neg2'),
    ('t("sm1_03.problems.nl_depth_neg4")', 'tObj.problems.nl_depth_neg4'),
    ('t("sm1_03.problems.nl_identify_0")', 'tObj.problems.nl_identify_0'),
    ('t("sm1_03.problems.nl_compare_neg5_neg2")', 'tObj.problems.nl_compare_neg5_neg2'),
    ('t("sm1_03.problems.nl_compare_neg3_1")', 'tObj.problems.nl_compare_neg3_1'),
    ('t("sm1_03.problems.nl_order_three")', 'tObj.problems.nl_order_three'),
    ('t("sm1_03.problems.nl_rhine_level")', 'tObj.problems.nl_rhine_level'),
    ('t("sm1_03.problems.nl_temp_drop")', 'tObj.problems.nl_temp_drop'),
    ('t("sm1_03.problems.nl_distance_abs")', 'tObj.problems.nl_distance_abs'),
    ('t("sm1_03.problems.nl_abs_value")', 'tObj.problems.nl_abs_value'),
    ('t("sm1_03.problems.nl_distance_neg_neg")', 'tObj.problems.nl_distance_neg_neg'),
    ('t("sm1_03.problems.nl_midpoint")', 'tObj.problems.nl_midpoint'),
    ('t("sm1_03.problems.nl_temp_range")', 'tObj.problems.nl_temp_range'),
    ('t("sm1_03.problems.nl_operation_add")', 'tObj.problems.nl_operation_add'),
    ('t("sm1_03.problems.nl_operation_sub")', 'tObj.problems.nl_operation_sub'),
    ('t("sm1_03.problems.nl_operation_mult")', 'tObj.problems.nl_operation_mult'),
    ('t("sm1_03.problems.nl_multi_step")', 'tObj.problems.nl_multi_step'),
    ('t("sm1_03.problems.nl_complex_op")', 'tObj.problems.nl_complex_op'),
    
    # RATIONALS problems
    ('t("sm1_03.problems.r_place_half")', 'tObj.problems.r_place_half'),
    ('t("sm1_03.problems.r_place_neg_half")', 'tObj.problems.r_place_neg_half'),
    ('t("sm1_03.problems.r_place_1_5")', 'tObj.problems.r_place_1_5'),
    ('t("sm1_03.problems.r_place_neg2_5")', 'tObj.problems.r_place_neg2_5'),
    ('t("sm1_03.problems.r_fraction_third")', 'tObj.problems.r_fraction_third'),
    ('t("sm1_03.problems.r_compare_fractions")', 'tObj.problems.r_compare_fractions'),
    ('t("sm1_03.problems.r_compare_decimals")', 'tObj.problems.r_compare_decimals'),
    ('t("sm1_03.problems.r_order_mixed")', 'tObj.problems.r_order_mixed'),
    ('t("sm1_03.problems.r_add_decimals")', 'tObj.problems.r_add_decimals'),
    ('t("sm1_03.problems.r_sub_decimals")', 'tObj.problems.r_sub_decimals'),
    ('t("sm1_03.problems.r_compare_neg_decimals")', 'tObj.problems.r_compare_neg_decimals'),
    ('t("sm1_03.problems.r_fraction_to_decimal")', 'tObj.problems.r_fraction_to_decimal'),
    ('t("sm1_03.problems.r_mult_decimals")', 'tObj.problems.r_mult_decimals'),
    ('t("sm1_03.problems.r_div_decimals")', 'tObj.problems.r_div_decimals'),
    ('t("sm1_03.problems.r_mixed_operations")', 'tObj.problems.r_mixed_operations'),
    ('t("sm1_03.problems.r_order_complex")', 'tObj.problems.r_order_complex'),
    ('t("sm1_03.problems.r_fraction_operations")', 'tObj.problems.r_fraction_operations'),
    ('t("sm1_03.problems.r_neg_fraction_ops")', 'tObj.problems.r_neg_fraction_ops'),
    ('t("sm1_03.problems.r_complex_decimal")', 'tObj.problems.r_complex_decimal'),
    ('t("sm1_03.problems.r_repeating_decimal")', 'tObj.problems.r_repeating_decimal'),
    
    # QUADRANTS problems
    ('t("sm1_03.problems.q_identify_point")', 'tObj.problems.q_identify_point'),
    ('t("sm1_03.problems.q_identify_y")', 'tObj.problems.q_identify_y'),
    ('t("sm1_03.problems.q_plot_positive")', 'tObj.problems.q_plot_positive'),
    ('t("sm1_03.problems.q_origin")', 'tObj.problems.q_origin'),
    ('t("sm1_03.problems.q_axis_point")', 'tObj.problems.q_axis_point'),
    ('t("sm1_03.problems.q_quadrant_2")', 'tObj.problems.q_quadrant_2'),
    ('t("sm1_03.problems.q_quadrant_3")', 'tObj.problems.q_quadrant_3'),
    ('t("sm1_03.problems.q_quadrant_4")', 'tObj.problems.q_quadrant_4'),
    ('t("sm1_03.problems.q_basel_landmarks")', 'tObj.problems.q_basel_landmarks'),
    ('t("sm1_03.problems.q_distance_horizontal")', 'tObj.problems.q_distance_horizontal'),
    ('t("sm1_03.problems.q_reflect_x_axis")', 'tObj.problems.q_reflect_x_axis'),
    ('t("sm1_03.problems.q_reflect_y_axis")', 'tObj.problems.q_reflect_y_axis'),
    ('t("sm1_03.problems.q_reflect_origin")', 'tObj.problems.q_reflect_origin'),
    ('t("sm1_03.problems.q_translate")', 'tObj.problems.q_translate'),
    ('t("sm1_03.problems.q_midpoint_2d")', 'tObj.problems.q_midpoint_2d'),
    ('t("sm1_03.problems.q_distance_vertical")', 'tObj.problems.q_distance_vertical'),
    ('t("sm1_03.problems.q_perimeter_rectangle")', 'tObj.problems.q_perimeter_rectangle'),
    ('t("sm1_03.problems.q_area_rectangle")', 'tObj.problems.q_area_rectangle'),
    ('t("sm1_03.problems.q_diagonal_distance")', 'tObj.problems.q_diagonal_distance'),
    ('t("sm1_03.problems.q_complex_translation")', 'tObj.problems.q_complex_translation'),
]

for old, new in replacements:
    content = content.replace(old, new)

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ SM1-03: 已替换 {len(replacements)} 个翻译调用")
