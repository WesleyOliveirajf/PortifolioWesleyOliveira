// Variação 2 — Swiss / Bureau
// Grid 12 colunas, hairlines, sans-serif moderno, todas as seções numeradas.
// Black on white. Estética de relatório / studio site.

(function() {
  const t = {
    bg:    "#FFFFFF",
    ink:   "#0A0A0A",
    soft:  "#6B6B6B",
    rule:  "#1A1A1A",
    hair:  "#E5E5E5",
    accent:"#FF3B19",
  };

  // Grid background lines (visíveis e marcando 12 colunas)
  function GridBG({ cols = 12, gutter = 24, padX = 64 }) {
    const lines = [];
    for (let i = 0; i <= cols; i++) {
      lines.push(
        <div key={i} style={{
          flex: i === 0 || i === cols ? "0 0 auto" : "1 1 0",
          borderRight: i < cols ? `1px dashed ${t.hair}` : "none",
        }}/>
      );
    }
    return (
      <div style={{
        position: "absolute", inset: 0, padding: `0 ${padX}px`,
        display: "flex", pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{ width: "100%", display: "flex" }}>
          {Array.from({length: cols}).map((_, i) => (
            <div key={i} style={{
              flex: 1, borderLeft: `1px dashed ${t.hair}`,
              ...(i === cols - 1 ? { borderRight: `1px dashed ${t.hair}` } : {}),
            }}/>
          ))}
        </div>
      </div>
    );
  }

  function Cover({ p }) {
    const a = `oklch(78% 0.05 ${p.hue})`;
    const b = `oklch(28% 0.07 ${p.hue})`;
    return (
      <div style={{
        position: "relative",
        aspectRatio: "4/3",
        background: `linear-gradient(160deg, ${a}, ${b})`,
        overflow: "hidden",
      }}>
        {/* halftone-ish dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.18) 1px, transparent 1.5px)",
          backgroundSize: "10px 10px",
          mixBlendMode: "screen",
        }}/>
        <div style={{
          position: "absolute", left: 16, top: 16, right: 16,
          display: "flex", justifyContent: "space-between",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10, letterSpacing: ".18em",
          color: "rgba(255,255,255,.85)", textTransform: "uppercase",
        }}>
          <span>{p.id.toUpperCase()}</span>
          <span>{p.year}</span>
        </div>
      </div>
    );
  }

  // Cabeçalho de seção: número grande + label + horizontal rule grossa
  function SH({ num, label, sub }) {
    return (
      <div style={{
        borderTop: `2px solid ${t.rule}`,
        paddingTop: 20, marginBottom: 40,
        display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24, alignItems: "baseline",
      }}>
        <div style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 12, letterSpacing: ".18em",
        }}>§ {num}</div>
        <div style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: 36, fontWeight: 600,
          letterSpacing: "-.02em", lineHeight: 1,
        }}>{label}</div>
        {sub ? (
          <div style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11, letterSpacing: ".1em", color: t.soft,
            textAlign: "right",
          }}>{sub}</div>
        ) : <div/>}
      </div>
    );
  }

  window.SwissPortfolio = function SwissPortfolio() {
    const { lang } = window.usePortfolioLocale();
    const root = window.PORTFOLIO;
    const L = root[lang] || root.pt;
    const Ts = L.tpl.swiss;
    const U = L.ui;
    const P = { name: root.name, initials: root.initials, yearsExp: root.yearsExp, links: root.links, ...L };

    return (
      <div style={{
        position: "relative",
        background: t.bg,
        color: t.ink,
        minHeight: "100%",
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: 14,
        lineHeight: 1.5,
        overflow: "hidden",
      }}>
        <GridBG/>

        {/* TOP NAV */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "24px 64px",
          borderBottom: `1px solid ${t.hair}`,
          display: "grid", gridTemplateColumns: "2fr 8fr 2fr",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase",
        }}>
          <div style={{ fontWeight: 600 }}>WO ⎯ Wesley Oliveira</div>
          <div style={{ display: "flex", gap: 28, color: t.soft }}>
            <a href="#sobre" style={{ color: "inherit" }}>{Ts.nav01}</a>
            <a href="#trabalho" style={{ color: "inherit" }}>{Ts.nav02}</a>
            <a href="#carreira" style={{ color: "inherit" }}>{Ts.nav03}</a>
            <a href="#stack" style={{ color: "inherit" }}>{Ts.nav04}</a>
            <a href="#contato" style={{ color: "inherit" }}>{Ts.nav05}</a>
          </div>
          <div style={{ textAlign: "right", color: t.accent }}>{Ts.openBadge}</div>
        </div>

        <main style={{ position: "relative", zIndex: 1, padding: "0 64px" }}>

          {/* HERO */}
          <section style={{ padding: "96px 0 64px" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
              color: t.soft, marginBottom: 32,
            }}>
              <div>2026</div>
              <div>{Ts.folioLine}</div>
              <div style={{ textAlign: "right" }}>{L.location}</div>
            </div>

            <h1 style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 200,
              lineHeight: 0.86,
              letterSpacing: "-.045em",
              fontWeight: 600,
              margin: 0,
            }}>
              {Ts.heroEn ? (
                <>
                  {Ts.heroL1}<br/>
                  <span style={{ color: t.accent }}>{Ts.heroL2}</span>
                </>
              ) : (
                <>
                  {Ts.heroL1}<br/>
                  {Ts.heroL2}<br/>
                  <span style={{ color: t.accent }}>{Ts.heroL3}</span>
                </>
              )}
              <span style={{ display: "inline-block", width: 28, height: 28, background: t.ink, borderRadius: "50%", marginLeft: 18, marginBottom: 10 }}/>
            </h1>

            <div style={{
              marginTop: 40,
              display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24,
              borderTop: `1px solid ${t.hair}`, paddingTop: 24,
            }}>
              <div style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                color: t.soft,
              }}>{Ts.summaryLabel}</div>
              <p style={{
                fontSize: 22, lineHeight: 1.4,
                margin: 0, letterSpacing: "-.01em",
              }}>{P.intro}</p>
              <div style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11, letterSpacing: ".1em",
                color: t.soft, textAlign: "right",
              }}>
                <div>{P.yearsExp} {U.yearsShort} · {L.seniority}</div>
                <div style={{ marginTop: 6 }}>{U.heroStack}</div>
              </div>
            </div>
          </section>

          {/* 01 SOBRE */}
          <section id="sobre" style={{ padding: "64px 0" }}>
            <SH num="01" label={Ts.sh01} sub={Ts.sh01sub}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24 }}>
              <div/>
              <div>
                {P.longBio.map((p, i) => (
                  <p key={i} style={{ fontSize: 18, lineHeight: 1.55, marginTop: i ? 16 : 0 }}>{p}</p>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  [Ts.metaLoc, P.location],
                  [Ts.metaExp, `${P.yearsExp} ${U.yearsShort}`],
                  [Ts.metaModel, Ts.metaModelVal],
                  [Ts.metaLang, Ts.metaLangVal],
                  [Ts.metaEdu, Ts.metaEduVal],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between",
                    borderBottom: `1px solid ${t.hair}`, paddingBottom: 8,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11, letterSpacing: ".1em",
                  }}>
                    <span style={{ color: t.soft, textTransform: "uppercase" }}>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 02 PROJETOS */}
          <section id="trabalho" style={{ padding: "64px 0" }}>
            <SH num="02" label={Ts.sh02} sub={Ts.sh02Sub(P.projects.length)}/>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {P.projects.map((p, i) => (
                <article key={p.id} className="sw-card" style={{ cursor: "pointer" }}>
                  <Cover p={p}/>
                  <div style={{ paddingTop: 14, borderTop: `1px solid ${t.ink}`, marginTop: -1 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase",
                      color: t.soft,
                    }}>
                      <span>↳ {p.kind}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 style={{
                      fontSize: 26, fontWeight: 600,
                      margin: "10px 0 6px", letterSpacing: "-.02em", lineHeight: 1.05,
                    }}>{p.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: "#222", margin: 0 }}>
                      {p.summary}
                    </p>
                    <div style={{
                      marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap",
                    }}>
                      {p.stack.map(s => (
                        <span key={s} style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10, letterSpacing: ".1em",
                          padding: "3px 8px",
                          border: `1px solid ${t.hair}`,
                          background: "#fafafa",
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 03 EXPERIÊNCIA */}
          <section id="carreira" style={{ padding: "64px 0" }}>
            <SH num="03" label={Ts.sh03} sub={Ts.sh03Sub(P.experience.length)}/>
            <div>
              {P.experience.map((e, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24,
                  padding: "32px 0",
                  borderTop: `1px solid ${t.hair}`,
                  ...(i === P.experience.length - 1 ? { borderBottom: `1px solid ${t.hair}` } : {}),
                }} className="sw-row">
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12, letterSpacing: ".1em",
                  }}>{e.period}</div>
                  <div>
                    <div style={{
                      fontSize: 28, fontWeight: 600, letterSpacing: "-.015em",
                      lineHeight: 1.1,
                    }}>{e.role}</div>
                    <div style={{
                      marginTop: 4,
                      fontSize: 14, color: t.soft,
                    }}>{e.company} &nbsp; · &nbsp; {e.kind}</div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                    {e.bullets.map((b, j) => (
                      <li key={j} style={{
                        fontSize: 13, lineHeight: 1.5,
                        paddingLeft: 18, position: "relative",
                        marginBottom: 8,
                      }}>
                        <span style={{
                          position: "absolute", left: 0, top: 8,
                          width: 8, height: 1, background: t.ink,
                        }}/>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 04 STACK */}
          <section id="stack" style={{ padding: "64px 0" }}>
            <SH num="04" label={Ts.sh04} sub={Ts.sh04Sub(Object.values(P.stack).flat().length)}/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
              {Object.entries(P.stack).map(([cat, items]) => (
                <div key={cat} style={{
                  borderTop: `2px solid ${t.ink}`,
                  paddingTop: 14,
                }}>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                    color: t.ink, marginBottom: 16, fontWeight: 600,
                  }}>{cat}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {items.map(s => (
                      <li key={s} style={{
                        fontSize: 14, padding: "6px 0",
                        borderBottom: `1px solid ${t.hair}`,
                      }}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 05 CONTATO */}
          <section id="contato" style={{ padding: "64px 0 96px" }}>
            <SH num="05" label={Ts.sh05} sub={Ts.sh05sub}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24, alignItems: "end" }}>
              <div/>
              <div>
                <h2 style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 96, lineHeight: 0.92, letterSpacing: "-.04em",
                  fontWeight: 600, margin: 0,
                }}>
                  {Ts.ctaL1}<br/>
                  {Ts.ctaL2}<br/>
                  <span style={{ color: t.accent }}>{Ts.ctaL3}</span>
                </h2>
                <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
                  <button className="sw-btn primary" style={{
                    background: t.ink, color: "#fff",
                    border: `1px solid ${t.ink}`,
                    padding: "16px 24px",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .25s ease",
                  }}>{Ts.dlCv}</button>
                  <button className="sw-btn ghost" style={{
                    background: "#fff", color: t.ink,
                    border: `1px solid ${t.ink}`,
                    padding: "16px 24px",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .25s ease",
                  }}>{Ts.sendMail}</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["LINKEDIN", P.links.linkedin, P.links.linkedinUrl],
                  ["GITHUB", P.links.github, P.links.githubUrl],
                  ["EMAIL", P.links.email, `mailto:${P.links.email}`],
                ].map(([k, v, u]) => (
                  <a key={k} href={u} className="sw-link" style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: `1px solid ${t.hair}`,
                    color: t.ink, textDecoration: "none",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12, letterSpacing: ".1em",
                  }}>
                    <span style={{ color: t.soft }}>{k}</span>
                    <span>{v} <span className="sw-arr" style={{ display: "inline-block", transition: "transform .25s" }}>↗</span></span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* footer */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 6fr 5fr", gap: 24,
            borderTop: `2px solid ${t.ink}`, padding: "24px 0 48px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase",
            color: t.soft,
          }}>
            <div>© 2026 — WO</div>
            <div>{Ts.footerMid} {L.location}</div>
            <div style={{ textAlign: "right" }}>{Ts.footerTop}</div>
          </div>
        </main>

        <style>{`
          .sw-card .sw-card-cover { transition: transform .4s ease; }
          .sw-card:hover h3 { color: ${t.accent}; }
          .sw-row:hover { background: #fafafa; }
          .sw-link:hover { background: #fafafa; }
          .sw-link:hover .sw-arr { transform: translate(3px,-3px); }
          .sw-btn.primary:hover { background: ${t.accent}; border-color: ${t.accent}; }
          .sw-btn.ghost:hover { background: ${t.ink}; color: #fff; }
        `}</style>
      </div>
    );
  };
})();
