// Variação 3 — Mono Tabular
// Geist Mono em tudo, layout tipo livro técnico / changelog.
// Linhas pontilhadas como bibliografia, IDs entre colchetes, números com zero à esquerda.

(function() {
  const t = {
    bg:    "#0F0F0F",
    panel: "#171717",
    ink:   "#F5F5F2",
    soft:  "#8A8A85",
    dim:   "#3A3A37",
    rule:  "#262624",
    accent:"#C8FF4A",  // verde-limão de terminal, único acento
  };

  function Dotted({ left, right, leftStyle = {}, rightStyle = {} }) {
    return (
      <div style={{
        display: "flex", alignItems: "baseline", gap: 8,
        padding: "8px 0",
        fontFamily: "'Geist Mono', monospace", fontSize: 13,
      }}>
        <span style={{ color: t.soft, ...leftStyle }}>{left}</span>
        <span style={{
          flex: 1, borderBottom: `1px dotted ${t.dim}`,
          transform: "translateY(-3px)",
        }}/>
        <span style={{ ...rightStyle }}>{right}</span>
      </div>
    );
  }

  function Cover({ p, idx }) {
    const a = `oklch(72% 0.06 ${p.hue})`;
    const b = `oklch(20% 0.04 ${p.hue})`;
    return (
      <div style={{
        position: "relative",
        height: 220,
        background: `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
        overflow: "hidden",
      }}>
        {/* CRT scanlines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0px, rgba(0,0,0,.18) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}/>
        {/* Big numeric */}
        <div style={{
          position: "absolute", left: 18, bottom: -10,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 140, lineHeight: 1, fontWeight: 500,
          color: "rgba(255,255,255,.92)",
          letterSpacing: "-.04em",
        }}>
          {String(idx + 1).padStart(2, "0")}
        </div>
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

  // Cabeçalho de seção: indicador `>` + titulo + meta
  function SH({ idx, label, meta }) {
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

  window.MonoPortfolio = function MonoPortfolio() {
    const { lang } = window.usePortfolioLocale();
    const root = window.PORTFOLIO;
    const L = root[lang] || root.pt;
    const U = L.ui;
    const P = { name: root.name, initials: root.initials, yearsExp: root.yearsExp, links: root.links, ...L };
    const roleShort = (U.jsonFocus || "Fullstack").split("·")[0].trim();

    return (
      <div style={{
        background: t.bg,
        color: t.ink,
        minHeight: "100%",
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 13,
        lineHeight: 1.6,
        padding: "0",
        position: "relative",
      }}>
        {/* TOP BAR */}
        <div style={{
          padding: "20px 56px",
          borderBottom: `1px solid ${t.rule}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, letterSpacing: ".06em",
        }}>
          <div style={{ color: t.ink }}>
            <span style={{ color: t.accent }}>$</span> ./wesley_oliveira <span style={{ color: t.soft }}>--portfolio --year=2026 --lang={lang}</span>
          </div>
          <div style={{ display: "flex", gap: 28, color: t.soft }}>
            <a href="#about" style={{ color: "inherit" }}>{U.navAbout}</a>
            <a href="#work" style={{ color: "inherit" }}>{U.navWork}</a>
            <a href="#cv" style={{ color: "inherit" }}>{U.navCv}</a>
            <a href="#stack" style={{ color: "inherit" }}>{U.navStack}</a>
            <a href="#contact" style={{ color: "inherit" }}>{U.navContact}</a>
          </div>
          <div style={{ color: t.accent }}>{U.openToWork}</div>
        </div>

        <div style={{ padding: "0 56px" }}>

          {/* HERO */}
          <section style={{ padding: "88px 0 80px" }}>
            <div style={{ color: t.soft, fontSize: 12, marginBottom: 24 }}>
              ┌────────────────────────────────────────────┐<br/>
                │&nbsp;&nbsp;<span style={{ color: t.accent }}>read.me</span> &nbsp;·&nbsp; v04 &nbsp;·&nbsp; {U.readme} &nbsp;│<br/>
              └────────────────────────────────────────────┘
            </div>

            <h1 style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 116, lineHeight: 0.95,
              fontWeight: 500,
              letterSpacing: "-.045em",
              margin: 0,
              color: t.ink,
            }}>
              wesley_<br/>
              oliveira<span style={{ color: t.accent }}>_</span>
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
                <span style={{ color: t.accent }}>{"//"}</span> {P.intro}
              </p>
              <div style={{ fontSize: 13 }}>
                <Dotted left="role" right={`${U.jsonRole} · ${L.seniority}`}/>
                <Dotted left="exp"  right={`${P.yearsExp} ${U.yearsShort}`}/>
                <Dotted left="loc"  right={P.location}/>
                <Dotted left="status" right={<span style={{ color: t.accent }}>{U.openTo}</span>}/>
                <Dotted left="stack" right={<span style={{ color: t.soft }}>{U.heroStack.toLowerCase()}</span>}/>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" style={{ padding: "56px 0" }}>
            <SH idx={1} label={U.sectionAbout} meta={U.sectionAboutMeta}/>
            <div style={{
              display: "grid", gridTemplateColumns: "260px 1fr", gap: 56,
              fontSize: 14, lineHeight: 1.7,
            }}>
              <pre style={{
                margin: 0, color: t.soft, fontSize: 12, lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}>{`{
  "name":  "${P.name}",
  "role":  "${roleShort}",
  "level": "${U.jsonLevel}",
  "years": ${P.yearsExp},
  "based": "${U.jsonBased}",
  "open":  true,
  "model": "${U.jsonModel}"
}`}</pre>
              <div style={{ color: t.ink }}>
                {P.longBio.map((p, i) => (
                  <p key={i} style={{ margin: i ? "16px 0 0 0" : 0 }}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* WORK */}
          <section id="work" style={{ padding: "72px 0" }}>
            <SH idx={2} label={U.sectionWork} meta={U.sectionWorkMeta(P.projects.length)}/>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {P.projects.map((p, i) => (
                <article key={p.id} className="mn-card" style={{
                  background: t.panel,
                  border: `1px solid ${t.rule}`,
                  cursor: "pointer",
                  transition: "border-color .25s, transform .25s",
                  position: "relative",
                }}>
                  <Cover p={p} idx={i}/>
                  <div style={{ padding: "20px 22px 22px" }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      color: t.soft, fontSize: 11, letterSpacing: ".06em",
                    }}>
                      <span>{p.kind}</span>
                      <span>{p.role}</span>
                    </div>
                    <h3 style={{
                      fontSize: 24, fontWeight: 500, letterSpacing: "-.02em",
                      margin: "10px 0 8px", color: t.ink,
                    }}>{p.title}</h3>
                    <p style={{
                      margin: 0, fontSize: 13, lineHeight: 1.6, color: "#cfcfca",
                    }}>{p.summary}</p>
                    <div style={{
                      marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6,
                    }}>
                      {p.stack.map(s => (
                        <span key={s} style={{
                          fontSize: 10, letterSpacing: ".06em",
                          padding: "3px 8px",
                          color: t.soft,
                          border: `1px solid ${t.rule}`,
                          background: "#0c0c0c",
                        }}>{s}</span>
                      ))}
                    </div>
                    <div className="mn-cta" style={{
                      marginTop: 18,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      paddingTop: 14, borderTop: `1px dashed ${t.rule}`,
                      fontSize: 11, color: t.soft,
                    }}>
                      <span>[{p.id}.{U.caseStudy}]</span>
                      <span className="mn-arr" style={{
                        color: t.accent, transition: "transform .3s",
                      }}>{U.readMore}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CV */}
          <section id="cv" style={{ padding: "72px 0" }}>
            <SH idx={3} label={U.sectionCv} meta={U.sectionCvMeta(P.experience.length)}/>
            <div>
              {P.experience.map((e, i) => (
                <div key={i} className="mn-row" style={{
                  display: "grid", gridTemplateColumns: "180px 1fr",
                  gap: 32,
                  padding: "26px 16px",
                  borderTop: `1px solid ${t.rule}`,
                  ...(i === P.experience.length - 1 ? { borderBottom: `1px solid ${t.rule}` } : {}),
                  transition: "background .2s",
                }}>
                  <div style={{ color: t.soft, fontSize: 12 }}>
                    <div style={{ color: t.accent, marginBottom: 4 }}>● {e.period.split(" — ")[0]}</div>
                    {e.period}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 22, letterSpacing: "-.01em", fontWeight: 500,
                    }}>
                      {e.role} <span style={{ color: t.soft }}>@ {e.company}</span>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: t.soft }}>{e.kind}</div>
                    <ul style={{ marginTop: 14, padding: 0, listStyle: "none" }}>
                      {e.bullets.map((b, j) => (
                        <li key={j} style={{
                          paddingLeft: 22, position: "relative", fontSize: 13,
                          lineHeight: 1.55, marginBottom: 6, color: "#cfcfca",
                        }}>
                          <span style={{
                            position: "absolute", left: 0, top: 0, color: t.accent,
                          }}>›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* educação */}
              <div style={{ marginTop: 32 }}>
                <div style={{ color: t.soft, fontSize: 12, marginBottom: 12 }}>
                  {U.education}
                </div>
                {P.education.map((ed, i) => (
                  <Dotted
                    key={i}
                    left={ed.period}
                    right={<span><span style={{ color: t.ink }}>{ed.title}</span> <span style={{ color: t.soft }}>· {ed.inst}</span></span>}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* STACK */}
          <section id="stack" style={{ padding: "72px 0" }}>
            <SH idx={4} label={U.sectionStack} meta={U.sectionStackMeta(Object.values(P.stack).flat().length)}/>
            <pre style={{
              background: t.panel,
              border: `1px solid ${t.rule}`,
              padding: "28px 32px",
              margin: 0, fontSize: 13, lineHeight: 1.85,
              color: t.ink,
              whiteSpace: "pre-wrap",
            }}>
{`{`}
{Object.entries(P.stack).map(([cat, items], i, arr) => (
  <span key={cat}>
{"\n  "}<span style={{ color: t.accent }}>"{cat.toLowerCase()}"</span>{": ["}{"\n"}
{items.map((s, j) => (
  <span key={s}>
    {"    "}<span style={{ color: "#cfcfca" }}>"{s}"</span>{j < items.length - 1 ? "," : ""}{"\n"}
  </span>
))}
{"  ]"}{i < arr.length - 1 ? "," : ""}
  </span>
))}
{"\n}"}
            </pre>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ padding: "72px 0 96px" }}>
            <SH idx={5} label={U.sectionContact} meta={U.sectionContactMeta}/>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
              alignItems: "center",
            }}>
              <div>
                <div style={{
                  fontSize: 56, lineHeight: 1.05, letterSpacing: "-.03em",
                  fontWeight: 500,
                }}>
                  <span style={{ color: t.accent }}>{">"}</span> {U.contactHeadline1}<br/>
                  {U.contactHeadline2}<span style={{ color: t.accent }}>_</span>
                </div>
                <p style={{
                  marginTop: 24, fontSize: 14, color: "#cfcfca",
                  maxWidth: 440, lineHeight: 1.7,
                }}>
                  {L.available}
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <button className="mn-btn primary" style={{
                    background: t.accent, color: "#0a0a0a",
                    border: "none", padding: "14px 22px",
                    fontFamily: "inherit", fontSize: 12, letterSpacing: ".06em",
                    cursor: "pointer", fontWeight: 500,
                    transition: "transform .2s",
                  }}>{U.downloadCv}</button>
                  <button className="mn-btn ghost" style={{
                    background: "transparent", color: t.ink,
                    border: `1px solid ${t.rule}`,
                    padding: "14px 22px",
                    fontFamily: "inherit", fontSize: 12, letterSpacing: ".06em",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}>{U.sendEmail}</button>
                </div>
              </div>

              <div style={{
                background: t.panel, border: `1px solid ${t.rule}`,
                padding: 24,
              }}>
                <div style={{ color: t.soft, fontSize: 11, marginBottom: 14 }}>
                  {U.links}
                </div>
                {[
                  ["linkedin", P.links.linkedin, P.links.linkedinUrl],
                  ["github", P.links.github, P.links.githubUrl],
                  ["email", P.links.email, `mailto:${P.links.email}`],
                ].map(([k, v, u]) => (
                  <a key={k} href={u} className="mn-link" style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px dashed ${t.rule}`,
                    color: t.ink, textDecoration: "none",
                    fontSize: 13,
                  }}>
                    <span style={{ color: t.soft }}>{k}</span>
                    <span>{v}</span>
                  </a>
                ))}
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
            <span><span style={{ color: t.accent }}>$</span> {U.footerExit}</span>
          </div>
        </div>

        <style>{`
          .mn-card:hover { border-color: ${t.accent} !important; transform: translateY(-2px); }
          .mn-card:hover .mn-arr { transform: translateX(6px); }
          .mn-row:hover { background: ${t.panel}; }
          .mn-link:hover { color: ${t.accent}; }
          .mn-btn.primary:hover { transform: translateY(-2px); }
          .mn-btn.ghost:hover { border-color: ${t.accent}; color: ${t.accent}; }
        `}</style>
      </div>
    );
  };
})();
