// Mono Tabular — versão standalone com tweaks (PT/EN)
// Lê window.PORTFOLIO; ouve tweaks (theme, accent, density, asciiArt, lang).

(function() {
  const P = window.PORTFOLIO;

  // Paletas por tema
  const THEMES = {
    dark: {
      bg:    "#0F0F0F",
      panel: "#171717",
      ink:   "#F5F5F2",
      soft:  "#8A8A85",
      dim:   "#3A3A37",
      rule:  "#262624",
      muted: "#cfcfca",
    },
    light: {
      bg:    "#FBFAF6",
      panel: "#F4F2EC",
      ink:   "#0F0F0F",
      soft:  "#6B6964",
      dim:   "#C8C4B8",
      rule:  "#E2DDD0",
      muted: "#3A3A35",
    },
  };

  const ACCENTS = {
    "lime":    "#C8FF4A",
    "cyan":    "#5EEAD4",
    "amber":   "#F5A524",
    "magenta": "#FF6BCB",
  };

  function tones(tw) {
    return {
      ...THEMES[tw.dark ? "dark" : "light"],
      accent: ACCENTS[tw.accent] || ACCENTS.lime,
    };
  }

  function Dotted({ left, right, t }) {
    return (
      <div style={{
        display: "flex", alignItems: "baseline", gap: 8,
        padding: "8px 0",
        fontFamily: "'Geist Mono', monospace", fontSize: 13,
      }}>
        <span style={{ color: t.soft }}>{left}</span>
        <span style={{ flex: 1, borderBottom: `1px dotted ${t.dim}`, transform: "translateY(-3px)" }}/>
        <span>{right}</span>
      </div>
    );
  }

  function Cover({ p, idx, t }) {
    const a = `oklch(72% 0.06 ${p.hue})`;
    const b = `oklch(20% 0.04 ${p.hue})`;
    return (
      <div style={{
        position: "relative", height: 220,
        background: `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0px, rgba(0,0,0,.18) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}/>
        <div style={{
          position: "absolute", left: 18, bottom: -10,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 140, lineHeight: 1, fontWeight: 500,
          color: "rgba(255,255,255,.92)", letterSpacing: "-.04em",
        }}>{String(idx + 1).padStart(2, "0")}</div>
        <div style={{
          position: "absolute", top: 14, right: 14, left: 14,
          display: "flex", justifyContent: "space-between",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10, letterSpacing: ".1em",
          color: "rgba(255,255,255,.85)",
        }}>
          <span>[{p.id}]</span>
          <span>—— {p.year}</span>
        </div>
      </div>
    );
  }

  function SH({ idx, label, meta, t }) {
    return (
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        marginBottom: 32,
        borderBottom: `1px solid ${t.rule}`, paddingBottom: 16,
        fontFamily: "'Geist Mono', monospace",
      }}>
        <span style={{ color: t.accent, fontSize: 14 }}>▸</span>
        <span style={{ color: t.soft, fontSize: 12 }}>§ {String(idx).padStart(2, "0")}</span>
        <span style={{
          fontSize: 22, color: t.ink, letterSpacing: "-.01em",
          fontWeight: 500, flex: 1,
        }}>{label}</span>
        {meta ? <span style={{ color: t.soft, fontSize: 11 }}>{meta}</span> : null}
      </div>
    );
  }

  window.MonoTweakablePortfolio = function MonoTweakablePortfolio({ tweaks, onLangChange }) {
    const t = tones(tweaks);
    const dense = tweaks.density === "compact";
    const pad = dense ? "0 40px" : "0 56px";
    const heroPadding = dense ? "64px 0 60px" : "88px 0 80px";
    const sectionPadding = dense ? "48px 0" : "72px 0";
    const heroSize = dense ? 96 : 116;

    // Seleciona pacote de idioma
    const lang = (tweaks.lang === "en") ? "en" : "pt";
    const L = P[lang];
    const U = L.ui;
    const cvHref = lang === "en" ? (P.links.cvEn || P.links.cvPt || "#") : (P.links.cvPt || "#");

    // Atualiza atributo lang do <html>
    React.useEffect(() => {
      document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
      const titleMap = {
        pt: "Wesley Oliveira — Desenvolvedor Fullstack",
        en: "Wesley Oliveira — Fullstack Developer",
      };
      document.title = titleMap[lang];
    }, [lang]);

    return (
      <div style={{
        background: t.bg, color: t.ink, minHeight: "100vh",
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 13, lineHeight: 1.6,
        position: "relative",
        transition: "background .35s ease, color .35s ease",
      }}>
        {/* TOP BAR */}
        <div style={{
          padding: dense ? "16px 40px" : "20px 56px",
          borderBottom: `1px solid ${t.rule}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, letterSpacing: ".06em",
          position: "sticky", top: 0, zIndex: 50,
          background: t.bg, transition: "background .35s ease",
        }}>
          <div style={{ color: t.ink }}>
            <span style={{ color: t.accent }}>$</span> ./wesley_oliveira <span style={{ color: t.soft }}>--portfolio --year=2026 --lang=</span>
            <button
              type="button"
              onClick={() => onLangChange && onLangChange("pt")}
              style={{
                border: `1px solid ${lang === "pt" ? t.accent : t.rule}`,
                background: lang === "pt" ? t.accent : "transparent",
                color: lang === "pt" ? "#0a0a0a" : t.soft,
                fontFamily: "inherit",
                fontSize: "inherit",
                letterSpacing: "inherit",
                cursor: "pointer",
                padding: "2px 8px",
                borderRadius: 999,
                lineHeight: 1.3,
              }}
            >
              PT
            </button>
            <span style={{ color: t.soft }}> / </span>
            <button
              type="button"
              onClick={() => onLangChange && onLangChange("en")}
              style={{
                border: `1px solid ${lang === "en" ? t.accent : t.rule}`,
                background: lang === "en" ? t.accent : "transparent",
                color: lang === "en" ? "#0a0a0a" : t.soft,
                fontFamily: "inherit",
                fontSize: "inherit",
                letterSpacing: "inherit",
                cursor: "pointer",
                padding: "2px 8px",
                borderRadius: 999,
                lineHeight: 1.3,
              }}
            >
              EN
            </button>
          </div>
          <div style={{ display: "flex", gap: 28, color: t.soft }}>
            <a href="#about" style={{ color: "inherit" }}>{U.navAbout}</a>
            <a href="#work" style={{ color: "inherit" }}>{U.navWork}</a>
            <a href="#cv" style={{ color: "inherit" }}>{U.navCv}</a>
            <a href="#differentials" style={{ color: "inherit" }}>{U.navWhyMe}</a>
            <a href="#stack" style={{ color: "inherit" }}>{U.navStack}</a>
            <a href="#github" style={{ color: "inherit" }}>{U.navGithub}</a>
            <a href="#contact" style={{ color: "inherit" }}>{U.navContact}</a>
          </div>
          <div style={{ color: t.accent }}>{U.openToWork}</div>
        </div>

        <div style={{ padding: pad }}>
          {/* HERO */}
          <section style={{ padding: heroPadding }}>
            {tweaks.asciiArt && (
              <div style={{ color: t.soft, fontSize: 12, marginBottom: 24, lineHeight: 1.6 }}>
                ┌────────────────────────────────────────────┐<br/>
                │&nbsp;&nbsp;<span style={{ color: t.accent }}>read.me</span> &nbsp;·&nbsp; v04 &nbsp;·&nbsp; {U.readme} &nbsp;│<br/>
                └────────────────────────────────────────────┘
              </div>
            )}

            <h1 style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: heroSize, lineHeight: 0.95, fontWeight: 500,
              letterSpacing: "-.045em", margin: 0, color: t.ink,
            }}>
              wesley_<br/>
              oliveira<span className="mt-cursor" style={{ color: t.accent }}>_</span>
            </h1>

            <div style={{
              marginTop: 36,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
              maxWidth: 1100,
            }}>
              <p style={{
                fontSize: 18, lineHeight: 1.55, color: t.ink,
                margin: 0, letterSpacing: "-.005em",
              }}>
                <span style={{ color: t.accent }}>{"//"}</span> {L.intro}
              </p>
              <div style={{ fontSize: 13 }}>
                <Dotted t={t} left="role"   right={L.role}/>
                <Dotted t={t} left="level"  right={L.seniority}/>
                <Dotted t={t} left="exp"    right={`${P.yearsExp} ${U.yearsLabel}`}/>
                <Dotted t={t} left="loc"    right={U.heroLoc}/>
                <Dotted t={t} left="status" right={<span style={{ color: t.accent }}>{U.openTo}</span>}/>
                <Dotted t={t} left="stack"  right={<span style={{ color: t.soft }}>{U.heroStack}</span>}/>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" style={{ padding: sectionPadding }}>
            <SH t={t} idx={1} label={U.sectionAbout} meta={U.sectionAboutMeta}/>
            <div style={{
              display: "grid", gridTemplateColumns: "260px 1fr", gap: 56,
              fontSize: 14, lineHeight: 1.7,
            }}>
              <pre style={{
                margin: 0, color: t.soft, fontSize: 12, lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}>{`{
  "name":   "Wesley Oliveira",
  "role":  "${U.jsonRole}",
  "focus":  "${U.jsonFocus}",
  "level":  "${U.jsonLevel}",
  "years":  "${P.yearsExp}",
  "based":  "${U.jsonBased}",
  "open":   true,
  "model":  "${U.jsonModel}"
}`}</pre>
              <div style={{ color: t.ink }}>
                {L.longBio.map((par, i) => (
                  <p key={i} style={{ margin: i ? "16px 0 0 0" : 0 }}>{par}</p>
                ))}
                <div style={{ marginTop: 18, color: t.soft, fontSize: 12 }}>
                  <span style={{ color: t.accent }}>{"//"}</span> {U.heroDirectContact}: <a href={`tel:${P.links.phone}`} style={{ color: t.ink }}>{P.links.phone}</a> · <a href={`mailto:${P.links.email}`} style={{ color: t.ink }}>{P.links.email}</a>
                </div>
              </div>
            </div>
          </section>

          {/* WORK */}
          <section id="work" style={{ padding: sectionPadding }}>
            <SH t={t} idx={2} label={U.sectionWork} meta={U.sectionWorkMeta(L.projects.length)}/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {L.projects.map((p, i) => (
                <article key={p.id} className="mt-card" style={{
                  background: t.panel,
                  border: `1px solid ${t.rule}`,
                  cursor: "pointer",
                  transition: "border-color .25s, transform .25s, background .35s",
                  position: "relative",
                  "--accent": t.accent,
                }}>
                  <Cover p={p} idx={i} t={t}/>
                  <div style={{ padding: dense ? "16px 18px 18px" : "20px 22px 22px" }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      color: t.soft, fontSize: 11, letterSpacing: ".06em",
                    }}>
                      <span>{p.kind}</span>
                      <span>{p.role}</span>
                    </div>
                    {p.metric ? (
                      <div style={{
                        marginTop: 10, display: "inline-block",
                        background: t.accent, color: "#0a0a0a",
                        padding: "3px 9px", fontSize: 11, fontWeight: 500,
                        letterSpacing: ".02em",
                      }}>{p.metric}</div>
                    ) : null}
                    <h3 style={{
                      fontSize: 24, fontWeight: 500, letterSpacing: "-.02em",
                      margin: "10px 0 8px", color: t.ink,
                    }}>{p.title}</h3>
                    <p style={{
                      margin: 0, fontSize: 13, lineHeight: 1.6, color: t.muted,
                    }}>{p.summary}</p>
                    <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.stack.map(s => (
                        <span key={s} style={{
                          fontSize: 10, letterSpacing: ".06em",
                          padding: "3px 8px", color: t.soft,
                          border: `1px solid ${t.rule}`,
                          background: tweaks.dark ? "#0c0c0c" : "#fff",
                        }}>{s}</span>
                      ))}
                    </div>
                    <div className="mt-cta" style={{
                      marginTop: 18,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      paddingTop: 14, borderTop: `1px dashed ${t.rule}`,
                      fontSize: 11, color: t.soft,
                    }}>
                      <span>[{p.id}.{U.caseStudy}]</span>
                      <span className="mt-arr" style={{ color: t.accent, transition: "transform .3s" }}>{U.readMore}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CV */}
          <section id="cv" style={{ padding: sectionPadding }}>
            <SH t={t} idx={3} label={U.sectionCv} meta={U.sectionCvMeta(L.experience.length)}/>
            <div>
              {L.experience.map((e, i) => (
                <div key={i} className="mt-row" style={{
                  display: "grid", gridTemplateColumns: "180px 1fr",
                  gap: 32, padding: dense ? "20px 12px" : "26px 16px",
                  borderTop: `1px solid ${t.rule}`,
                  ...(i === L.experience.length - 1 ? { borderBottom: `1px solid ${t.rule}` } : {}),
                  transition: "background .2s",
                  "--hover-bg": t.panel,
                }}>
                  <div style={{ color: t.soft, fontSize: 12 }}>
                    <div style={{ color: t.accent, marginBottom: 4 }}>● {e.period.split(" — ")[0]}</div>
                    {e.period}
                  </div>
                  <div>
                    <div style={{ fontSize: 22, letterSpacing: "-.01em", fontWeight: 500 }}>
                      {e.role} <span style={{ color: t.soft }}>@ {e.company}</span>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: t.soft }}>{e.kind}</div>
                    <ul style={{ marginTop: 14, padding: 0, listStyle: "none" }}>
                      {e.bullets.map((b, j) => (
                        <li key={j} style={{
                          paddingLeft: 22, position: "relative", fontSize: 13,
                          lineHeight: 1.55, marginBottom: 6, color: t.muted,
                        }}>
                          <span style={{ position: "absolute", left: 0, top: 0, color: t.accent }}>›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 32 }}>
                <div style={{ color: t.soft, fontSize: 12, marginBottom: 12 }}>{U.education}</div>
                {L.education.map((ed, i) => (
                  <Dotted key={i} t={t}
                    left={ed.period}
                    right={<span><span style={{ color: t.ink }}>{ed.title}</span> <span style={{ color: t.soft }}>· {ed.inst}</span></span>}
                  />
                ))}
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{ color: t.soft, fontSize: 12, marginBottom: 12 }}>{U.certs}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
                  {(L.certifications || []).map((c, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "baseline", gap: 10,
                      padding: "6px 0", fontSize: 12,
                      borderBottom: `1px dashed ${t.rule}`,
                    }}>
                      <span style={{ color: t.accent }}>✦</span>
                      <span style={{ color: t.muted }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DIFFERENTIALS */}
          <section id="differentials" style={{ padding: sectionPadding }}>
            <SH t={t} idx={4} label={U.sectionDiff} meta={U.sectionDiffMeta}/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {(L.differentials || []).map((d, i) => (
                <div key={i} style={{
                  background: t.panel, border: `1px solid ${t.rule}`,
                  padding: "22px 24px",
                  display: "flex", gap: 16,
                  transition: "border-color .25s",
                }} className="mt-card">
                  <span style={{
                    color: t.accent, fontSize: 28, lineHeight: 1,
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500,
                  }}>0{i+1}</span>
                  <p style={{
                    margin: 0, fontSize: 14, lineHeight: 1.55, color: t.ink,
                  }}>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STACK */}
          <section id="stack" style={{ padding: sectionPadding }}>
            <SH t={t} idx={5} label={U.sectionStack} meta={U.sectionStackMeta(Object.values(L.stack).flat().length)}/>
            <pre style={{
              background: t.panel, border: `1px solid ${t.rule}`,
              padding: "28px 32px", margin: 0,
              fontSize: 13, lineHeight: 1.85, color: t.ink,
              whiteSpace: "pre-wrap", transition: "background .35s",
            }}>
{`{`}
{Object.entries(L.stack).map(([cat, items], i, arr) => (
  <span key={cat}>
{"\n  "}<span style={{ color: t.accent }}>"{cat.toLowerCase().replace(/[^a-z0-9]+/g,'_')}"</span>{": ["}{"\n"}
{items.map((s, j) => (
  <span key={s}>
    {"    "}<span style={{ color: t.muted }}>"{s}"</span>{j < items.length - 1 ? "," : ""}{"\n"}
  </span>
))}
{"  ]"}{i < arr.length - 1 ? "," : ""}
  </span>
))}
{"\n}"}
            </pre>
          </section>

          {/* GITHUB */}
          <section id="github" style={{ padding: sectionPadding }}>
            <SH t={t} idx={6} label={U.sectionGithub} meta={U.sectionGithubMeta}/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {(L.githubProjects || []).map((p) => {
                const a = `oklch(72% 0.06 ${p.hue})`;
                const b = `oklch(20% 0.04 ${p.hue})`;
                return (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-card"
                    style={{
                      display: "block",
                      background: t.panel,
                      border: `1px solid ${t.rule}`,
                      textDecoration: "none",
                      color: t.ink,
                      transition: "border-color .25s, transform .25s",
                      "--accent": t.accent,
                    }}
                  >
                    <div style={{
                      height: 6,
                      background: `linear-gradient(90deg, ${a} 0%, ${b} 100%)`,
                    }}/>
                    <div style={{ padding: dense ? "16px 18px 18px" : "20px 22px 22px" }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 10,
                      }}>
                        <span style={{
                          fontSize: 10, letterSpacing: ".08em",
                          color: t.soft, border: `1px solid ${t.rule}`,
                          padding: "2px 7px",
                        }}>
                          github
                        </span>
                        <span style={{ color: t.accent, fontSize: 14 }}>↗</span>
                      </div>
                      <h3 style={{
                        fontSize: 16, fontWeight: 500, letterSpacing: "-.01em",
                        margin: "0 0 8px", color: t.ink,
                      }}>{p.title}</h3>
                      <p style={{
                        margin: 0, fontSize: 12, lineHeight: 1.6, color: t.muted,
                      }}>{p.summary}</p>
                      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {p.stack.map(s => (
                          <span key={s} style={{
                            fontSize: 10, letterSpacing: ".06em",
                            padding: "2px 7px", color: t.soft,
                            border: `1px solid ${t.rule}`,
                            background: tweaks.dark ? "#0c0c0c" : "#fff",
                          }}>{s}</span>
                        ))}
                      </div>
                      <div style={{
                        marginTop: 14, paddingTop: 12,
                        borderTop: `1px dashed ${t.rule}`,
                        fontSize: 11, color: t.accent,
                      }}>
                        {U.viewOnGithub}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ padding: dense ? "48px 0 64px" : "72px 0 96px" }}>
            <SH t={t} idx={7} label={U.sectionContact} meta={U.sectionContactMeta}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
              <div>
                <div style={{
                  fontSize: 56, lineHeight: 1.05, letterSpacing: "-.03em",
                  fontWeight: 500,
                }}>
                  <span style={{ color: t.accent }}>{">"}</span> {U.contactHeadline1}<br/>
                  {U.contactHeadline2}<span className="mt-cursor" style={{ color: t.accent }}>_</span>
                </div>
                <p style={{
                  marginTop: 24, fontSize: 14, color: t.muted,
                  maxWidth: 440, lineHeight: 1.7,
                }}>
                  {U.tagline}
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <a className="mt-btn primary" href={cvHref} download style={{
                    background: t.accent, color: "#0a0a0a",
                    border: "none", padding: "14px 22px",
                    fontFamily: "inherit", fontSize: 12, letterSpacing: ".06em",
                    cursor: "pointer", fontWeight: 500,
                    transition: "transform .2s",
                    textDecoration: "none", display: "inline-block",
                  }}>{U.downloadCv}</a>
                  <a className="mt-btn ghost" href={`mailto:${P.links.email}`} style={{
                    background: "transparent", color: t.ink,
                    border: `1px solid ${t.rule}`,
                    padding: "14px 22px",
                    fontFamily: "inherit", fontSize: 12, letterSpacing: ".06em",
                    cursor: "pointer",
                    transition: "all .2s",
                    textDecoration: "none", display: "inline-block",
                    "--accent": t.accent,
                  }}>{U.sendEmail}</a>
                </div>
              </div>

              <div style={{
                background: t.panel, border: `1px solid ${t.rule}`,
                padding: 24, transition: "background .35s",
              }}>
                <div style={{ color: t.soft, fontSize: 11, marginBottom: 14 }}>{U.links}</div>
                {([
                  ["linkedin", P.links.linkedin, P.links.linkedinUrl],
                  ["github", P.links.github, P.links.githubUrl],
                  ["email", P.links.email, `mailto:${P.links.email}`],
                ]).map(([k, v, rawHref]) => {
                  const isMail = k === "email";
                  const href = (() => {
                    if (rawHref && rawHref !== "#") return rawHref;
                    if (isMail) return `mailto:${P.links.email}`;
                    const s = String(v || "").trim();
                    if (/^https?:\/\//i.test(s)) return s;
                    return s ? `https://${s}` : "#";
                  })();
                  const outbound = !isMail && /^https?:\/\//i.test(href);
                  return (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16,
                      padding: "10px 0", borderBottom: `1px dashed ${t.rule}`,
                      fontSize: 13,
                    }}>
                      <span style={{ color: t.soft }}>{k}</span>
                      <a
                        href={href}
                        {...(outbound ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-link mt-link-value"
                        style={{
                          color: t.ink,
                          textDecoration: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          wordBreak: "break-all",
                          "--accent": t.accent,
                        }}
                      >
                        {v}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div style={{
            borderTop: `1px solid ${t.rule}`,
            padding: "20px 0 36px",
            display: "flex", justifyContent: "space-between",
            color: t.soft, fontSize: 11,
          }}>
            <span>// © 2026 — wesley_oliveira</span>
            <span><span style={{ color: t.accent }}>$</span> exit 0</span>
          </div>
        </div>

        <style>{`
          @keyframes mt-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .mt-cursor { animation: mt-blink 1.05s steps(1) infinite; }
          .mt-card { transition: border-color .25s, transform .25s, background .35s; }
          .mt-card:hover { border-color: var(--accent) !important; transform: translateY(-2px); }
          .mt-card:hover .mt-arr { transform: translateX(6px); }
          .mt-row:hover { background: var(--hover-bg); }
          .mt-link:hover { color: var(--accent); }
          .mt-btn.primary:hover { transform: translateY(-2px); filter: brightness(1.05); }
          .mt-btn.ghost:hover { border-color: var(--accent); color: var(--accent); }
          html { scroll-behavior: smooth; }
        `}</style>
      </div>
    );
  };
})();
