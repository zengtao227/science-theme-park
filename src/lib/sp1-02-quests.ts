/**
 * SP1.02 Newton's Laws Module - Quest Data
 * Total: 75 quests (20 BASIC, 25 CORE, 20 ADVANCED, 10 ELITE)
 * Distributed across 3 stages (~25 per stage)
 */

import { SP102Quest, Difficulty, Stage } from "./sp1-02-types";

export function buildQuestPool(difficulty: Difficulty, stage: Stage): SP102Quest[] {
  // STAGE 1: FIRST_LAW (Inertia) - ~25 quests
  if (stage === "FIRST_LAW") {
    const firstLawData = {
      BASIC: [
        { prompt: "Object at rest, no force applied. Will it move?", answer: "no" },
        { prompt: "Object moving at 5 m/s, no net force. What happens?", answer: "constant velocity" },
        { prompt: "Car at rest. Driver applies no force. Does it move?", answer: "no" },
        { prompt: "Ball rolling at 3 m/s on frictionless surface. Net force?", answer: "0" },
        { prompt: "Book on table. Is it in equilibrium?", answer: "yes" },
        { prompt: "Puck sliding on ice at constant speed. Net force?", answer: "0" },
        { prompt: "Object at rest stays at rest unless acted upon by?", answer: "net external force" },
      ],
      CORE: [
        { prompt: "Basel tram at 15 m/s. Brakes apply -3000 N. Mass 10000 kg. Final velocity after 5s?", answer: "13.5" },
        { prompt: "Fasnacht float at rest. Push with 500 N. Friction 500 N. Does it move?", answer: "no" },
        { prompt: "Rhine boat moving at 2 m/s. Engine off. Friction 100 N. Mass 500 kg. Time to stop?", answer: "10" },
        { prompt: "Object moving at 10 m/s. Net force 0 N. Velocity after 10s?", answer: "10" },
        { prompt: "Car at 20 m/s. Friction 2000 N. Mass 1000 kg. Deceleration?", answer: "2" },
        { prompt: "Tram at constant 12 m/s. Applied force equals friction. Net force?", answer: "0" },
        { prompt: "Puck on ice at 5 m/s. No friction. Velocity after 20s?", answer: "5" },
        { prompt: "Basel bus at rest. Engine force 3000 N. Friction 3000 N. Acceleration?", answer: "0" },
      ],
      ADVANCED: [
        { prompt: "Basel SBB train 50000 kg at 25 m/s. Brakes apply -10000 N. Distance to stop?", answer: "156.25" },
        { prompt: "Fasnacht parade float 2000 kg. Push 1000 N, friction 800 N. Acceleration?", answer: "0.1" },
        { prompt: "Rhine boat 1000 kg at 5 m/s. Water resistance 200 N. Time to reach 3 m/s?", answer: "10" },
        { prompt: "Tram 15000 kg at 20 m/s. Emergency brake -12000 N. Stopping distance?", answer: "250" },
        { prompt: "Object 500 kg moving at 8 m/s. Friction 100 N. Distance traveled before stopping?", answer: "160" },
        { prompt: "Car 1200 kg at 30 m/s. Brake force -4000 N. Time to stop?", answer: "9" },
      ],
      ELITE: [
        { prompt: "Basel tram system: 3 trams, masses 10000, 12000, 15000 kg, all at 15 m/s. Total momentum?", answer: "555000" },
        { prompt: "Fasnacht float 3000 kg at rest. Multiple pushes: 500 N, 300 N, -200 N. Net force?", answer: "600" },
        { prompt: "Rhine boat 2000 kg at 4 m/s. Engine thrust 1000 N, water resistance 800 N. Final velocity after 10s?", answer: "5" },
      ],
    };

    return firstLawData[difficulty].map((item, idx) => ({
      id: `FIRST_LAW_${difficulty}_${idx + 1}`,
      difficulty,
      stage,
      promptLatex: item.prompt,
      expressionLatex: "\\text{Newton's First Law: } \\vec{F}_{net} = 0 \\Rightarrow \\vec{v} = \\text{constant}",
      targetLatex: "answer",
      slots: [
        {
          id: "answer",
          labelLatex: "Answer",
          placeholder: "type answer",
          expected: item.answer,
        },
      ],
      correctLatex: `\\text{Answer: } ${item.answer}`,
      answer: item.answer,
      relatedLaw: "FIRST",
    }));
  }

  // STAGE 2: SECOND_LAW (F=ma) - ~25 quests
  if (stage === "SECOND_LAW") {
    const secondLawData = {
      BASIC: [
        { prompt: "F=10 N, m=2 kg. Find a (m/s²)", answer: "5" },
        { prompt: "F=20 N, m=5 kg. Find a (m/s²)", answer: "4" },
        { prompt: "F=15 N, m=3 kg. Find a (m/s²)", answer: "5" },
        { prompt: "m=10 kg, a=2 m/s². Find F (N)", answer: "20" },
        { prompt: "m=5 kg, a=4 m/s². Find F (N)", answer: "20" },
        { prompt: "F=30 N, a=6 m/s². Find m (kg)", answer: "5" },
        { prompt: "F=40 N, a=8 m/s². Find m (kg)", answer: "5" },
      ],
      CORE: [
        { prompt: "Basel tram 10000 kg accelerates at 1.5 m/s². Find F (N)", answer: "15000" },
        { prompt: "Fasnacht float 2000 kg pushed with 1000 N. Find a (m/s²)", answer: "0.5" },
        { prompt: "Rhine boat 1500 kg, engine thrust 3000 N. Find a (m/s²)", answer: "2" },
        { prompt: "SBB train 50000 kg, brake force -10000 N. Find a (m/s²)", answer: "-0.2" },
        { prompt: "Tram 12000 kg needs 2 m/s² acceleration. Find F (N)", answer: "24000" },
        { prompt: "Car 1000 kg, net force 2000 N. Find a (m/s²)", answer: "2" },
        { prompt: "Basel bus 8000 kg accelerates at 1 m/s². Find F (N)", answer: "8000" },
        { prompt: "Bicycle 80 kg, force 160 N. Find a (m/s²)", answer: "2" },
        { prompt: "Truck 5000 kg, acceleration 0.5 m/s². Find F (N)", answer: "2500" },
      ],
      ADVANCED: [
        { prompt: "Basel tram 10000 kg, applied force 18000 N, friction 3000 N. Find a (m/s²)", answer: "1.5" },
        { prompt: "Fasnacht float 3000 kg, push 2000 N, friction 500 N. Find a (m/s²)", answer: "0.5" },
        { prompt: "Rhine boat 2000 kg, thrust 4000 N, water resistance 1000 N. Find a (m/s²)", answer: "1.5" },
        { prompt: "SBB train 60000 kg, brake -15000 N, friction -3000 N. Find a (m/s²)", answer: "-0.3" },
        { prompt: "Tram 15000 kg needs 1.8 m/s² with friction 2000 N. Find applied force (N)", answer: "29000" },
        { prompt: "Car 1200 kg, engine 5000 N, air resistance 800 N. Find a (m/s²)", answer: "3.5" },
        { prompt: "Basel bus 8000 kg, engine 10000 N, friction 2000 N. Find a (m/s²)", answer: "1" },
      ],
      ELITE: [
        { prompt: "Basel tram system: 3 trams (10000, 12000, 15000 kg) all accelerate at 1.5 m/s². Total force?", answer: "55500" },
        { prompt: "Fasnacht parade: 5 floats, each 2000 kg, each pushed with 1000 N. Total acceleration?", answer: "0.5" },
        { prompt: "Rhine boat 2500 kg, thrust 5000 N, water resistance 20% of thrust. Find a (m/s²)", answer: "1.6" },
      ],
    };

    return secondLawData[difficulty].map((item, idx) => ({
      id: `SECOND_LAW_${difficulty}_${idx + 1}`,
      difficulty,
      stage,
      promptLatex: item.prompt,
      expressionLatex: "F = ma",
      targetLatex: "answer",
      slots: [
        {
          id: "answer",
          labelLatex: "Answer",
          placeholder: "type value",
          expected: item.answer,
        },
      ],
      correctLatex: `\\text{Answer: } ${item.answer}`,
      answer: item.answer,
      relatedLaw: "SECOND",
    }));
  }

  // STAGE 3: THIRD_LAW (Action-Reaction) - ~25 quests
  if (stage === "THIRD_LAW") {
    const thirdLawData = {
      BASIC: [
        { prompt: "You push wall with 50 N. Wall pushes back with how many N?", answer: "50" },
        { prompt: "Rocket exerts 1000 N on gas. Gas exerts how many N on rocket?", answer: "1000" },
        { prompt: "Earth pulls you with 600 N. You pull Earth with how many N?", answer: "600" },
        { prompt: "Hammer hits nail with 200 N. Nail hits hammer with how many N?", answer: "200" },
        { prompt: "Action-reaction forces act on (same/different) objects?", answer: "different" },
        { prompt: "Action force 100 N east. Reaction force direction?", answer: "west" },
      ],
      CORE: [
        { prompt: "Basel tram 10000 kg pushes track with 15000 N. Track pushes tram with how many N?", answer: "15000" },
        { prompt: "Rhine boat propeller pushes water backward with 3000 N. Water pushes boat with how many N?", answer: "3000" },
        { prompt: "Fasnacht float pushes ground with 20000 N. Ground pushes float with how many N?", answer: "20000" },
        { prompt: "SBB train wheels push track with 50000 N. Track pushes wheels with how many N?", answer: "50000" },
        { prompt: "Swimmer pushes water backward with 500 N. Water pushes swimmer forward with how many N?", answer: "500" },
        { prompt: "Car tire pushes road with 4000 N. Road pushes tire with how many N?", answer: "4000" },
        { prompt: "Rocket pushes exhaust gas with 100000 N. Gas pushes rocket with how many N?", answer: "100000" },
        { prompt: "Person pushes wall with 200 N. Wall pushes person with how many N?", answer: "200" },
      ],
      ADVANCED: [
        { prompt: "Basel tram 10000 kg accelerates at 1.5 m/s². Force on track?", answer: "15000" },
        { prompt: "Rhine boat 2000 kg accelerates at 2 m/s². Force on water?", answer: "4000" },
        { prompt: "Fasnacht float 3000 kg, friction 500 N, accelerates at 0.5 m/s². Force on ground?", answer: "2000" },
        { prompt: "SBB train 50000 kg decelerates at -0.2 m/s². Force on track?", answer: "-10000" },
        { prompt: "Rocket 5000 kg accelerates at 10 m/s². Force on exhaust gas?", answer: "50000" },
        { prompt: "Car 1200 kg accelerates at 3 m/s². Force on road?", answer: "3600" },
        { prompt: "Basel bus 8000 kg accelerates at 1 m/s². Force on road?", answer: "8000" },
      ],
      ELITE: [
        { prompt: "Basel tram 10000 kg and car 1000 kg collide. Tram exerts 50000 N on car. Car exerts how many N on tram?", answer: "50000" },
        { prompt: "Rhine boat 2000 kg pushes water with 4000 N. Boat accelerates at 2 m/s². Water mass pushed?", answer: "2000" },
        { prompt: "Fasnacht float 3000 kg, ground pushes with 2000 N. Float accelerates at 0.5 m/s². Friction force?", answer: "500" },
        { prompt: "SBB train 50000 kg, track pushes with 10000 N. Train decelerates at -0.2 m/s². Verify F=ma?", answer: "yes" },
      ],
    };

    return thirdLawData[difficulty].map((item, idx) => ({
      id: `THIRD_LAW_${difficulty}_${idx + 1}`,
      difficulty,
      stage,
      promptLatex: item.prompt,
      expressionLatex: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
      targetLatex: "answer",
      slots: [
        {
          id: "answer",
          labelLatex: "Answer",
          placeholder: "type answer",
          expected: item.answer,
        },
      ],
      correctLatex: `\\text{Answer: } ${item.answer}`,
      answer: item.answer,
      relatedLaw: "THIRD",
    }));
  }

  return [];
}
