"use client";

import { useState } from "react";
import type { Scenario, Language } from "@/lib/gp2-03-types";
import ContentRenderer from "./ContentRenderer";

interface ScenarioCardProps {
  scenario: Scenario;
  language: Language;
  expanded?: boolean;
}

export default function ScenarioCard({
  scenario,
  language,
  expanded: initialExpanded = false,
}: ScenarioCardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const title = scenario.title[language] || scenario.title.en;
  const locationName = scenario.location?.name[language] || scenario.location?.name.en || "";

  return (
    <div className="bg-gray-800/50 rounded-lg border border-cyan-500/30 overflow-hidden hover:border-cyan-500/50 transition-colors">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800/70 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold text-cyan-400 mb-1">{title}</h3>
          {locationName && (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {locationName}
            </p>
          )}
        </div>
        <svg
          className={`w-6 h-6 text-cyan-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-700/50">
          <ContentRenderer
            content={scenario.description}
            language={language}
            className="text-gray-300 leading-relaxed mb-4"
          />

          {/* Related Concepts */}
          {scenario.relatedConcepts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-sm text-gray-400 mb-2">
                {language === "en" && "Related Concepts:"}
                {language === "cn" && "相关概念："}
                {language === "de" && "Verwandte Konzepte:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {scenario.relatedConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
