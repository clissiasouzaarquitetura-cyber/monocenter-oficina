"use client";
import { useEffect, useMemo, useRef, useState } from "react";
const ITEMS = [
  "Amortecedor Dianteiro Direito",
  "Amortecedor Dianteiro Esquerdo",
  "Amortecedor Traseiro Direito",
  "Amortecedor Traseiro Esquerdo",
  "Mola Dianteira Direita",
  "Mola Dianteira Esquerda",
  "Mola Traseira Direita",
  "Mola Traseira Esquerda",
  "Kit do Amortecedor Dianteiro Direito",
  "Kit do Amortecedor Dianteiro Esquerdo",
  "Kit do Amortecedor Traseiro Direito",
  "Kit do Amortecedor Traseiro Esquerdo",
  "Coxim do Motor",
  "Coxim do Câmbio",
  "Braço Oscilante LD",
  "Braço Oscilante LE",
  "Bandeja Dianteira Direita",
  "Bandeja Dianteira Esquerda",
  "Bucha Diant. da Bandeja Dianteira",
  "Bucha Traseira da Bandeja Dianteira",
  "Suporte Barra Tensora LD (morceguinho)",
  "Suporte Barra Tensora LE (morceguinho)",
  "Bieleta Dianteira Direita",
  "Bieleta Dianteira Esquerda",
  "Bieleta Traseira Direita",
  "Bieleta Traseira Esquerda",
  "Pivô Dianteiro Direito",
  "Pivô Dianteiro Esquerdo",
  "Bucha Barra Estabilizadora",
  "Terminal de Direção Direito",
  "Terminal de Direção Esquerdo",
  "Terminal do Tensor",
  "Axial da Direção Direito",
  "Axial da Direção Esquerdo",
  "Cubo de Roda Dianteiro Direito",
  "Cubo de Roda Dianteiro Esquerdo",
  "Cubo de Roda Traseiro Direito",
  "Cubo de Roda Traseiro Esquerdo",
  "Rolamento de Roda Dianteiro",
  "Rolamento de Roda Traseiro",
  "Bucha do Eixo",
  "Barra de Direção",
  "Caixa de Direção",
  "Fluido de Direção",
  "Junta Homocinética Interna",
  "Junta Homocinética Externa",
  "Coifa",
  "Semi-eixo",
  "Pneus (Desgaste/Condição)",
  "Pastilha de Freio",
  "Disco de freio",
  "Cilindro de Freio (Tras. Esq./Dir.) Mestre",
  "Sapata de freio Traseira",
  "Pastilha de freio Traseira",
];
const FRONT = [
    "Amortecedores dianteiros",
    "Coxim dos amortecedores",
    "Rolamentos do coxim",
    "Molas dianteiras",
    "Bandejas",
    "Buchas das bandejas",
    "Pivôs",
    "Terminais de direção",
    "Axiais de direção",
    "Bieletas",
    "Barra estabilizadora",
    "Buchas da barra estabilizadora",
    "Agregado/suporte motor",
    "Cubos de roda",
  ],
  REAR = [
    "Amortecedores traseiros",
    "Coxim traseiros",
    "Molas traseiras",
    "Buchas traseiras",
    "Eixo traseiro",
    "Braços oscilantes",
    "Barra estabilizadora traseira",
    "Cubo de roda traseiros",
  ],
  SAFE = [
    "Todos os parafusos reapertados",
    "Torque aplicado conforme fabricante",
    "Conferido aperto de rodas",
    "Conferido altura do veículo",
    "Conferido folgas",
    "Conferido vazamentos",
    "Conferido posição mola e coxins",
    "Conferido alinhamento",
    "Conferido balanceamento",
    "Teste de rodagem realizado",
    "Veículo sem ruídos",
  ],
  TQ = [
    "Torque de rodas",
    "Torque de bandejas",
    "Torque de amortecedores",
    "Torque de pivôs",
    "Torque de terminais",
    "Torque de agregado",
    "Torque de bieletas",
    "Torque conforme padrão técnico",
  ];
const SERVICES = [
  ["Alinhamento de direção - Passeio", 100],
  ["Alinhamento de direção - SUV", 120],
  ["Alinhamento de direção - Caminhonete/Van", 150],
  ["Balanceamento - roda aro 13, 14 ou 15", 20],
  ["Balanceamento - roda aro 16, 17 ou 18", 25],
  ["Balanceamento - roda de caminhonete", 50],
  ["Montagem de pneu - aro 13, 14 ou 15", 20],
  ["Montagem de pneu - aro 16, 17 ou 18", 25],
  ["Montagem especial de pneu", 50],
  ["Rodízio - cortesia", 0],
] as [string, number][];
const REVIEW_ITEMS = [
  "Aperto das rodas",
  "Torque das peças substituídas",
  "Folgas na suspensão",
  "Ruídos após o serviço",
  "Condição e calibragem dos pneus",
  "Geometria / alinhamento",
  "Teste de rodagem",
];
type ReviewState = {
  previousId?: number;
  reference: string;
  checks: Record<string, "ok" | "ajustar">;
  result:
    | "Revisão concluída"
    | "Ajuste necessário"
    | "Encaminhar para nova avaliação";
  notes: string;
  reviewer: string;
  completedAt?: string;
};
type EvaluationState = {
  status: Record<number, string>;
  quoteItems: Record<number, boolean>;
  custom: string[];
  notes?: Record<number, string>;
};
type BudgetState = {
  parts: any[];
  selectedServices: number[];
  serviceQty: Record<number, number>;
  manualServices: any[];
  patioNotes?: string;
  processStatus: "Em andamento" | "Finalizado";
};
type View =
  | "agenda"
  | "atendimento"
  | "avaliacao"
  | "orcamento"
  | "proposta"
  | "torque"
  | "revisao"
  | "relatorios"
  | "historico"
  | "config";
type Appt = {
  id: number;
  date: string;
  time: string;
  client: string;
  phone: string;
  vehicle: string;
  plate: string;
  km: string;
  note: string;
  type: "cliente" | "retorno" | "garantia" | "revisao" | "bloqueio";
  reviewWithService?: boolean;
  status: "agendado" | "avaliou" | "servico" | "faltou";
  tech?: string;
  review?: ReviewState;
  evaluation?: EvaluationState;
  budget?: BudgetState;
  conference?: {
    checks: Record<string, boolean>;
    finalizedAt?: string;
    finalizedBy?: string;
    finalization?: {
      serviceCompleted: boolean;
      vehicleReleased: boolean;
      clientOriented: boolean;
      note: string;
      technician: string;
      executor: string;
      checker: string;
    };
  };
  quoteSentAt?: string;
  quoteSentBy?: string;
  scheduledBy?: string;
  createdAt?: string;
  evaluationRecordedBy?: string;
  evaluationRecordedAt?: string;
  budgetEditedBy?: string;
  budgetEditedAt?: string;
  lastEditedBy?: string;
  lastEditedAt?: string;
  startedAt?: string;
  inProgress?: boolean;
  _updatedAt?: number;
};
const iso = (d: Date) =>
    [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-"),
  brl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  roundUp = (n: number, step: number) =>
    Math.ceil(n / Math.max(1, step)) * Math.max(1, step),
  saleOf = (p: any, step = 5) =>
    p.saleOverride === undefined || p.saleOverride === null
      ? roundUp(p.cost * (1 + p.margin / 100), step)
      : p.saleOverride,
  fmt = (s: string) =>
    new Date(s + "T12:00:00").toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
const titleCase = (value: string) =>
  value
    .toLocaleLowerCase("pt-BR")
    .replace(
      /(^|[\s/()\-])(\p{L})/gu,
      (_, separator, letter) => separator + letter.toLocaleUpperCase("pt-BR"),
    );
const quoteWaitingLabel = (appointment: Appt) => {
  const reference = appointment.evaluationRecordedAt || appointment.createdAt;
  if (!reference) return "⚠ Aguardando orçamento";

  const started = new Date(reference);
  if (Number.isNaN(started.getTime())) return "⚠ Aguardando orçamento";

  const today = new Date();
  started.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const days = Math.max(
    0,
    Math.floor((today.getTime() - started.getTime()) / 86_400_000),
  );

  if (days === 0) return "⚠ Aguardando orçamento desde hoje";
  return `⚠ Aguardando orçamento há ${days} ${days === 1 ? "dia" : "dias"}`;
};
const messagePartName = (value: string) =>
  titleCase(
    value
      .replace(/\b(direito|direita|esquerdo|esquerda|ld|le)\b/giu, "")
      .replace(/\s{2,}/g, " ")
      .trim(),
  );
const groupMessageParts = (parts: any[], step: number) => {
  const grouped = new Map<
    string,
    { item: string; brand: string; qty: number; total: number }
  >();
  for (const part of parts) {
    const item = messagePartName(part.item || "Peça"),
      brand = titleCase(part.brand || ""),
      key = `${item.toLocaleLowerCase("pt-BR")}|${brand.toLocaleLowerCase("pt-BR")}`,
      current = grouped.get(key) ?? { item, brand, qty: 0, total: 0 };
    current.qty += Number(part.qty) || 0;
    current.total += (Number(part.qty) || 0) * saleOf(part, step);
    grouped.set(key, current);
  }
  return [...grouped.values()];
};
const renderMessageTemplate = (template: string, appointment: Appt) =>
  template
    .replaceAll("{cliente}", appointment.client || "Cliente")
    .replaceAll(
      "{data}",
      new Date(appointment.date + "T12:00:00").toLocaleDateString("pt-BR"),
    )
    .replaceAll("{hora}", appointment.time || "")
    .replaceAll("{veiculo}", appointment.vehicle || "não informado")
    .replaceAll("{placa}", appointment.plate || "não informada")
    .replace(/\b(?:vamos|podemos)\s+fechar\s*[?.!]?/giu, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
const apptClass = (a: Appt) =>
  a.type === "bloqueio"
    ? "block"
    : a.type === "retorno"
      ? "retorno"
      : a.type === "garantia"
        ? "garantia"
        : a.type === "revisao"
          ? "revisao"
          : a.inProgress && a.status !== "servico"
            ? "inprogress"
            : a.status;
const INITIAL: Appt[] = [];
const EMPTY_APPT: Appt = {
  id: 0,
  date: "",
  time: "",
  client: "Nenhum cliente selecionado",
  phone: "",
  vehicle: "Não informado",
  plate: "",
  km: "",
  note: "",
  type: "cliente",
  status: "agendado",
};
let DISPLAY_APPT: Appt = EMPTY_APPT;
export default function App({ initialState, user, onLogout }: any) {
  const shared = initialState ?? {};
  const [view, setView] = useState<View>("agenda"),
    [reportStartMode, setReportStartMode] = useState<
      "registros" | "abertos" | "andamento"
    >("registros"),
    [costs, setCosts] = useState(false),
    [appointments, setAppointments] = useState<Appt[]>(
      shared.appointments ?? INITIAL,
    ),
    [deletedAppointmentIds, setDeletedAppointmentIds] = useState<number[]>(
      shared.deletedAppointmentIds ?? [],
    ),
    [modal, setModal] = useState<Appt | boolean>(false),
    [activeAppointment, setActiveAppointment] = useState<Appt | null>(null),
    [footerSize, setFooterSize] = useState(shared.footerSize ?? 11),
    [roundStep, setRoundStep] = useState(shared.roundStep ?? 5),
    [message, setMessage] = useState(""),
    [quoteMessageFor, setQuoteMessageFor] = useState<number | null>(null),
    [status, setStatus] = useState<Record<number, string>>({}),
    [quoteItems, setQuoteItems] = useState<Record<number, boolean>>({}),
    [evaluationNotes, setEvaluationNotes] = useState<Record<number, string>>(
      {},
    ),
    [darkMode, setDarkMode] = useState(
      () =>
        typeof window !== "undefined" &&
        localStorage.getItem("monocenter-theme") === "dark",
    ),
    [checks, setChecks] = useState<Record<string, boolean>>(
      shared.checks ?? {},
    ),
    [finalization, setFinalization] = useState({
      serviceCompleted: false,
      vehicleReleased: false,
      clientOriented: false,
      note: "",
      technician: "",
      executor: "",
      checker: "",
    }),
    [custom, setCustom] = useState<string[]>([]),
    [techs, setTechs] = useState<string[]>(
      (shared.techs ?? ["Saulo", "Tiago"]).filter(
        (name: string) => name.trim().toLocaleLowerCase("pt-BR") !== "anna",
      ),
    ),
    [holidays, setHolidays] = useState(
      shared.holidays ?? [
        { date: "2026-09-07", name: "Independência do Brasil" },
        { date: "2026-10-12", name: "Nossa Senhora Aparecida" },
      ],
    );
  const availableTechs = techs.filter(
    (name) => name.trim().toLocaleLowerCase("pt-BR") !== "anna",
  );
  const [evaluator, setEvaluator] = useState(shared.evaluator ?? "Saulo"),
    [started, setStarted] = useState(shared.started ?? ""),
    [geometryOpen, setGeometryOpen] = useState(false),
    [checkOpen, setCheckOpen] = useState(false),
    [partsOpen, setPartsOpen] = useState(false),
    [servicesOpen, setServicesOpen] = useState(false),
    [torqueOpen, setTorqueOpen] = useState<Record<string, boolean>>({
      front: false,
      safe: false,
      rear: false,
      tq: false,
      final: false,
    });
  useEffect(() => {
    localStorage.setItem("monocenter-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const defaultTemplates = {
    lembrete:
      "Olá, {cliente}! Lembramos do seu agendamento na Monocenter em {data}, às {hora}. Aguardamos você!",
    orcamento:
      "Olá, {cliente}! Segue o orçamento da Monocenter para o veículo {veiculo}, placa {placa}.",
    revisao:
      "Olá, {cliente}! Já está na hora de revisar seu veículo na Monocenter.",
  };
  const defaultParts: any[] = [];
  const [templates, setTemplates] = useState(
      shared.templates ?? defaultTemplates,
    ),
    [savedAt, setSavedAt] = useState("");
  const [parts, setParts] = useState(shared.parts ?? defaultParts),
    [selectedServices, setSelectedServices] = useState<number[]>(
      shared.selectedServices ?? [],
    ),
    [serviceQty, setServiceQty] = useState<Record<number, number>>(
      shared.serviceQty ?? {},
    ),
    [manualServices, setManualServices] = useState(shared.manualServices ?? []),
    [patioNotes, setPatioNotes] = useState(shared.patioNotes ?? ""),
    [processStatus, setProcessStatus] = useState<"Em andamento" | "Finalizado">(
      shared.processStatus ?? "Em andamento",
    );
  const firstSave = useRef(true),
    skipSave = useRef(false),
    syncBlockedUntil = useRef(0),
    saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    if (firstSave.current) {
      firstSave.current = false;
      return;
    }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const state = {
        appointments,
        deletedAppointmentIds,
        footerSize,
        roundStep,
        status,
        evaluationNotes,
        checks,
        custom,
        techs,
        holidays,
        evaluator,
        started,
        templates,
        parts,
        selectedServices,
        serviceQty,
        manualServices,
        patioNotes,
        processStatus,
      };
      fetch("/api/state", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state,
          action: "Atualizou informações do sistema",
          entity: view,
          detail: activeAppointment
            ? `${activeAppointment.client} · ${activeAppointment.plate || "sem placa"}`
            : "Dados gerais",
        }),
      })
        .then((r) => {
          if (r.status === 401) onLogout();
        })
        .catch(() => {});
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [
    appointments,
    deletedAppointmentIds,
    footerSize,
    roundStep,
    status,
    evaluationNotes,
    checks,
    custom,
    techs,
    holidays,
    evaluator,
    started,
    templates,
    parts,
    selectedServices,
    serviceQty,
    manualServices,
    patioNotes,
    processStatus,
  ]);
  useEffect(() => {
    let alive = true;
    const same = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b),
      sync = async () => {
        if (Date.now() < syncBlockedUntil.current) return;
        try {
          const r = await fetch("/api/state", { cache: "no-store" });
          if (r.status === 401) {
            onLogout();
            return;
          }
          const d = await r.json(),
            s = d.state;
          if (
            !alive ||
            !s ||
            Date.now() < syncBlockedUntil.current
          )
            return;
          let changed = false;
          const apply = (setter: any, current: any, next: any) => {
            if (next !== undefined && !same(current, next)) {
              changed = true;
              setter(next);
            }
          };
          apply(setAppointments, appointments, s.appointments);
          apply(
            setDeletedAppointmentIds,
            deletedAppointmentIds,
            s.deletedAppointmentIds,
          );
          apply(setTechs, techs, s.techs);
          apply(setHolidays, holidays, s.holidays);
          apply(setTemplates, templates, s.templates);
          if (s.footerSize !== undefined && s.footerSize !== footerSize) {
            changed = true;
            setFooterSize(s.footerSize);
          }
          if (s.roundStep !== undefined && s.roundStep !== roundStep) {
            changed = true;
            setRoundStep(s.roundStep);
          }
          if (changed) skipSave.current = true;
        } catch {}
      };
    const timer = setInterval(sync, 8000);
    window.addEventListener("focus", sync);
    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener("focus", sync);
    };
  }, [
    appointments,
    deletedAppointmentIds,
    techs,
    holidays,
    templates,
    footerSize,
    roundStep,
    onLogout,
  ]);
  const pieces = parts.reduce(
      (s: number, p: any) => s + p.qty * saleOf(p, roundStep),
      0,
    ),
    serviceTotal =
      selectedServices.reduce(
        (s: number, i: number) => s + SERVICES[i][1] * (serviceQty[i] ?? 0),
        0,
      ) + manualServices.reduce((s: number, x: any) => s + x.qty * x.value, 0),
    total = pieces + serviceTotal;
  const nav: [View, string, string][] = [
    ["agenda", "Agenda", "▦"],
    ["avaliacao", "Avaliação", "✓"],
    ["orcamento", "Orçamento", "$"],
    ["proposta", "Proposta", "▤"],
    ["torque", "Conferência", "◇"],
    ["relatorios", "Relatórios", "▥"],
    ["historico", "Histórico", "↺"],
    ["config", "Configurações", "⚙"],
  ];
  const go = (v: View) => {
      if (
        ["avaliacao", "orcamento", "proposta", "torque"].includes(v) &&
        !activeAppointment
      ) {
        setView("agenda");
        return;
      }
      if (v === "avaliacao") {
        setGeometryOpen(false);
        setCheckOpen(false);
      }
      if (v === "orcamento") {
        setPartsOpen(false);
        setServicesOpen(false);
      }
      if (v === "torque")
        setTorqueOpen({
          front: false,
          safe: false,
          rear: false,
          tq: false,
          final: false,
        });
      setView(v);
      scrollTo(0, 0);
    },
    printStage = (kind: string) => {
      document.body.classList.add("print-" + kind);
      window.print();
      setTimeout(() => document.body.classList.remove("print-" + kind), 500);
    },
    printNoValues = (kind: string) => {
      document.body.classList.add("print-" + kind, "no-values");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("print-" + kind);
        document.body.classList.remove("no-values");
      }, 500);
    },
    messageParts = groupMessageParts(parts, roundStep),
    messageServices = [
      ...selectedServices.map((i: number) => ({
        name: SERVICES[i][0],
        qty: serviceQty[i] ?? 0,
        total: SERVICES[i][1] * (serviceQty[i] ?? 0),
        courtesy: SERVICES[i][1] === 0,
      })),
      ...manualServices
        .filter((x: any) => x.name)
        .map((x: any) => ({
          name: x.name,
          qty: x.qty,
          total: x.qty * x.value,
          courtesy: false,
        })),
    ],
    quote = `${renderMessageTemplate(
      templates.orcamento || defaultTemplates.orcamento,
      DISPLAY_APPT,
    )}\n\nPEÇAS\n${
      messageParts.length
        ? messageParts
            .map(
              (part) =>
                `${part.qty}x ${part.item}${part.brand ? ` ${part.brand}` : ""} — ${brl(part.total)}`,
            )
            .join("\n")
        : "Nenhuma peça"
    }\n\nSERVIÇOS\n${
      messageServices.length
        ? messageServices
            .map(
              (service) =>
                `${service.qty}x ${service.name} — ${service.courtesy ? "Cortesia" : brl(service.total)}`,
            )
            .join("\n")
        : "Nenhum serviço"
    }\n\nTOTAL: ${brl(total)}\n\nPagamento:\n• Pix com 5% de desconto: ${brl(total * 0.95)}\n• Cartão: até 5x sem juros de ${brl(total / 5)}`;
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <aside>
        <Logo />
        <nav>
          {nav.map((n) => (
            <button
              className={view === n[0] ? "on" : ""}
              onClick={() => go(n[0])}
              key={n[0]}
            >
              <i>{n[2]}</i>
              {n[1]}
            </button>
          ))}
        </nav>
        <div className="user">
          {user.displayName.slice(0, 2).toUpperCase()}{" "}
          <span>
            <b>{user.displayName}</b>
            <small>Usuário conectado</small>
          </span>
          <button onClick={onLogout}>Sair</button>
        </div>
      </aside>
      <main>
        <header>
          <div>
            <h1>{TITLES[view][0]}</h1>
            <p>{TITLES[view][1]}</p>
          </div>
          <div className="header-actions">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀ Modo claro" : "☾ Modo escuro"}
            </button>
            <button onClick={() => setCosts(!costs)}>
              {costs
                ? "◉ Custos e margens visíveis"
                : "⊘ Custos e margens ocultos"}
            </button>
          </div>
        </header>
        {view === "agenda" && (
          <Agenda
            data={appointments}
            holidays={holidays}
            add={() => setModal(true)}
            showOpenQuotes={() => {
              setReportStartMode("abertos");
              setView("relatorios");
              scrollTo(0, 0);
            }}
            showInProgress={() => {
              setReportStartMode("andamento");
              setView("relatorios");
              scrollTo(0, 0);
            }}
            start={(a: Appt) => {
              const shouldStart =
                  !a.startedAt &&
                  a.status === "agendado" &&
                  a.type !== "revisao" &&
                  a.type !== "bloqueio",
                opened: Appt = shouldStart
                  ? {
                      ...a,
                      startedAt: new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                      _updatedAt: Date.now(),
                    }
                  : a;
              DISPLAY_APPT = opened;
              setActiveAppointment(opened);
              setEvaluator(a.tech ?? availableTechs[0] ?? "");
              setStarted(opened.startedAt ?? "");
              if (shouldStart)
                setAppointments((list) =>
                  list.map((item) => (item.id === opened.id ? opened : item)),
                );
              setStatus(a.evaluation?.status ?? {});
              setQuoteItems(a.evaluation?.quoteItems ?? {});
              setCustom(a.evaluation?.custom ?? []);
              setEvaluationNotes(a.evaluation?.notes ?? {});
              setChecks(a.conference?.checks ?? {});
              setFinalization(
                a.conference?.finalization ?? {
                  serviceCompleted: false,
                  vehicleReleased: false,
                  clientOriented: false,
                  note: "",
                  technician: a.tech ?? "",
                  executor: "",
                  checker: "",
                },
              );
              setGeometryOpen(false);
              setCheckOpen(false);
              setPartsOpen(false);
              setServicesOpen(false);
              setTorqueOpen({
                front: false,
                safe: false,
                rear: false,
                tq: false,
                final: false,
              });
              if (a.budget) {
                setParts(a.budget.parts ?? []);
                setSelectedServices(a.budget.selectedServices ?? []);
                setServiceQty(a.budget.serviceQty ?? {});
                setManualServices(a.budget.manualServices ?? []);
                setPatioNotes(a.budget.patioNotes ?? "");
                setProcessStatus(a.budget.processStatus ?? "Em andamento");
              } else if (
                a.status === "agendado" ||
                activeAppointment?.id !== a.id
              ) {
                setParts([]);
                setSelectedServices([]);
                setServiceQty({});
                setManualServices([]);
                setPatioNotes("");
                setProcessStatus("Em andamento");
              }
              setView(
                a.type === "revisao" && (!a.reviewWithService || !a.review)
                  ? "revisao"
                  : a.budget?.processStatus === "Finalizado"
                    ? "atendimento"
                    : a.status === "servico"
                      ? "torque"
                      : a.status === "avaliou"
                        ? "orcamento"
                        : "avaliacao",
              );
              scrollTo(0, 0);
            }}
            edit={(a: Appt) => setModal(a)}
            remove={(a: Appt) => {
              if (
                confirm(
                  `ATENÇÃO: deseja realmente excluir ${a.type === "bloqueio" ? "esta ausência" : `o agendamento de ${a.client}`}?`,
                )
              ) {
                syncBlockedUntil.current = Date.now() + 4000;
                setDeletedAppointmentIds((ids) => [...new Set([...ids, a.id])]);
                setAppointments((list) =>
                  list.filter((x) => x.id !== a.id),
                );
              }
            }}
            message={(text: string) => {
              setQuoteMessageFor(null);
              setMessage(text);
            }}
          />
        )}
        {view === "revisao" && activeAppointment && (
          <section className="page">
            <Vehicle />
            <ReviewScreen
            appointment={activeAppointment}
            appointments={appointments}
            techs={availableTechs}
              onBack={() => go("agenda")}
              onSave={(review: ReviewState) => {
                const withService = !!activeAppointment.reviewWithService;
                const updated: Appt = {
                  ...activeAppointment,
                  status: withService ? "agendado" : "servico",
                  startedAt: withService
                    ? activeAppointment.startedAt ||
                      new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : activeAppointment.startedAt,
                  review,
                  lastEditedBy: user.displayName,
                  lastEditedAt: new Date().toISOString(),
                  _updatedAt: Date.now(),
                };
                DISPLAY_APPT = updated;
                setActiveAppointment(updated);
                setAppointments((list) =>
                  list.map((a) => (a.id === updated.id ? updated : a)),
                );
                setSavedAt(
                  new Date().toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                );
                setStarted(updated.startedAt ?? "");
                setView(withService ? "avaliacao" : "agenda");
                scrollTo(0, 0);
              }}
            />
          </section>
        )}
        {view !== "agenda" &&
          view !== "historico" &&
          view !== "config" &&
          view !== "atendimento" &&
          view !== "revisao" && (
            <section className="page">
              <Vehicle />
              <Steps view={view} />
              <StageActions
                view={view}
                status={processStatus}
                setStatus={setProcessStatus}
                printNoValues={printNoValues}
                printStage={printStage}
                save={() => {
                  setSavedAt(
                    new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  );
                  if (activeAppointment) {
                    const evaluation =
                      view === "avaliacao"
                        ? {
                            status,
                            quoteItems,
                            custom,
                            notes: evaluationNotes,
                          }
                        : activeAppointment.evaluation;
                    const budget =
                      view === "avaliacao"
                        ? activeAppointment.budget
                        : {
                            parts,
                            selectedServices,
                            serviceQty,
                            manualServices,
                            patioNotes,
                            processStatus,
                          };
                    const updated: Appt = {
                      ...activeAppointment,
                      startedAt:
                        view === "avaliacao"
                          ? started || activeAppointment.startedAt
                          : activeAppointment.startedAt,
                      status:
                        view === "avaliacao"
                          ? "avaliou"
                          : activeAppointment.status,
                      tech: evaluator,
                      ...(view === "avaliacao"
                        ? {
                            evaluationRecordedBy: user.displayName,
                            evaluationRecordedAt: new Date().toISOString(),
                          }
                        : {}),
                      ...(["orcamento", "proposta"].includes(view)
                        ? {
                            budgetEditedBy: user.displayName,
                            budgetEditedAt: new Date().toISOString(),
                          }
                        : {}),
                      lastEditedBy: user.displayName,
                      lastEditedAt: new Date().toISOString(),
                      evaluation,
                      budget,
                      conference:
                        view === "torque"
                          ? {
                              checks,
                              finalization,
                              finalizedBy:
                                processStatus === "Finalizado"
                                  ? (activeAppointment.conference
                                      ?.finalizedBy ?? user.displayName)
                                  : activeAppointment.conference?.finalizedBy,
                              finalizedAt:
                                processStatus === "Finalizado"
                                  ? (activeAppointment.conference
                                      ?.finalizedAt ?? new Date().toISOString())
                                  : undefined,
                            }
                          : activeAppointment.conference,
                      _updatedAt: Date.now(),
                    };
                    DISPLAY_APPT = updated;
                    setActiveAppointment(updated);
                    setAppointments((list) =>
                      list.map((a) => (a.id === updated.id ? updated : a)),
                    );
                    if (view === "avaliacao") {
                      setView("agenda");
                      scrollTo(0, 0);
                    }
                  }
                }}
                savedAt={savedAt}
              />
              {view === "avaliacao" && (
                <>
                  <div className="startbox">
                    <label>
                      Quem está avaliando
                      <select
                        value={evaluator}
                        onChange={(e) => setEvaluator(e.target.value)}
                      >
                        {availableTechs.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <span className="scheduled-time">
                      Horário agendado<b>{DISPLAY_APPT.time}</b>
                    </span>
                    <label className="started-time">
                      Início do atendimento
                      <input
                        type="time"
                        value={started}
                        onChange={(e) => setStarted(e.target.value)}
                      />
                    </label>
                    <button
                      onClick={() =>
                        setStarted(
                          new Date().toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                        )
                      }
                    >
                      Usar horário atual
                    </button>
                  </div>
                  <Collapse
                    title="⌖ Geometria / Alinhamento"
                    subtitle="Medições de camber, caster e convergência"
                    open={geometryOpen}
                    set={() => setGeometryOpen(!geometryOpen)}
                  >
                    <div className="geometry bare">
                      {[
                        "Camber",
                        "Caster",
                        "Alinhamento (convergência)",
                        "Posição do volante",
                      ].map((x) => (
                        <div key={x}>
                          <b>{x}</b>
                          <input placeholder="Diant. Esq." />
                          <input placeholder="Diant. Dir." />
                          <input placeholder="Tras. Esq." />
                          <input placeholder="Tras. Dir." />
                          <select>
                            <option>Situação</option>
                            <option>OK</option>
                            <option>Atenção</option>
                            <option>Não OK</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                  <Collapse
                    title="⚙ Suspensão e peças do veículo"
                    subtitle="Checklist de avaliação e itens para orçamento"
                    open={checkOpen}
                    set={() => setCheckOpen(!checkOpen)}
                  >
                    <div className="inspection-tools">
                      <button
                        className="additem"
                        onClick={() =>
                          setCustom([...custom, "Novo item personalizado"])
                        }
                      >
                        + Adicionar item manualmente
                      </button>
                      <span>
                        <b>Estado da peça</b>
                        <small>
                          <i className="state-dot blank" /> Não avaliado{" "}
                          <i className="state-dot green" /> Bom{" "}
                          <i className="state-dot yellow" /> Atenção{" "}
                          <i className="state-dot red" /> Urgente
                        </small>
                      </span>
                      <button
                        className="clear-quotes"
                        onClick={() => setQuoteItems({})}
                      >
                        Desmarcar todos (Orçar)
                      </button>
                    </div>
                    <div className="quote-selection-summary">
                      <b>
                        Itens selecionados para orçamento (
                        {
                          [...ITEMS, ...custom].filter(
                            (_, i) => quoteItems[i + 1],
                          ).length
                        }
                        )
                      </b>
                      <span>
                        {[...ITEMS, ...custom].some((_, i) => quoteItems[i + 1])
                          ? [...ITEMS, ...custom]
                              .filter((_, i) => quoteItems[i + 1])
                              .map((item) => <i key={item}>{item}</i>)
                          : "Nenhum item selecionado."}
                      </span>
                    </div>
                    <div className="inspection">
                      {[...ITEMS, ...custom].map((x, i) => (
                        <div
                          className={
                            quoteItems[i + 1] ? "row quote-selected" : "row"
                          }
                          key={
                            i < ITEMS.length
                              ? `item-${i}`
                              : `manual-${i - ITEMS.length}`
                          }
                        >
                          <small>{String(i + 1).padStart(2, "0")}</small>
                          {i >= ITEMS.length ? (
                            <input
                              className="manual-item-name"
                              value={x}
                              aria-label="Nome do item manual"
                              onChange={(e) => {
                                const next = [...custom];
                                next[i - ITEMS.length] = e.target.value;
                                setCustom(next);
                              }}
                            />
                          ) : (
                            <b>{x}</b>
                          )}
                          <div className="lights">
                            {[
                              ["na", "Não avaliado"],
                              ["g", "Verde"],
                              ["y", "Amarelo"],
                              ["r", "Vermelho"],
                            ].map((s) => (
                              <button
                                title={s[1]}
                                aria-label={s[1]}
                                className={
                                  (status[i + 1] || "na") === s[0]
                                    ? s[0] + " hit"
                                    : s[0]
                                }
                                onClick={() =>
                                  setStatus({
                                    ...status,
                                    [i + 1]:
                                      s[0] === "na"
                                        ? ""
                                        : status[i + 1] === s[0]
                                          ? ""
                                          : s[0],
                                  })
                                }
                                key={s[0]}
                              >
                                <i />
                              </button>
                            ))}
                          </div>
                          <input
                            placeholder="Observação / descrição"
                            value={evaluationNotes[i + 1] ?? ""}
                            onChange={(e) =>
                              setEvaluationNotes({
                                ...evaluationNotes,
                                [i + 1]: e.target.value,
                              })
                            }
                          />
                          <label>
                            <input
                              type="checkbox"
                              checked={!!quoteItems[i + 1]}
                              onChange={(e) =>
                                setQuoteItems({
                                  ...quoteItems,
                                  [i + 1]: e.target.checked,
                                })
                              }
                            />{" "}
                            Orçar
                          </label>
                          {i >= ITEMS.length && (
                            <button
                              className="trash"
                              onClick={() => {
                                if (confirm("Excluir este item da avaliação?"))
                                  setCustom(
                                    custom.filter(
                                      (_, j) => j !== i - ITEMS.length,
                                    ),
                                  );
                              }}
                            >
                              🗑
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="inspection-bottom-actions">
                      <button
                        className="additem"
                        onClick={() =>
                          setCustom([...custom, "Novo item personalizado"])
                        }
                      >
                        + Adicionar item manualmente
                      </button>
                    </div>
                  </Collapse>
                  <Actions
                    back={() => go("agenda")}
                    next={() => {
                      const names = [...ITEMS, ...custom].filter(
                          (_, i) => quoteItems[i + 1],
                        ),
                        nextParts = [...parts];
                      for (const name of names) {
                        if (
                          !nextParts.some(
                            (p) =>
                              p.item.trim().toLocaleUpperCase("pt-BR") ===
                              name.trim().toLocaleUpperCase("pt-BR"),
                          )
                        )
                          nextParts.push({
                            item: titleCase(name),
                            brand: "",
                            supplier: "",
                            code: "",
                            qty: 1,
                            cost: 0,
                            margin: 0,
                            saleOverride: null,
                            manual: false,
                          });
                      }
                      setParts(nextParts);
                      if (activeAppointment) {
                        const budget: BudgetState = {
                          parts: nextParts,
                          selectedServices,
                          serviceQty,
                          manualServices,
                          patioNotes,
                          processStatus,
                        };
                        const updated: Appt = {
                          ...activeAppointment,
                          startedAt: started || activeAppointment.startedAt,
                          status: "avaliou",
                          tech: evaluator,
                          evaluationRecordedBy: user.displayName,
                          evaluationRecordedAt: new Date().toISOString(),
                          lastEditedBy: user.displayName,
                          lastEditedAt: new Date().toISOString(),
                          evaluation: {
                            status,
                            quoteItems,
                            custom,
                            notes: evaluationNotes,
                          },
                          budget,
                          _updatedAt: Date.now(),
                        };
                        DISPLAY_APPT = updated;
                        setActiveAppointment(updated);
                        setAppointments((list) =>
                          list.map((a) => (a.id === updated.id ? updated : a)),
                        );
                      }
                      go("orcamento");
                    }}
                    b="Voltar à agenda"
                    n="Avançar para orçamento"
                  />
                </>
              )}
              {view === "orcamento" && (
                <>
                  <Collapse
                    title="▣ Peças para orçamento"
                    subtitle="Toque para abrir, preencher ou fechar"
                    open={partsOpen}
                    set={() => setPartsOpen(!partsOpen)}
                  >
                    <div className="card bare">
                      <div className="sectiontitle">
                        <Title
                          a="Peças para orçamento"
                          b="Informe os dados da peça. O valor de venda é calculado automaticamente e pode ser alterado."
                        />
                        <button
                          onClick={() =>
                            setParts([
                              ...parts,
                              {
                                item: "",
                                brand: "",
                                supplier: "",
                                code: "",
                                qty: 1,
                                cost: 0,
                                margin: 0,
                                saleOverride: null,
                                manual: true,
                              },
                            ])
                          }
                        >
                          + Inserir peça manual
                        </button>
                      </div>
                      <div className="parts">
                        <div className="phead">
                          <span>Item / Marca</span>
                          <span>Qtd.</span>
                          <span>Fornecedor / Código</span>
                          <span>Custo</span>
                          <span>Margem</span>
                          <span>Venda unit.</span>
                          <span>Total</span>
                          <span>Ações</span>
                        </div>
                        {parts.map((p, i) => (
                          <div className="prow" key={i}>
                            <label>
                              <input
                                value={p.item}
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].item = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                              <input
                                value={p.brand}
                                placeholder="Marca"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].brand = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={p.qty}
                              onChange={(e) => {
                                const a = [...parts];
                                a[i].qty = +e.target.value;
                                setParts(a);
                              }}
                            />
                            <label>
                              <input
                                value={p.supplier}
                                placeholder="Fornecedor"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].supplier = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                              <input
                                value={p.code}
                                placeholder="Código"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].code =
                                    e.target.value.toLocaleUpperCase("pt-BR");
                                  setParts(a);
                                }}
                              />
                            </label>
                            <input
                              type={costs ? "number" : "password"}
                              value={p.cost}
                              onChange={(e) => {
                                const a = [...parts];
                                a[i].cost = +e.target.value;
                                setParts(a);
                              }}
                            />
                            <label>
                              <input
                                type={costs ? "number" : "password"}
                                value={p.margin}
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].margin = +e.target.value;
                                  a[i].saleOverride = null;
                                  setParts(a);
                                }}
                              />
                              %
                            </label>
                            <label className="sale-field">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={p.saleOverride ?? saleOf(p, roundStep)}
                                onChange={(e) => {
                                  const a = [...parts];
                                  const value = +e.target.value;
                                  a[i].saleOverride = value;
                                  a[i].margin =
                                    a[i].cost > 0
                                      ? Math.round(
                                          (value / a[i].cost - 1) * 10000,
                                        ) / 100
                                      : 0;
                                  setParts(a);
                                }}
                              />
                              <button
                                type="button"
                                title="Voltar ao cálculo automático"
                                onClick={() => {
                                  const a = [...parts];
                                  a[i].saleOverride = null;
                                  setParts(a);
                                }}
                              >
                                Auto
                              </button>
                            </label>
                            <b>{brl(p.qty * saleOf(p, roundStep))}</b>
                            <button
                              className="trash"
                              aria-label={`Excluir ${p.item || "peça"}`}
                              title="Excluir peça"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Excluir ${p.item || "esta peça"} do orçamento?`,
                                  )
                                )
                                  setParts(parts.filter((_, j) => j !== i));
                              }}
                            >
                              🗑
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Collapse>
                  <Collapse
                    title="⌘ Serviços e mão de obra"
                    subtitle="Toque para abrir, selecionar ou fechar"
                    open={servicesOpen}
                    set={() => setServicesOpen(!servicesOpen)}
                  >
                    <div className="card bare">
                      <div className="sectiontitle">
                        <Title
                          a="Serviços e mão de obra"
                          b="Selecione, informe a quantidade ou adicione manualmente."
                        />
                        <button
                          onClick={() =>
                            setManualServices([
                              ...manualServices,
                              { name: "", qty: 0, value: 0 },
                            ])
                          }
                        >
                          + Inserir serviço manual
                        </button>
                      </div>
                      <div className="servicegrid">
                        {SERVICES.map((x, i) => (
                          <label
                            className={
                              selectedServices.includes(i) ? "selected" : ""
                            }
                            key={x[0]}
                          >
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(i)}
                              onChange={() =>
                                setSelectedServices(
                                  selectedServices.includes(i)
                                    ? selectedServices.filter((v) => v !== i)
                                    : [...selectedServices, i],
                                )
                              }
                            />
                            <span>{x[0]}</span>
                            <input
                              className="qty"
                              type="number"
                              min="1"
                              value={serviceQty[i] ?? ""}
                              onChange={(e) => {
                                const next = { ...serviceQty };
                                if (e.target.value === "") delete next[i];
                                else next[i] = +e.target.value;
                                setServiceQty(next);
                              }}
                            />
                            <b>{x[1] ? brl(x[1]) + "/ un." : "Cortesia"}</b>
                          </label>
                        ))}
                      </div>
                      <div className="manualservices">
                        {manualServices.map((x, i) => (
                          <div key={i}>
                            <input
                              placeholder="Nome do serviço"
                              value={x.name}
                              onChange={(e) => {
                                const a = [...manualServices];
                                a[i].name = e.target.value;
                                setManualServices(a);
                              }}
                            />
                            <label>
                              Qtd.
                              <input
                                type="number"
                                min="1"
                                value={x.qty || ""}
                                onChange={(e) => {
                                  const a = [...manualServices];
                                  a[i].qty = +e.target.value;
                                  setManualServices(a);
                                }}
                              />
                            </label>
                            <label>
                              Valor unitário R$
                              <input
                                type="number"
                                value={x.value}
                                onChange={(e) => {
                                  const a = [...manualServices];
                                  a[i].value = +e.target.value;
                                  setManualServices(a);
                                }}
                              />
                            </label>
                            <b>{brl(x.qty * x.value)}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Collapse>
                  <div className="card patio-notes-field">
                    <label>
                      <b>Observações para o pátio (opcional)</b>
                      <span>
                        Informe orientações adicionais para a execução do
                        serviço.
                      </span>
                      <textarea
                        value={patioNotes}
                        onChange={(e) => setPatioNotes(e.target.value)}
                        placeholder="Ex.: guardar as peças substituídas, conferir ruído após o teste..."
                      />
                    </label>
                  </div>
                  <div className="totals">
                    <span>
                      Peças <b>{brl(pieces)}</b>
                    </span>
                    <span>
                      Serviços <b>{brl(serviceTotal)}</b>
                    </span>
                    <strong>
                      Total <em>{brl(total)}</em>
                    </strong>
                  </div>
                  <Actions
                    back={() => {
                      if (activeAppointment) {
                        const reopened: Appt = {
                          ...activeAppointment,
                          status: "agendado",
                          _updatedAt: Date.now(),
                        };
                        DISPLAY_APPT = reopened;
                        setActiveAppointment(reopened);
                        setAppointments((list) =>
                          list.map((a) =>
                            a.id === reopened.id ? reopened : a,
                          ),
                        );
                      }
                      go("avaliacao");
                    }}
                    next={() => go("proposta")}
                    b="Voltar à avaliação"
                    n="Gerar orçamento"
                  />
                </>
              )}
              {view === "proposta" && (
                <>
                  <div className="proposal printable">
                    <div className="prophead">
                      <DocLogo />
                      <span>
                        {new Date(
                          DISPLAY_APPT.date + "T12:00:00",
                        ).toLocaleDateString("pt-BR")}
                        <b>{DISPLAY_APPT.plate || "SEM PLACA"}</b>
                      </span>
                    </div>
                    <div className="client">
                      <span>
                        CLIENTE<b>{DISPLAY_APPT.client}</b>
                        <small>
                          {DISPLAY_APPT.phone || "WhatsApp não informado"}
                        </small>
                      </span>
                      <span>
                        VEÍCULO<b>{DISPLAY_APPT.vehicle || "Não informado"}</b>
                        <small>
                          {DISPLAY_APPT.km
                            ? DISPLAY_APPT.km + " km"
                            : "Km não informado"}
                        </small>
                      </span>
                    </div>
                    <h3>Peças</h3>
                    {parts.map((p, i) => (
                      <div className="line" key={i}>
                        <small>{p.qty}x</small>
                        <span>
                          <b>
                            {p.item} {p.brand}
                          </b>
                          <small>Unitário: {brl(saleOf(p, roundStep))}</small>
                        </span>
                        <strong>{brl(p.qty * saleOf(p, roundStep))}</strong>
                      </div>
                    ))}
                    <h3>Serviços</h3>
                    {selectedServices.map((i) => (
                      <div className="line" key={i}>
                        <small>{serviceQty[i] ?? 0}x</small>
                        <span>
                          <b>{SERVICES[i][0]}</b>
                          <small>
                            Unitário:{" "}
                            {SERVICES[i][1] ? brl(SERVICES[i][1]) : "Cortesia"}
                          </small>
                        </span>
                        <strong>
                          {SERVICES[i][1]
                            ? brl(SERVICES[i][1] * (serviceQty[i] ?? 0))
                            : "Cortesia"}
                        </strong>
                      </div>
                    ))}
                    {manualServices
                      .filter((x) => x.name)
                      .map((x, i) => (
                        <div className="line" key={"m" + i}>
                          <small>{x.qty}x</small>
                          <span>
                            <b>{x.name}</b>
                            <small>Unitário: {brl(x.value)}</small>
                          </span>
                          <strong>{brl(x.qty * x.value)}</strong>
                        </div>
                      ))}
                    <div className="grand">
                      Total do orçamento <b>{brl(total)}</b>
                    </div>
                    <div className="payments">
                      <label>
                        <input type="radio" name="pay" defaultChecked /> Pix -
                        5% de desconto <b>{brl(total * 0.95)}</b>
                      </label>
                      <label>
                        <input type="radio" name="pay" /> Cartão - até 5x sem
                        juros <b>5x de {brl(total / 5)}</b>
                      </label>
                    </div>
                  </div>
                  <div className="propactions">
                    <button onClick={() => go("orcamento")}>
                      ← Voltar e alterar
                    </button>
                    <button onClick={() => printStage("orcamento")}>
                      Imprimir com valores
                    </button>
                    <button onClick={() => printNoValues("proposta")}>
                      Imprimir sem valores - pátio
                    </button>
                    <button
                      className="wa"
                      onClick={() => {
                        if (activeAppointment) {
                          const budget: BudgetState = {
                            parts,
                            selectedServices,
                            serviceQty,
                            manualServices,
                            patioNotes,
                            processStatus: "Em andamento",
                          };
                          const updated: Appt = {
                            ...activeAppointment,
                            status: "avaliou",
                            budget,
                            budgetEditedBy: user.displayName,
                            budgetEditedAt: new Date().toISOString(),
                            lastEditedBy: user.displayName,
                            lastEditedAt: new Date().toISOString(),
                            _updatedAt: Date.now(),
                          };
                          DISPLAY_APPT = updated;
                          setActiveAppointment(updated);
                          setAppointments((list) =>
                            list.map((a) =>
                              a.id === updated.id ? updated : a,
                            ),
                          );
                        }
                        setProcessStatus("Em andamento");
                        setSavedAt(
                          new Date().toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                        );
                        setQuoteMessageFor(activeAppointment?.id ?? null);
                        setMessage(quote);
                      }}
                    >
                      Salvar e preparar mensagem
                    </button>
                    <button
                      className="primary"
                      onClick={() => {
                        if (activeAppointment) {
                          const budget: BudgetState = {
                            parts,
                            selectedServices,
                            serviceQty,
                            manualServices,
                            patioNotes,
                            processStatus: "Em andamento",
                          };
                          const updated: Appt = {
                            ...activeAppointment,
                            status: "servico",
                            inProgress: true,
                            budget,
                            budgetEditedBy: user.displayName,
                            budgetEditedAt: new Date().toISOString(),
                            lastEditedBy: user.displayName,
                            lastEditedAt: new Date().toISOString(),
                            _updatedAt: Date.now(),
                          };
                          DISPLAY_APPT = updated;
                          setActiveAppointment(updated);
                          setAppointments((list) =>
                            list.map((a) =>
                              a.id === updated.id ? updated : a,
                            ),
                          );
                        }
                        setProcessStatus("Em andamento");
                        setSavedAt(
                          new Date().toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                        );
                        setView("agenda");
                        scrollTo(0, 0);
                      }}
                    >
                      Aprovar e salvar serviço
                    </button>
                  </div>
                </>
              )}
              {view === "torque" && (
                <>
                  <div className="workflowbar">
                    <b>
                      Status:{" "}
                      <span
                        className={
                          processStatus === "Em andamento"
                            ? "working"
                            : "finished"
                        }
                      >
                        {processStatus}
                      </span>
                    </b>
                    {savedAt && <small>Salvo às {savedAt}</small>}
                  </div>
                  <div className="printable">
                    {[
                      ["front", "Suspensão dianteira", FRONT, true],
                      ["rear", "Suspensão traseira", REAR, true],
                      ["safe", "Conferência de segurança", SAFE, false],
                      ["tq", "Torques de segurança", TQ, false],
                    ].map((x: any) => (
                      <Collapse
                        key={x[0]}
                        title={"◇ " + x[1]}
                        subtitle="Toque para abrir ou fechar"
                        open={!!torqueOpen[x[0]]}
                        set={() =>
                          setTorqueOpen({
                            ...torqueOpen,
                            [x[0]]: !torqueOpen[x[0]],
                          })
                        }
                      >
                        <Check
                          title={x[1]}
                          items={x[2]}
                          vals={checks}
                          set={setChecks}
                          tri={x[3]}
                        />
                      </Collapse>
                    ))}
                    <Collapse
                      title="✓ Finalização"
                      subtitle="Liberação, orientação e responsáveis"
                      open={torqueOpen.final}
                      set={() =>
                        setTorqueOpen({
                          ...torqueOpen,
                          final: !torqueOpen.final,
                        })
                      }
                    >
                      <div className="card bare">
                        <div className="final">
                          <label>
                            <input
                              type="checkbox"
                              checked={finalization.serviceCompleted}
                              onChange={(e) =>
                                setFinalization({
                                  ...finalization,
                                  serviceCompleted: e.target.checked,
                                })
                              }
                            />
                            Serviço finalizado conforme padrão Monocenter
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={finalization.vehicleReleased}
                              onChange={(e) =>
                                setFinalization({
                                  ...finalization,
                                  vehicleReleased: e.target.checked,
                                })
                              }
                            />
                            Veículo liberado para entrega
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={finalization.clientOriented}
                              onChange={(e) =>
                                setFinalization({
                                  ...finalization,
                                  clientOriented: e.target.checked,
                                })
                              }
                            />
                            Cliente orientado sobre revisão e garantia
                          </label>
                        </div>
                        <textarea
                          value={finalization.note}
                          onChange={(e) =>
                            setFinalization({
                              ...finalization,
                              note: e.target.value,
                            })
                          }
                          placeholder="Atenção / observação: preencher apenas o relacionado ao serviço executado"
                        />
                        <div className="sign">
                          {[
                            ["Técnico", "technician"],
                            ["Execução do serviço", "executor"],
                            ["Conferente final", "checker"],
                          ].map(([label, field]) => (
                            <label key={field}>
                              {label}
                              <input
                                value={
                                  finalization[
                                    field as keyof typeof finalization
                                  ] as string
                                }
                                onChange={(e) =>
                                  setFinalization({
                                    ...finalization,
                                    [field]: e.target.value,
                                  })
                                }
                                placeholder="Nome do responsável"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  {activeAppointment &&
                    (!activeAppointment.vehicle.trim() ||
                      !activeAppointment.plate.trim() ||
                      !activeAppointment.km.trim()) && (
                      <div className="required-vehicle-warning" role="alert">
                        <b>Preenchimento obrigatório para finalizar</b>
                        <span>
                          Complete no agendamento:{" "}
                          {[
                            !activeAppointment.vehicle.trim() && "veículo",
                            !activeAppointment.plate.trim() && "placa",
                            !activeAppointment.km.trim() && "KM",
                          ]
                            .filter(Boolean)
                            .join(", ")}
                          .
                        </span>
                      </div>
                    )}
                  <Actions
                    back={() => go("proposta")}
                    next={() => {
                      if (!activeAppointment) return;
                      const missing = [
                        !activeAppointment.vehicle.trim() && "veículo",
                        !activeAppointment.plate.trim() && "placa",
                        !activeAppointment.km.trim() && "KM",
                      ].filter(Boolean);
                      if (missing.length) {
                        alert(
                          `Não é possível finalizar. Preencha no agendamento: ${missing.join(", ")}.`,
                        );
                        return;
                      }
                      setProcessStatus("Finalizado");
                      const updated: Appt = {
                        ...activeAppointment,
                        status: "servico",
                        inProgress: false,
                        budget: {
                          parts,
                          selectedServices,
                          serviceQty,
                          manualServices,
                          patioNotes,
                          processStatus: "Finalizado",
                        },
                        conference: {
                          checks,
                          finalization,
                          finalizedBy: user.displayName,
                          finalizedAt: new Date().toISOString(),
                        },
                        lastEditedBy: user.displayName,
                        lastEditedAt: new Date().toISOString(),
                        _updatedAt: Date.now(),
                      };
                      DISPLAY_APPT = updated;
                      setActiveAppointment(updated);
                      setAppointments((list) =>
                        list.map((a) => (a.id === updated.id ? updated : a)),
                      );
                      setView("agenda");
                      scrollTo(0, 0);
                    }}
                    b="Voltar ao orçamento"
                    n="Finalizar conferência"
                  />
                </>
              )}
            </section>
          )}
        {view === "atendimento" && activeAppointment && (
          <AttendanceSummary
            appointment={activeAppointment}
            roundStep={roundStep}
            onBack={() => go("agenda")}
            onEditConference={() => {
              setChecks(activeAppointment.conference?.checks ?? {});
              setFinalization(
                activeAppointment.conference?.finalization ?? {
                  serviceCompleted: false,
                  vehicleReleased: false,
                  clientOriented: false,
                  note: "",
                  technician: activeAppointment.tech ?? "",
                  executor: "",
                  checker: "",
                },
              );
              setProcessStatus("Finalizado");
              setTorqueOpen({
                front: false,
                rear: false,
                safe: false,
                tq: false,
                final: false,
              });
              setView("torque");
              scrollTo(0, 0);
            }}
          />
        )}
        {view === "relatorios" && (
          <Reports
            data={appointments}
            user={user}
            initialMode={reportStartMode}
            open={(a: Appt) => {
              DISPLAY_APPT = a;
              setActiveAppointment(a);
              setEvaluator(a.tech ?? availableTechs[0] ?? "");
              setStatus(a.evaluation?.status ?? {});
              setQuoteItems(a.evaluation?.quoteItems ?? {});
              setCustom(a.evaluation?.custom ?? []);
              setEvaluationNotes(a.evaluation?.notes ?? {});
              setChecks(a.conference?.checks ?? {});
              setFinalization(
                a.conference?.finalization ?? {
                  serviceCompleted: false,
                  vehicleReleased: false,
                  clientOriented: false,
                  note: "",
                  technician: a.tech ?? "",
                  executor: "",
                  checker: "",
                },
              );
              if (a.budget) {
                setParts(a.budget.parts ?? []);
                setSelectedServices(a.budget.selectedServices ?? []);
                setServiceQty(a.budget.serviceQty ?? {});
                setManualServices(a.budget.manualServices ?? []);
                setPatioNotes(a.budget.patioNotes ?? "");
                setProcessStatus(a.budget.processStatus ?? "Em andamento");
              } else {
                setParts([]);
                setSelectedServices([]);
                setServiceQty({});
                setManualServices([]);
                setPatioNotes("");
                setProcessStatus("Em andamento");
              }
              setView(
                a.type === "revisao" && (!a.reviewWithService || !a.review)
                  ? "revisao"
                  : a.budget?.processStatus === "Finalizado"
                    ? "atendimento"
                    : a.status === "servico"
                      ? "torque"
                      : a.status === "avaliou"
                        ? "orcamento"
                        : "avaliacao",
              );
              scrollTo(0, 0);
            }}
            edit={(a: Appt) => setModal(a)}
            remove={(a: Appt) => {
              if (
                confirm(
                  `ATENÇÃO: deseja realmente excluir o registro de ${a.client}? Esta ação não poderá ser desfeita.`,
                )
              ) {
                syncBlockedUntil.current = Date.now() + 4000;
                setDeletedAppointmentIds((ids) => [...new Set([...ids, a.id])]);
                setAppointments((list) => list.filter((x) => x.id !== a.id));
              }
            }}
            message={setMessage}
          />
        )}{" "}
        {view === "historico" && <History />}
        {view === "config" && (
          <Config
            user={user}
            techs={availableTechs}
            setTechs={(names: string[]) =>
              setTechs(
                names.filter(
                  (name) =>
                    name.trim().toLocaleLowerCase("pt-BR") !== "anna",
                ),
              )
            }
            holidays={holidays}
            setHolidays={setHolidays}
            templates={templates}
            setTemplates={setTemplates}
            footerSize={footerSize}
            setFooterSize={setFooterSize}
            roundStep={roundStep}
            setRoundStep={setRoundStep}
          />
        )}
        <div className="bottom">
          {nav
            .filter((n) => !["proposta", "config", "relatorios"].includes(n[0]))
            .map((n) => (
              <button
                className={view === n[0] ? "on" : ""}
                onClick={() => go(n[0])}
                key={n[0]}
              >
                <i>{n[2]}</i>
                <small>{n[1]}</small>
              </button>
            ))}
        </div>
        {modal && (
          <Modal
            initial={modal === true ? undefined : modal}
            currentUser={user.displayName}
            close={() => setModal(false)}
            remove={(a: Appt) => {
              syncBlockedUntil.current = Date.now() + 4000;
              setDeletedAppointmentIds((ids) => [...new Set([...ids, a.id])]);
              setAppointments((list) => list.filter((x) => x.id !== a.id));
              setModal(false);
            }}
            save={(a: Appt) => {
              const updated = {
                ...a,
                scheduledBy: a.scheduledBy || user.displayName,
                createdAt: a.createdAt || new Date().toISOString(),
                lastEditedBy: user.displayName,
                lastEditedAt: new Date().toISOString(),
                _updatedAt: Date.now(),
              };
              setDeletedAppointmentIds((ids) =>
                ids.filter((id) => id !== a.id),
              );
              setAppointments(
                appointments.some((x) => x.id === a.id)
                  ? appointments.map((x) => (x.id === a.id ? updated : x))
                  : [...appointments, updated],
              );
              setModal(false);
            }}
          />
        )}
        {message && (
          <Message
            text={message}
            close={() => {
              setMessage("");
              setQuoteMessageFor(null);
            }}
            sent={
              quoteMessageFor
                ? !!appointments.find((a) => a.id === quoteMessageFor)
                    ?.quoteSentAt
                : false
            }
            onSent={
              quoteMessageFor
                ? () => {
                    const quoteSentAt = new Date().toISOString();
                    const quoteSentBy = user.displayName;
                    setAppointments((list) =>
                      list.map((a) =>
                        a.id === quoteMessageFor
                          ? {
                              ...a,
                              quoteSentAt,
                              quoteSentBy,
                              lastEditedBy: user.displayName,
                              lastEditedAt: quoteSentAt,
                              _updatedAt: Date.now(),
                            }
                          : a,
                      ),
                    );
                    if (activeAppointment?.id === quoteMessageFor) {
                      const updated = {
                        ...activeAppointment,
                        quoteSentAt,
                        quoteSentBy,
                        _updatedAt: Date.now(),
                      };
                      DISPLAY_APPT = updated;
                      setActiveAppointment(updated);
                    }
                  }
                : undefined
            }
          />
        )}
        <PrintDocuments
          parts={parts}
          selectedServices={selectedServices}
          serviceQty={serviceQty}
          manualServices={manualServices}
          patioNotes={patioNotes}
          checks={checks}
          status={status}
          evaluationNotes={evaluationNotes}
          footerSize={footerSize}
          pieces={pieces}
          serviceTotal={serviceTotal}
          total={total}
          roundStep={roundStep}
        />
      </main>
    </div>
  );
}
function Logo() {
  return (
    <div className="logo textlogo">
      <span>
        <b>MONOCENTER</b>
        <small>Alinhamento Técnico</small>
      </span>
    </div>
  );
}
function DocLogo() {
  return (
    <div className="doclogo">
      <img src="/logo-monocenter.jpg" alt="Monocenter Alinhamento Técnico" />
    </div>
  );
}
function Vehicle() {
  const a = DISPLAY_APPT;
  return (
    <>
      <div className="printheader">
        <b>MONOCENTER ALINHAMENTO TÉCNICO</b>
        <span>
          Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP · WhatsApp (15)
          99657-4741
        </span>
      </div>
      <div className="vehicle">
        <i>▰</i>
        {[
          ["CLIENTE", a.client],
          ["VEÍCULO", a.vehicle || "Não informado"],
          ["PLACA", a.plate || "Não informada"],
          ["KM", a.km || "Não informado"],
          ["TÉCNICO", a.tech || "Saulo"],
        ].map((x) => (
          <span key={x[0]}>
            <small>{x[0]}</small>
            <b>{x[1]}</b>
          </span>
        ))}
      </div>
    </>
  );
}
function Steps({ view }: { view: View }) {
  const n = { avaliacao: 1, orcamento: 2, proposta: 3, torque: 4 }[view] ?? 1;
  return (
    <div className="steps">
      {["Avaliação", "Orçamento", "Proposta", "Conferência"].map((x, i) => (
        <span className={i < n ? "done" : ""} key={x}>
          <i>{i + 1}</i>
          {x}
        </span>
      ))}
    </div>
  );
}
function StageActions({
  view,
  status,
  setStatus,
  printNoValues,
  printStage,
  save,
  savedAt,
}: any) {
  if (!["avaliacao", "orcamento", "proposta", "torque"].includes(view))
    return null;
  const label = {
    avaliacao: "Etapa 1 - Avaliação",
    orcamento: "Etapa 2 - Orçamento",
    proposta: "Etapa 3 - Proposta",
    torque: "Etapa 4 - Conferência",
  }[view as string];
  return (
    <div className="stageactions">
      <b>{label}</b>
      <label>
        Status da OS
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>
      </label>
      <button onClick={save}>Salvar</button>
      <button
        className="stage-save-bottom"
        onClick={save}
        aria-label={`Salvar ${label}`}
      >
        Salvar
      </button>
      <button onClick={() => printStage(view)}>Imprimir relatório A4</button>
      {["orcamento", "proposta"].includes(view) && (
        <button onClick={() => printNoValues(view)}>
          Imprimir sem valores - pátio
        </button>
      )}
      {savedAt && <small>Último salvamento: {savedAt}</small>}
    </div>
  );
}
function Title({ a, b }: { a: string; b: string }) {
  return (
    <div className="title">
      <h2>{a}</h2>
      <p>{b}</p>
    </div>
  );
}
function Actions({ back, next, b, n }: any) {
  return (
    <div className="actions">
      <button onClick={back}>← {b}</button>
      <button className="primary" onClick={next}>
        {n} →
      </button>
    </div>
  );
}
function Collapse({ title, subtitle, open, set, children }: any) {
  return (
    <section className="collapse">
      <button className="collapsehead" onClick={set}>
        <span>
          <b>{title}</b>
          <small>{subtitle}</small>
        </span>
        <i>{open ? "⌃" : "⌄"}</i>
      </button>
      {open && <div className="collapsebody">{children}</div>}
    </section>
  );
}
function Check({ title, items, vals, set, tri }: any) {
  const all = (kind: "ok" | "na") => {
    const next = { ...vals };
    items.forEach((x: string) => {
      if (tri) {
        next[x + "-ok"] = kind === "ok";
        next[x + "-na"] = kind === "na";
      } else next[x] = kind === "ok";
    });
    set(next);
  };
  return (
    <div className="check bare">
      <div className="checktitle">
        <h2>{title}</h2>
        <span>
          <button onClick={() => all("ok")}>Selecionar todos: conferido</button>
          {tri && (
            <button onClick={() => all("na")}>
              Selecionar todos: não se aplica
            </button>
          )}
        </span>
      </div>
      {items.map((x: string) => (
        <div key={x}>
          <span>{x}</span>
          {tri ? (
            <>
              <button
                className={vals[x + "-ok"] ? "hit" : ""}
                onClick={() =>
                  set({
                    ...vals,
                    [x + "-ok"]: !vals[x + "-ok"],
                    [x + "-na"]: false,
                  })
                }
              >
                Conferido
              </button>
              <button
                className={vals[x + "-na"] ? "na hit" : ""}
                onClick={() =>
                  set({
                    ...vals,
                    [x + "-na"]: !vals[x + "-na"],
                    [x + "-ok"]: false,
                  })
                }
              >
                Não se aplica
              </button>
            </>
          ) : (
            <button
              className={vals[x] ? "box hit" : "box"}
              onClick={() => set({ ...vals, [x]: !vals[x] })}
            >
              {vals[x] ? "✓" : ""}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
function Agenda({
  data,
  holidays,
  add,
  showOpenQuotes,
  showInProgress,
  start,
  edit,
  remove,
  message,
}: any) {
  const today = new Date(),
    todayIso = iso(today);
  const [date, setDate] = useState(todayIso),
    [cursor, setCursor] = useState(
      new Date(today.getFullYear(), today.getMonth(), 1),
    ),
    [mode, setMode] = useState<"dia" | "semana" | "mes">("mes"),
    [openCal, setOpenCal] = useState(true);
  const selectedDate = new Date(date + "T12:00:00"),
    calendarDays = useMemo(() => {
      if (mode === "dia") return [new Date(date + "T12:00:00")];
      if (mode === "semana") {
        const chosen = new Date(date + "T12:00:00"),
          first = new Date(chosen);
        first.setDate(chosen.getDate() - chosen.getDay());
        return Array.from({ length: 7 }, (_, i) => {
          const d = new Date(first);
          d.setDate(first.getDate() + i);
          return d;
        });
      }
      const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1),
        start = new Date(first);
      start.setDate(1 - first.getDay());
      return Array.from({ length: 42 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
      });
    }, [cursor, date, mode]);
  const list = data.filter((a: Appt) => a.date === date),
    openQuotesCount = (data as Appt[]).filter(
      (a) =>
        a.type === "cliente" &&
        a.status === "avaliou" &&
        a.budget?.processStatus !== "Finalizado",
    ).length,
    inProgressCount = (data as Appt[]).filter(
      (a) =>
        (a.inProgress || a.status === "servico") &&
        a.type !== "bloqueio" &&
        a.budget?.processStatus !== "Finalizado",
    ).length,
    weekLabels =
      mode === "dia"
        ? [selectedDate.toLocaleDateString("pt-BR", { weekday: "long" })]
        : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    calendarTitle =
      mode === "mes"
        ? cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
        : mode === "semana"
          ? `${calendarDays[0].toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} a ${calendarDays[6].toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}`
          : fmt(date);
  const move = (n: number) => {
      if (mode === "mes") {
        const next = new Date(cursor.getFullYear(), cursor.getMonth() + n, 1);
        setCursor(next);
        setDate(iso(next));
        return;
      }
      const next = new Date(date + "T12:00:00");
      next.setDate(next.getDate() + n * (mode === "semana" ? 7 : 1));
      setDate(iso(next));
      setCursor(new Date(next.getFullYear(), next.getMonth(), 1));
    },
    changeMode = (value: "dia" | "semana" | "mes") => {
      setMode(value);
      const chosen = new Date(date + "T12:00:00");
      setCursor(new Date(chosen.getFullYear(), chosen.getMonth(), 1));
    };
  return (
    <section className="agenda">
      <div className="agenda-brand">
        <b>Agenda Monocenter</b>
        <span>
          <i className="dot yellow" /> Avaliou <i className="dot green" /> Fez
          serviço <i className="dot red" /> Faltou <i className="dot purple" />{" "}
          Retorno <i className="dot orange" /> Garantia{" "}
          <i className="dot blue" /> Revisão 30 dias
          <i className="dot completed" /> Concluído
          <i className="shop-line" /> Na oficina
        </span>
      </div>
      <div className="agtop">
        <div>
          <button
            onClick={() => move(-1)}
            aria-label={
              mode === "mes"
                ? "Mês anterior"
                : mode === "semana"
                  ? "Semana anterior"
                  : "Dia anterior"
            }
          >
            ‹
          </button>
          <h2>{calendarTitle}</h2>
          {mode === "mes" && (
            <label className="month-picker">
              <span>Ir para o mês</span>
              <input
                type="month"
                value={`${cursor.getFullYear()}-${String(
                  cursor.getMonth() + 1,
                ).padStart(2, "0")}`}
                onChange={(e) => {
                  if (!e.target.value) return;
                  const [year, month] = e.target.value.split("-").map(Number),
                    selected = new Date(year, month - 1, 1);
                  setCursor(selected);
                  setDate(iso(selected));
                }}
                aria-label="Escolher mês e ano"
              />
            </label>
          )}
          <button
            onClick={() => move(1)}
            aria-label={
              mode === "mes"
                ? "Próximo mês"
                : mode === "semana"
                  ? "Próxima semana"
                  : "Próximo dia"
            }
          >
            ›
          </button>
          <button
            onClick={() => {
              const now = new Date();
              setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
              setDate(iso(now));
            }}
          >
            Hoje
          </button>
        </div>
        <div className="calendar-actions">
          <select
            value={mode}
            onChange={(e) =>
              changeMode(e.target.value as "dia" | "semana" | "mes")
            }
            aria-label="Visualização do calendário"
          >
            <option value="dia">Dia</option>
            <option value="semana">Semana</option>
            <option value="mes">Mês</option>
          </select>
          <button onClick={() => setOpenCal(!openCal)}>
            {openCal ? "Ocultar calendário ⌃" : "Mostrar calendário ⌄"}
          </button>
          <button className="primary" onClick={add}>
            + Novo agendamento
          </button>
        </div>
      </div>
      <div className={openCal ? "aggrid" : "aggrid calendar-closed"}>
        {openCal && (
          <div className={"calendar calendar-" + mode}>
            <div className="week">
              {weekLabels.map((x) => (
                <b key={x}>{x}</b>
              ))}
            </div>
            <div className="days">
              {calendarDays.map((d) => {
                const ds = iso(d),
                  apps = data.filter((a: Appt) => a.date === ds),
                  holiday = holidays.find((h: any) => h.date === ds);
                return (
                  <button
                    onClick={() => setDate(ds)}
                    className={
                      (ds === date ? "selected " : "") +
                      (mode === "mes" && d.getMonth() !== cursor.getMonth()
                        ? "muted"
                        : "") +
                      (holiday ? " holiday" : "")
                    }
                    key={ds}
                  >
                    <b>{mode === "dia" ? fmt(ds) : d.getDate()}</b>
                    {holiday && <em title={holiday.name}>● {holiday.name}</em>}
                    {apps.map((a: Appt) => (
                      <span
                        className={`${apptClass(a)}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}`}
                        key={a.id}
                      >
                        {a.time} {a.client.split(" ")[0]}
                        {a.quoteSentAt ? " ✓" : ""}
                      </span>
                    ))}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="day">
          <div className="dayhead">
            <span>
              <small>AGENDA DO DIA</small>
              <h2>{fmt(date)}</h2>
            </span>
            <b>
              {list.length} {list.length === 1 ? "registro" : "registros"}
            </b>
          </div>
          {list.length === 0 && (
            <div className="emptyday">
              Nenhum agendamento. Clique em “Novo agendamento” para incluir.
            </div>
          )}
          {list.map((a: Appt) => (
            <article
              className={`${a.type === "bloqueio" ? "absence" : apptClass(a)}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}`}
              key={a.id}
            >
              <time>
                <b>{a.time}</b>
                <small>
                  {a.type === "bloqueio"
                    ? "AUSENTE"
                    : a.type === "retorno"
                      ? "RETORNO"
                      : a.type === "garantia"
                        ? "GARANTIA"
                        : a.type === "revisao"
                          ? a.reviewWithService
                            ? "REVISÃO + SERVIÇO"
                            : "REVISÃO 30 DIAS"
                          : a.budget?.processStatus === "Finalizado"
                            ? "CONCLUÍDO"
                            : a.inProgress
                              ? "EM ANDAMENTO"
                              : a.status === "avaliou" && a.quoteSentAt
                                ? "ORÇAMENTO ENVIADO EM ABERTO"
                                : a.status === "avaliou"
                                  ? "AGUARDANDO ORÇAMENTO"
                                  : a.status}
                </small>
                {a.type !== "bloqueio" && a.tech && (
                  <small className="card-tech">
                    {a.status === "avaliou" ? "Avaliado por" : "Téc."} {a.tech}
                  </small>
                )}
                {a.type !== "bloqueio" && a.startedAt && (
                  <small className="card-start">Início: {a.startedAt}</small>
                )}
              </time>
              <span>
                <h3>{a.client}</h3>
                <p>
                  {a.type === "bloqueio"
                    ? "Ausência de funcionário"
                    : a.vehicle}
                  {a.plate && (
                    <>
                      {" "}
                      · <b>{a.plate}</b>
                    </>
                  )}
                </p>
                {a.budget?.processStatus === "Finalizado" ? (
                  <div className="agenda-finalization">
                    <b>✓ Atendimento finalizado</b>
                    {a.conference?.finalization && (
                      <span>
                        {[
                          a.conference.finalization.serviceCompleted &&
                            "Serviço concluído",
                          a.conference.finalization.vehicleReleased &&
                            "Veículo liberado",
                          a.conference.finalization.clientOriented &&
                            "Cliente orientado",
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Finalização registrada"}
                      </span>
                    )}
                    {a.conference?.finalization?.note && (
                      <span>{a.conference.finalization.note}</span>
                    )}
                    <small>
                      Finalizado por{" "}
                      {a.conference?.finalizedBy || "não informado"}
                      {a.conference?.finalizedAt
                        ? ` em ${new Date(
                            a.conference.finalizedAt,
                          ).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        : ""}
                    </small>
                    {a.conference?.finalization &&
                      [
                        ["Técnico", a.conference.finalization.technician],
                        ["Executado por", a.conference.finalization.executor],
                        ["Conferido por", a.conference.finalization.checker],
                      ].some(([, name]) => name) && (
                        <small>
                          {[
                            ["Técnico", a.conference.finalization.technician],
                            [
                              "Executado por",
                              a.conference.finalization.executor,
                            ],
                            [
                              "Conferido por",
                              a.conference.finalization.checker,
                            ],
                          ]
                            .filter(([, name]) => name)
                            .map(([label, name]) => `${label}: ${name}`)
                            .join(" · ")}
                        </small>
                      )}
                  </div>
                ) : (
                  a.note && <small>{a.note}</small>
                )}
                {a.type === "cliente" &&
                  a.status === "avaliou" &&
                  !a.quoteSentAt &&
                  a.budget?.processStatus !== "Finalizado" && (
                    <small className="quote-waiting">
                      {quoteWaitingLabel(a)}
                    </small>
                  )}
                {a.scheduledBy && a.createdAt && (
                  <small className="schedule-meta">
                    Agendado por {a.scheduledBy} em{" "}
                    {new Date(a.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                )}
                {a.evaluationRecordedBy && (
                  <small className="schedule-meta">
                    Avaliação registrada no sistema por {a.evaluationRecordedBy}
                    {a.evaluationRecordedAt
                      ? ` em ${new Date(a.evaluationRecordedAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : ""}
                  </small>
                )}
                {a.budgetEditedBy && (
                  <small className="schedule-meta">
                    Orçamento preenchido por {a.budgetEditedBy}
                    {a.budgetEditedAt
                      ? ` em ${new Date(a.budgetEditedAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : ""}
                  </small>
                )}
                {a.lastEditedBy && (
                  <small className="schedule-meta">
                    Última edição por {a.lastEditedBy}
                  </small>
                )}
                {a.quoteSentAt && (
                  <small className="quote-sent">
                    ✓ Orçamento enviado
                    {a.budget?.processStatus !== "Finalizado"
                      ? " – EM ABERTO"
                      : ""}{" "}
                    em{" "}
                    {new Date(a.quoteSentAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {a.quoteSentBy ? ` · por ${a.quoteSentBy}` : ""}
                  </small>
                )}
              </span>
              <div>
                {a.type !== "bloqueio" && (
                  <button
                    onClick={() =>
                      message(
                        `Olá, ${a.client}! Passando para lembrar do seu agendamento na Monocenter em ${fmt(a.date)}, às ${a.time}. Aguardamos você!`,
                      )
                    }
                  >
                    Mensagem
                  </button>
                )}
                <button onClick={() => edit(a)}>Editar</button>
                <button className="danger" onClick={() => remove(a)}>
                  Excluir
                </button>
                {a.type !== "bloqueio" && (
                  <button onClick={() => start(a)}>
                    {a.type === "revisao" && (!a.reviewWithService || !a.review)
                      ? "Abrir revisão →"
                      : a.type === "retorno" && a.status === "agendado"
                        ? "Abrir retorno →"
                        : a.type === "garantia" && a.status === "agendado"
                          ? "Abrir garantia →"
                          : a.budget?.processStatus === "Finalizado"
                            ? "Visualizar atendimento →"
                            : a.status === "servico"
                              ? "Abrir conferência →"
                              : a.status === "avaliou"
                                ? "Abrir orçamento →"
                                : "Abrir avaliação →"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="agenda-followups">
        <button className="open-quotes-alert" onClick={showOpenQuotes}>
          <span>
            <b>Orçamentos em aberto</b>
            <small>Clientes avaliados aguardando aprovação</small>
          </span>
          <strong>{openQuotesCount}</strong>
          <i>Ver clientes →</i>
        </button>
        <button className="in-progress-alert" onClick={showInProgress}>
          <span>
            <b>Atendimentos em andamento</b>
            <small>Veículos em execução aguardando conclusão</small>
          </span>
          <strong>{inProgressCount}</strong>
          <i>Ver atendimentos →</i>
        </button>
      </div>
    </section>
  );
}

function ReviewScreen({
  appointment,
  appointments,
  techs,
  onBack,
  onSave,
}: any) {
  const previous = appointments.filter(
    (a: Appt) =>
      a.id !== appointment.id &&
      a.type !== "bloqueio" &&
      a.status === "servico" &&
      (!appointment.plate || a.plate === appointment.plate),
  );
  const saved = appointment.review as ReviewState | undefined;
  const [previousId, setPreviousId] = useState<number | undefined>(
    saved?.previousId ?? previous[0]?.id,
  );
  const [reference, setReference] = useState(
    saved?.reference ?? appointment.note ?? "",
  );
  const [checks, setChecks] = useState<Record<string, "ok" | "ajustar">>(
    saved?.checks ?? {},
  );
  const [result, setResult] = useState<ReviewState["result"]>(
    saved?.result ?? "Revisão concluída",
  );
  const [notes, setNotes] = useState(saved?.notes ?? "");
  const [reviewer, setReviewer] = useState(saved?.reviewer ?? techs[0] ?? "");
  const selected = previous.find((a: Appt) => a.id === previousId);
  const review: ReviewState = {
    previousId,
    reference,
    checks,
    result,
    notes,
    reviewer,
    completedAt: new Date().toLocaleString("pt-BR"),
  };
  const print = () => {
    document.body.classList.add("print-revisao");
    window.print();
    setTimeout(() => document.body.classList.remove("print-revisao"), 500);
  };
  return (
    <>
      <div className="review-banner">
        <span>
          <b>
            {appointment.reviewWithService
              ? "Revisão de 30 dias + serviço"
              : "Revisão de 30 dias — cortesia"}
          </b>
          <small>
            {appointment.reviewWithService
              ? "Faça a conferência da revisão e depois continue para incluir peças e mão de obra."
              : "Conferência direta do serviço anterior, sem nova avaliação ou orçamento."}
          </small>
        </span>
        <strong>{appointment.review ? "REVISÃO SALVA" : "AGENDADA"}</strong>
      </div>
      <div className="review-card">
        <div className="review-grid">
          <label>
            Serviço anterior
            <select
              value={previousId ?? ""}
              onChange={(e) =>
                setPreviousId(e.target.value ? +e.target.value : undefined)
              }
            >
              <option value="">Selecionar / informar manualmente</option>
              {previous.map((a: Appt) => (
                <option key={a.id} value={a.id}>
                  {new Date(a.date + "T12:00:00").toLocaleDateString("pt-BR")} ·{" "}
                  {a.vehicle} · {a.plate || "sem placa"}
                </option>
              ))}
            </select>
          </label>
          <label>
            Responsável
            <select
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
            >
              {techs.map((x: string) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="wide">
            Serviço a ser revisado / referência
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ex.: troca de amortecedores e alinhamento"
            />
          </label>
        </div>
        <h2>Conferência da revisão</h2>
        <div className="review-checks">
          {REVIEW_ITEMS.map((item) => (
            <div key={item}>
              <b>{item}</b>
              <span>
                <button
                  className={checks[item] === "ok" ? "selected ok" : ""}
                  onClick={() => setChecks({ ...checks, [item]: "ok" })}
                >
                  ✓ Conferido
                </button>
                <button
                  className={
                    checks[item] === "ajustar" ? "selected adjust" : ""
                  }
                  onClick={() => setChecks({ ...checks, [item]: "ajustar" })}
                >
                  ! Ajustar
                </button>
              </span>
            </div>
          ))}
        </div>
        <div className="review-grid final-review">
          <label>
            Resultado
            <select
              value={result}
              onChange={(e) =>
                setResult(e.target.value as ReviewState["result"])
              }
            >
              <option>Revisão concluída</option>
              <option>Ajuste necessário</option>
              <option>Encaminhar para nova avaliação</option>
            </select>
          </label>
          <label className="wide">
            Observações finais
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Registre o que foi conferido, ajustado ou orientado ao cliente."
            />
          </label>
        </div>
        <div className="review-actions">
          <button onClick={onBack}>← Voltar à agenda</button>
          <button onClick={print}>Imprimir revisão</button>
          <button className="primary" onClick={() => onSave(review)}>
            {appointment.reviewWithService
              ? "Salvar revisão e continuar para avaliação →"
              : "Salvar e concluir revisão"}
          </button>
        </div>
      </div>
      <div className="review-print a4">
        <div className="a4-head">
          <DocLogo />
          <div>
            <h1>MONOCENTER ALINHAMENTO TÉCNICO</h1>
            <p>
              Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP · WhatsApp
              (15) 99657-4741
            </p>
            <h2>RELATÓRIO DE REVISÃO DE 30 DIAS — CORTESIA</h2>
          </div>
        </div>
        <div className="a4-client">
          <span>
            <b>Cliente</b>
            {appointment.client}
          </span>
          <span>
            <b>Veículo</b>
            {appointment.vehicle || "Não informado"}
          </span>
          <span className="plate-card">
            <b>Placa</b>
            {appointment.plate || "SEM PLACA"}
          </span>
          <span>
            <b>Data da revisão</b>
            {new Date(appointment.date + "T12:00:00").toLocaleDateString(
              "pt-BR",
            )}
          </span>
        </div>
        <section className="review-reference">
          <b>Serviço anterior</b>
          <p>
            {selected
              ? `${new Date(selected.date + "T12:00:00").toLocaleDateString("pt-BR")} · ${selected.vehicle} · ${selected.plate || "sem placa"}`
              : "Referência informada manualmente"}
          </p>
          <strong>{reference || "Não informado"}</strong>
        </section>
        <h3>Itens conferidos</h3>
        <div className="review-report-list">
          {REVIEW_ITEMS.map((item) => (
            <div key={item}>
              <span>{item}</span>
              <b className={checks[item] ?? "pending"}>
                {checks[item] === "ok"
                  ? "CONFERIDO"
                  : checks[item] === "ajustar"
                    ? "AJUSTAR"
                    : "PENDENTE"}
              </b>
            </div>
          ))}
        </div>
        <section className="review-result">
          <span>
            <b>Resultado</b>
            {result}
          </span>
          <span>
            <b>Responsável</b>
            {reviewer || "Não informado"}
          </span>
        </section>
        <div className="print-notes">
          <b>Observações</b>
          <p>{notes || "Sem observações adicionais."}</p>
        </div>
      </div>
    </>
  );
}
function Modal({ initial, currentUser, close, save, remove }: any) {
  const schedulers = [
    ...new Set(["Anna", "Clissia", "Tiago", "Saulo", "Vitor", currentUser]),
  ].filter(Boolean);
  const [f, setF] = useState(
    initial ??
      ({
        id: Date.now(),
        date: iso(new Date()),
        time: "08:00",
        client: "",
        phone: "",
        vehicle: "",
        plate: "",
        km: "",
        note: "",
        type: "cliente",
        status: "agendado",
        tech: "",
        scheduledBy: currentUser,
        createdAt: new Date().toISOString(),
      } as Appt),
  );
  return (
    <div className="backdrop">
      <form
        className="modal"
        onSubmit={(e) => {
          e.preventDefault();
          save(f);
        }}
      >
        <div>
          <span>
            <h2>{initial ? "Editar agendamento" : "Novo agendamento"}</h2>
            <p>Cliente, retorno, garantia, revisão ou ausência.</p>
          </span>
          <button type="button" onClick={close}>
            ×
          </button>
        </div>
        <section>
          <label>
            Tipo
            <select
              value={f.type}
              onChange={(e) =>
                setF({
                  ...f,
                  type: e.target.value as any,
                  reviewWithService:
                    e.target.value === "revisao" ? f.reviewWithService : false,
                })
              }
            >
              <option value="cliente">Atendimento comum</option>
              <option value="retorno">Retorno após serviço</option>
              <option value="garantia">Garantia</option>
              <option value="revisao">Revisão de 30 dias — cortesia</option>
              <option value="bloqueio">Ausência de funcionário</option>
            </select>
          </label>
          {f.type === "revisao" && (
            <label className="wide appointment-progress-toggle">
              <input
                type="checkbox"
                checked={!!f.reviewWithService}
                onChange={(e) =>
                  setF({ ...f, reviewWithService: e.target.checked })
                }
              />
              <span>
                <b>Incluir peças ou serviços neste atendimento</b>
                <small>
                  Após salvar a revisão, o atendimento continuará para a
                  avaliação e o orçamento de peças e mão de obra.
                </small>
              </span>
            </label>
          )}
          <label>
            Agendado por
            <select
              value={f.scheduledBy || currentUser}
              onChange={(e) => setF({ ...f, scheduledBy: e.target.value })}
            >
              {schedulers.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Data
            <input
              required
              type="date"
              value={f.date}
              onChange={(e) => setF({ ...f, date: e.target.value })}
            />
          </label>
          <label>
            Horário
            <input
              required
              type="time"
              value={f.time}
              onChange={(e) => setF({ ...f, time: e.target.value })}
            />
          </label>
          <label>
            Nome do cliente / funcionário
            <input
              required
              value={f.client}
              onChange={(e) => setF({ ...f, client: e.target.value })}
            />
          </label>
          <label>
            WhatsApp
            <input
              value={f.phone}
              onChange={(e) => setF({ ...f, phone: e.target.value })}
            />
          </label>
          <label>
            Veículo
            <input
              value={f.vehicle}
              onChange={(e) => setF({ ...f, vehicle: e.target.value })}
            />
          </label>
          <label>
            Placa (opcional)
            <input
              value={f.plate}
              onChange={(e) =>
                setF({ ...f, plate: e.target.value.toUpperCase() })
              }
            />
            <small>
              Ao conectar uma base veicular, modelo e ano poderão ser
              consultados.
            </small>
          </label>
          <label>
            Quilometragem (opcional)
            <input
              value={f.km}
              onChange={(e) => setF({ ...f, km: e.target.value })}
            />
          </label>
          <label className="wide">
            Relato do cliente / observação (opcional)
            <textarea
              value={f.note}
              onChange={(e) => setF({ ...f, note: e.target.value })}
              placeholder={
                f.type === "revisao"
                  ? "Informe o serviço que será revisado."
                  : f.type === "garantia"
                    ? "Descreva o item ou serviço coberto pela garantia."
                    : f.type === "retorno"
                      ? "Descreva o barulho ou problema relatado no retorno."
                      : "Descreva o relato ou motivo do agendamento."
              }
            />
          </label>
          {f.type !== "bloqueio" && (
            <label className="wide appointment-progress-toggle">
              <input
                type="checkbox"
                checked={!!f.inProgress}
                onChange={(e) => setF({ ...f, inProgress: e.target.checked })}
              />
              <span>
                <b>Veículo está na oficina — atendimento em andamento</b>
                <small>
                  Marque para exibir este veículo no acompanhamento, mesmo que a
                  avaliação ou o orçamento ainda não tenham sido concluídos.
                </small>
              </span>
            </label>
          )}
        </section>
        <label className="toggle">
          <input type="checkbox" defaultChecked /> Preparar lembrete um dia
          antes
        </label>
        <footer>
          {initial && (
            <button
              type="button"
              className="danger"
              onClick={() => {
                if (
                  confirm(
                    `ATENÇÃO: deseja realmente excluir o agendamento de ${f.client}? Esta ação não poderá ser desfeita.`,
                  )
                )
                  remove(f);
              }}
            >
              Excluir agendamento
            </button>
          )}
          <button type="button" onClick={close}>
            Cancelar
          </button>
          <button className="primary">Salvar agendamento</button>
        </footer>
      </form>
    </div>
  );
}
function Message({ text, close, onSent, sent }: any) {
  const [copied, setCopied] = useState(false),
    [markedSent, setMarkedSent] = useState(sent);
  return (
    <div className="backdrop">
      <div className="messagebox">
        <h2>Mensagem para WhatsApp</h2>
        <p>
          Copie e cole no WhatsApp. O sistema não abrirá nem enviará
          automaticamente.
        </p>
        <textarea readOnly value={text} />
        <footer>
          <button onClick={close}>Fechar</button>
          <button
            className="primary"
            onClick={async () => {
              await navigator.clipboard.writeText(text);
              setCopied(true);
            }}
          >
            {copied ? "Copiado ✓" : "Copiar mensagem"}
          </button>
          {onSent && (
            <button
              className="sent-action"
              disabled={markedSent}
              onClick={() => {
                onSent();
                setMarkedSent(true);
              }}
            >
              {markedSent ? "Orçamento enviado ✓" : "Marcar como enviado"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
function PrintDocuments({
  parts,
  selectedServices,
  serviceQty,
  manualServices,
  patioNotes,
  checks,
  status,
  evaluationNotes,
  footerSize,
  pieces,
  serviceTotal,
  total,
  roundStep,
}: any) {
  const a = DISPLAY_APPT,
    state = (i: number) =>
      status[i + 1] === "g"
        ? "Bom estado"
        : status[i + 1] === "y"
          ? "Atenção"
          : status[i + 1] === "r"
            ? "Troca urgente"
            : "Não avaliado";
  return (
    <div className="print-documents">
      <section className="a4 evaluation-a4">
        <PrintHead title="RELATÓRIO DE AVALIAÇÃO VEICULAR" />
        <div className="a4-client">
          <span>
            <b>Cliente</b>
            {a.client}
          </span>
          <span>
            <b>Veículo</b>
            {a.vehicle || "Não informado"}
          </span>
          <span className="plate-card">
            <b>Placa</b>
            {a.plate || "Não informada"}
          </span>
          <span>
            <b>Km</b>
            {a.km || "Não informado"}
          </span>
          <span>
            <b>Avaliador</b>
            {a.tech || "Saulo"}
          </span>
        </div>
        <div className="print-legend">
          <span className="good">
            ● <b>Verde:</b> bom estado, sem necessidade de intervenção.
          </span>
          <span className="warning">
            ● <b>Amarelo:</b> alerta, requer atenção ou monitoramento.
          </span>
          <span className="urgent">
            ● <b>Vermelho:</b> troca urgente, com risco de falha ou
            comprometimento da segurança.
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Item avaliado</th>
              <th>Resultado</th>
              <th>Observação técnica</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((x, i) => (
              <tr
                className={
                  status[i + 1] === "g"
                    ? "good"
                    : status[i + 1] === "y"
                      ? "warning"
                      : status[i + 1] === "r"
                        ? "urgent"
                        : ""
                }
                key={x}
              >
                <td>{i + 1}</td>
                <td>
                  <b>{x}</b>
                </td>
                <td>{state(i)}</td>
                <td>
                  {evaluationNotes[i + 1] ||
                    (status[i + 1] === "r"
                      ? "Recomendada substituição"
                      : status[i + 1] === "y"
                        ? "Acompanhar desgaste"
                        : "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="a4 budget-a4">
        <BudgetHead title="ORÇAMENTO / FOLHA DO PÁTIO" />
        <div className="a4-client">
          <span>
            <b>Cliente</b>
            {a.client}
          </span>
          <span>
            <b>Veículo</b>
            {a.vehicle || "Não informado"}
          </span>
          <span className="plate-card">
            <b>Placa</b>
            {a.plate || "Não informada"}
          </span>
          <span>
            <b>Km</b>
            {a.km || "Não informado"}
          </span>
        </div>
        <h3>Peças</h3>
        {parts.map((p: any, i: number) => (
          <div className="a4-line" key={i}>
            <b>{p.qty}x</b>
            <span>
              {p.item} - {p.brand}
            </span>
            <em>{brl(p.qty * saleOf(p, roundStep))}</em>
          </div>
        ))}
        <h3>Serviços</h3>
        {selectedServices.map((i: number) => (
          <div className="a4-line" key={i}>
            <b>{serviceQty[i] ?? 0}x</b>
            <span>{SERVICES[i][0]}</span>
            <em>{brl(SERVICES[i][1] * (serviceQty[i] ?? 0))}</em>
          </div>
        ))}
        {manualServices
          .filter((service: any) => service.name)
          .map((service: any, i: number) => (
            <div className="a4-line" key={`manual-budget-${i}`}>
              <b>{service.qty || 0}x</b>
              <span>{service.name}</span>
              <em>{brl((service.qty || 0) * (service.value || 0))}</em>
            </div>
          ))}
        <div className="print-summary">
          <span>
            Peças <b>{brl(pieces)}</b>
          </span>
          <span>
            Serviços <b>{brl(serviceTotal)}</b>
          </span>
          <strong>
            Total geral <b>{brl(total)}</b>
          </strong>
        </div>
        <div className="print-notes print-customer-note">
          <b>Relato do cliente</b>
          <p>{a.note?.trim() || "Não informado."}</p>
        </div>
        <div className="print-notes" style={{ fontSize: footerSize }}>
          <b>Observações para o pátio</b>
          <p>
            {patioNotes?.trim() ||
              "Conferir todas as peças e quantidades antes de iniciar. Registrar qualquer divergência."}
          </p>
        </div>
      </section>
      <section className="a4 proposal-a4">
        <BudgetHead title="PROPOSTA DE ORÇAMENTO" />
        <div className="a4-client">
          <span>
            <b>Cliente</b>
            {a.client}
          </span>
          <span>
            <b>Veículo</b>
            {a.vehicle || "Não informado"}
          </span>
          <span className="plate-card">
            <b>Placa</b>
            {a.plate || "Não informada"}
          </span>
        </div>
        <h3>Peças e materiais</h3>
        {parts.map((p: any, i: number) => (
          <div className="a4-line no-price" key={i}>
            <b>{p.qty}x</b>
            <span>
              {p.item} - {p.brand}
            </span>
          </div>
        ))}
        <h3>Serviços</h3>
        {selectedServices.map((i: number) => (
          <div className="a4-line no-price" key={i}>
            <b>{serviceQty[i] ?? 0}x</b>
            <span>{SERVICES[i][0]}</span>
          </div>
        ))}
        {manualServices
          .filter((service: any) => service.name)
          .map((service: any, i: number) => (
            <div className="a4-line no-price" key={`manual-proposal-${i}`}>
              <b>{service.qty || 0}x</b>
              <span>{service.name}</span>
            </div>
          ))}
        <div
          className="print-notes print-work-notes"
          style={{ fontSize: footerSize }}
        >
          <b>Relato do cliente</b>
          <p>{a.note?.trim() || "Não informado."}</p>
          <b>Observações para o pátio</b>
          <p>{patioNotes?.trim() || "Sem observações adicionais."}</p>
        </div>
        <div className="print-footer" style={{ fontSize: footerSize }}>
          Documento destinado à execução dos serviços. Valores não exibidos.
        </div>
      </section>
      <section className="a4 torque-a4">
        <PrintHead title="CONFERÊNCIA FINAL DE SEGURANÇA" />
        <div className="a4-client">
          <span>
            <b>Veículo</b>
            {a.vehicle || "Não informado"}
          </span>
          <span className="plate-card">
            <b>Placa</b>
            {a.plate || "Não informada"}
          </span>
          <span>
            <b>Técnico</b>
            {a.tech || "Saulo"}
          </span>
          <span>
            <b>Status</b>Finalizado
          </span>
        </div>
        <div className="torque-report-grid">
          {[
            ["Suspensão dianteira", FRONT],
            ["Suspensão traseira", REAR],
            ["Conferência de segurança", SAFE],
            ["Torques de segurança", TQ],
          ].map(([title, list]: any) => (
            <section key={title}>
              <h3>{title}</h3>
              {list.map((x: string) => (
                <div className="torque-report-line" key={x}>
                  <span>{x}</span>
                  <b
                    className={
                      checks[x + "-ok"] ? "ok" : checks[x + "-na"] ? "na" : ""
                    }
                  >
                    {checks[x + "-ok"]
                      ? "✓ Conferido"
                      : checks[x + "-na"]
                        ? "Não se aplica"
                        : "□ Pendente"}
                  </b>
                </div>
              ))}
            </section>
          ))}
        </div>
        <div className="signoff" style={{ fontSize: footerSize }}>
          <span>Execução do serviço: ____________________</span>
          <span>Conferente final: ____________________</span>
          <span>Data: ____/____/______</span>
        </div>
      </section>
    </div>
  );
}
function PrintHead({ title }: { title: string }) {
  return (
    <header className="a4-head">
      <img src="/logo-monocenter.jpg" alt="Monocenter" />
      <div>
        <h1>MONOCENTER ALINHAMENTO TÉCNICO</h1>
        <p>
          Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP · WhatsApp (15)
          99657-4741
        </p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}
function BudgetHead({ title }: { title: string }) {
  return (
    <header className="a4-head budget-head">
      <img src="/logo-monocenter.jpg" alt="Monocenter" />
      <div>
        <h1>MONOCENTER ALINHAMENTO TÉCNICO</h1>
        <p>Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP</p>
        <p>WhatsApp (15) 99657-4741</p>
        <h2>{title}</h2>
      </div>
      <strong>{DISPLAY_APPT.plate || "SEM PLACA"}</strong>
    </header>
  );
}
function Config({
  user,
  techs,
  setTechs,
  holidays,
  setHolidays,
  templates,
  setTemplates,
  footerSize,
  setFooterSize,
  roundStep,
  setRoundStep,
}: any) {
  const [name, setName] = useState(""),
    [h, setH] = useState({ date: "", name: "" }),
    [messagesSaved, setMessagesSaved] = useState(false);
  return (
    <section className="page config">
      <div className="card">
        <Title
          a="Avaliadores e técnicos"
          b="Nomes disponíveis no início da avaliação."
        />
        <div className="chips">
          {techs.map((x: string) => (
            <span key={x}>
              {x}
              <button
                onClick={() => setTechs(techs.filter((v: string) => v !== x))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="inlineform">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Novo nome"
          />
          <button
            className="primary"
            onClick={() => {
              if (name) {
                setTechs([...techs, name]);
                setName("");
              }
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
      <div className="card">
        <Title
          a="Feriados e emendas"
          b="As datas aparecem destacadas no calendário."
        />
        <div className="holidaylist">
          {holidays.map((x: any) => (
            <div key={x.date}>
              <b>{new Date(x.date + "T12:00").toLocaleDateString("pt-BR")}</b>
              <span>{x.name}</span>
              <button
                onClick={() =>
                  setHolidays(holidays.filter((v: any) => v.date !== x.date))
                }
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
        <div className="inlineform">
          <input
            type="date"
            value={h.date}
            onChange={(e) => setH({ ...h, date: e.target.value })}
          />
          <input
            value={h.name}
            onChange={(e) => setH({ ...h, name: e.target.value })}
            placeholder="Nome do feriado ou emenda"
          />
          <button
            className="primary"
            onClick={() => {
              if (h.date && h.name) {
                setHolidays([...holidays, h]);
                setH({ date: "", name: "" });
              }
            }}
          >
            Adicionar data
          </button>
        </div>
      </div>
      <div className="card">
        <Title
          a="Consulta pela placa"
          b="Recurso preparado para futura integração."
        />
        <p className="info">
          Para preencher modelo e ano automaticamente será necessário conectar
          uma base veicular autorizada. O agendamento já permite deixar placa e
          quilometragem em branco e completar na chegada.
        </p>
      </div>
      <div className="card">
        <Title
          a="Mensagens automáticas"
          b="Edite os textos usados nos lembretes, orçamentos e revisões."
        />
        <div className="templategrid">
          <label>
            Lembrete de agendamento
            <textarea
              value={templates.lembrete}
              onChange={(e) => {
                setMessagesSaved(false);
                setTemplates({ ...templates, lembrete: e.target.value });
              }}
            />
          </label>
          <label>
            Envio de orçamento
            <textarea
              value={templates.orcamento}
              onChange={(e) => {
                setMessagesSaved(false);
                setTemplates({ ...templates, orcamento: e.target.value });
              }}
            />
          </label>
          <label>
            Lembrete de revisão
            <textarea
              value={templates.revisao}
              onChange={(e) => {
                setMessagesSaved(false);
                setTemplates({ ...templates, revisao: e.target.value });
              }}
            />
          </label>
        </div>
        <p className="info">
          Campos disponíveis: {"{cliente}"}, {"{data}"}, {"{hora}"},{" "}
          {"{veiculo}"} e {"{placa}"}.
        </p>
        <button className="primary" onClick={() => setMessagesSaved(true)}>
          {messagesSaved ? "Mensagens salvas" : "Salvar mensagens"}
        </button>
      </div>
      <div className="card">
        <Title
          a="Arredondamento dos produtos"
          b="O preço calculado por custo e margem será arredondado sempre para cima."
        />
        <label className="round-setting">
          Arredondar para múltiplos de
          <select
            value={roundStep}
            onChange={(e) => setRoundStep(+e.target.value)}
          >
            <option value="1">R$ 1,00</option>
            <option value="5">R$ 5,00</option>
            <option value="10">R$ 10,00</option>
            <option value="20">R$ 20,00</option>
          </select>
        </label>
        <p className="info">
          Exemplo: usando R$ 5,00, um preço calculado de R$ 127,30 passa para R$
          130,00.
        </p>
      </div>
      <div className="card">
        <Title
          a="Tamanho do rodapé dos relatórios"
          b="Escolha o tamanho utilizado nas observações e assinaturas."
        />
        <label className="footer-size">
          Tamanho
          <select
            value={footerSize}
            onChange={(e) => setFooterSize(+e.target.value)}
          >
            <option value="10">Normal</option>
            <option value="12">Grande</option>
            <option value="14">Extragrande</option>
          </select>
        </label>
      </div>
      <UserManagement current={user} />
    </section>
  );
}
function UserManagement({ current }: any) {
  const [users, setUsers] = useState<any[]>([]),
    [form, setForm] = useState({
      username: "",
      displayName: "",
      password: "",
      role: "user",
    }),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  const load = () =>
    fetch("/api/users", { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        setUsers(d.users ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  useEffect(() => {
    if (current.role !== "admin") {
      setLoading(false);
      return;
    }
    load();
    const timer = setInterval(load, 8000);
    return () => clearInterval(timer);
  }, []);
  const act = async (payload: any) => {
    setError("");
    const r = await fetch("/api/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
      d = await r.json();
    if (!r.ok) {
      setError(d.error ?? "Não foi possível concluir");
      return false;
    }
    setUsers(d.users ?? []);
    return true;
  };
  if (current.role !== "admin")
    return (
      <div className="card">
        <Title
          a="Usuários e senhas"
          b="Área disponível somente para administradores."
        />
        <p className="info">
          Peça para Anna ou Gestão criar usuários e alterar acessos.
        </p>
      </div>
    );
  return (
    <div className="card user-management">
      <Title
        a="Usuários e senhas"
        b="Crie acessos, altere senhas ou exclua usuários."
      />
      <div className="new-user">
        <input
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          placeholder="Nome de exibição"
        />
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Usuário para entrar"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Senha (mínimo 4 caracteres)"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">Usuário comum</option>
          <option value="admin">Administrador</option>
        </select>
        <button
          className="primary"
          onClick={async () => {
            if (await act({ action: "create", ...form }))
              setForm({
                username: "",
                displayName: "",
                password: "",
                role: "user",
              });
          }}
        >
          + Criar usuário
        </button>
      </div>
      {error && <p className="user-error">{error}</p>}
      {loading ? (
        <p className="info">Carregando usuários…</p>
      ) : (
        <div className="user-list">
          {users.map((account) => (
            <UserRow
              key={account.username}
              account={account}
              current={current}
              act={act}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({ account, current, act }: any) {
  const [password, setPassword] = useState("");
  const active = Number(account.active) === 1;
  return (
    <div className={active ? "user-row" : "user-row inactive"}>
      <span>
        <b>{account.displayName}</b>
        <small>
          @{account.username} ·{" "}
          {account.role === "admin" ? "Administrador" : "Usuário comum"} ·{" "}
          {active ? "Ativo" : "Excluído"}
        </small>
      </span>
      {active && (
        <>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
          />
          <button
            onClick={async () => {
              if (
                await act({
                  action: "password",
                  username: account.username,
                  password,
                })
              )
                setPassword("");
            }}
          >
            Alterar senha
          </button>
          <button
            className="danger"
            disabled={account.username === current.username}
            onClick={() => {
              if (confirm(`Excluir o acesso de ${account.displayName}?`))
                act({ action: "delete", username: account.username });
            }}
          >
            Excluir
          </button>
        </>
      )}
      {!active && (
        <button
          onClick={() => act({ action: "restore", username: account.username })}
        >
          Reativar acesso
        </button>
      )}
    </div>
  );
}

function History() {
  const [events, setEvents] = useState<any[]>([]),
    [query, setQuery] = useState("");
  useEffect(() => {
    fetch("/api/state", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setEvents(d.audit ?? []))
      .catch(() => {});
  }, []);
  const filtered = events.filter((x) =>
    `${x.username} ${x.action} ${x.entity} ${x.detail}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <section className="page">
      <div className="historyhead">
        <b>
          ↺ <strong>{filtered.length}</strong> alterações registradas
        </b>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cliente, placa ou usuário..."
        />
      </div>
      <div className="timeline">
        {filtered.length === 0 && (
          <div className="emptyday">Nenhuma alteração registrada ainda.</div>
        )}
        {filtered.map((x) => (
          <div className="event" key={x.id}>
            <time>
              {new Date(x.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            <i />
            <span>
              <b>{x.username}</b>
              <p>{x.action}</p>
              <small>
                {x.entity}
                {x.detail ? ` · ${x.detail}` : ""}
              </small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
function AttendanceSummary({
  appointment,
  roundStep,
  onBack,
  onEditConference,
}: any) {
  const budget = appointment.budget ?? {
      parts: [],
      selectedServices: [],
      serviceQty: {},
      manualServices: [],
    },
    evaluated = [...ITEMS, ...(appointment.evaluation?.custom ?? [])]
      .map((name, i) => ({
        name,
        state: appointment.evaluation?.status?.[i + 1] ?? "",
        quoted: !!appointment.evaluation?.quoteItems?.[i + 1],
      }))
      .filter((item) => item.state && item.state !== "na"),
    partsTotal = budget.parts.reduce(
      (sum: number, part: any) => sum + part.qty * saleOf(part, roundStep),
      0,
    ),
    servicesTotal =
      budget.selectedServices.reduce(
        (sum: number, index: number) =>
          sum + SERVICES[index][1] * (budget.serviceQty[index] ?? 0),
        0,
      ) +
      budget.manualServices.reduce(
        (sum: number, service: any) => sum + service.qty * service.value,
        0,
      ),
    stateName = (state: string) =>
      state === "g"
        ? "Bom"
        : state === "y"
          ? "Atenção"
          : state === "r"
            ? "Troca urgente"
            : "Não avaliado",
    conferenceLabel = (item: string, tri: boolean) =>
      tri
        ? appointment.conference?.checks?.[item + "-ok"]
          ? "Conferido"
          : appointment.conference?.checks?.[item + "-na"]
            ? "Não se aplica"
            : "Não marcado"
        : appointment.conference?.checks?.[item]
          ? "Conferido"
          : "Não marcado",
    checkedConferenceItems = [
      ...FRONT.filter((item) => appointment.conference?.checks?.[item + "-ok"]),
      ...REAR.filter((item) => appointment.conference?.checks?.[item + "-ok"]),
      ...SAFE.filter((item) => appointment.conference?.checks?.[item]),
      ...TQ.filter((item) => appointment.conference?.checks?.[item]),
    ];
  return (
    <section className="page attendance-summary">
      <Vehicle />
      <div className="completion-banner">
        <span>
          <b>✓ Atendimento concluído</b>
          <small>
            Finalizado em{" "}
            {appointment.conference?.finalizedAt
              ? new Date(appointment.conference.finalizedAt).toLocaleString(
                  "pt-BR",
                )
              : "data não registrada"}
          </small>
        </span>
        <strong>Atendimento concluído</strong>
      </div>
      <div className="summary-card">
        <h2>Responsáveis pelo atendimento</h2>
        <p><b>Técnico avaliador:</b> {appointment.tech || "Não informado"}</p>
        <p>
          <b>Avaliação registrada por:</b>{" "}
          {appointment.evaluationRecordedBy || "Não informado"}
        </p>
        <p>
          <b>Orçamento preenchido por:</b>{" "}
          {appointment.budgetEditedBy || "Não informado"}
        </p>
        <p>
          <b>Última edição:</b> {appointment.lastEditedBy || "Não informado"}
          {appointment.lastEditedAt
            ? ` em ${new Date(appointment.lastEditedAt).toLocaleString("pt-BR")}`
            : ""}
        </p>
      </div>
      <div className="summary-card">
        <h2>1. Avaliação do veículo</h2>
        {evaluated.length ? (
          <div className="summary-list">
            {evaluated.map((item, i) => (
              <div className={`summary-state state-${item.state}`} key={i}>
                <span>{item.name}</span>
                <b>{stateName(item.state)}</b>
                {item.quoted && <small>Incluído no orçamento</small>}
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum estado de peça foi registrado.</p>
        )}
      </div>
      <div className="summary-card">
        <h2>2. Orçamento aprovado</h2>
        <h3>Peças</h3>
        {budget.parts.map((part: any, i: number) => (
          <div className="summary-budget-line" key={i}>
            <b>{part.qty}x</b>
            <span>
              {part.item} {part.brand}
            </span>
            <strong>{brl(part.qty * saleOf(part, roundStep))}</strong>
          </div>
        ))}
        <h3>Serviços e mão de obra</h3>
        {budget.selectedServices.map((index: number) => (
          <div className="summary-budget-line" key={index}>
            <b>{budget.serviceQty[index] ?? 0}x</b>
            <span>{SERVICES[index][0]}</span>
            <strong>
              {SERVICES[index][1]
                ? brl(SERVICES[index][1] * (budget.serviceQty[index] ?? 0))
                : "Cortesia"}
            </strong>
          </div>
        ))}
        {budget.manualServices
          .filter((service: any) => service.name)
          .map((service: any, i: number) => (
            <div className="summary-budget-line" key={`manual-${i}`}>
              <b>{service.qty}x</b>
              <span>{service.name}</span>
              <strong>{brl(service.qty * service.value)}</strong>
            </div>
          ))}
        <div className="summary-total">
          Total aprovado <b>{brl(partsTotal + servicesTotal)}</b>
        </div>
      </div>
      <div className="summary-card">
        <h2>3. Conferência final</h2>
        <div className="checked-conference-overview">
          <b>Itens marcados como conferidos</b>
          {checkedConferenceItems.length ? (
            <div>
              {checkedConferenceItems.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          ) : (
            <small>Nenhum item foi marcado como conferido.</small>
          )}
        </div>
        <div className="conference-summary">
          {[
            ["Suspensão dianteira", FRONT, true],
            ["Suspensão traseira", REAR, true],
            ["Conferência de segurança", SAFE, false],
            ["Torques de segurança", TQ, false],
          ].map(([title, list, tri]: any) => (
            <section key={title}>
              <h3>{title}</h3>
              {list.map((item: string) => (
                <div key={item}>
                  <span>{item}</span>
                  <b>{conferenceLabel(item, tri)}</b>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
      <div className="summary-actions">
        <button onClick={onBack}>← Voltar à agenda</button>
        <button className="primary" onClick={onEditConference}>
          Editar conferência
        </button>
      </div>
    </section>
  );
}
function Reports({
  data,
  user,
  initialMode,
  open,
  edit,
  remove,
  message,
}: any) {
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("todos"),
    [printRow, setPrintRow] = useState<Appt | null>(null),
    [reportMode, setReportMode] = useState<
      "registros" | "semana" | "abertos" | "andamento"
    >(
      initialMode === "abertos" || initialMode === "andamento"
        ? initialMode
        : "registros",
    ),
    [weekDate, setWeekDate] = useState(iso(new Date()));
  const isClissia =
    user?.username?.toLocaleLowerCase("pt-BR") === "clissia" ||
    user?.displayName?.toLocaleLowerCase("pt-BR") === "clissia";
  const category = (a: Appt) =>
    a.budget?.processStatus === "Finalizado"
      ? "Atendimento concluído"
      : a.type === "retorno"
        ? "Retorno"
        : a.type === "garantia"
          ? "Garantia"
          : a.type === "revisao"
            ? a.reviewWithService
              ? "Revisão 30 dias + serviço"
              : "Revisão 30 dias"
            : a.status === "servico"
              ? "Avaliação aprovada"
              : a.status === "avaliou"
                ? "Avaliação não aprovada"
                : a.status === "faltou"
                  ? "Faltou"
                  : "Agendado";
  const matches = (a: Appt) =>
    filter === "todos" ||
    (filter === "agendados" &&
      a.status === "agendado" &&
      a.type === "cliente") ||
    (filter === "aprovadas" &&
      a.status === "servico" &&
      a.type === "cliente") ||
    (filter === "nao_aprovadas" &&
      a.status === "avaliou" &&
      a.type === "cliente") ||
    (filter === "retornos" && a.type === "retorno") ||
    (filter === "garantias" && a.type === "garantia") ||
    (filter === "revisoes" && a.type === "revisao") ||
    (filter === "faltas" && a.status === "faltou");
  const rows = (data as Appt[])
    .filter((a) => a.type !== "bloqueio")
    .filter(matches)
    .filter((a) =>
      `${a.client} ${a.vehicle} ${a.plate} ${a.note}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
    )
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
  const chosen = new Date(weekDate + "T12:00:00"),
    monday = new Date(chosen),
    day = chosen.getDay();
  monday.setDate(chosen.getDate() - (day === 0 ? 6 : day - 1));
  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);
  const weeklyRows = (data as Appt[]).filter(
    (a) =>
      a.type !== "bloqueio" && a.date >= iso(monday) && a.date <= iso(saturday),
  );
  const weeklyMetrics = [
    ["Agendamentos", weeklyRows.length],
    ["Avaliações realizadas", weeklyRows.filter((a) => a.evaluation).length],
    ["Orçamentos enviados", weeklyRows.filter((a) => a.quoteSentAt).length],
    [
      "Orçamentos aprovados",
      weeklyRows.filter((a) => a.status === "servico").length,
    ],
    [
      "Não aprovados / em aberto",
      weeklyRows.filter(
        (a) =>
          a.status === "avaliou" &&
          a.type === "cliente" &&
          a.budget?.processStatus !== "Finalizado",
      ).length,
    ],
    [
      "Serviços concluídos",
      weeklyRows.filter((a) => a.budget?.processStatus === "Finalizado").length,
    ],
    ["Faltas", weeklyRows.filter((a) => a.status === "faltou").length],
    ["Retornos", weeklyRows.filter((a) => a.type === "retorno").length],
    ["Garantias", weeklyRows.filter((a) => a.type === "garantia").length],
    ["Revisões 30 dias", weeklyRows.filter((a) => a.type === "revisao").length],
  ];
  const openQuotes = (data as Appt[])
    .filter(
      (a) =>
        a.type === "cliente" &&
        a.status === "avaliou" &&
        a.budget?.processStatus !== "Finalizado",
    )
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const inProgress = (data as Appt[])
    .filter(
      (a) =>
        (a.inProgress || a.status === "servico") &&
        a.type !== "bloqueio" &&
        a.budget?.processStatus !== "Finalizado",
    )
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const print = (a: Appt) => {
    setPrintRow(a);
    document.body.classList.add("print-report");
    setTimeout(() => window.print(), 50);
    setTimeout(() => document.body.classList.remove("print-report"), 600);
  };
  const evaluatedItems = printRow
    ? [...ITEMS, ...(printRow.evaluation?.custom ?? [])]
        .map((name, i) => ({
          name,
          state: printRow.evaluation?.status?.[i + 1] ?? "",
        }))
        .filter((x) => x.state)
    : [];
  const stateLabel = (s: string) =>
    s === "g"
      ? "Bom estado"
      : s === "y"
        ? "Atenção"
        : s === "r"
          ? "Troca urgente"
          : "Não avaliado";
  return (
    <section className="page reports-page">
      <div className="report-screen">
        <div className="management-report-tabs">
          <button
            className={reportMode === "registros" ? "active" : ""}
            onClick={() => setReportMode("registros")}
          >
            Registros
          </button>
          {isClissia && (
            <button
              className={reportMode === "semana" ? "active" : ""}
              onClick={() => setReportMode("semana")}
            >
              Resumo semanal
            </button>
          )}
          <button
            className={reportMode === "abertos" ? "active" : ""}
            onClick={() => setReportMode("abertos")}
          >
            Orçamentos em aberto
          </button>
          <button
            className={reportMode === "andamento" ? "active" : ""}
            onClick={() => setReportMode("andamento")}
          >
            Atendimentos em andamento
          </button>
        </div>
        {isClissia && reportMode === "semana" && (
          <div className="management-report-panel weekly-report-panel">
            <div className="management-report-head">
              <span>
                <h2>Resumo semanal</h2>
                <p>
                  {monday.toLocaleDateString("pt-BR")} a{" "}
                  {saturday.toLocaleDateString("pt-BR")}
                </p>
              </span>
              <label>
                Escolher uma data da semana
                <input
                  type="date"
                  value={weekDate}
                  onChange={(e) => setWeekDate(e.target.value)}
                />
              </label>
              <button
                onClick={() => {
                  document.body.classList.add("print-weekly");
                  setTimeout(() => window.print(), 50);
                  setTimeout(
                    () => document.body.classList.remove("print-weekly"),
                    600,
                  );
                }}
              >
                Imprimir resumo
              </button>
            </div>
            <div className="weekly-metrics">
              {weeklyMetrics.map(([label, value]) => (
                <div key={String(label)}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <h3>Movimentação da semana</h3>
            <div className="weekly-list">
              {weeklyRows.length ? (
                weeklyRows
                  .sort((a, b) =>
                    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
                  )
                  .map((a) => (
                    <div key={a.id}>
                      <span>
                        <b>{a.client}</b>
                        <small>
                          {new Date(a.date + "T12:00:00").toLocaleDateString(
                            "pt-BR",
                          )}{" "}
                          · {a.time} · {a.vehicle || "Veículo não informado"}
                        </small>
                      </span>
                      <strong>{category(a)}</strong>
                    </div>
                  ))
              ) : (
                <p>Nenhum atendimento registrado nesta semana.</p>
              )}
            </div>
          </div>
        )}
        {reportMode === "abertos" && (
          <div className="management-report-panel open-quotes-panel">
            <div className="management-report-head">
              <span>
                <h2>Orçamentos em aberto</h2>
                <p>{openQuotes.length} aguardando retorno do cliente</p>
              </span>
            </div>
            <div className="open-quotes-list">
              {openQuotes.length ? (
                openQuotes.map((a) => {
                  const daysOpen = Math.max(
                    0,
                    Math.floor(
                      (Date.now() - new Date(a.date + "T12:00:00").getTime()) /
                        86400000,
                    ),
                  );
                  return (
                    <article key={a.id}>
                      <span>
                        <b>{a.client}</b>
                        <small>
                          {a.vehicle || "Veículo não informado"} ·{" "}
                          {a.plate || "Sem placa"}
                        </small>
                        <small>
                          Avaliado em{" "}
                          {new Date(a.date + "T12:00:00").toLocaleDateString(
                            "pt-BR",
                          )}{" "}
                          · {daysOpen} {daysOpen === 1 ? "dia" : "dias"} em
                          aberto
                        </small>
                        {a.quoteSentAt && (
                          <small>
                            Enviado em{" "}
                            {new Date(a.quoteSentAt).toLocaleString("pt-BR")}{" "}
                            por {a.quoteSentBy || "não informado"}
                          </small>
                        )}
                      </span>
                      <div>
                        <button onClick={() => open(a)}>Abrir orçamento</button>
                        <button
                          onClick={() =>
                            message(
                              `Olá, ${a.client}! Tudo bem? Gostaríamos de saber se deseja dar continuidade ao orçamento da Monocenter para o veículo ${a.vehicle || ""}${a.plate ? `, placa ${a.plate}` : ""}. Podemos ajudar com o agendamento?`,
                            )
                          }
                        >
                          Preparar mensagem
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p>Nenhum orçamento em aberto.</p>
              )}
            </div>
          </div>
        )}
        {reportMode === "andamento" && (
          <div className="management-report-panel open-quotes-panel">
            <div className="management-report-head">
              <span>
                <h2>Atendimentos em andamento</h2>
                <p>{inProgress.length} veículos aguardando conclusão</p>
              </span>
            </div>
            <div className="open-quotes-list">
              {inProgress.length ? (
                inProgress.map((a) => {
                  const daysInProgress = Math.max(
                    0,
                    Math.floor(
                      (Date.now() - new Date(a.date + "T12:00:00").getTime()) /
                        86400000,
                    ),
                  );
                  return (
                    <article key={a.id}>
                      <span>
                        <b>{a.client}</b>
                        <small>
                          {a.vehicle || "Veículo não informado"} ·{" "}
                          {a.plate || "Sem placa"}
                        </small>
                        <small>
                          Iniciado em{" "}
                          {new Date(a.date + "T12:00:00").toLocaleDateString(
                            "pt-BR",
                          )}{" "}
                          · {daysInProgress}{" "}
                          {daysInProgress === 1 ? "dia" : "dias"} em andamento
                        </small>
                        <small>Técnico: {a.tech || "não informado"}</small>
                      </span>
                      <div>
                        <button onClick={() => open(a)}>
                          Continuar atendimento
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p>Nenhum atendimento em andamento.</p>
              )}
            </div>
          </div>
        )}
        {reportMode === "registros" && (
          <>
            <div className="reporthead">
              <Title
                a="Relatórios e acompanhamento"
                b="Dados reais da agenda, avaliações, retornos, garantias e revisões."
              />
              <div className="reportfilters">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="todos">Todos os registros</option>
                  <option value="agendados">Agendamentos</option>
                  <option value="aprovadas">Avaliações aprovadas</option>
                  <option value="nao_aprovadas">
                    Avaliações não aprovadas
                  </option>
                  <option value="retornos">Retornos</option>
                  <option value="garantias">Garantias</option>
                  <option value="revisoes">Revisões de 30 dias</option>
                  <option value="faltas">Faltas</option>
                </select>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cliente, veículo ou placa..."
                />
              </div>
            </div>
            <div className="report-summary">
              <span>
                <b>{rows.length}</b> registros encontrados
              </span>
              <small>Relatório sem valores financeiros</small>
            </div>
            <div className="reporttable">
              <div className="reportrow head">
                <b>Data</b>
                <b>Cliente</b>
                <b>Veículo</b>
                <b>Placa</b>
                <b>Situação</b>
                <b>Avaliador</b>
                <b>Ações</b>
              </div>
              {rows.length === 0 && (
                <div className="report-empty">
                  Nenhum registro encontrado para este filtro.
                </div>
              )}
              {rows.map((a) => (
                <div className="reportrow" key={a.id}>
                  <span>
                    {new Date(a.date + "T12:00:00").toLocaleDateString("pt-BR")}{" "}
                    · {a.time}
                  </span>
                  <span>{a.client}</span>
                  <span>{a.vehicle || "Não informado"}</span>
                  <span>{a.plate || "Sem placa"}</span>
                  <span
                    className={
                      "reportstatus " +
                      (a.status === "servico"
                        ? "done"
                        : a.status === "faltou"
                          ? "missed"
                          : "working")
                    }
                  >
                    {category(a)}
                  </span>
                  <span>
                    {a.tech || "Não informado"}
                    {a.budgetEditedBy && (
                      <small>Orçamento: {a.budgetEditedBy}</small>
                    )}
                    {a.lastEditedBy && (
                      <small>Última edição: {a.lastEditedBy}</small>
                    )}
                  </span>
                  <span className="report-actions">
                    <button onClick={() => open(a)}>
                      {a.budget?.processStatus === "Finalizado"
                        ? "Visualizar atendimento"
                        : "Abrir"}
                    </button>
                    <button onClick={() => edit(a)}>Editar</button>
                    {a.status === "avaliou" && a.type === "cliente" && (
                      <button
                        onClick={() =>
                          message(
                            `Olá, ${a.client}! Tudo bem? Gostaríamos de saber se deseja dar continuidade ao orçamento da Monocenter para o veículo ${a.vehicle || ""}${a.plate ? `, placa ${a.plate}` : ""}. Podemos ajudar com o agendamento?`,
                          )
                        }
                      >
                        Mensagem
                      </button>
                    )}
                    <button onClick={() => print(a)}>Imprimir</button>
                    <button className="danger" onClick={() => remove(a)}>
                      Excluir
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {printRow && (
        <div className="report-document">
          <h1>MONOCENTER ALINHAMENTO TÉCNICO</h1>
          <p>
            Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP · WhatsApp (15)
            99657-4741
          </p>
          <h2>{category(printRow)}</h2>
          <div className="report-data">
            <span>
              <b>Data e horário</b>
              {new Date(printRow.date + "T12:00:00").toLocaleDateString(
                "pt-BR",
              )}{" "}
              · {printRow.time}
            </span>
            <span>
              <b>Cliente</b>
              {printRow.client}
            </span>
            <span>
              <b>Veículo</b>
              {printRow.vehicle || "Não informado"}
            </span>
            <span>
              <b>Placa</b>
              {printRow.plate || "Sem placa"}
            </span>
            <span>
              <b>Situação</b>
              {category(printRow)}
            </span>
            <span>
              <b>Avaliador</b>
              {printRow.tech || "Não informado"}
            </span>
          </div>
          <h3>Relato / observação</h3>
          <p className="report-note">
            {printRow.note || "Nenhuma observação registrada."}
          </p>
          {printRow.evaluation && (
            <>
              <h3>Itens avaliados</h3>
              {evaluatedItems.length === 0 ? (
                <p className="report-note">
                  Nenhum estado de peça foi informado.
                </p>
              ) : (
                evaluatedItems.map((x, i) => (
                  <div
                    className={"report-item state-" + x.state}
                    key={x.name + i}
                  >
                    <span>
                      {i + 1}. {x.name}
                    </span>
                    <b>{stateLabel(x.state)}</b>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
const TITLES: Record<View, [string, string]> = {
  agenda: [
    "Agenda Monocenter",
    "Agendamentos, ausências e situação dos atendimentos.",
  ],
  atendimento: [
    "Atendimento concluído",
    "Avaliação, orçamento aprovado e conferência final.",
  ],
  avaliacao: [
    "Avaliação veicular",
    "Checklist técnico de suspensão, freios e geometria.",
  ],
  orcamento: [
    "Montar orçamento",
    "Custos, margem, peças e tabela de serviços.",
  ],
  proposta: ["Orçamento do cliente", "Data, placa, pagamento e mensagem."],
  torque: [
    "Conferência de torque",
    "Abra apenas as áreas necessárias para o serviço.",
  ],
  revisao: [
    "Revisão de 30 dias",
    "Conferência cortesia do serviço executado anteriormente.",
  ],
  relatorios: [
    "Relatórios de avaliações",
    "Consulte avaliações em andamento e finalizadas.",
  ],
  historico: [
    "Histórico de alterações",
    "Veja quem alterou cada informação e quando.",
  ],
  config: ["Configurações", "Técnicos, avaliadores, feriados e emendas."],
};
