// App principal — monta o canvas com as três direções + idioma PT/EN

const { DesignCanvas, DCSection, DCArtboard, DCPostIt } = window;
const { PortfolioLocaleProvider, usePortfolioLocale, PortfolioLangToggle } = window;

function AppBody() {
  const { lang } = usePortfolioLocale();
  const W = 1280, H = 3800;
  const L = window.PORTFOLIO[lang] || window.PORTFOLIO.pt;
  const U = L.ui;

  React.useEffect(() => {
    document.title = U.canvasPageTitle;
  }, [lang, U.canvasPageTitle]);

  return (
    <DesignCanvas>
      <DCSection
        id="portfolio"
        title={U.canvasTitle}
        subtitle={U.canvasSubtitle}
      >
        <DCPostIt x={40} y={-60}>
          {U.canvasPostIt}
        </DCPostIt>

        <DCArtboard
          id="editorial"
          label="A · Editorial"
          width={W}
          height={H}
        >
          <window.EditorialPortfolio />
        </DCArtboard>

        <DCArtboard
          id="swiss"
          label="B · Swiss / Bureau"
          width={W}
          height={H}
        >
          <window.SwissPortfolio />
        </DCArtboard>

        <DCArtboard
          id="mono"
          label="C · Mono Tabular"
          width={W}
          height={H}
        >
          <window.MonoPortfolio />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

function App() {
  return (
    <PortfolioLocaleProvider>
      <PortfolioLangToggle />
      <AppBody />
    </PortfolioLocaleProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
