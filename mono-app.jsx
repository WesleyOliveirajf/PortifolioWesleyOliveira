// Monta o portfolio Mono Tabular com painel de Tweaks (PT/EN)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "pt",
  "dark": true,
  "accent": "lime",
  "density": "regular",
  "asciiArt": true
}/*EDITMODE-END*/;

function initialTweakState() {
  let lang = TWEAK_DEFAULTS.lang;
  try {
    const s = localStorage.getItem("portfolio-lang");
    if (s === "en" || s === "pt") lang = s;
  } catch (e) {}
  return { ...TWEAK_DEFAULTS, lang };
}

const ACCENT_SWATCHES = {
  lime:    "#C8FF4A",
  cyan:    "#5EEAD4",
  amber:   "#F5A524",
  magenta: "#FF6BCB",
};

function App() {
  const [t, setTweak] = useTweaks(initialTweakState());

  React.useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", t.lang);
    } catch (e) {}
  }, [t.lang]);

  return (
    <>
      <window.MonoTweakablePortfolio tweaks={t} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Idioma · Language" />
        <TweakRadio
          label="Lang"
          value={t.lang}
          options={["pt", "en"]}
          onChange={(v) => setTweak("lang", v)}
        />

        <TweakSection label="Tema · Theme" />
        <TweakRadio
          label="Mode"
          value={t.dark ? "dark" : "light"}
          options={["dark", "light"]}
          onChange={(v) => setTweak("dark", v === "dark")}
        />

        <TweakSection label="Acento · Accent" />
        <TweakColor
          label="Color"
          value={ACCENT_SWATCHES[t.accent]}
          options={Object.values(ACCENT_SWATCHES)}
          onChange={(hex) => {
            const key = Object.keys(ACCENT_SWATCHES).find(
              (k) => ACCENT_SWATCHES[k] === hex
            );
            if (key) setTweak("accent", key);
          }}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakToggle
          label="ASCII flourish"
          value={t.asciiArt}
          onChange={(v) => setTweak("asciiArt", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
