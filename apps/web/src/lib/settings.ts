export type ColorVisionMode = "normal" | "protanopia" | "deuteranopia";

export interface Settings {
  colorVisionMode: ColorVisionMode;
}

export const defaultSettings: Settings = {
  colorVisionMode: "normal",
};

const STORAGE_KEY = "pigment-settings";

export function loadSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;

    const parsed = JSON.parse(raw) as Partial<Settings>;

    return {
      colorVisionMode:
        parsed.colorVisionMode &&
        ["normal", "protanopia", "deuteranopia"].includes(
          parsed.colorVisionMode,
        )
          ? parsed.colorVisionMode
          : defaultSettings.colorVisionMode,
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
