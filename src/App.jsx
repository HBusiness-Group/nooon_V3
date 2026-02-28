const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Network,
  Wallet,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  portal: "https://portal.nooon.com.br",
  supersocio: "https://supersocio.com.br",
  instagram: "https://instagram.com/nooon.pagamentos",
  hbusiness: "https://hbusiness-group.com.br",
  whatsapp: "https://wa.me/5584987885959",
  whatsappPrefill: (data) => {
    const msg = `Olá! Quero iniciar minha rede NOOON e ativar meus primeiros pontos.

Nome: ${data.nome || "-"}
Cidade/UF: ${data.cidade || "-"}
WhatsApp: ${data.whats || "-"}
Já trabalho com vendas: ${data.vendas || "-"}
Meta de pontos: ${data.pontos || "-"}

Quero entender como funciona comissão recorrente e suporte de ativação.`;
    return `https://wa.me/5584987885959?text=${encodeURIComponent(msg)}`;
  },
};

const TOKENS = {
  brand: "NOOON",
  palette: {
    deep: "#0B140D",
    primary: "#2e6417",
    neon: "#74cc00",
    paper: "#F2F5EF",
    ink: "#0E0F10",
    slate: "#121A13",
  },
  nav: [
    { id: "como-funciona", label: "Como funciona" },
    { id: "ecossistema", label: "Ecossistema" },
    { id: "supersocio", label: "SuperSócio" },
    { id: "parceiro", label: "Seja Parceiro" },
  ],
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

function MagneticButton({ children, className, href, onClick, tone = "neon", ...props }) {
  const isLink = !!href;
  const Comp = isLink ? "a" : "button";

  const bg =
    tone === "neon"
      ? TOKENS.palette.neon
      : tone === "primary"
        ? TOKENS.palette.primary
        : "rgba(242,245,239,.10)";

  const fg =
    tone === "ghost"
      ? "rgba(242,245,239,.90)"
      : tone === "primary"
        ? TOKENS.palette.paper
        : TOKENS.palette.ink;

  const border =
    tone === "ghost"
      ? "1px solid rgba(242,245,239,.16)"
      : tone === "primary"
        ? "1px solid rgba(255,255,255,.14)"
        : "1px solid rgba(0,0,0,.10)";

  return (
    <Comp
      href={href}
      onClick={onClick}
      {...props}
      className={cn(
        "btn-sweep mag inline-flex items-center justify-center gap-2 rounded-[999px] px-5 py-3 text-sm font-semibold tracking-tight soft-shadow",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      style={{
        background: bg,
        color: fg,
        border,
        boxShadow:
          tone === "neon"
            ? "0 18px 60px rgba(0,0,0,.22), 0 0 24px rgba(116,204,0,.22)"
            : undefined,
      }}
    >
      <span
        className="sweep"
        aria-hidden="true"
        style={{
          background:
            tone === "neon"
              ? "linear-gradient(90deg, rgba(46,100,23,0), rgba(46,100,23,.75))"
              : "linear-gradient(90deg, rgba(116,204,0,0), rgba(116,204,0,.45))",
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
      (entries) => setSolid(!entries[0].isIntersecting),
      { threshold: 0.1 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 z-40 flex justify-center px-3" style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}>
      <div
        className={cn(
          "round-premium flex w-full max-w-[1100px] items-center justify-between gap-3 px-4 py-3 md:px-6",
          "transition-all duration-500",
          "backdrop-blur-xl"
        )}
        style={{
          background: solid ? "rgba(242,245,239,.82)" : "rgba(11,20,13,.38)",
          border: solid
            ? "1px solid rgba(46,100,23,.18)"
            : "1px solid rgba(242,245,239,.16)",
          boxShadow: solid ? "0 18px 60px rgba(0,0,0,.12)" : "0 18px 70px rgba(0,0,0,.22)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          backdropFilter: "blur(18px) saturate(160%)",
        }}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="assets/nooon_0.png"
            alt="NOOON"
            className="h-10 md:h-12 w-auto object-contain"
            loading="eager"
          />
          <div className="leading-tight">
            <div
              className="font-heading text-sm font-semibold tracking-tight md:text-[15px]"
              style={{ color: solid ? TOKENS.palette.primary : TOKENS.palette.paper }}
            >
              {TOKENS.brand}
            </div>
            <div
              className="hidden text-[11px] md:block"
              style={{ color: solid ? "rgba(14,15,16,.62)" : "rgba(242,245,239,.70)" }}
            >
              rede de renda recorrente
            </div>
          </div>
        </a>

        {/* Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {TOKENS.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="mag text-sm font-medium tracking-tight"
              style={{ color: solid ? TOKENS.palette.primary : "rgba(242,245,239,.88)" }}
            >
              {n.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile + Desktop: manter dois botões acessíveis */}
          <a
            href="equipamentos.html"
            className={cn("mag inline-flex items-center gap-2 rounded-[999px] px-3 py-2 text-xs font-semibold md:px-4 md:py-2.5")}
            style={{
              background: solid ? "rgba(46,100,23,.08)" : "rgba(242,245,239,.10)",
              border: solid ? "1px solid rgba(46,100,23,.16)" : "1px solid rgba(242,245,239,.14)",
              color: solid ? TOKENS.palette.primary : TOKENS.palette.paper,
            }}
          >
            Equipamentos <ChevronRight size={14} />
          </a>

          <MagneticButton
            href={LINKS.portal}
            target="_blank"
            rel="noreferrer"
            tone="neon"
            className="px-4 py-2 text-xs md:text-sm md:px-5 md:py-2.5"
            aria-label="Abrir Portal NOOON"
          >
            Portal <ExternalLink size={12} />
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

  // ✅ Hero com imagem em branco
  const heroImg = asset("nooon_hero.png");
  // ✅ Textura estilo Matrix
  const textureImg = asset("nooon_paper.png");

  return (
    <section id="hero" ref={root} className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="NOOON" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(900px 700px at 18% 72%, rgba(116,204,0,.18), rgba(0,0,0,0) 58%),
              radial-gradient(900px 700px at 78% 32%, rgba(46,100,23,.28), rgba(0,0,0,0) 55%),
              linear-gradient(to top, rgba(11,20,13,.94) 0%, rgba(11,20,13,.78) 55%, rgba(11,20,13,.58) 100%)
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10]">
          <img src={textureImg} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-[1] flex min-h-[100dvh] items-end pt-[104px] md:pt-[28px]">
        <div className="w-full px-5 pb-16 md:px-10 md:pb-20 lg:px-14">
          <div className="max-w-[980px]">
            <div
              data-hero
              className="inline-flex items-center gap-2 rounded-[999px] px-4 py-2 text-xs font-semibold tracking-tight"
              style={{
                background: "rgba(242,245,239,.10)",
                border: "1px solid rgba(242,245,239,.16)",
                color: "rgba(242,245,239,.86)",
              }}
            >
              <Sparkles size={14} />
              {"Para parceiros independentes: construa sua própria rede e ganhe comissões recorrentes."}
            </div>

            <h1 className="mt-5 leading-[0.95]">
              <div
                data-hero
                className="font-heading text-[12.5vw] font-semibold tracking-[-0.05em] text-[#F2F5EF] md:text-[72px] lg:text-[84px]"
              >
                Transforme conexões em
              </div>
              <div
                data-hero
                className="font-drama text-[15.5vw] italic tracking-[-0.02em] md:text-[140px] lg:text-[170px]"
                style={{ color: TOKENS.palette.neon }}
              >
                renda própria.
              </div>
            </h1>

            <p
              data-hero
              className="mt-4 max-w-[780px] text-[15px] leading-relaxed md:text-[17px]"
              style={{ color: "rgba(242,245,239,.82)" }}
            >
              A NOOON é mais que máquina de pagamento: é um ecossistema financeiro com portal de gestão,
              rede de parceiros e suporte próximo. Você ativa pontos, cresce sua rede e constrói renda recorrente com estratégia.
            </p>

            <div data-hero className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#parceiro" tone="neon" className="w-full sm:w-auto">
                Começar minha rede
              </MagneticButton>

              <MagneticButton
                href={LINKS.whatsapp}
                tone="ghost"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                Falar no WhatsApp
              </MagneticButton>

              <a
                href={LINKS.portal}
                target="_blank"
                rel="noreferrer"
                className="mag inline-flex items-center justify-center gap-2 rounded-[999px] px-5 py-3 text-sm font-semibold tracking-tight"
                style={{
                  background: "rgba(242,245,239,.06)",
                  border: "1px solid rgba(242,245,239,.14)",
                  color: "rgba(242,245,239,.88)",
                }}
              >
                Portal <ExternalLink size={12} />
              </a>
            </div>

            <div data-hero className="mt-10 grid max-w-[860px] grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { icon: <ShieldCheck size={16} />, title: "Comissão recorrente", sub: "Rede crescendo = renda evoluindo." },
                { icon: <Users size={16} />, title: "Parceiro independente", sub: "Você constrói sua própria rede." },
                { icon: <Wallet size={16} />, title: "Ecossistema completo", sub: "Portal + Pagamentos + apoio." },
              ].map((k) => (
                <div
                  key={k.title}
                  className="round-premium flex items-center gap-3 px-4 py-3"
                  style={{
                    background: "rgba(242,245,239,.08)",
                    border: "1px solid rgba(242,245,239,.12)",
                  }}
                >
                  <div
                    className="grid h-9 w-9 place-items-center rounded-[999px]"
                    style={{
                      background: "rgba(116,204,0,.14)",
                      border: "1px solid rgba(116,204,0,.22)",
                    }}
                  >
                    <span style={{ color: TOKENS.palette.paper }}>{k.icon}</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold" style={{ color: TOKENS.palette.paper }}>
                      {k.title}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(242,245,239,.72)" }}>
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

/* ---------------- Seção: Como Funciona ---------------- */
function HowItWorks() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hiw]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const steps = [
    { n: "01", title: "Ative pontos", desc: "Você cria sua rede: comércios, serviços, contatos e oportunidades reais." },
    { n: "02", title: "Rede em uso", desc: "Os pontos operam com NOOON e você acompanha via suporte e rotinas." },
    { n: "03", title: "Renda recorrente", desc: "Você ganha comissões recorrentes conforme sua rede cresce e consolida." },
  ];

  return (
    <section id="como-funciona" ref={root} className="px-5 py-20 md:px-10 lg:px-14" style={{ background: TOKENS.palette.paper }}>
      <div className="mx-auto max-w-[1100px]">
        <div data-hiw className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(14,15,16,.55)" }}>
          COMO FUNCIONA (PARCEIRO INDEPENDENTE)
        </div>
        <h2 data-hiw className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Você não vende máquina. Você constrói rede.
        </h2>
        <p data-hiw className="mt-3 max-w-[820px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(14,15,16,.72)" }}>
          A NOOON entrega infraestrutura, portal e suporte — e você transforma conexões em expansão: mais pontos ativos, mais consistência, mais resultado.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              data-hiw
              className="round-hero soft-shadow p-7"
              style={{
                background: "rgba(242,245,239,.96)",
                border: "1px solid rgba(14,15,16,.12)",
              }}
            >
              <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(14,15,16,.55)" }}>
                PASSO {s.n}
              </div>
              <div className="mt-3 font-heading text-xl font-semibold tracking-[-0.03em]">{s.title}</div>
              <div className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(14,15,16,.72)" }}>
                {s.desc}
              </div>

              <div className="mt-6 h-[1px]" style={{ background: "rgba(14,15,16,.10)" }} />
              <div className="mt-4 inline-flex items-center gap-2 font-mono text-[11px]" style={{ color: "rgba(14,15,16,.55)" }}>
                sinal: <span style={{ color: TOKENS.palette.primary, fontWeight: 700 }}>crescimento contínuo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ecossistema ---------------- */
function Ecosystem() {
  return (
    <section
      id="ecossistema"
      className="relative overflow-hidden px-5 py-22 md:px-10 lg:px-14"
      style={{ background: TOKENS.palette.deep, color: TOKENS.palette.paper }}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background: `
            radial-gradient(900px 650px at 20% 30%, rgba(116,204,0,.18), rgba(0,0,0,0) 60%),
            radial-gradient(900px 650px at 80% 70%, rgba(46,100,23,.28), rgba(0,0,0,0) 55%)
          `,
        }}
      />
      <div className="relative mx-auto max-w-[1100px] py-20">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,245,239,.68)" }}>
          O ECOSSISTEMA FINANCEIRO NOOON
        </div>

        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Infraestrutura + Portal + Rede.
        </h2>

        <p className="mt-3 max-w-[860px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(242,245,239,.80)" }}>
          O portal centraliza o ecossistema: gestão, acompanhamento e operação. A máquina é a ponta visível — a rede é o motor.
          Se você já é cliente, acesse direto o portal. Se você é parceiro, use o ecossistema como base para escalar.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <MagneticButton href={LINKS.portal} tone="neon" target="_blank" rel="noreferrer">
            Acessar Portal
          </MagneticButton>
          <MagneticButton href="#parceiro" tone="ghost">
            Iniciar como parceiro
          </MagneticButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Wallet size={18} />, t: "Pagamentos", s: "Débito, crédito, parcelado e operação estável." },
            { icon: <Network size={18} />, t: "Rede", s: "Pontos ativos e expansão estratégica por conexão." },
            { icon: <ShieldCheck size={18} />, t: "Suporte", s: "Acompanhamento real para ativação e rotina." },
            { icon: <Users size={18} />, t: "Parceiros", s: "Modelo para construir renda recorrente." },
          ].map((x) => (
            <div
              key={x.t}
              className="round-premium p-6 soft-shadow"
              style={{
                background: "rgba(242,245,239,.06)",
                border: "1px solid rgba(242,245,239,.12)",
              }}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-[999px]"
                style={{ background: "rgba(116,204,0,.14)", border: "1px solid rgba(116,204,0,.22)" }}
              >
                <span style={{ color: TOKENS.palette.paper }}>{x.icon}</span>
              </div>
              <div className="mt-3 font-heading text-lg font-semibold tracking-tight">{x.t}</div>
              <div className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(242,245,239,.78)" }}>
                {x.s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SuperSócio ---------------- */
function SuperSocio() {
  return (
    <section id="supersocio" className="px-5 py-20 md:px-10 lg:px-14" style={{ background: "#0A0F0B", color: TOKENS.palette.paper }}>
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,245,239,.64)" }}>
          PARCEIRO DE NEGÓCIOS DO ECOSSISTEMA
        </div>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          SuperSócio: inteligência comercial para crescer.
        </h2>
        <p className="mt-3 max-w-[900px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(242,245,239,.78)" }}>
          O SuperSócio é o braço de parceria de negócios do ecossistema NOOON — ajudando parceiros a estruturar expansão,
          fortalecer operação e capturar oportunidades (com método, não promessa).
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <MagneticButton href={LINKS.supersocio} tone="ghost" target="_blank" rel="noreferrer">
            Conhecer SuperSócio
          </MagneticButton>
          <div className="font-mono text-[11px]" style={{ color: "rgba(242,245,239,.62)" }}>
            integração: NOOON (infraestrutura) + SuperSócio (crescimento)
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "Oportunidade", s: "Modelos de crescimento para quem quer escala sem perder controle." },
            { t: "Estrutura", s: "Rotina, processo e leitura comercial para evoluir rede com consistência." },
            { t: "Parceria", s: "Apoio para decisões e expansão — com tato e proximidade." },
          ].map((x) => (
            <div
              key={x.t}
              className="round-hero p-7 soft-shadow"
              style={{ background: "rgba(242,245,239,.06)", border: "1px solid rgba(242,245,239,.12)" }}
            >
              <div className="font-heading text-xl font-semibold tracking-tight">{x.t}</div>
              <div className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(242,245,239,.76)" }}>
                {x.s}
              </div>
              <div className="mt-6 h-[1px]" style={{ background: "rgba(242,245,239,.10)" }} />
              <div className="mt-4 font-mono text-[11px]" style={{ color: TOKENS.palette.neon }}>
                sinal: crescimento assistido
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Form Parceiro (CTA principal) ---------------- */
function PartnerForm() {
  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    whats: "",
    vendas: "Sim",
    pontos: "1–5",
  });

  const [sent, setSent] = useState(false);

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    window.open(LINKS.whatsappPrefill(form), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="parceiro" className="px-5 py-24 md:px-10 lg:px-14" style={{ background: TOKENS.palette.paper }}>
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(14,15,16,.55)" }}>
          CAPTAÇÃO DE PARCEIROS
        </div>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Comece sua rede NOOON agora.
        </h2>
        <p className="mt-3 max-w-[840px] text-sm leading-relaxed md:text-[15px]" style={{ color: "rgba(14,15,16,.72)" }}>
          Preencha os dados e receba orientação para ativar seus primeiros pontos. Preferiu velocidade? O WhatsApp sempre fica disponível.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="round-hero soft-shadow p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(14,15,16,.12)" }}>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Seu nome" value={form.nome} onChange={onChange("nome")} placeholder="Ex: Joaquim Silva" />
              <Field label="Cidade / UF" value={form.cidade} onChange={onChange("cidade")} placeholder="Ex: Natal/RN" />
              <Field label="Seu WhatsApp" value={form.whats} onChange={onChange("whats")} placeholder="Ex: (84) 98788-5959" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Já trabalha com vendas?"
                  value={form.vendas}
                  onChange={onChange("vendas")}
                  options={["Sim", "Não", "Às vezes"]}
                />
                <Select
                  label="Meta de pontos no início"
                  value={form.pontos}
                  onChange={onChange("pontos")}
                  options={["1–5", "5–20", "20+"]}
                />
              </div>

              <div className="pt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton tone="neon" className="w-full sm:w-auto">
                  Enviar e falar no WhatsApp
                </MagneticButton>

                <a
                  className="mag inline-flex items-center justify-center gap-2 rounded-[999px] px-5 py-3 text-sm font-semibold tracking-tight w-full sm:w-auto"
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "rgba(46,100,23,.08)",
                    border: "1px solid rgba(46,100,23,.16)",
                    color: TOKENS.palette.primary,
                  }}
                >
                  Só WhatsApp <MessageCircle size={16} />
                </a>
              </div>

              {sent && (
                <div
                  className="round-premium mt-4 p-4 font-mono text-[12px]"
                  style={{
                    background: "rgba(116,204,0,.12)",
                    border: "1px solid rgba(116,204,0,.22)",
                    color: TOKENS.palette.ink,
                  }}
                >
                  Enviado ✅ Abrimos seu WhatsApp com a mensagem pronta. Se não abriu, clique em “Só WhatsApp”.
                </div>
              )}
            </form>
          </div>

          <div
            className="round-hero soft-shadow p-8"
            style={{
              background: TOKENS.palette.deep,
              border: "1px solid rgba(46,100,23,.20)",
              color: TOKENS.palette.paper,
            }}
          >
            <div className="font-heading text-2xl font-semibold tracking-[-0.04em]">
              O que você ganha como parceiro independente
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Modelo para construir renda recorrente por rede (não venda pontual).",
                "Infraestrutura NOOON: operação, portal e evolução por consistência.",
                "Suporte próximo para ativação e rotina dos seus primeiros pontos.",
                "Integração com o SuperSócio para estratégia de crescimento.",
              ].map((x) => (
                <div key={x} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-[999px]" style={{ background: TOKENS.palette.neon }} />
                  <div className="text-sm leading-relaxed" style={{ color: "rgba(242,245,239,.82)" }}>
                    {x}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 round-premium p-5" style={{ background: "rgba(242,245,239,.06)", border: "1px solid rgba(242,245,239,.12)" }}>
              <div className="font-mono text-[11px]" style={{ color: "rgba(242,245,239,.65)" }}>
                direção
              </div>
              <div className="mt-2 text-sm font-semibold">
                “Eu construo minha rede. A NOOON sustenta a infraestrutura.”
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <a
                href={LINKS.portal}
                target="_blank"
                rel="noreferrer"
                className="mag inline-flex items-center gap-2 font-mono text-[12px]"
                style={{ color: "rgba(242,245,239,.78)" }}
              >
                Já é cliente? Acessar Portal
              </a>

              <a
                href={LINKS.supersocio}
                target="_blank"
                rel="noreferrer"
                className="mag inline-flex items-center gap-2 font-mono text-[12px]"
                style={{ color: TOKENS.palette.neon }}
              >
                Ver SuperSócio <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="font-mono text-[11px]" style={{ color: "rgba(14,15,16,.60)" }}>
        {label}
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[1.3rem] px-4 py-3 text-sm outline-none"
        style={{
          background: "rgba(242,245,239,.95)",
          border: "1px solid rgba(14,15,16,.14)",
        }}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="font-mono text-[11px]" style={{ color: "rgba(14,15,16,.60)" }}>
        {label}
      </div>
      <select
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-[1.3rem] px-4 py-3 text-sm outline-none"
        style={{
          background: "rgba(242,245,239,.95)",
          border: "1px solid rgba(14,15,16,.14)",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------------- Floating WhatsApp Button ---------------- */
function FloatingWhatsApp() {
  return (
    <a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="mag fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-[999px] px-4 py-3 text-sm font-semibold soft-shadow"
      style={{
        background: TOKENS.palette.neon,
        color: TOKENS.palette.ink,
        border: "1px solid rgba(0,0,0,.10)",
        boxShadow: "0 18px 60px rgba(0,0,0,.18), 0 0 26px rgba(116,204,0,.22)",
      }}
      aria-label="Falar com a NOOON no WhatsApp"
    >
      <MessageCircle size={18} />
      WhatsApp
    </a>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="rounded-t-[4rem] px-5 py-16 md:px-10 lg:px-14" style={{ background: TOKENS.palette.deep, color: TOKENS.palette.paper }}>
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="font-heading text-2xl font-semibold tracking-[-0.04em]">{TOKENS.brand}</div>

            <p className="mt-3 max-w-[560px] text-sm leading-relaxed" style={{ color: "rgba(242,245,239,.78)" }}>
              Ecossistema financeiro focado em expansão de rede e geração de renda recorrente. Infraestrutura sólida para parceiros independentes.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 round-premium px-4 py-3" style={{ background: "rgba(242,245,239,.06)", border: "1px solid rgba(242,245,239,.12)" }}>
              <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-[999px]" style={{ background: "#2ECC71" }} />
              <span className="font-mono text-[11px]" style={{ color: "rgba(242,245,239,.78)" }}>
                Sistema Operacional: ONLINE
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,245,239,.62)" }}>
              LINKS
            </div>

            <div className="mt-4 space-y-3">
              <a href={LINKS.portal} target="_blank" rel="noreferrer" className="mag block text-sm font-medium" style={{ color: "rgba(242,245,239,.82)" }}>
                Portal <ExternalLink size={12} />
              </a>
              <a href={LINKS.supersocio} target="_blank" rel="noreferrer" className="mag block text-sm font-medium" style={{ color: "rgba(242,245,239,.82)" }}>
                SuperSócio
              </a>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="mag block text-sm font-medium" style={{ color: "rgba(242,245,239,.82)" }}>
                Instagram @nooon.pagamentos
              </a>
              <a href={LINKS.hbusiness} target="_blank" rel="noreferrer" className="mag block text-sm font-medium" style={{ color: "rgba(242,245,239,.82)" }}>
                HBusiness Group
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <div className="font-mono text-xs tracking-[0.18em]" style={{ color: "rgba(242,245,239,.62)" }}>
              CONTATO
            </div>

            <div className="mt-4 space-y-3">
              <a href="mailto:contato@nooon.com.br" className="mag block font-mono text-sm" style={{ color: TOKENS.palette.neon }}>
                contato@nooon.com.br
              </a>
              <a href="mailto:comercial@nooon.com.br" className="mag block font-mono text-sm" style={{ color: TOKENS.palette.neon }}>
                comercial@nooon.com.br
              </a>
              <a href="mailto:suporte@nooon.com.br" className="mag block font-mono text-sm" style={{ color: TOKENS.palette.neon }}>
                suporte@nooon.com.br
              </a>
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="mag block font-mono text-sm" style={{ color: TOKENS.palette.neon }}>
                WhatsApp (84) 98788-5959
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 h-[1px]" style={{ background: "rgba(242,245,239,.10)" }} />

        <div className="mt-6 flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between" style={{ color: "rgba(242,245,239,.62)" }}>
          <div className="font-mono">© {new Date().getFullYear()} NOOON • Ecossistema Financeiro</div>
          <div className="font-mono">Desenvolvido por HBusiness Group</div>
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
      <FloatingWhatsApp />
      <main>
        <Hero />
        <HowItWorks />
        <Ecosystem />
        <SuperSocio />
        <PartnerForm />
      </main>
      <Footer />
    </div>
  );
}
