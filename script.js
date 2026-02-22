const fs = require('fs');
let content = fs.readFileSync('src/app/chamber/sm2-02/page.tsx', 'utf-8');

// 1. Add `renderMixedText(text: string)` function before `buildStagePool`.
const renderFn = `
const renderMixedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\\$(?:[^$]+)\\$)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("$") && p.endsWith("$")) {
          return <InlineMath key={i} math={p.slice(1, -1)} />;
        }
        return <span key={i} className="font-sans font-black whitespace-pre-wrap">{p}</span>;
      })}
    </>
  );
};
`;
content = content.replace('// Build quest pool for each stage', renderFn + '\n// Build quest pool for each stage');

// 2. Change `S202Quest` interface
const oldInterface = `interface S202Quest extends Quest {
  stage: Stage;
  tab: "PYTHAGORAS" | "SQRT";
  visual: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
  steps: Array<
    | { id: string; labelLatex: string; input: "number"; answer: number }
    | { id: string; labelLatex: string; input: "radical"; answer: Radical }
    | { id: string; labelLatex: string; input: "boolean"; answer: boolean }
  >;
}`;
const newInterface = `interface S202Slot {
  id: string;
  labelLatex: string;
  placeholder: string;
  expected: string | number;
  input: "number" | "radical" | "boolean";
}

interface S202Quest extends Quest {
  stage: Stage;
  tab: "PYTHAGORAS" | "SQRT";
  visual: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
  slots: S202Slot[];
}`;
content = content.replace(oldInterface, newInterface);

// 3. Replace all \`\\\\text{...}: \\\\; ...\` with plain text that mixes $math$.
// Actually, the simplest is to fix the slots array first.
content = content.replace(/slots: \[\],\n\s*steps: \[(.*?)\],/gs, (match, stepsContent) => {
  let slotsContent = stepsContent.replace(/answer:\s*([^,}]+)/g, (m, ans) => {
    ans = ans.trim();
    if (ans === 'true' || ans === 'false') {
      return \`expected: "\${ans}", placeholder: "?"\`;
    }
    if (ans.startsWith('{')) {
      return \`expected: JSON.stringify(\${ans}), placeholder: "?"\`;
    }
    return \`expected: \${ans}, placeholder: "?"\`;
  });
  return \`slots: [\${slotsContent}],\`;
});

// Fix promptLatex rendering in UI
const oldRender = \`<p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic whitespace-normal break-words">
              {(() => {
                const latex = currentQuest?.promptLatex || "";
                if (latex.startsWith("\\\\\\\\text{") && latex.endsWith("}")) {
                  const clean = latex.replace(/^\\\\\\\\text\\{/, "").replace(/\\}$/, "");
                  return <span className="font-sans font-black not-italic whitespace-pre-wrap">{clean}</span>;
                }
                if (!latex.includes("\\\\\\\\") && !latex.includes("$")) {
                  return <span className="font-sans font-black not-italic whitespace-pre-wrap">{latex}</span>;
                }
                return <InlineMath math={latex || ""} />;
              })()}
            </p>\`;
const newRender = \`<div className="text-xl md:text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic drop-shadow-md pb-4 [&_span]:!leading-relaxed text-center">
              {renderMixedText(currentQuest?.promptLatex || "")}
            </div>\`;
content = content.replace(oldRender, newRender);

// Fix UI steps map
content = content.replace(/currentQuest\\?\\.steps\\.map/g, 'currentQuest?.slots.map');
content = content.replace(/step\\.id/g, 'slot.id');
content = content.replace(/step\\.input/g, 'slot.input');
content = content.replace(/step\\.labelLatex/g, 'slot.labelLatex');
content = content.replace(/key=\\{step\\.id\\}/g, 'key={slot.id}');
content = content.replace(/\\(step\\)/g, '(slot: any)');

// Clean up promptLatex assignments in buildStagePool
// \`\\\\\\\\text{\${...}}: \\\\; ...\`
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.pythagoras\\.solve_hyp\\}\\}: \\\\\\\\; \\\\\\\\text\\{\\$\\{sm2_02_t([^}]+)\\}\\}\\`/g, 
  "promptLatex: `${sm2_02_t.pythagoras.solve_hyp}: ${sm2_02_t$1}`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.pythagoras\\.solve_leg\\}\\}: \\\\\\\\; \\\\\\\\text\\{\\$\\{sm2_02_t([^}]+)\\}\\}\\`/g, 
  "promptLatex: `${sm2_02_t.pythagoras.solve_leg}: ${sm2_02_t$1}`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.pythagoras\\.check_right\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.pythagoras.check_right}: $ $1 $`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.pythagoras\\.distance\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.pythagoras.distance}: $ $1 $`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.pythagoras\\.elite_space\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.pythagoras.elite_space}: $ $1 $`");
  
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.mission\\.protocol\\}\\}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\text\\{\\$\\{sm2_02_t\\.mission\\.([^}]+)\\}\\}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\text\\{\\$\\{sm2_02_t\\.mission\\.([^}]+)\\}\\}\`/g, 
  "promptLatex: `${sm2_02_t.mission.$1}\\n${sm2_02_t.mission.$2}`");

content = content.replace(/promptLatex:\s*isHyp \\? \`\\\\\\\\text\\{a\\}=\\$\\{a\\},\\\\\\\\; \\\\\\\\text\\{b\\}=\\$\\{b\\}\` : \`\\\\\\\\text\\{c\\}=\\$\\{c\\},\\\\\\\\; \\\\\\\\text\\{a\\}=\\$\\{a\\}\`/g, 
  "promptLatex: isHyp ? `a=${a}, b=${b}` : `c=${c}, a=${a}`");

content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.mental\\.chain\\}\\}:\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.mental.chain}: $ $1 $`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.sqrt\\.perfect\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.sqrt.perfect}: $ $1 $`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.sqrt\\.simplify\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.sqrt.simplify}: $ $1 $`");
content = content.replace(/promptLatex:\s*\`\\\\\\\\text\\{\\$\\{sm2_02_t\\.sqrt\\.estimate\\}\\}:\s*\\\\\\\\;\s*([^`]+)\`/g, 
  "promptLatex: `${sm2_02_t.sqrt.estimate}: $ $1 $`");


fs.writeFileSync('src/app/chamber/sm2-02/page.tsx', content);
