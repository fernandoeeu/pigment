import { createContext, useContext, useState } from "react";
import type { ColorVisionMode, Settings } from "../lib/settings";
import { defaultSettings, loadSettings, saveSettings } from "../lib/settings";

interface SettingsContextValue {
  settings: Settings;
  colorVisionMode: ColorVisionMode;
  setColorVisionMode: (mode: ColorVisionMode) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  colorVisionMode: defaultSettings.colorVisionMode,
  setColorVisionMode: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  function setColorVisionMode(mode: ColorVisionMode) {
    setSettings((prev) => {
      const next = { ...prev, colorVisionMode: mode };
      saveSettings(next);
      return next;
    });
  }

  return (
    <SettingsContext value={{ settings, colorVisionMode: settings.colorVisionMode, setColorVisionMode }}>
      {children}
    </SettingsContext>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
