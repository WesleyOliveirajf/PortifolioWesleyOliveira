// Contexto de idioma (PT/EN) — compartilhado entre as três artboards do canvas.

const PortfolioLocaleCtx = React.createContext(null);

function PortfolioLocaleProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try {
      const s = localStorage.getItem("portfolio-lang");
      if (s === "en" || s === "pt") return s;
    } catch (e) {}
    return "pt";
  });

  const setLang = React.useCallback((next) => {
    const v = next === "en" ? "en" : "pt";
    setLangState(v);
    try {
      localStorage.setItem("portfolio-lang", v);
    } catch (e) {}
    document.documentElement.lang = v === "en" ? "en" : "pt-BR";
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const value = React.useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <PortfolioLocaleCtx.Provider value={value}>
      {children}
    </PortfolioLocaleCtx.Provider>
  );
}

function usePortfolioLocale() {
  const ctx = React.useContext(PortfolioLocaleCtx);
  if (!ctx) {
    return { lang: "pt", setLang: () => {} };
  }
  return ctx;
}

function PortfolioLangToggle() {
  const { lang, setLang } = usePortfolioLocale();
  const L = window.PORTFOLIO[lang] || window.PORTFOLIO.pt;
  const aria = L.ui.langSwitchAria;

  return (
    <div
      role="group"
      aria-label={aria}
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 5000,
        display: "flex",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.1)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        background: "rgba(255,252,248,.95)",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      {["pt", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          style={{
            border: "none",
            padding: "10px 14px",
            cursor: "pointer",
            background: lang === code ? "#2a251f" : "transparent",
            color: lang === code ? "#fff" : "#4a4238",
            letterSpacing: ".08em",
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  PortfolioLocaleProvider,
  usePortfolioLocale,
  PortfolioLangToggle,
});
