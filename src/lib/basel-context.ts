/**
 * Basel-specific localization context for educational examples
 * All examples use Basel/Swiss context to make learning more relatable
 */

export const baselContext = {
  geometry: {
    trapezoid: {
      EN: "Basel tram window",
      DE: "Basler Tramfenster",
      CN: "巴塞尔电车窗户"
    },
    shadow: {
      EN: "Basel Cathedral (Basler Münster) shadow",
      DE: "Schatten des Basler Münsters",
      CN: "巴塞尔大教堂阴影"
    },
    tower: {
      EN: "Basel clock tower",
      DE: "Basler Uhrturm",
      CN: "巴塞尔钟楼"
    },
    building: {
      EN: "Basel Cathedral",
      DE: "Basler Münster",
      CN: "巴塞尔大教堂"
    },
    distance: {
      EN: "distance from Basel SBB to Marktplatz",
      DE: "Entfernung vom Basel SBB zum Marktplatz",
      CN: "从巴塞尔火车站到市场广场的距离"
    }
  },
  chemistry: {
    lab: {
      EN: "Novartis laboratory",
      DE: "Novartis-Labor",
      CN: "诺华实验室"
    },
    lab_roche: {
      EN: "Roche laboratory",
      DE: "Roche-Labor",
      CN: "罗氏实验室"
    },
    compound: {
      EN: "pharmaceutical compound",
      DE: "Pharmaverbindung",
      CN: "制药化合物"
    },
    synthesis: {
      EN: "drug synthesis at Novartis",
      DE: "Arzneimittelsynthese bei Novartis",
      CN: "诺华的药物合成"
    }
  },
  physics: {
    hydropower: {
      EN: "Rhine river hydropower station",
      DE: "Rhein-Wasserkraftwerk",
      CN: "莱茵河水电站"
    },
    tram: {
      EN: "Basel tram system",
      DE: "Basler Tramnetz",
      CN: "巴塞尔电车系统"
    },
    river: {
      EN: "Rhine river",
      DE: "Rhein",
      CN: "莱茵河"
    },
    pendulum: {
      EN: "Basel clock tower pendulum",
      DE: "Pendel des Basler Uhrturms",
      CN: "巴塞尔钟楼摆"
    },
    energy: {
      EN: "Rhine hydroelectric power",
      DE: "Rhein-Wasserkraft",
      CN: "莱茵河水力发电"
    }
  },
  finance: {
    bank: {
      EN: "UBS Basel",
      DE: "UBS Basel",
      CN: "瑞银巴塞尔"
    },
    exponential: {
      EN: "Swiss bank compound interest",
      DE: "Schweizer Bank Zinseszins",
      CN: "瑞士银行复利"
    },
    savings: {
      EN: "UBS savings account",
      DE: "UBS Sparkonto",
      CN: "瑞银储蓄账户"
    },
    investment: {
      EN: "Basel banking investment",
      DE: "Basler Bankinvestition",
      CN: "巴塞尔银行投资"
    }
  }
};

export type Language = 'EN' | 'DE' | 'CN';

export function getBaselContext(category: keyof typeof baselContext, key: string, language: Language): string {
  const categoryData = baselContext[category];
  if (categoryData && key in categoryData) {
    return (categoryData as any)[key][language] || (categoryData as any)[key]['EN'];
  }
  return '';
}
