"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DerivativeVisualization from "@/components/chamber/gm1-01/DerivativeVisualization";

type Challenge = "COMPOSITE" | "MODELING" | "OPTIMIZATION" | "ANALYSIS";
type G101AdvT = typeof translations.EN.gm1_01_advanced;

interface G101AdvQuest extends Quest {
  challenge: Challenge;
  scenario: string;
  functionLatex: string;
  question: string;
  hint: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Composite function problems - combining multiple rules
function buildCompositeProblems(t: G101AdvT, difficulty: Difficulty): G101AdvQuest[] {
  const basic = [
    {
      id: "C_B1",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=2",
      expressionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x), \\; x=2",
      targetLatex: "f'(2)",
      slots: [{ id: "derivative", labelLatex: "f'(2)", placeholder: "0.00", expected: round2((4*2 + 3) * Math.sin(2) + (2*4 + 6) * Math.cos(2)) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_B2",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1",
      expressionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}, \\; x=1",
      targetLatex: "f'(1)",
      slots: [{ id: "derivative", labelLatex: "f'(1)", placeholder: "0.00", expected: round2((2*1 * Math.sin(1) - (1 + 1) * Math.cos(1)) / (Math.sin(1) * Math.sin(1))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    },
    {
      id: "C_B3",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_3,
      functionLatex: "f(x) = (x^2 - x) \\cdot \\cos(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1",
      expressionLatex: "f(x) = (x^2 - x) \\cdot \\cos(x), \\; x=1",
      targetLatex: "f'(1)",
      slots: [{ id: "derivative", labelLatex: "f'(1)", placeholder: "0.00", expected: round2((2*1 - 1) * Math.cos(1) + (1*1 - 1) * (-Math.sin(1))) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_B4",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (x^2 + 2x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1",
      expressionLatex: "f(x) = (x^2 + 2x) \\cdot \\sin(x), \\; x=1",
      targetLatex: "f'(1)",
      slots: [{ id: "derivative", labelLatex: "f'(1)", placeholder: "0.00", expected: round2((2*1 + 2) * Math.sin(1) + (1 + 2) * Math.cos(1)) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_B5",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^2}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=2",
      expressionLatex: "f(x) = \\frac{x^2}{\\sin(x)}, \\; x=2",
      targetLatex: "f'(2)",
      slots: [{ id: "derivative", labelLatex: "f'(2)", placeholder: "0.00", expected: round2((2*2 * Math.sin(2) - 4 * Math.cos(2)) / (Math.sin(2) * Math.sin(2))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    }
  ];

  const core = [
    {
      id: "C_C1",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_3,
      functionLatex: "f(x) = (x^3 - 2x) \\cdot \\cos(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1",
      expressionLatex: "f(x) = (x^3 - 2x) \\cdot \\cos(x), \\; x=1",
      targetLatex: "f'(1)",
      slots: [{ id: "derivative", labelLatex: "f'(1)", placeholder: "0.00", expected: round2((3*1*1 - 2) * Math.cos(1) + (1*1*1 - 2*1) * (-Math.sin(1))) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_C2",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1.5",
      expressionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x), \\; x=1.5",
      targetLatex: "f'(1.5)",
      slots: [{ id: "derivative", labelLatex: "f'(1.5)", placeholder: "0.00", expected: round2((4*1.5 + 3) * Math.sin(1.5) + (2*1.5*1.5 + 3*1.5) * Math.cos(1.5)) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_C3",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^3}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1.5",
      expressionLatex: "f(x) = \\frac{x^3}{\\sin(x)}, \\; x=1.5",
      targetLatex: "f'(1.5)",
      slots: [{ id: "derivative", labelLatex: "f'(1.5)", placeholder: "0.00", expected: round2((3*1.5*1.5 * Math.sin(1.5) - 1.5*1.5*1.5 * Math.cos(1.5)) / (Math.sin(1.5) * Math.sin(1.5))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    },
    {
      id: "C_C4",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_3,
      functionLatex: "f(x) = (x^2 + x) \\cdot \\cos(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=2",
      expressionLatex: "f(x) = (x^2 + x) \\cdot \\cos(x), \\; x=2",
      targetLatex: "f'(2)",
      slots: [{ id: "derivative", labelLatex: "f'(2)", placeholder: "0.00", expected: round2((2*2 + 1) * Math.cos(2) + (4 + 2) * (-Math.sin(2))) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    }
  ];

  const advanced = [
    {
      id: "C_A1",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=2",
      expressionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}, \\; x=2",
      targetLatex: "f'(2)",
      slots: [{ id: "derivative", labelLatex: "f'(2)", placeholder: "0.00", expected: round2((2*2 * Math.sin(2) - (4 + 1) * Math.cos(2)) / (Math.sin(2) * Math.sin(2))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    },
    {
      id: "C_A2",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_3,
      functionLatex: "f(x) = (x^3 - 2x) \\cdot \\cos(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=0.5",
      expressionLatex: "f(x) = (x^3 - 2x) \\cdot \\cos(x), \\; x=0.5",
      targetLatex: "f'(0.5)",
      slots: [{ id: "derivative", labelLatex: "f'(0.5)", placeholder: "0.00", expected: round2((3*0.5*0.5 - 2) * Math.cos(0.5) + (0.5*0.5*0.5 - 2*0.5) * (-Math.sin(0.5))) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_A3",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (3x^2 - x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1.2",
      expressionLatex: "f(x) = (3x^2 - x) \\cdot \\sin(x), \\; x=1.2",
      targetLatex: "f'(1.2)",
      slots: [{ id: "derivative", labelLatex: "f'(1.2)", placeholder: "0.00", expected: round2((6*1.2 - 1) * Math.sin(1.2) + (3*1.2*1.2 - 1.2) * Math.cos(1.2)) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_A4",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{2x^2 + 1}{\\cos(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=1",
      expressionLatex: "f(x) = \\frac{2x^2 + 1}{\\cos(x)}, \\; x=1",
      targetLatex: "f'(1)",
      slots: [{ id: "derivative", labelLatex: "f'(1)", placeholder: "0.00", expected: round2((4*1 * Math.cos(1) - (2*1 + 1) * (-Math.sin(1))) / (Math.cos(1) * Math.cos(1))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    }
  ];

  const elite = [
    {
      id: "C_E1",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=\\pi/2",
      expressionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x), \\; x=\\pi/2",
      targetLatex: "f'(\\pi/2)",
      slots: [{ id: "derivative", labelLatex: "f'(\\pi/2)", placeholder: "0.00", expected: round2((4*Math.PI/2 + 3) * Math.sin(Math.PI/2) + (2*(Math.PI/2)*(Math.PI/2) + 3*Math.PI/2) * Math.cos(Math.PI/2)) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_E2",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=\\pi/4",
      expressionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}, \\; x=\\pi/4",
      targetLatex: "f'(\\pi/4)",
      slots: [{ id: "derivative", labelLatex: "f'(\\pi/4)", placeholder: "0.00", expected: round2((2*Math.PI/4 * Math.sin(Math.PI/4) - ((Math.PI/4)*(Math.PI/4) + 1) * Math.cos(Math.PI/4)) / (Math.sin(Math.PI/4) * Math.sin(Math.PI/4))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    },
    {
      id: "C_E3",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_3,
      functionLatex: "f(x) = (x^3 + x^2) \\cdot \\cos(x)",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=\\pi/3",
      expressionLatex: "f(x) = (x^3 + x^2) \\cdot \\cos(x), \\; x=\\pi/3",
      targetLatex: "f'(\\pi/3)",
      slots: [{ id: "derivative", labelLatex: "f'(\\pi/3)", placeholder: "0.00", expected: round2((3*(Math.PI/3)*(Math.PI/3) + 2*Math.PI/3) * Math.cos(Math.PI/3) + ((Math.PI/3)*(Math.PI/3)*(Math.PI/3) + (Math.PI/3)*(Math.PI/3)) * (-Math.sin(Math.PI/3))) }],
      correctLatex: "",
      hint: t.hints.use_product_rule
    },
    {
      id: "C_E4",
      difficulty,
      stage: "COMPOSITE",
      challenge: "COMPOSITE" as Challenge,
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^3 - x}{\\sin(x)}",
      question: t.questions.find_derivative,
      promptLatex: "\\text{" + t.questions.find_derivative + " at } x=\\pi/6",
      expressionLatex: "f(x) = \\frac{x^3 - x}{\\sin(x)}, \\; x=\\pi/6",
      targetLatex: "f'(\\pi/6)",
      slots: [{ id: "derivative", labelLatex: "f'(\\pi/6)", placeholder: "0.00", expected: round2(((3*(Math.PI/6)*(Math.PI/6) - 1) * Math.sin(Math.PI/6) - ((Math.PI/6)*(Math.PI/6)*(Math.PI/6) - Math.PI/6) * Math.cos(Math.PI/6)) / (Math.sin(Math.PI/6) * Math.sin(Math.PI/6))) }],
      correctLatex: "",
      hint: t.hints.use_quotient_rule
    }
  ];

  if (difficulty === "BASIC") return basic;
  if (difficulty === "CORE") return core;
  if (difficulty === "ADVANCED") return advanced;
  return elite;
}

// Modeling problems - real-world applications
function buildModelingProblems(t: G101AdvT, difficulty: Difficulty): G101AdvQuest[] {
  const basic = [
    {
      id: "M_B1",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 2t^3 - 3t^2 + 5t",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=3",
      expressionLatex: "s(t) = 2t^3 - 3t^2 + 5t, \\; t=3",
      targetLatex: "v(3)",
      slots: [{ id: "velocity", labelLatex: "v(3)", placeholder: "0.00", expected: round2(6*9 - 6*3 + 5) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_B2",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -5t^2 + 20t + 2",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=2",
      expressionLatex: "h(t) = -5t^2 + 20t + 2, \\; t=2",
      targetLatex: "v(2)",
      slots: [{ id: "velocity", labelLatex: "v(2)", placeholder: "0.00", expected: round2(-10*2 + 20) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_B3",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = t^3 + 2t^2 + t",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=2",
      expressionLatex: "s(t) = t^3 + 2t^2 + t, \\; t=2",
      targetLatex: "v(2)",
      slots: [{ id: "velocity", labelLatex: "v(2)", placeholder: "0.00", expected: round2(3*4 + 4*2 + 1) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_B4",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -4t^2 + 16t + 5",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=1",
      expressionLatex: "h(t) = -4t^2 + 16t + 5, \\; t=1",
      targetLatex: "v(1)",
      slots: [{ id: "velocity", labelLatex: "v(1)", placeholder: "0.00", expected: round2(-8*1 + 16) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_B5",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 3t^2 + 4t",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=2",
      expressionLatex: "s(t) = 3t^2 + 4t, \\; t=2",
      targetLatex: "v(2)",
      slots: [{ id: "velocity", labelLatex: "v(2)", placeholder: "0.00", expected: round2(6*2 + 4) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    }
  ];

  const core = [
    {
      id: "M_C1",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 2t^3 - 3t^2 + 5t",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=2",
      expressionLatex: "s(t) = 2t^3 - 3t^2 + 5t, \\; t=2",
      targetLatex: "v(2)",
      slots: [{ id: "velocity", labelLatex: "v(2)", placeholder: "0.00", expected: round2(6*4 - 6*2 + 5) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_C2",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -5t^2 + 20t + 2",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=1",
      expressionLatex: "h(t) = -5t^2 + 20t + 2, \\; t=1",
      targetLatex: "v(1)",
      slots: [{ id: "velocity", labelLatex: "v(1)", placeholder: "0.00", expected: round2(-10*1 + 20) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_C3",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = t^3 - 4t^2 + 6t",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=1.5",
      expressionLatex: "s(t) = t^3 - 4t^2 + 6t, \\; t=1.5",
      targetLatex: "v(1.5)",
      slots: [{ id: "velocity", labelLatex: "v(1.5)", placeholder: "0.00", expected: round2(3*1.5*1.5 - 8*1.5 + 6) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    },
    {
      id: "M_C4",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -3t^2 + 12t + 8",
      question: t.questions.find_velocity,
      promptLatex: "\\text{" + t.questions.find_velocity + " at } t=1.5",
      expressionLatex: "h(t) = -3t^2 + 12t + 8, \\; t=1.5",
      targetLatex: "v(1.5)",
      slots: [{ id: "velocity", labelLatex: "v(1.5)", placeholder: "0.00", expected: round2(-6*1.5 + 12) }],
      correctLatex: "",
      hint: t.hints.take_first_derivative
    }
  ];

  const advanced = [
    {
      id: "M_A1",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 2t^3 - 3t^2 + 5t",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=3",
      expressionLatex: "s(t) = 2t^3 - 3t^2 + 5t, \\; t=3",
      targetLatex: "a(3)",
      slots: [{ id: "acceleration", labelLatex: "a(3)", placeholder: "0.00", expected: round2(12*3 - 6) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_A2",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -5t^2 + 20t + 2",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=2",
      expressionLatex: "h(t) = -5t^2 + 20t + 2, \\; t=2",
      targetLatex: "a(2)",
      slots: [{ id: "acceleration", labelLatex: "a(2)", placeholder: "0.00", expected: -10 }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_A3",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = t^3 + 3t^2 - 2t",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=2",
      expressionLatex: "s(t) = t^3 + 3t^2 - 2t, \\; t=2",
      targetLatex: "a(2)",
      slots: [{ id: "acceleration", labelLatex: "a(2)", placeholder: "0.00", expected: round2(6*2 + 6) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_A4",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -4t^2 + 16t + 3",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=1.5",
      expressionLatex: "h(t) = -4t^2 + 16t + 3, \\; t=1.5",
      targetLatex: "a(1.5)",
      slots: [{ id: "acceleration", labelLatex: "a(1.5)", placeholder: "0.00", expected: -8 }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  const elite = [
    {
      id: "M_E1",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 2t^3 - 3t^2 + 5t",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=1.5",
      expressionLatex: "s(t) = 2t^3 - 3t^2 + 5t, \\; t=1.5",
      targetLatex: "a(1.5)",
      slots: [{ id: "acceleration", labelLatex: "a(1.5)", placeholder: "0.00", expected: round2(12*1.5 - 6) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_E2",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -5t^2 + 20t + 2",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=0.5",
      expressionLatex: "h(t) = -5t^2 + 20t + 2, \\; t=0.5",
      targetLatex: "a(0.5)",
      slots: [{ id: "acceleration", labelLatex: "a(0.5)", placeholder: "0.00", expected: -10 }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_E3",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_1,
      functionLatex: "s(t) = 3t^3 - 6t^2 + 4t",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=2.5",
      expressionLatex: "s(t) = 3t^3 - 6t^2 + 4t, \\; t=2.5",
      targetLatex: "a(2.5)",
      slots: [{ id: "acceleration", labelLatex: "a(2.5)", placeholder: "0.00", expected: round2(18*2.5 - 12) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "M_E4",
      stage: "MODELING",
      difficulty,
      challenge: "MODELING" as Challenge,
      scenario: t.scenarios.modeling_2,
      functionLatex: "h(t) = -6t^2 + 18t + 10",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } t=2.5",
      expressionLatex: "h(t) = -6t^2 + 18t + 10, \\; t=2.5",
      targetLatex: "a(2.5)",
      slots: [{ id: "acceleration", labelLatex: "a(2.5)", placeholder: "0.00", expected: -12 }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  if (difficulty === "BASIC") return basic;
  if (difficulty === "CORE") return core;
  if (difficulty === "ADVANCED") return advanced;
  return elite;
}

// Optimization problems
function buildOptimizationProblems(t: G101AdvT, difficulty: Difficulty): G101AdvQuest[] {
  const basic = [
    {
      id: "O_B1",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(10 - x)",
      question: t.questions.find_critical_point,
      promptLatex: "\\text{" + t.questions.find_critical_point + "}",
      expressionLatex: "A(x) = x(10 - x) = 10x - x^2",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 5 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_B2",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -2x^2 + 12x - 10",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + "}",
      expressionLatex: "P(x) = -2x^2 + 12x - 10",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 3 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_B3",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(8 - x)",
      question: t.questions.find_critical_point,
      promptLatex: "\\text{" + t.questions.find_critical_point + "}",
      expressionLatex: "A(x) = x(8 - x) = 8x - x^2",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 4 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_B4",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -x^2 + 10x - 15",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + "}",
      expressionLatex: "P(x) = -x^2 + 10x - 15",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 5 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    }
  ];

  const core = [
    {
      id: "O_C1",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(10 - x)",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (area)}",
      expressionLatex: "A(x) = x(10 - x) = 10x - x^2",
      targetLatex: "A_{max}",
      slots: [{ id: "area_max", labelLatex: "A_{max}", placeholder: "0.00", expected: 25 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_C2",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -2x^2 + 12x - 10",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (profit)}",
      expressionLatex: "P(x) = -2x^2 + 12x - 10",
      targetLatex: "P_{max}",
      slots: [{ id: "profit_max", labelLatex: "P_{max}", placeholder: "0.00", expected: 8 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_C3",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(12 - x)",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (area)}",
      expressionLatex: "A(x) = x(12 - x) = 12x - x^2",
      targetLatex: "A_{max}",
      slots: [{ id: "area_max", labelLatex: "A_{max}", placeholder: "0.00", expected: 36 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_C4",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -x^2 + 8x - 12",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (profit)}",
      expressionLatex: "P(x) = -x^2 + 8x - 12",
      targetLatex: "P_{max}",
      slots: [{ id: "profit_max", labelLatex: "P_{max}", placeholder: "0.00", expected: 4 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    }
  ];

  const advanced = [
    {
      id: "O_A1",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(12 - 2x)",
      question: t.questions.find_critical_point,
      promptLatex: "\\text{" + t.questions.find_critical_point + "}",
      expressionLatex: "A(x) = x(12 - 2x) = 12x - 2x^2",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 3 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_A2",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -3x^2 + 18x - 15",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + "}",
      expressionLatex: "P(x) = -3x^2 + 18x - 15",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 3 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_A3",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(15 - 2x)",
      question: t.questions.find_critical_point,
      promptLatex: "\\text{" + t.questions.find_critical_point + "}",
      expressionLatex: "A(x) = x(15 - 2x) = 15x - 2x^2",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 3.75 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_A4",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -2x^2 + 16x - 20",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + "}",
      expressionLatex: "P(x) = -2x^2 + 16x - 20",
      targetLatex: "x",
      slots: [{ id: "x_value", labelLatex: "x", placeholder: "0.00", expected: 4 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    }
  ];

  const elite = [
    {
      id: "O_E1",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(15 - 3x)",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (area)}",
      expressionLatex: "A(x) = x(15 - 3x) = 15x - 3x^2",
      targetLatex: "A_{max}",
      slots: [{ id: "area_max", labelLatex: "A_{max}", placeholder: "0.00", expected: 18.75 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_E2",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -x^2 + 8x - 12",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (profit)}",
      expressionLatex: "P(x) = -x^2 + 8x - 12",
      targetLatex: "P_{max}",
      slots: [{ id: "profit_max", labelLatex: "P_{max}", placeholder: "0.00", expected: 4 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_E3",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_1,
      functionLatex: "A(x) = x(20 - 4x)",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (area)}",
      expressionLatex: "A(x) = x(20 - 4x) = 20x - 4x^2",
      targetLatex: "A_{max}",
      slots: [{ id: "area_max", labelLatex: "A_{max}", placeholder: "0.00", expected: 25 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "O_E4",
      stage: "OPTIMIZATION",
      difficulty,
      challenge: "OPTIMIZATION" as Challenge,
      scenario: t.scenarios.optimization_2,
      functionLatex: "P(x) = -2x^2 + 20x - 30",
      question: t.questions.find_maximum,
      promptLatex: "\\text{" + t.questions.find_maximum + " (profit)}",
      expressionLatex: "P(x) = -2x^2 + 20x - 30",
      targetLatex: "P_{max}",
      slots: [{ id: "profit_max", labelLatex: "P_{max}", placeholder: "0.00", expected: 20 }],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    }
  ];

  if (difficulty === "BASIC") return basic;
  if (difficulty === "CORE") return core;
  if (difficulty === "ADVANCED") return advanced;
  return elite;
}

// Analysis problems - increasing/decreasing, concavity
function buildAnalysisProblems(t: G101AdvT, difficulty: Difficulty): G101AdvQuest[] {
  const basic = [
    {
      id: "A_B1",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 3x^2 + 2",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 3x^2 + 2",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 0 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 2 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_B2",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = 2x^3 - 6x + 1",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=1",
      expressionLatex: "f(x) = 2x^3 - 6x + 1, \\; x=1",
      targetLatex: "f''(1)",
      slots: [{ id: "second_derivative", labelLatex: "f''(1)", placeholder: "0.00", expected: round2(12*1) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "A_B3",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 6x + 5",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 6x + 5",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: -1.41 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 1.41 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_B4",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = x^3 - 3x + 2",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=2",
      expressionLatex: "f(x) = x^3 - 3x + 2, \\; x=2",
      targetLatex: "f''(2)",
      slots: [{ id: "second_derivative", labelLatex: "f''(2)", placeholder: "0.00", expected: round2(6*2) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  const core = [
    {
      id: "A_C1",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 6x^2 + 9x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 6x^2 + 9x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 1 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 3 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_C2",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = 2x^3 - 6x + 1",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=2",
      expressionLatex: "f(x) = 2x^3 - 6x + 1, \\; x=2",
      targetLatex: "f''(2)",
      slots: [{ id: "second_derivative", labelLatex: "f''(2)", placeholder: "0.00", expected: round2(12*2) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "A_C3",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 9x^2 + 15x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 9x^2 + 15x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 1 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 5 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_C4",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = x^3 - 6x + 3",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=1.5",
      expressionLatex: "f(x) = x^3 - 6x + 3, \\; x=1.5",
      targetLatex: "f''(1.5)",
      slots: [{ id: "second_derivative", labelLatex: "f''(1.5)", placeholder: "0.00", expected: round2(6*1.5) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  const advanced = [
    {
      id: "A_A1",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 9x^2 + 24x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 9x^2 + 24x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 2 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 4 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_A2",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = x^3 - 3x^2 + 2x",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=1.5",
      expressionLatex: "f(x) = x^3 - 3x^2 + 2x, \\; x=1.5",
      targetLatex: "f''(1.5)",
      slots: [{ id: "second_derivative", labelLatex: "f''(1.5)", placeholder: "0.00", expected: round2(6*1.5 - 6) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "A_A3",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 12x^2 + 36x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 12x^2 + 36x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 2 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 6 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_A4",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = 2x^3 - 9x^2 + 12x",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=2",
      expressionLatex: "f(x) = 2x^3 - 9x^2 + 12x, \\; x=2",
      targetLatex: "f''(2)",
      slots: [{ id: "second_derivative", labelLatex: "f''(2)", placeholder: "0.00", expected: round2(12*2 - 18) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  const elite = [
    {
      id: "A_E1",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = 2x^3 - 9x^2 + 12x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = 2x^3 - 9x^2 + 12x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 1 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 2 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_E2",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = x^3 - 3x^2 + 2x",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=0.5",
      expressionLatex: "f(x) = x^3 - 3x^2 + 2x, \\; x=0.5",
      targetLatex: "f''(0.5)",
      slots: [{ id: "second_derivative", labelLatex: "f''(0.5)", placeholder: "0.00", expected: round2(6*0.5 - 6) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    },
    {
      id: "A_E3",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_1,
      functionLatex: "f(x) = x^3 - 6x^2 + 12x",
      question: t.questions.find_critical_points,
      promptLatex: "\\text{" + t.questions.find_critical_points + "}",
      expressionLatex: "f(x) = x^3 - 6x^2 + 12x",
      targetLatex: "x_1, x_2",
      slots: [
        { id: "x1", labelLatex: "x_1", placeholder: "0.00", expected: 2 },
        { id: "x2", labelLatex: "x_2", placeholder: "0.00", expected: 2 }
      ],
      correctLatex: "",
      hint: t.hints.set_derivative_zero
    },
    {
      id: "A_E4",
      stage: "ANALYSIS",
      difficulty,
      challenge: "ANALYSIS" as Challenge,
      scenario: t.scenarios.analysis_2,
      functionLatex: "f(x) = 3x^3 - 9x^2 + 6x",
      question: t.questions.find_acceleration,
      promptLatex: "\\text{" + t.questions.find_acceleration + " at } x=1.5",
      expressionLatex: "f(x) = 3x^3 - 9x^2 + 6x, \\; x=1.5",
      targetLatex: "f''(1.5)",
      slots: [{ id: "second_derivative", labelLatex: "f''(1.5)", placeholder: "0.00", expected: round2(18*1.5 - 18) }],
      correctLatex: "",
      hint: t.hints.take_second_derivative
    }
  ];

  if (difficulty === "BASIC") return basic;
  if (difficulty === "CORE") return core;
  if (difficulty === "ADVANCED") return advanced;
  return elite;
}

function buildChallengePool(t: G101AdvT, difficulty: Difficulty, challenge: Challenge): G101AdvQuest[] {
  switch (challenge) {
    case "COMPOSITE": return buildCompositeProblems(t, difficulty);
    case "MODELING": return buildModelingProblems(t, difficulty);
    case "OPTIMIZATION": return buildOptimizationProblems(t, difficulty);
    case "ANALYSIS": return buildAnalysisProblems(t, difficulty);
    default: return buildCompositeProblems(t, difficulty);
  }
}

export default function G101AdvancedPage() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].gm1_01_advanced;

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<G101AdvQuest, Challenge>({
    buildPool: (d, s) => buildChallengePool(t, d, s),
    initialStage: "COMPOSITE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-01-advanced", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="GM1.01-ADV"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "COMPOSITE", label: t.challenges.composite },
        { id: "MODELING", label: t.challenges.modeling },
        { id: "OPTIMIZATION", label: t.challenges.optimization },
        { id: "ANALYSIS", label: t.challenges.analysis },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Challenge)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <DerivativeVisualization
            functionLatex={currentQuest?.functionLatex || "f(x) = x^2"}
            xPosition={2}
            translations={{
              title: t.visualization.title,
              xLabel: t.visualization.x_label,
              yLabel: t.visualization.y_label,
              functionLabel: t.visualization.function_label,
              pointLabel: t.visualization.point_label,
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.visualization_title}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.hint_label}
            </div>
            <div className="text-white/70 text-sm font-mono">
              {currentQuest?.hint}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>

        {/* Scenario */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-cyan-400/90 leading-relaxed whitespace-pre-line">
            {currentQuest?.scenario}
          </div>
        </div>

        {/* Function Display */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.function_label}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.functionLatex || ""} />
          </p>
        </div>

        {/* Question */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.question_label}
          </h3>
          <p className="text-xl text-white/90 font-mono">{currentQuest?.question}</p>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {t.input_tip_2dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
