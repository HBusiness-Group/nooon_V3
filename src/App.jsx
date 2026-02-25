
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Leaf, Sparkles, ShieldCheck, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOKENS = {
  brand: "NOOON",
  purpose: "Ecossistema financeiro — mais que meio de pagamento, um parceiro de negócios.",
  palette: {
    primary: "#2E4036",
    accent: "#CC5833",
    bg: "#F2F0E9",
    text: "#1A1A1A",
    dark: "#10110F",
  },
  mood: {
    hero:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2400&q=80",
    texture:
      "https://images.unsplash.com/photo-1528813860492-bb99459ec095?auto=format&fit=crop&w=2400&q=80",
    lab:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2400&q=80",
  },
  nav: [
    { id: "features", label: "Artefatos" },
    { id: "manifesto", label: "Filosofia" },
    { id: "protocolo", label: "Protocolo" },
    { id: "planos", label: "Rede" },
  ],
  cta: "Criar interesse na rede NOOON",
  values: ["Cliente", "Parceria", "Renda Extra"],
};

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!!m.matches);
    on();
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

function MagneticButton({ children, className, href, onClick, tone = "accent" }) {
  const isLink = !!href;
  const Comp = isLink ? "a" : "button";
  const accent = TOKENS.palette.accent;
  const primary = TOKENS.palette.primary;

  const bg = tone === "accent" ? accent : primary;
  const fg = "#F2F0E9";

  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        "btn-sweep mag inline-flex items-center justify-center gap-2 rounded-[999px] px-5 py-3 text-sm font-semibold tracking-tight soft-shadow",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      style={{
        background: bg,
        color: fg,
        border: "1px solid rgba(255,255,255,.18)",
        ringColor: bg,
      }}
    >
      <span
        className="sweep"
        aria-hidden="true"
        style={{
          background:
            tone === "accent"
              ? "linear-gradient(90deg, rgba(46,64,54,.0), rgba(46,64,54,.85))"
              : "linear-gradient(90deg, rgba(204,88,51,.0), rgba(204,88,51,.85))",
        }}
      />
      <span className="relative z-[1]">{children}</span>
    </Comp>
  );
}

/* ---------------- Navbar: Ilha Flutuante ---------------- */
function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setSolid(!e.isIntersecting);
      },
      { threshold: 0.1 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-40 flex justify-center px-3">
      <div
        className={cn(
          "round-premium flex w-full max-w-[1100px] items-center justify-between gap-3 px-4 py-3 md:px-6",
          "transition-all duration-500",
          solid ? "backdrop-blur-xl" : "bg-transparent"
        )}
        style={{
          background: solid ? "rgba(242,240,233,.70)" : "transparent",
          border: solid ? "1px solid rgba(46,64,54,.16)" : "1px solid rgba(255,255,255,.12)",
          boxShadow: solid ? "0 18px 60px rgba(0,0,0,.12)" : "0 18px 70px rgba(0,0,0,.0)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-[999px]"
            style={{
              background: solid ? "rgba(46,64,54,.10)" : "rgba(242,240,233,.10)",
              border: solid ? "1px solid rgba(46,64,54,.18)" : "1px solid rgba(255,255,255,.14)",
            }}
            aria-hidden="true"
          >
            <Leaf size={18} style={{ color: solid ? TOKENS.palette.primary : TOKENS.palette.bg }} />
          </div>

          <div className="leading-tight">
            <div
              className="font-heading text-sm font-semibold tracking-tight md:text-[15px]"
              style={{ color: solid ? TOKENS.palette.primary : "#F2F0E9" }}
            >
              {TOKENS.brand}
            </div>
            <div
              className="hidden text-[11px] md:block"
              style={{ color: solid ? "rgba(26,26,26,.68)" : "rgba(242,240,233,.70)" }}
            >
              ecossistema financeiro
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {TOKENS.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="mag text-sm font-medium tracking-tight"
              style={{ color: solid ? TOKENS.palette.primary : "rgba(242,240,233,.88)" }}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#planos"
            className={cn("mag hidden rounded-[999px] px-3 py-2 text-xs font-semibold md:inline-flex")}
            style={{
              background: solid ? "rgba(46,64,54,.08)" : "rgba(242,240,233,.10)",
              border: solid ? "1px solid rgba(46,64,54,.16)" : "1px solid rgba(255,255,255,.14)",
              color: solid ? TOKENS.palette.primary : TOKENS.palette.bg,
            }}
          >
            Ver rede <ChevronRight size={14} />
          </a>

          <MagneticButton href="#cta" className="text-xs md:text-sm">
            {TOKENS.cta} <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero: Cena de Abertura ---------------- */
function Hero() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { opacity: 0, y: 40 });
      gsap.to("[data-hero]", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="hero" ref={root} className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={TOKENS.mood.hero}
          alt="Textura orgânica e floresta escura"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(46,64,54,.92) 0%, rgba(16,17,15,.78) 55%, rgba(16,17,15,.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 700px at 18% 78%, rgba(204,88,51,.18), rgba(0,0,0,0) 58%)",
          }}
        />
      </div>

      <div className="relative z-[1] flex min-h-[100dvh] items-end">
        <div className="w-full px-5 pb-16 md:px-10 md:pb-20 lg:px-14">
          <div className="max-w-[980px]">
            <div
              data-hero
              className="inline-flex items-center gap-2 rounded-[999px] px-4 py-2 text-xs font-semibold tracking-tight"
              style={{
                background: "rgba(242,240,233,.10)",
                border: "1px solid rgba(255,255,255,.16)",
                color: "rgba(242,240,233,.86)",
              }}
            >
              <Sparkles size={14} />
              {"NOOON — ecossistema financeiro com presença: mais que pagamento, parceiro de negócios."}
            </div>

            <h1 className="mt-5 leading-[0.95]">
              <div
                data-hero
                className="font-heading text-[12.5vw] font-semibold tracking-[-0.04em] text-[#F2F0E9] md:text-[74px] lg:text-[86px]"
              >
                Parceria é o
              </div>
              <div
                data-hero
                className="font-drama text-[15.5vw] italic tracking-[-0.02em] md:text-[140px] lg:text-[170px]"
                style={{ color: "rgba(242,240,233,.96)" }}
              >
                diferencial.
              </div>
            </h1>

            <p
              data-hero
              className="mt-4 max-w-[760px] text-[15px] leading-relaxed md:text-[17px]"
              style={{ color: "rgba(242,240,233,.82)" }}
            >
              Na NOOON, você não vira “mais um CNPJ na fila”. Você tem atendimento de verdade — com contato
              direto com o responsável. A maquininha é só o começo: a parceria entra no seu caixa,
              ajusta o fluxo e constrói uma rede de uso que gera resultado contínuo.
            </p>

            <div data-hero className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#cta" className="w-full sm:w-auto">
                {TOKENS.cta} <ArrowRight size={16} />
              </MagneticButton>

              <a
                href="#features"
                className="mag inline-flex items-center justify-center gap-2 rounded-[999px] px-5 py-3 text-sm font-semibold tracking-tight"
                style={{
                  background: "rgba(242,240,233,.10)",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: "rgba(242,240,233,.90)",
                }}
              >
                Ver artefatos <ChevronRight size={16} />
              </a>
            </div>

            <div data-hero className="mt-10 grid max-w-[820px] grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { icon: <ShieldCheck size={16} />, title: "Atendimento próximo", sub: "Contato direto com o responsável." },
                { icon: <Sparkles size={16} />, title: "Estratégia no caixa", sub: "Ajuste de fluxo, taxa e mix." },
                { icon: <Leaf size={16} />, title: "Rede que rende", sub: "Mais pontos ativos, mais oportunidade." },
              ].map((k) => (
                <div
                  key={k.title}
                  className="round-premium flex items-center gap-3 px-4 py-3"
                  style={{
                    background: "rgba(242,240,233,.10)",
                    border: "1px solid rgba(255,255,255,.14)",
                  }}
                >
                  <div
                    className="grid h-9 w-9 place-items-center rounded-[999px]"
                    style={{
                      background: "rgba(204,88,51,.16)",
                      border: "1px solid rgba(204,88,51,.22)",
                    }}
                  >
                    <span style={{ color: TOKENS.palette.bg }}>{k.icon}</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold" style={{ color: TOKENS.palette.bg }}>
                      {k.title}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(242,240,233,.72)" }}>
                      {k.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
function Features() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-feat-head]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        "[data-feat-card]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="features" ref={root} className="relative px-5 py-20 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div data-feat-head className="flex items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(26,26,26,.55)" }}>
              ARTEFATOS FUNCIONAIS
            </div>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Micro-UIs que representam a rede.
            </h2>
            <p className="mt-3 max-w-[700px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(26,26,26,.72)" }}>
              Três sinais práticos do que a NOOON entrega: relação com o cliente, parceria operacional e renda extra com efeito de rede.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div data-feat-card className="round-premium hairline soft-shadow bg-[#F5F3EE] p-6">
            <FeatureShuffler
              title={TOKENS.values[0]}
              desc="Camadas de atenção que se reorganizam com o contexto do comércio — sem call center, sem frieza."
              labels={["Contato direto", "Resolução rápida", "Crescimento assistido"]}
            />
          </div>

          <div data-feat-card className="round-premium hairline soft-shadow bg-[#F5F3EE] p-6">
            <FeatureTypewriter
              title={TOKENS.values[1]}
              desc="Telemetria humana: alinhamento, rotina e ajustes rápidos com o parceiro — no ritmo do caixa."
              lines={[
                "Status: checkout estável • operação redonda",
                "Parceria ativa: ajuste de taxa e metas",
                "Ação sugerida: posicionar máquina no caixa 1",
                "Oportunidade: elevar ticket com parcelado",
                "Rotina: contato direto • resolução sem fila",
              ]}
            />
          </div>

          <div data-feat-card className="round-premium hairline soft-shadow bg-[#F5F3EE] p-6">
            <FeatureScheduler
              title={TOKENS.values[2]}
              desc="Protocolos simples que viram rotina — e rotina vira renda com efeito composto."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Card 1: Shuffler */
function FeatureShuffler({ title, desc, labels }) {
  const [stack, setStack] = useState([
    { k: "A", t: labels[0], s: "Nível 1 • proximidade" },
    { k: "B", t: labels[1], s: "Nível 2 • tato" },
    { k: "C", t: labels[2], s: "Nível 3 • expansão" },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading text-lg font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(26,26,26,.68)" }}>
            {desc}
          </p>
        </div>
        <div
          className="font-mono rounded-[999px] px-3 py-1 text-[11px]"
          style={{
            background: "rgba(46,64,54,.10)",
            border: "1px solid rgba(46,64,54,.16)",
            color: TOKENS.palette.primary,
          }}
        >
          ciclo • 3s
        </div>
      </div>

      <div className="relative mt-6 h-[220px]">
        {stack.map((it, idx) => {
          const z = 30 - idx;
          const y = idx * 10;
          const scale = 1 - idx * 0.04;
          const op = 1 - idx * 0.12;

          return (
            <div
              key={it.k}
              className="absolute inset-x-0 top-0 round-premium soft-shadow"
              style={{
                zIndex: z,
                transform: `translateY(${y}px) scale(${scale})`,
                opacity: op,
                transition:
                  "transform 650ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 650ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: idx === 0 ? "rgba(242,240,233,.95)" : "rgba(242,240,233,.75)",
                border: "1px solid rgba(26,26,26,.12)",
              }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
                    {it.s}
                  </div>
                  <div
                    className="h-2 w-2 rounded-[999px]"
                    style={{ background: idx === 0 ? TOKENS.palette.accent : "rgba(26,26,26,.22)" }}
                  />
                </div>
                <div className="mt-3 font-heading text-[15px] font-semibold tracking-tight">
                  {it.t}
                </div>
                <div className="mt-3 h-[1px]" style={{ background: "rgba(26,26,26,.10)" }} />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((n) => (
                    <div
                      key={n}
                      className="round-premium px-3 py-2"
                      style={{
                        background: "rgba(46,64,54,.06)",
                        border: "1px solid rgba(46,64,54,.10)",
                      }}
                    >
                      <div className="font-mono text-[10px]" style={{ color: "rgba(26,26,26,.55)" }}>
                        sinal
                      </div>
                      <div className="mt-1 text-xs font-semibold" style={{ color: TOKENS.palette.primary }}>
                        {["presença", "tato", "rotina"][n]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Card 2: Typewriter */
function FeatureTypewriter({ title, desc, lines }) {
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = lines[lineIdx % lines.length];
    const speed = 18;

    const t = setInterval(() => {
      setText((prev) => {
        const nextChar = current[charIdx];
        if (nextChar == null) return prev;
        return prev + nextChar;
      });

      setCharIdx((c) => c + 1);
    }, speed);

    return () => clearInterval(t);
  }, [charIdx, lineIdx, lines]);

  useEffect(() => {
    const current = lines[lineIdx % lines.length];
    if (charIdx > current.length + 8) {
      const timeout = setTimeout(() => {
        setText("");
        setCharIdx(0);
        setLineIdx((i) => (i + 1) % lines.length);
      }, 480);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, lineIdx, lines]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading text-lg font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(26,26,26,.68)" }}>
            {desc}
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-[999px] px-3 py-1 font-mono text-[11px]"
          style={{
            background: "rgba(204,88,51,.10)",
            border: "1px solid rgba(204,88,51,.18)",
            color: TOKENS.palette.accent,
          }}
        >
          <span className="pulse-dot inline-block h-2 w-2 rounded-[999px]" style={{ background: TOKENS.palette.accent }} />
          Feed ao Vivo
        </div>
      </div>

      <div
        className="mt-6 round-premium bg-[rgba(16,17,15,.92)] p-5 soft-shadow"
        style={{ border: "1px solid rgba(46,64,54,.28)" }}
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.70)" }}>
            telemetria • parceria
          </div>
          <div className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.55)" }}>
            canal: contato direto
          </div>
        </div>

        <div className="mt-4 font-mono text-[13px] leading-relaxed" style={{ color: "rgba(242,240,233,.88)" }}>
          {text}
          <span className="cursor-blink" style={{ color: TOKENS.palette.accent }}>
            ▍
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { k: "meta", v: "crescer" },
            { k: "ajuste", v: "tático" },
            { k: "presença", v: "real" },
          ].map((x) => (
            <div
              key={x.k}
              className="round-premium px-3 py-2"
              style={{ background: "rgba(242,240,233,.06)", border: "1px solid rgba(242,240,233,.12)" }}
            >
              <div className="font-mono text-[10px]" style={{ color: "rgba(242,240,233,.55)" }}>
                {x.k}
              </div>
              <div className="mt-1 text-xs font-semibold" style={{ color: "rgba(242,240,233,.90)" }}>
                {x.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Card 3: Scheduler */
function FeatureScheduler({ title, desc }) {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [active, setActive] = useState(2);
  const cursorRef = useRef(null);
  const btnRef = useRef(null);
  const gridRefs = useRef([]);
  gridRefs.current = [];

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let killed = false;

    const run = async () => {
      while (!killed) {
        cursor.style.opacity = "0";
        cursor.style.transform = "translate(-18px, -18px)";
        await wait(380);

        cursor.style.opacity = "1";

        const idx = Math.floor(Math.random() * 7);
        const cell = gridRefs.current[idx];
        if (!cell) continue;

        const a = cell.getBoundingClientRect();
        const host = cell.offsetParent.getBoundingClientRect();

        const x = a.left - host.left + a.width * 0.66;
        const y = a.top - host.top + a.height * 0.66;

        cursor.style.transition =
          "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 300ms ease";
        cursor.style.transform = `translate(${x}px, ${y}px)`;

        await wait(760);

        cell.style.transform = "scale(0.95)";
        setActive(idx);
        await wait(110);
        cell.style.transform = "scale(1)";

        await wait(350);

        const b = btnRef.current?.getBoundingClientRect();
        if (b) {
          const bx = b.left - host.left + b.width * 0.8;
          const by = b.top - host.top + b.height * 0.5;
          cursor.style.transform = `translate(${bx}px, ${by}px)`;
          await wait(720);

          btnRef.current.style.transform = "translateY(-1px) scale(0.98)";
          await wait(120);
          btnRef.current.style.transform = "translateY(0px) scale(1)";
        }

        await wait(420);
        cursor.style.opacity = "0";
        await wait(520);
      }
    };

    run();
    return () => {
      killed = true;
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading text-lg font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(26,26,26,.68)" }}>
            {desc}
          </p>
        </div>
        <div
          className="font-mono rounded-[999px] px-3 py-1 text-[11px]"
          style={{
            background: "rgba(46,64,54,.10)",
            border: "1px solid rgba(46,64,54,.16)",
            color: TOKENS.palette.primary,
          }}
        >
          protocolo
        </div>
      </div>

      <div
        className="mt-6 round-premium p-5 soft-shadow"
        style={{ background: "rgba(242,240,233,.92)", border: "1px solid rgba(26,26,26,.12)" }}
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
            agenda semanal
          </div>
          <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
            ação: ativar rotina
          </div>
        </div>

        <div className="relative mt-4">
          <div className="grid grid-cols-7 gap-2">
            {days.map((d, i) => (
              <div
                key={d + i}
                ref={(el) => el && gridRefs.current.push(el)}
                className="round-premium grid place-items-center py-4 transition-transform"
                style={{
                  background: i === active ? "rgba(204,88,51,.14)" : "rgba(46,64,54,.06)",
                  border: i === active ? "1px solid rgba(204,88,51,.28)" : "1px solid rgba(46,64,54,.12)",
                  color: i === active ? TOKENS.palette.accent : TOKENS.palette.primary,
                }}
              >
                <div className="font-heading text-sm font-semibold">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
              ativo: dia {active + 1}/7
            </div>
            <button
              ref={btnRef}
              className="mag rounded-[999px] px-4 py-2 text-xs font-semibold"
              style={{
                background: TOKENS.palette.primary,
                color: TOKENS.palette.bg,
                border: "1px solid rgba(255,255,255,.16)",
              }}
            >
              Salvar
            </button>
          </div>

          <div
            ref={cursorRef}
            className="pointer-events-none absolute left-0 top-0"
            style={{ opacity: 0, transform: "translate(-18px, -18px)" }}
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4l8.8 16 2-6.2L21 12 4 4Z"
                stroke={TOKENS.palette.accent}
                strokeWidth="1.7"
                fill="rgba(204,88,51,.12)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ---------------- Filosofia: Manifesto ---------------- */
function Philosophy() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  const lines = useMemo(() => {
    return {
      small: "A maioria do setor foca em: escala fria, call center e número de protocolo.",
      big: "Nós focamos em: presença real — com contato direto e parceria no caixa.",
      highlight: "presença real",
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-parallax]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const el = root.current?.querySelector("[data-split]");
      if (el) {
        const raw = el.getAttribute("data-raw") || "";
        const words = raw.split(" ").filter(Boolean);
        el.innerHTML = words
          .map(
            (w) =>
              `<span class="inline-block will-change-transform opacity-0 translate-y-[14px]">${w}&nbsp;</span>`
          )
          .join("");

        const spans = el.querySelectorAll("span");
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative overflow-hidden px-5 py-24 md:px-10 lg:px-14"
      style={{ background: TOKENS.palette.dark, color: TOKENS.palette.bg }}
    >
      <div className="absolute inset-0 opacity-[0.22]">
        <img data-parallax src={TOKENS.mood.texture} alt="Textura orgânica" className="h-[120%] w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 25% 35%, rgba(204,88,51,.22), rgba(0,0,0,0) 55%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,240,233,.62)" }}>
          O MANIFESTO
        </div>

        <div className="mt-6 max-w-[920px]">
          <p className="text-[15px] leading-relaxed md:text-[16px]" style={{ color: "rgba(242,240,233,.78)" }}>
            {lines.small}
          </p>

          <div className="mt-7">
            <div
              data-split
              data-raw={lines.big}
              className="font-drama text-[11vw] italic leading-[0.95] tracking-[-0.02em] md:text-[78px]"
            />
            <div className="mt-5">
              <span className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.60)" }}>
                palavra-chave:
              </span>{" "}
              <span className="font-mono text-[11px]" style={{ color: TOKENS.palette.accent }}>
                {lines.highlight}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { t: "Contato direto", s: "Você fala com quem resolve — sem teatro, sem repasse infinito." },
            { t: "Tato comercial", s: "Ajuste de caixa, rotina e suporte com presença no dia a dia." },
            { t: "Efeito de rede", s: "Mais pontos usando NOOON = mais confiança e mais oportunidades." },
          ].map((x) => (
            <div
              key={x.t}
              className="round-premium p-6"
              style={{ background: "rgba(242,240,233,.06)", border: "1px solid rgba(242,240,233,.12)" }}
            >
              <div className="font-heading text-lg font-semibold tracking-tight">{x.t}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(242,240,233,.76)" }}>
                {x.s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Protocolo Sticky ---------------- */
function Protocol() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-proto-card]");
      const wrap = root.current?.querySelector("[data-proto-wrap]");
      if (!wrap || cards.length < 3) return;

      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: `+=${window.innerHeight * 2.2}`,
        pin: true,
        anticipatePin: 1,
      });

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrap,
              start: `top+=${i * window.innerHeight * 0.7} top`,
              end: `top+=${(i + 1) * window.innerHeight * 0.7} top`,
              scrub: false,
            },
          }
        );

        if (!isLast) {
          const nextStart = `top+=${(i + 1) * window.innerHeight * 0.7} top`;
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.55,
            filter: "blur(20px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: wrap,
              start: nextStart,
              end: `top+=${(i + 1) * window.innerHeight * 0.7 + 1} top`,
              scrub: true,
            },
          });
        }
      });

      gsap.to("[data-geo-rot]", {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 14,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-laser]", {
        x: 260,
        duration: 2.3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to("[data-ecg]", {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const steps = [
    { n: "01", title: "Ativar o ponto", desc: "Máquina ativa, posicionamento certo e rotina de suporte.", art: <ProtoHelix /> },
    { n: "02", title: "Ajustar o caixa", desc: "Taxa, mix de pagamentos e estratégia no balcão.", art: <ProtoLaser /> },
    { n: "03", title: "Expandir a rede", desc: "Cada parceiro abre caminho para o próximo — efeito composto.", art: <ProtoECG /> },
  ];

  return (
    <section id="protocolo" ref={root} className="px-5 py-24 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(26,26,26,.55)" }}>
          ARQUIVO EMPILHÁVEL STICKY
        </div>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Protocolo NOOON de crescimento contínuo.
        </h2>
        <p className="mt-3 max-w-[800px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(26,26,26,.72)" }}>
          Um processo simples para o comércio: ativar o ponto, ajustar o caixa e expandir a rede — com presença e método.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[1100px]" data-proto-wrap>
        <div className="relative h-[78vh] md:h-[80vh]">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-proto-card
              className="absolute inset-0 round-hero soft-shadow"
              style={{
                background: i === 1 ? "rgba(242,240,233,.96)" : "rgba(245,243,238,.96)",
                border: "1px solid rgba(26,26,26,.12)",
              }}
            >
              <div className="grid h-full grid-cols-1 gap-8 p-7 md:grid-cols-2 md:p-10">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(26,26,26,.55)" }}>
                      PASSO {s.n}
                    </div>
                    <div className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                      {s.title}
                    </div>
                    <div className="mt-3 max-w-[440px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(26,26,26,.72)" }}>
                      {s.desc}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-[999px]" style={{ background: TOKENS.palette.accent }} />
                    <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
                      método: presença real + ajuste de caixa
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">{s.art}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="font-mono text-[11px]" style={{ color: "rgba(26,26,26,.55)" }}>
            scroll para empilhar • transições com peso
          </div>
          <MagneticButton href="#planos" tone="primary">
            Ver rede <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function ProtoHelix() {
  const a = TOKENS.palette.accent;
  const p = TOKENS.palette.primary;
  return (
    <div className="round-hero grid place-items-center p-6" style={{ background: "rgba(46,64,54,.06)", border: "1px solid rgba(46,64,54,.12)" }}>
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        <g data-geo-rot>
          <circle cx="160" cy="160" r="104" stroke="rgba(46,64,54,.28)" strokeWidth="2" />
          <circle cx="160" cy="160" r="74" stroke="rgba(46,64,54,.18)" strokeWidth="2" />
          <path d="M90 220 C120 120, 200 200, 230 100" stroke={a} strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          <path d="M90 100 C120 200, 200 120, 230 220" stroke={p} strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

function ProtoLaser() {
  const a = TOKENS.palette.accent;
  return (
    <div className="round-hero grid place-items-center p-6" style={{ background: "rgba(46,64,54,.06)", border: "1px solid rgba(46,64,54,.12)" }}>
      <svg width="340" height="260" viewBox="0 0 340 260" fill="none">
        {Array.from({ length: 10 }).map((_, r) =>
          Array.from({ length: 12 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={30 + c * 24} cy={30 + r * 22} r="1.8" fill="rgba(46,64,54,.22)" />
          ))
        )}
        <g data-laser>
          <rect x="0" y="128" width="120" height="2.2" fill={a} opacity="0.9" />
          <rect x="0" y="120" width="120" height="18" fill="rgba(204,88,51,.10)" />
        </g>
        <rect x="20" y="20" width="300" height="220" rx="28" stroke="rgba(46,64,54,.24)" strokeWidth="2" />
      </svg>
    </div>
  );
}

function ProtoECG() {
  const a = TOKENS.palette.accent;
  return (
    <div className="round-hero grid place-items-center p-6" style={{ background: "rgba(46,64,54,.06)", border: "1px solid rgba(46,64,54,.12)" }}>
      <svg width="340" height="240" viewBox="0 0 340 240" fill="none">
        <path
          d="M20 120 H80 L98 78 L118 160 L140 110 L166 120 H220 L240 92 L262 150 L286 120 H320"
          stroke={a}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="560"
          strokeDashoffset="560"
          data-ecg
        />
        <path d="M20 168 H320" stroke="rgba(46,64,54,.22)" strokeWidth="2" strokeLinecap="round" />
        <rect x="18" y="24" width="304" height="192" rx="28" stroke="rgba(46,64,54,.24)" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* ---------------- Planos ---------------- */
function Pricing() {
  const tiers = [
    { name: "Essencial", tag: "Entrada na rede", bullets: ["Ativação do ponto", "Rotina de suporte", "Sinalização e orientação"], cta: "Quero começar", featured: false },
    { name: "Performance", tag: "Parceiro ativo", bullets: ["Ajuste de fluxo e taxa", "Estratégia de caixa", "Contato direto e recorrente"], cta: "Quero ser parceiro", featured: true },
    { name: "Enterprise", tag: "Rede expandida", bullets: ["Múltiplos pontos", "Padronização de operação", "Plano de expansão por região"], cta: "Quero escalar", featured: false },
  ];

  return (
    <section id="planos" className="px-5 py-24 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(26,26,26,.55)" }}>
          PLANOS PARA A REDE
        </div>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Cresça por presença — não por promessa.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(26,26,26,.72)" }}>
          Para criar interesse e adesão, o caminho é simples: começar, performar, escalar.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn("round-hero soft-shadow p-7 md:p-8", t.featured ? "scale-[1.02]" : "")}
              style={{
                background: t.featured ? TOKENS.palette.primary : "rgba(245,243,238,.96)",
                border: t.featured ? "1px solid rgba(204,88,51,.30)" : "1px solid rgba(26,26,26,.12)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs tracking-[0.18em]" style={{ color: t.featured ? "rgba(242,240,233,.72)" : "rgba(26,26,26,.55)" }}>
                    {t.tag}
                  </div>
                  <div className="mt-3 font-heading text-2xl font-semibold tracking-[-0.04em]" style={{ color: t.featured ? TOKENS.palette.bg : TOKENS.palette.text }}>
                    {t.name}
                  </div>
                </div>

                <div
                  className="rounded-[999px] px-3 py-1 font-mono text-[11px]"
                  style={{
                    background: t.featured ? "rgba(204,88,51,.18)" : "rgba(46,64,54,.10)",
                    border: t.featured ? "1px solid rgba(204,88,51,.24)" : "1px solid rgba(46,64,54,.16)",
                    color: t.featured ? TOKENS.palette.bg : TOKENS.palette.primary,
                  }}
                >
                  NOOON
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {t.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-[999px]" style={{ background: t.featured ? TOKENS.palette.accent : TOKENS.palette.primary }} />
                    <div className="text-sm leading-relaxed" style={{ color: t.featured ? "rgba(242,240,233,.82)" : "rgba(26,26,26,.72)" }}>
                      {b}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton href="#cta" tone={t.featured ? "accent" : "primary"} className="w-full justify-center">
                  {t.cta} <ArrowRight size={16} />
                </MagneticButton>
              </div>

              <div className="mt-4 font-mono text-[11px]" style={{ color: t.featured ? "rgba(242,240,233,.62)" : "rgba(26,26,26,.55)" }}>
                decisão: entrar na rede com consistência
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA Final ---------------- */
function FinalCTA() {
  return (
    <section id="cta" className="px-5 pb-24 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div
          className="round-hero soft-shadow overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(46,64,54,.92), rgba(16,17,15,.94))",
            border: "1px solid rgba(204,88,51,.22)",
          }}
        >
          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,240,233,.66)" }}>
                ATIVAÇÃO DE INTERESSE
              </div>
              <div className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em]" style={{ color: TOKENS.palette.bg }}>
                Vamos acender a rede — ponto a ponto.
              </div>
              <p className="mt-3 text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(242,240,233,.80)" }}>
                Se a meta é criar uma rede de uso dos equipamentos NOOON, o primeiro passo é simples:
                deixar claro o valor no caixa e manter presença. O resto vira efeito composto.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("CTA pronto: aqui você conecta WhatsApp/formulário/CRM.");
                  }}
                >
                  {TOKENS.cta} <ArrowRight size={16} />
                </MagneticButton>

                <div className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.62)" }}>
                  integração sugerida: WhatsApp / formulário / CRM
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 opacity-[0.22]">
                <img src={TOKENS.mood.lab} alt="Vidraria de laboratório" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.75))" }} />
              </div>

              <div className="relative round-hero p-6" style={{ background: "rgba(242,240,233,.08)", border: "1px solid rgba(242,240,233,.14)" }}>
                <div className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.72)" }}>
                  checklist de ativação
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    "Escolher o ponto (fluxo real do caixa)",
                    "Rotina de suporte e revisão de taxa",
                    "Ajustar mix: débito, crédito, parcelado, pix",
                    "Converter presença em expansão (indicação/rede)",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-[999px]" style={{ background: TOKENS.palette.accent }} />
                      <div className="text-sm leading-relaxed" style={{ color: "rgba(242,240,233,.82)" }}>
                        {x}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 round-premium p-4" style={{ background: "rgba(242,240,233,.08)", border: "1px solid rgba(242,240,233,.12)" }}>
                  <div className="font-mono text-[10px]" style={{ color: "rgba(242,240,233,.60)" }}>
                    sinal de saúde
                  </div>
                  <div className="mt-1 text-sm font-semibold" style={{ color: TOKENS.palette.bg }}>
                    crescimento sustentável com presença.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="rounded-t-[4rem] px-5 py-16 md:px-10 lg:px-14" style={{ background: TOKENS.palette.dark, color: TOKENS.palette.bg }}>
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-heading text-2xl font-semibold tracking-[-0.04em]">{TOKENS.brand}</div>
            <p className="mt-3 max-w-[560px] text-sm leading-relaxed" style={{ color: "rgba(242,240,233,.78)" }}>
              Ecossistema financeiro que se comporta como parceiro de negócios — com método, rotina e presença real.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 round-premium px-4 py-3" style={{ background: "rgba(242,240,233,.06)", border: "1px solid rgba(242,240,233,.12)" }}>
              <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-[999px]" style={{ background: "#2ECC71" }} />
              <span className="font-mono text-[11px]" style={{ color: "rgba(242,240,233,.78)" }}>
                Sistema Operacional: ONLINE
              </span>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,240,233,.62)" }}>
              NAVEGAÇÃO
            </div>
            <div className="mt-4 space-y-2">
              {TOKENS.nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="mag block text-sm font-medium" style={{ color: "rgba(242,240,233,.82)" }}>
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,240,233,.62)" }}>
              LEGAL
            </div>
            <div className="mt-4 space-y-2">
              {["Termos", "Privacidade", "Contato"].map((x) => (
                <a key={x} href="#" onClick={(e) => e.preventDefault()} className="mag block text-sm font-medium" style={{ color: "rgba(242,240,233,.82)" }}>
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 h-[1px]" style={{ background: "rgba(242,240,233,.10)" }} />
        <div className="mt-6 flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between" style={{ color: "rgba(242,240,233,.62)" }}>
          <div className="font-mono">© {new Date().getFullYear()} {TOKENS.brand}. Instrumento digital.</div>
          <div className="font-mono">Preset A • Tech Orgânico</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
