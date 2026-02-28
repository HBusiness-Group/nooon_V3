import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const LINKS = {
  home: "./",
  portal: "https://portal.nooon.com.br",
  whatsapp: "https://wa.me/5584987885959",
  whatsappEquip: (modelo) =>
    `https://wa.me/5584987885959?text=${encodeURIComponent(
      `Olá! Quero ativar um equipamento NOOON.\n\nModelo: ${modelo}\nCidade/UF: \nNome: \nWhatsApp: \n\nPode me enviar as condições e prazos?`
    )}`,
};

const TOKENS = {
  brand: "NOOON",
  palette: {
    deep: "#0B140D",
    primary: "#2e6417",
    neon: "#74cc00",
    paper: "#F2F5EF",
    ink: "#0E0F10",
  },
};

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function MagneticButton({ children, className, href, tone = "neon", ...props }) {
  const bg =
    tone === "neon"
      ? TOKENS.palette.neon
      : tone === "primary"
        ? TOKENS.palette.primary
        : tone === "soft"
          ? "rgba(14,15,16,.06)"
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
        : "1px solid rgba(0,0,0,.12)";

  return (
    <a
      href={href}
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
    </a>
  );
}

function Topbar() {
  return (
    <div className="fixed inset-x-0 z-40 flex justify-center px-3" style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}>
      <div
        className={cn(
          "round-premium flex w-full max-w-[1100px] items-center justify-between gap-3 px-4 py-3 md:px-6",
          "backdrop-blur-xl"
        )}
        style={{
          background: "rgba(242,245,239,.84)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          backdropFilter: "blur(18px) saturate(160%)",
          border: "1px solid rgba(46,100,23,.18)",
          boxShadow: "0 18px 60px rgba(0,0,0,.14)",
        }}
      >
        <a href={LINKS.home} className="mag inline-flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft size={18} /> Voltar
        </a>

        <div className="flex items-center gap-3">
          <img src="assets/nooon_0.png" alt="NOOON" className="h-10 w-auto object-contain" />
          <div className="leading-tight">
            <div className="font-heading text-sm font-semibold tracking-tight" style={{ color: TOKENS.palette.primary }}>
              {TOKENS.brand}
            </div>
            <div className="hidden text-[11px] md:block" style={{ color: "rgba(14,15,16,.62)" }}>
              equipamentos de pagamento
            </div>
          </div>
        </div>

        <a
          href={LINKS.portal}
          target="_blank"
          rel="noreferrer"
          className={cn("mag inline-flex items-center gap-2 rounded-[999px] px-3 py-2 text-xs font-semibold md:px-4 md:py-2.5")}
          style={{
            background: TOKENS.palette.neon,
            border: "1px solid rgba(0,0,0,.10)",
            color: TOKENS.palette.ink,
          }}
        >
          Portal <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div
      className="round-premium hairline bg-white/70 p-5 md:p-6"
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,.08)" }}
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-[999px] px-3 py-2"
        style={{ background: "rgba(46,100,23,.08)", border: "1px solid rgba(46,100,23,.16)" }}>
        <Icon size={16} style={{ color: TOKENS.palette.primary }} />
        <span className="text-xs font-semibold" style={{ color: TOKENS.palette.primary }}>{title}</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(14,15,16,.72)" }}>{text}</p>
    </div>
  );
}

function ModelCard({ tag, title, who, bullets, ctaLabel, imageSrc, plans }) {
  return (
    <div className="round-premium hairline bg-white/70 p-6 md:p-7" style={{ boxShadow: "0 18px 60px rgba(0,0,0,.10)" }}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className="inline-flex items-center gap-2 rounded-[999px] px-3 py-2 text-xs font-semibold"
            style={{ background: "rgba(116,204,0,.18)", border: "1px solid rgba(116,204,0,.35)", color: TOKENS.palette.primary }}
          >
            <span className="pulse-dot h-2 w-2 rounded-full" style={{ background: TOKENS.palette.neon }} />
            {tag}
          </div>
          <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight" style={{ color: TOKENS.palette.ink }}>
            {title}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "rgba(14,15,16,.70)" }}>{who}</p>
        </div>

        {imageSrc ? (
          <div className="hidden w-[120px] shrink-0 md:block">
            <div
              className="round-premium overflow-hidden"
              style={{ background: "rgba(242,245,239,.65)", border: "1px solid rgba(0,0,0,.10)" }}
            >
              <img src={imageSrc} alt={title} className="h-[120px] w-full object-contain p-3" />
            </div>
          </div>
        ) : null}
      </div>

      {imageSrc ? (
        <div className="mb-4 md:hidden">
          <div
            className="round-premium overflow-hidden"
            style={{ background: "rgba(242,245,239,.65)", border: "1px solid rgba(0,0,0,.10)" }}
          >
            <img src={imageSrc} alt={title} className="h-[180px] w-full object-contain p-4" />
          </div>
        </div>
      ) : null}

      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "rgba(14,15,16,.74)" }}>
            <Check size={16} style={{ color: TOKENS.palette.primary }} className="mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {plans?.length ? (
        <div className="mt-6 round-premium p-4"
          style={{ background: "rgba(46,100,23,.06)", border: "1px solid rgba(46,100,23,.14)" }}>
          <div className="text-xs font-semibold" style={{ color: TOKENS.palette.primary }}>
            Planos de aquisição
          </div>
          <ul className="mt-2 space-y-1 text-sm" style={{ color: "rgba(14,15,16,.74)" }}>
            {plans.map((p) => (
              <li key={p} className="leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <MagneticButton href={LINKS.whatsappEquip(title)} tone="neon" className="w-full sm:w-auto">
          {ctaLabel}
        </MagneticButton>
        <MagneticButton href={LINKS.whatsapp} tone="soft" className="w-full sm:w-auto">
          Falar no WhatsApp
        </MagneticButton>
      </div>

      <p className="mt-4 text-xs" style={{ color: "rgba(14,15,16,.55)" }}>
        *Modelos e disponibilidade podem variar por região. A proposta final depende do perfil do negócio.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 pb-12">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
        <div
          className="round-premium p-6 md:p-8"
          style={{
            background: TOKENS.palette.deep,
            color: "rgba(242,245,239,.86)",
            boxShadow: "0 24px 80px rgba(0,0,0,.28)",
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-heading text-lg font-semibold">NOOON Pagamentos e Soluções</div>
              <div className="mt-1 text-sm" style={{ color: "rgba(242,245,239,.70)" }}>
                HBusiness Group — suporte com proximidade e presença.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href={LINKS.home} tone="ghost" className="text-xs md:text-sm">
                Voltar para Home
              </MagneticButton>
              <MagneticButton href={LINKS.portal} tone="primary" target="_blank" rel="noreferrer" className="text-xs md:text-sm">
                Acessar Portal
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EquipamentosApp() {
  useEffect(() => {
    document.title = "NOOON — Equipamentos de Pagamento";
  }, []);

  return (
    <div>
      <div className="noise-overlay" aria-hidden="true" />
      <Topbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 md:pt-32">
          <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
            <div
              className="round-hero relative overflow-hidden p-7 md:p-10"
              style={{
                background: `linear-gradient(135deg, ${TOKENS.palette.deep} 0%, #0F2215 45%, ${TOKENS.palette.primary} 100%)`,
                boxShadow: "0 28px 110px rgba(0,0,0,.34)",
              }}
            >
              <div className="absolute inset-0 opacity-[0.16]" aria-hidden="true">
                <img src="assets/nooon_paper.png" alt="" className="h-full w-full object-cover" />
              </div>

              <div className="relative z-[1] grid gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-8">
                  <div
                    className="inline-flex items-center gap-2 rounded-[999px] px-3 py-2 text-xs font-semibold"
                    style={{ background: "rgba(242,245,239,.10)", border: "1px solid rgba(242,245,239,.16)", color: "rgba(242,245,239,.90)" }}
                  >
                    <span className="pulse-dot h-2 w-2 rounded-full" style={{ background: TOKENS.palette.neon }} />
                    Escolha o equipamento certo para o seu ponto
                  </div>
                  <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl" style={{ color: TOKENS.palette.paper }}>
                    Equipamentos de pagamento NOOON
                  </h1>
                  <p className="mt-3 max-w-[60ch] text-base md:text-lg" style={{ color: "rgba(242,245,239,.78)" }}>
                    Do balcão ao delivery: opções para cada operação — com portal, suporte e acompanhamento.
                  </p>
                </div>

                <div className="md:col-span-4 md:flex md:justify-end">
                  <MagneticButton href={LINKS.whatsappEquip("Quero orientação de modelo")} tone="neon" className="w-full md:w-auto">
                    Me indique o melhor modelo
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mt-10 md:mt-14">
          <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Feature
                icon={ShieldCheck}
                title="Segurança e estabilidade"
                text="Operação pensada para rodar no dia a dia, com boas práticas e suporte de ativação." />
              <Feature
                icon={Wallet}
                title="Portal + gestão"
                text="A maquininha é a ponta visível. O portal centraliza o controle e a rotina de operação." />
              <Feature
                icon={Sparkles}
                title="Evolução por consistência"
                text="Você começa simples, ajusta com o tempo e escala com consistência — sem complicar o negócio." />
            </div>
          </div>
        </section>

        {/* MODELOS */}
        <section className="mt-10 md:mt-14">
          <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight" style={{ color: TOKENS.palette.ink }}>
                  Modelos recomendados
                </h2>
                <p className="mt-1 text-sm" style={{ color: "rgba(14,15,16,.66)" }}>
                  Dois modelos para facilitar sua decisão — compacto e smart.
                </p>
              </div>

              <a
                href={LINKS.portal}
                target="_blank"
                rel="noreferrer"
                className="mag hidden items-center gap-2 text-sm font-semibold md:inline-flex"
                style={{ color: TOKENS.palette.primary }}
              >
                Ver portal <ExternalLink size={16} />
              </a>
            </div>

            
<div className="grid gap-5 md:grid-cols-2">
  <ModelCard
    tag="Compacto"
    title="NOOON S920"
    who="Ideal para balcão, giro rápido e operação enxuta."
    imageSrc="assets/maquina_s920.png"
    bullets={[
      "Leve e prático para o dia a dia",
      "Indicado para comércios de alto volume",
      "Configuração rápida + suporte de ativação",
      "Integra ao portal NOOON",
    ]}
    plans={[
      "A. R$ 600,00 em até 6X sem juros",
      "B. R$ 550,00 no PIX ou em 1X no cartão",
      "C. R$ 100,00 ao mês, LOCAÇÃO",
    ]}
    ctaLabel="Quero o S920"
  />

  <ModelCard
    tag="Smart"
    title="NOOON A930"
    who="Tela maior, ótimo para atendimento e varejo."
    imageSrc="assets/maquina_a930.png"
    bullets={[
      "Boa ergonomia para atendimento",
      "Perfeito para varejo e serviços",
      "Interface fluida para operação",
      "Integra ao portal NOOON",
    ]}
    plans={[
      "A. R$ 700,00 em até 7X sem juros",
      "B. R$ 600,00 no PIX ou em 1X no cartão",
      "C. R$ 120,00 ao mês, LOCAÇÃO",
    ]}
    ctaLabel="Quero o A930"
  />
</div>
          </div>
        </section>



{/* TAXAS */}
<section className="mt-10 md:mt-14">
  <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
    <div className="mb-4">
      <h2 className="font-heading text-2xl font-semibold tracking-tight" style={{ color: TOKENS.palette.ink }}>
        Taxas
      </h2>
      <p className="mt-1 text-sm" style={{ color: "rgba(14,15,16,.66)" }}>
        Consulte abaixo as taxas por bandeira e modalidade.
      </p>
    </div>

    <div
      className="round-premium overflow-hidden"
      style={{
        background: "rgba(255,255,255,.70)",
        border: "1px solid rgba(0,0,0,.10)",
        boxShadow: "0 18px 60px rgba(0,0,0,.10)",
      }}
    >
      <div className="p-4 md:p-6">
        <img
          src="assets/taxas_nooon.png"
          alt="Tabela de taxas NOOON"
          className="h-auto w-full object-contain"
        />
      </div>
    </div>

    <p className="mt-3 text-xs" style={{ color: "rgba(14,15,16,.55)" }}>
      *As taxas podem variar conforme perfil, segmento e condições comerciais.
    </p>
  </div>
</section>

        {/* CTA FINAL */}
        <section className="mt-12 md:mt-16">
          <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
            <div
              className="round-hero p-7 md:p-10"
              style={{
                background: "rgba(46,100,23,.08)",
                border: "1px solid rgba(46,100,23,.18)",
                boxShadow: "0 18px 70px rgba(0,0,0,.10)",
              }}
            >
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight" style={{ color: TOKENS.palette.ink }}>
                    Quer ativar ainda hoje?
                  </h3>
                  <p className="mt-2 text-sm md:text-base" style={{ color: "rgba(14,15,16,.70)" }}>
                    Me diga seu tipo de negócio e sua cidade. Eu te guio no melhor modelo e na ativação.
                  </p>
                </div>
                <div className="md:col-span-4 md:flex md:justify-end">
                  <MagneticButton href={LINKS.whatsappEquip("Quero ativar hoje")} tone="neon" className="w-full md:w-auto">
                    Quero ativar
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EquipamentosApp />
  </React.StrictMode>
);
