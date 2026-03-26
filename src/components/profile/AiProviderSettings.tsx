import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { clsx } from "clsx";
import { Settings, Key, Globe, Cpu } from "lucide-react";

export default function AiProviderSettings() {
  const { aiProviderConfig, setAiProviderConfig } = useAppStore();
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);

  const [useDefault, setUseDefault] = useState(aiProviderConfig.useDefault);
  const [baseUrl, setBaseUrl] = useState(aiProviderConfig.baseUrl || "");
  const [apiKey, setApiKey] = useState(aiProviderConfig.apiKey || "");
  const [modelName, setModelName] = useState(aiProviderConfig.modelName || "");
  const aiT = t("profile.ai_provider");

  useEffect(() => {
    setUseDefault(aiProviderConfig.useDefault);
    setBaseUrl(aiProviderConfig.baseUrl || "");
    setApiKey(aiProviderConfig.apiKey || "");
    setModelName(aiProviderConfig.modelName || "");
    setSaved(false);
  }, [aiProviderConfig]);

  const handleSave = () => {
    setAiProviderConfig({
      useDefault,
      baseUrl,
      apiKey,
      modelName,
    });
    setSaved(true);
  };

  return (
    <div id="ai-settings" className="scroll-mt-24 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-neon-purple" />
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
          {aiT.title}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
            {aiT.mode_label}
          </div>
          <label className="flex items-center gap-4 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={useDefault}
                onChange={(e) => {
                  setUseDefault(e.target.checked);
                  setSaved(false);
                }}
              />
              <div className={clsx("block w-10 h-6 rounded-full transition-colors", useDefault ? "bg-neon-purple" : "bg-white/10")}></div>
              <div className={clsx("absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", useDefault ? "translate-x-4" : "")}></div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-black tracking-widest uppercase text-white/80">
                {aiT.default_mode}
              </div>
              <div className="text-xs text-white/50">
                {useDefault ? aiT.default_mode_hint : aiT.custom_mode_hint}
              </div>
            </div>
          </label>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-4">
          <div className="text-xs text-white/50 bg-white/5 p-3 rounded-lg">
            🔒 {aiT.privacy_note}
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
              <Globe className="w-3 h-3 inline mr-2" /> {aiT.labels.base_url}
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => {
                setBaseUrl(e.target.value);
                setSaved(false);
              }}
              disabled={useDefault}
              placeholder={aiT.placeholders.base_url}
              className={clsx(
                "w-full border rounded-lg p-3 text-sm transition-colors",
                useDefault
                  ? "bg-black/20 border-white/10 text-white/35 cursor-not-allowed"
                  : "bg-black/50 border-white/20 text-white focus:outline-none focus:border-neon-purple"
              )}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
              <Key className="w-3 h-3 inline mr-2" /> {aiT.labels.api_key}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setSaved(false);
              }}
              disabled={useDefault}
              placeholder={aiT.placeholders.api_key}
              className={clsx(
                "w-full border rounded-lg p-3 text-sm transition-colors",
                useDefault
                  ? "bg-black/20 border-white/10 text-white/35 cursor-not-allowed"
                  : "bg-black/50 border-white/20 text-white focus:outline-none focus:border-neon-purple"
              )}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">
              <Cpu className="w-3 h-3 inline mr-2" /> {aiT.labels.model_name}
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => {
                setModelName(e.target.value);
                setSaved(false);
              }}
              disabled={useDefault}
              placeholder={aiT.placeholders.model_name}
              className={clsx(
                "w-full border rounded-lg p-3 text-sm transition-colors",
                useDefault
                  ? "bg-black/20 border-white/10 text-white/35 cursor-not-allowed"
                  : "bg-black/50 border-white/20 text-white focus:outline-none focus:border-neon-purple"
              )}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="mt-2 px-6 py-2 bg-neon-purple/20 text-neon-purple font-black tracking-widest uppercase text-xs rounded-lg hover:bg-neon-purple/40 transition-colors"
            >
              {saved ? aiT.saved : aiT.save}
            </button>
            {!useDefault && !apiKey.trim() && (
              <div className="text-xs text-amber-300/80">
                {aiT.custom_mode_hint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
