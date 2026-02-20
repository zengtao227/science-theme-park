import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { clsx } from "clsx";
import { Settings, Key, Globe, Cpu } from "lucide-react";

export default function AiProviderSettings() {
  const { aiProviderConfig, setAiProviderConfig } = useAppStore();
  const { t } = useLanguage();

  const [useDefault, setUseDefault] = useState(aiProviderConfig.useDefault);
  const [baseUrl, setBaseUrl] = useState(aiProviderConfig.baseUrl || "");
  const [apiKey, setApiKey] = useState(aiProviderConfig.apiKey || "");
  const [modelName, setModelName] = useState(aiProviderConfig.modelName || "");

  useEffect(() => {
    setUseDefault(aiProviderConfig.useDefault);
    setBaseUrl(aiProviderConfig.baseUrl || "");
    setApiKey(aiProviderConfig.apiKey || "");
    setModelName(aiProviderConfig.modelName || "");
  }, [aiProviderConfig]);

  const handleSave = () => {
    setAiProviderConfig({
      useDefault,
      baseUrl,
      apiKey,
      modelName,
    });
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-neon-purple" />
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
          AI Diagnostic Settings
        </div>
      </div>

      <div className="space-y-6">
        <label className="flex items-center gap-4 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={useDefault}
              onChange={(e) => {
                setUseDefault(e.target.checked);
                setAiProviderConfig({ useDefault: e.target.checked });
              }}
            />
            <div className={clsx("block w-10 h-6 rounded-full transition-colors", useDefault ? "bg-neon-purple" : "bg-white/10")}></div>
            <div className={clsx("absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", useDefault ? "translate-x-4" : "")}></div>
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-white/80">
            Use Default AI (NVIDIA Free Tier)
          </span>
        </label>

        {!useDefault && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/50 mb-4 bg-white/5 p-3 rounded-lg">
              🔒 Privacy Note: Your API keys are strictly stored locally in your browser. We never save or track your personal keys on our servers.
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
                <Globe className="w-3 h-3 inline mr-2" /> API Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="e.g. https://api.openai.com/v1"
                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neon-purple transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
                <Key className="w-3 h-3 inline mr-2" /> API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neon-purple transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
                <Cpu className="w-3 h-3 inline mr-2" /> Model Name
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="e.g. gpt-4o"
                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neon-purple transition-colors"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-neon-purple/20 text-neon-purple font-black tracking-widest uppercase text-xs rounded-lg hover:bg-neon-purple/40 transition-colors"
            >
              Save Custom AI Config
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
