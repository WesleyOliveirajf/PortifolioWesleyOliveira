// Variação 1 — Editorial
// Serif clássica, papel creme, coluna estreita, hierarquia silenciosa.
// Inspirações: revistas literárias, monografias, sites tipo cabel.io
// Aporte: numerais romanos, hairlines, italic flourishes.

(function() {
  const tone = {
    bg:      "#F6F2EA",
    paper:   "#FBF8F1",
    ink:     "#161412",
    soft:    "#5A554C",
    rule:    "#D9D2C2",
    accent:  "#9C2A1B",  // bordô discreto, só p/ links
  };

  // Placeholder de capa do projeto: gradiente duotone discreto sobre papel
  function ProjectCover({ p, h }) {
    const a = `oklch(82% 0.04 ${p.hue})`;
    const b = `oklch(36% 0.06 ${p.hue})`;
    return (
      <div style={{
        position: "relative",
        height: h,
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
        overflow: "hidden",
        borderRadius: 0,
      }}>
        {/* paper grain */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 50%)," +
            "radial-gradient(circle at 80% 90%, rgba(0,0,0,.18), transparent 55%)",
          mixBlendMode: "overlay",
        }}/>
        <div style={{
          position: "absolute", left: 24, bottom: 20, right: 24,
          color: "rgba(255,255,255,.92)",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
          display: "flex", justifyContent: "space-between",
        }}>
          <span>{p.kind}</span>
          <span>{p.year}</span>
        </div>
        <div style={{
          position: "absolute", left: 24, top: 22,
          color: "rgba(255,255,255,.92)",
          fontFamily: "'Instrument Serif', serif",
          fontSize: 44, lineHeight: 1, letterSpacing: "-.01em",
        }}>{p.title}</div>
      </div>
    );
  }

  function Rule() {
    return <div style={{ height: 1, background: tone.rule, width: "100%" }}/>;
  }

  function SectionHead({ num, label }) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 28 }}>
        <span style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
          color: tone.soft,
        }}>{num}</span>
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 28, fontStyle: "italic",
          color: tone.ink,
        }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: tone.rule, transform: "translateY(-6px)" }}/>
      </div>
    );
  }

  window.EditorialPortfolio = function EditorialPortfolio() {
    const { lang } = window.usePortfolioLocale();
    const root = window.PORTFOLIO;
    const L = root[lang] || root.pt;
    const Te = L.tpl.editorial;
    const U = L.ui;
    const P = { name: root.name, initials: root.initials, yearsExp: root.yearsExp, links: root.links, ...L };

    return (
      <div style={{
        background: tone.bg,
        color: tone.ink,
        minHeight: "100%",
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: 15,
        lineHeight: 1.65,
        padding: "72px 96px 96px",
      }}>
        {/* TOPO — meta */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
          color: tone.soft, marginBottom: 88,
        }}>
          <span>{P.name} — {Te.portfolioVer}</span>
          <span>{P.location} · {Te.avail}</span>
        </div>

        {/* HERO */}
        <div style={{ maxWidth: 880 }}>
          <div style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase",
            color: tone.accent, marginBottom: 28,
          }}>
            {L.role} &nbsp;·&nbsp; {L.seniority}
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 124,
            lineHeight: 0.95,
            margin: 0,
            letterSpacing: "-.02em",
            fontWeight: 400,
          }}>
            Wesley<br/>
            <em style={{ fontStyle: "italic" }}>Oliveira</em>
            <span style={{ color: tone.accent }}>.</span>
          </h1>
          <p style={{
            marginTop: 40,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 28, lineHeight: 1.35,
            fontStyle: "italic",
            color: tone.ink, maxWidth: 720,
            fontWeight: 400,
          }}>
            “{P.intro}”
          </p>
        </div>

        <div style={{ height: 96 }}/>
        <Rule/>
        <div style={{ height: 64 }}/>

        {/* SOBRE */}
        <SectionHead num="I." label={Te.sectionAbout}/>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 64, maxWidth: 980 }}>
          <div>
            <div style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
              color: tone.soft, lineHeight: 1.9,
            }}>
              <div>{Te.loc}</div>
              <div style={{ color: tone.ink, textTransform: "none", letterSpacing: 0, fontFamily: "'Geist', sans-serif", fontSize: 14 }}>{P.location}</div>
              <div style={{ marginTop: 18 }}>{Te.exp}</div>
              <div style={{ color: tone.ink, textTransform: "none", letterSpacing: 0, fontFamily: "'Geist', sans-serif", fontSize: 14 }}>{P.yearsExp} {U.yearsShort}</div>
              <div style={{ marginTop: 18 }}>{Te.status}</div>
              <div style={{ color: tone.ink, textTransform: "none", letterSpacing: 0, fontFamily: "'Geist', sans-serif", fontSize: 14 }}>{Te.statusVal}</div>
            </div>
          </div>
          <div style={{ maxWidth: 640 }}>
            {P.longBio.map((par, i) => (
              <p key={i} style={{ marginTop: i ? 18 : 0, fontSize: 17, lineHeight: 1.7, color: tone.ink }}>
                {par}
              </p>
            ))}
          </div>
        </div>

        <div style={{ height: 112 }}/>

        {/* PROJETOS */}
        <SectionHead num="II." label={Te.sectionProjects}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px 48px" }}>
          {P.projects.map((p, i) => (
            <article key={p.id} className="ed-card" style={{ cursor: "pointer" }}>
              <ProjectCover p={p} h={300}/>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                <div>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 30, lineHeight: 1, letterSpacing: "-.01em",
                  }}>
                    {p.title} <em style={{ color: tone.soft, fontSize: 18, marginLeft: 6 }}>— {p.year}</em>
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                    color: tone.soft,
                  }}>{p.kind} · {p.role}</div>
                </div>
                <span className="ed-arrow" style={{
                  fontFamily: "'Instrument Serif', serif", fontSize: 30,
                  fontStyle: "italic", color: tone.accent,
                  transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
                }}>→</span>
              </div>
              <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, color: tone.ink, maxWidth: 480 }}>
                {p.summary}
              </p>
              <div style={{
                marginTop: 14,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11, letterSpacing: ".08em",
                color: tone.soft,
              }}>
                {p.stack.join("  ·  ")}
              </div>
            </article>
          ))}
        </div>

        <div style={{ height: 112 }}/>

        {/* EXPERIÊNCIA */}
        <SectionHead num="III." label={Te.sectionExp}/>
        <div style={{ maxWidth: 980 }}>
          {P.experience.map((e, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "200px 1fr",
              gap: 64,
              padding: "28px 0",
              borderTop: `1px solid ${tone.rule}`,
              ...(i === P.experience.length - 1 ? { borderBottom: `1px solid ${tone.rule}` } : {}),
            }}>
              <div style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                color: tone.soft, paddingTop: 6,
              }}>{e.period}</div>
              <div>
                <div style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 26, lineHeight: 1.15, letterSpacing: "-.01em",
                }}>
                  {e.role} <em style={{ color: tone.soft }}>— {e.company}</em>
                </div>
                <div style={{
                  marginTop: 4,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                  color: tone.soft,
                }}>{e.kind}</div>
                <ul style={{ marginTop: 14, paddingLeft: 18, color: tone.ink }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ marginBottom: 6, fontSize: 15, lineHeight: 1.6 }}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 112 }}/>

        {/* HABILIDADES */}
        <SectionHead num="IV." label={Te.sectionStack}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px 64px", maxWidth: 980 }}>
          {Object.entries(P.stack).map(([cat, items]) => (
            <div key={cat}>
              <div style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                color: tone.soft, marginBottom: 12,
              }}>{cat}</div>
              <div style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 22, lineHeight: 1.45,
                fontStyle: "italic",
              }}>
                {items.join(" · ")}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 128 }}/>

        {/* CTA / CV / CONTATO */}
        <Rule/>
        <div style={{ marginTop: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
              color: tone.soft, marginBottom: 16,
            }}>{Te.contactNum} {Te.contact}</div>
            <div style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 64, lineHeight: 1, letterSpacing: "-.02em",
            }}>
              {Te.ctaLets}<em>{Te.ctaTalk}</em>
              <span style={{ color: tone.accent }}>{Te.ctaQ}</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 16, color: tone.ink, lineHeight: 1.8 }}>
              <div><span style={{ color: tone.soft, fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginRight: 16 }}>linkedin</span><a href={P.links.linkedinUrl} style={{ color: tone.ink }}>{P.links.linkedin}</a></div>
              <div><span style={{ color: tone.soft, fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginRight: 16 }}>github&nbsp;&nbsp;</span><a href={P.links.githubUrl} style={{ color: tone.ink }}>{P.links.github}</a></div>
              <div><span style={{ color: tone.soft, fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginRight: 16 }}>email&nbsp;&nbsp;&nbsp;</span><a href={`mailto:${P.links.email}`} style={{ color: tone.ink }}>{P.links.email}</a></div>
            </div>
          </div>
          <button className="ed-cv" style={{
            border: `1px solid ${tone.ink}`,
            background: tone.ink,
            color: tone.paper,
            padding: "20px 32px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase",
            cursor: "pointer",
            transition: "all .25s ease",
          }}>
            {Te.downloadCv}
          </button>
        </div>

        <div style={{ height: 80 }}/>
        <div style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase",
          color: tone.soft, textAlign: "center", marginTop: 40,
        }}>
          {Te.footer}
        </div>

        {/* hovers */}
        <style>{`
          .ed-card:hover .ed-arrow { transform: translateX(8px); }
          .ed-card { transition: opacity .3s ease; }
          .ed-cv:hover { background: ${tone.accent}; border-color: ${tone.accent}; }
        `}</style>
      </div>
    );
  };
})();
