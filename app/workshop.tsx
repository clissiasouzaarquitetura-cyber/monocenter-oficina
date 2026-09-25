"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { CarFront } from "lucide-react";
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
  "Pneu",
  "Pastilha de Freio",
  "Disco de freio",
  "Cilindro de Freio (Tras. Esq./Dir.) Mestre",
  "Sapata de freio Traseira",
  "Pastilha de freio Traseira",
  "Válvula de Pneus (Bico)",
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

const VEHICLE_CATALOG = [
  ["Gol", "Volkswagen", "Hatch"],
  ["Polo", "Volkswagen", "Hatch"],
  ["Virtus", "Volkswagen", "Sedã"],
  ["Voyage", "Volkswagen", "Sedã"],
  ["T-Cross", "Volkswagen", "SUV"],
  ["Nivus", "Volkswagen", "SUV"],
  ["Saveiro", "Volkswagen", "Picape"],
  ["Onix", "Chevrolet", "Hatch"],
  ["Onix Plus", "Chevrolet", "Sedã"],
  ["Celta", "Chevrolet", "Hatch"],
  ["Corsa", "Chevrolet", "Hatch"],
  ["Prisma", "Chevrolet", "Sedã"],
  ["Tracker", "Chevrolet", "SUV"],
  ["S10", "Chevrolet", "Picape"],
  ["Uno", "Fiat", "Hatch"],
  ["Mobi", "Fiat", "Hatch"],
  ["Argo", "Fiat", "Hatch"],
  ["Cronos", "Fiat", "Sedã"],
  ["Pulse", "Fiat", "SUV"],
  ["Strada", "Fiat", "Picape"],
  ["Palio", "Fiat", "Hatch"],
  ["HB20", "Hyundai", "Hatch"],
  ["HB20S", "Hyundai", "Sedã"],
  ["Creta", "Hyundai", "SUV"],
  ["Ka", "Ford", "Hatch"],
  ["Fiesta", "Ford", "Hatch"],
  ["EcoSport", "Ford", "SUV"],
  ["Ranger", "Ford", "Picape"],
  ["Corolla", "Toyota", "Sedã"],
  ["Yaris", "Toyota", "Hatch"],
  ["Hilux", "Toyota", "Picape"],
  ["Compass", "Jeep", "SUV"],
  ["Renegade", "Jeep", "SUV"],
  ["Kwid", "Renault", "Hatch"],
  ["Sandero", "Renault", "Hatch"],
  ["Duster", "Renault", "SUV"],
  ["Civic", "Honda", "Sedã"],
  ["City", "Honda", "Sedã"],
  ["Fit", "Honda", "Hatch"],
] as const;
const VEHICLE_COLORS: Record<string, string> = {
  branco: "#ffffff",
  branca: "#ffffff",
  preto: "#222831",
  preta: "#222831",
  prata: "#aeb7c2",
  cinza: "#717b87",
  vermelho: "#d71920",
  vermelha: "#d71920",
  azul: "#2877c7",
  verde: "#3a9363",
  amarelo: "#eab72f",
  amarela: "#eab72f",
  bege: "#c7b693",
  marrom: "#795548",
};
const findVehicle = (value: string) => {
  const normalized = value.trim().toLocaleLowerCase("pt-BR");
  return VEHICLE_CATALOG.find(
    ([model]) =>
      normalized === model.toLocaleLowerCase("pt-BR") ||
      normalized.startsWith(model.toLocaleLowerCase("pt-BR") + " "),
  );
};
const vehicleColorHex = (value?: string) =>
  VEHICLE_COLORS[(value || "").trim().toLocaleLowerCase("pt-BR")] ?? "#d8dde4";
const SERVICES = [
  ["Alinhamento de direção 3D - Passeio", 100],
  ["Alinhamento de direção 3D - SUV", 120],
  ["Alinhamento de direção 3D - Caminhonete/Van", 150],
  ["Balanceamento - roda aro 13, 14 ou 15", 20],
  ["Balanceamento - roda aro 16, 17 ou 18", 25],
  ["Balanceamento - roda de caminhonete", 50],
  ["Montagem de pneu - aro 13, 14 ou 15", 20],
  ["Montagem de pneu - aro 16, 17 ou 18", 25],
  ["Montagem especial de pneu", 50],
  ["Rodízio - cortesia", 0],
  ["Mão de Obra Troca Amortecedores Dianteiros", 0],
  ["Mão de Obra Troca Amortecedores Traseiros", 0],
  ["Mão de Obra Dianteira", 0],
  ["Mão de Obra Traseira", 0],
  ["Alinhamento Técnico Longarinas", 0],
  ["Alinhamento Técnico Eixo Traseiro", 0],
] as [string, number][];
const SERVICE_GROUPS = [
  { title: "1. Montagem de pneus", indexes: [6, 7, 8] },
  { title: "2. Balanceamento", indexes: [3, 4, 5] },
  { title: "3. Rodízio", indexes: [9] },
  { title: "4. Alinhamento de direção 3D", indexes: [0, 1, 2] },
  {
    title: "5. Gabaritagem",
    indexes: [10, 11, 12, 13, 14, 15],
  },
];
const serviceIsCourtesy = (index: number) =>
  /cortesia/i.test(SERVICES[index]?.[0] ?? "");
const servicePrice = (index: number, prices?: Record<number, number>) =>
  prices?.[index] ?? SERVICES[index]?.[1] ?? 0;
const isGabaritagemManualService = (service: any) =>
  service?.category === "gabaritagem" ||
  /gabarit|alinhamento técnico|longarina|eixo traseiro|solda/i.test(
    String(service?.name ?? ""),
  );
const encodeBudgetTransfer = (value: unknown) => {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `MCOS1.${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")}`;
};
const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
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
type GeometryEntry = {
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
  condition: string;
};
type GeometryState = Record<string, GeometryEntry>;
type InternalBudgetReview = {
  signature: string;
  totalQuantity: number;
  checkedItems: string[];
  confirmedAt: string;
  confirmedBy: string;
};
type BudgetState = {
  parts: any[];
  selectedServices: number[];
  serviceQty: Record<number, number>;
  servicePrices?: Record<number, number>;
  manualServices: any[];
  proposalPaymentOptions?: { pix: boolean; card: boolean };
  patioNotes?: string;
  processStatus: "Em andamento" | "Finalizado";
  internalReview?: InternalBudgetReview;
};
type PurchaseCheck = {
  ordered: boolean;
  received: boolean;
  note: string;
  orderedBy?: string;
  receivedBy?: string;
  updatedAt?: string;
};
type PurchaseOrderState = {
  closed: boolean;
  closedAt?: string;
  closedBy?: string;
};
type View =
  | "agenda"
  | "veiculos"
  | "atendimento"
  | "avaliacao"
  | "orcamento"
  | "proposta"
  | "torque"
  | "revisao"
  | "compras"
  | "relatorios"
  | "historico"
  | "config";
type Appt = {
  id: number;
  workOrder?: string;
  date: string;
  time: string;
  client: string;
  phone: string;
  vehicle: string;
  vehicleBrand?: string;
  vehicleColor?: string;
  vehicleBody?: string;
  plate: string;
  km: string;
  note: string;
  type: "cliente" | "retorno" | "garantia" | "revisao" | "bloqueio";
  appointmentServiceType?:
    | "gabaritagem"
    | "pecas"
    | "alinhamento_3d"
    | "alinhamento_balanceamento"
    | "servicos";
  partsEvaluationSkipped?: boolean;
  reviewWithService?: boolean;
  status: "agendado" | "avaliou" | "servico" | "faltou";
  tech?: string;
  review?: ReviewState;
  evaluation?: EvaluationState;
  budget?: BudgetState;
  conference?: {
    checks: Record<string, boolean>;
    geometry?: GeometryState;
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
  quoteFollowUpDays?: number;
  quoteFollowUpDueDate?: string;
  quoteFollowUpDecision?: "message" | "declined";
  quoteFollowUpUpdatedBy?: string;
  quoteFollowUpUpdatedAt?: string;
  quoteFollowUpPreparedBy?: string;
  quoteFollowUpPreparedAt?: string;
  serviceScheduled?: boolean;
  serviceScheduledFor?: string;
  serviceScheduledTime?: string;
  sourceAppointmentId?: number;
  serviceAppointmentId?: number;
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
  statusBeforeNoShow?: Appt["status"];
  inProgressBeforeNoShow?: boolean;
  noShowMarkedBy?: string;
  noShowMarkedAt?: string;
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
  decimalValue = (n: number) =>
    Number(n || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  quantityValue = (n: number) =>
    Number.isInteger(Number(n)) ? String(Number(n)) : decimalValue(Number(n)),
  parseDecimalValue = (value: string) => {
    const normalized = value.includes(",")
      ? value.replace(/\./g, "").replace(",", ".")
      : value;
    return Number(normalized.replace(/[^0-9.-]/g, "")) || 0;
  },
  roundUp = (n: number, step: number) =>
    Math.ceil(n / Math.max(1, step)) * Math.max(1, step),
  cashSaleOf = (p: any, step = 5) =>
    p.saleOverride === undefined || p.saleOverride === null
      ? roundUp(p.cost * (1 + p.margin / 100), step)
      : p.saleOverride,
  isTirePart = (p: any) => /^pneus?\b/i.test((p.item ?? "").trim()),
  tireInstallmentSaleOf = (p: any, step = 5) =>
    Math.round(cashSaleOf(p, step) * 1.1 * 100) / 100,
  saleOf = (p: any, step = 5) =>
    isTirePart(p) && p.tirePayment === "installment"
      ? tireInstallmentSaleOf(p, step)
      : cashSaleOf(p, step),
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
const conferenceStarted = (a: Appt) =>
  Object.values(a.conference?.checks ?? {}).some(Boolean) ||
  Object.values(a.conference?.geometry ?? {}).some((entry) =>
    Object.values(entry).some((value) => value.trim()),
  ) ||
  !!a.conference?.finalization?.serviceCompleted ||
  !!a.conference?.finalization?.vehicleReleased ||
  !!a.conference?.finalization?.clientOriented ||
  !!a.conference?.finalization?.note?.trim();
const completedAttendanceLabel = (a: Appt) => {
  if (a.type === "revisao" && !a.reviewWithService)
    return "Atendimento finalizado (Revisão 30 dias)";
  if (a.status === "servico")
    return "Atendimento finalizado (Serviço executado)";
  return "Atendimento finalizado (Avaliação)";
};
const inProgressLabel = (a: Appt) => {
  if (!a.evaluation && a.status === "agendado") return "Aguardando avaliação";
  if (a.type === "revisao") return "Revisão em andamento";
  if (a.status === "avaliou") return "Aguardando orçamento";
  if (conferenceStarted(a)) return "Em conferência";
  return "Serviço em andamento";
};

function VehiclePicture({ appointment }: { appointment: Appt }) {
  const catalog = findVehicle(appointment.vehicle || "");
  const brand = appointment.vehicleBrand || catalog?.[1] || "Marca não informada";
  const body = appointment.vehicleBody || catalog?.[2] || "Automóvel";
  const color = appointment.vehicleColor || "Cor não informada";
  return (
    <div className="vehicle-picture" aria-label={`${appointment.vehicle || "Veículo"}, ${color}`}>
      <CarFront
        aria-hidden="true"
        size={68}
        strokeWidth={1.8}
        fill={vehicleColorHex(appointment.vehicleColor)}
      />
      <small>{body}</small>
      <b>{brand}</b>
      <span>{color}</span>
    </div>
  );
}
const apptClass = (a: Appt) =>
  a.type === "bloqueio"
    ? "block"
    : a.status === "faltou"
      ? "faltou"
      : (a.serviceScheduled && a.status === "agendado") ||
        !!a.serviceAppointmentId
      ? "scheduled-service"
      : a.type === "retorno"
        ? "retorno"
        : a.type === "garantia"
          ? "garantia"
          : a.type === "revisao" && !a.review
            ? "revisao"
            : a.status === "servico" && conferenceStarted(a)
              ? "conference"
              : a.inProgress && a.status !== "servico"
                ? "inprogress"
                : a.status;
const agendaStatusLabel = (a: Appt) => {
  if (a.type === "bloqueio") return "AUSENTE";
  if (a.budget?.processStatus === "Finalizado")
    return completedAttendanceLabel(a).toLocaleUpperCase("pt-BR");
  if (a.status === "faltou") return "FALTOU";
  if (a.type === "retorno") return "RETORNO";
  if (a.type === "garantia") return "GARANTIA";
  if (a.type === "revisao" && !a.review)
    return a.reviewWithService ? "REVISÃO + SERVIÇO" : "REVISÃO 30 DIAS";
  if (a.serviceScheduled && a.status === "agendado") return "SERVIÇO AGENDADO";
  if (a.serviceAppointmentId && a.serviceScheduledFor)
    return `SERVIÇO AGENDADO ${new Date(
      `${a.serviceScheduledFor}T12:00:00`,
    ).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
  if (a.status === "agendado" && a.inProgress) return "AGUARDANDO AVALIAÇÃO";
  if (a.status === "avaliou" && a.quoteSentAt)
    return "ORÇAMENTO ENVIADO EM ABERTO";
  if (a.status === "avaliou") return "AGUARDANDO ORÇAMENTO";
  if (a.status === "servico" && conferenceStarted(a)) return "EM CONFERÊNCIA";
  if (a.status === "servico" && a.inProgress)
    return "SERVIÇO APROVADO · EM ANDAMENTO";
  if (a.status === "servico") return "AGUARDANDO CONFERÊNCIA";
  if (a.inProgress) return "AGUARDANDO AVALIAÇÃO";
  return a.status.toUpperCase();
};
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
    [evaluationEntry, setEvaluationEntry] = useState<Appt | null>(null),
    [attendancePreview, setAttendancePreview] = useState<Appt | null>(null),
    [activeAppointment, setActiveAppointment] = useState<Appt | null>(null),
    [footerSize, setFooterSize] = useState(shared.footerSize ?? 11),
    [roundStep, setRoundStep] = useState(shared.roundStep ?? 5),
    [message, setMessage] = useState(""),
    [quoteMessageFor, setQuoteMessageFor] = useState<number | null>(null),
    [serviceScheduleDate, setServiceScheduleDate] = useState(""),
    [serviceScheduleTime, setServiceScheduleTime] = useState(""),
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
    [geometry, setGeometry] = useState<GeometryState>({}),
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
    [evaluationSearch, setEvaluationSearch] = useState(""),
    [serviceValueDrafts, setServiceValueDrafts] = useState<
      Record<string, string>
    >({}),
    [techs, setTechs] = useState<string[]>(
      (shared.techs ?? ["Saulo", "Tiago", "Vitor"]).filter(
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
  const evaluationRows = useMemo(() => {
    const search = normalizeSearch(evaluationSearch);
    return [...ITEMS, ...custom]
      .map((name, index) => ({ name, index }))
      .sort((a, b) => {
        if (!search) return a.index - b.index;
        const aName = normalizeSearch(a.name),
          bName = normalizeSearch(b.name),
          aStarts = aName.startsWith(search),
          bStarts = bName.startsWith(search),
          aIncludes = aName.includes(search),
          bIncludes = bName.includes(search);
        if (aStarts !== bStarts) return aStarts ? -1 : 1;
        if (aIncludes !== bIncludes) return aIncludes ? -1 : 1;
        return a.index - b.index;
      });
  }, [custom, evaluationSearch]);
  const [evaluator, setEvaluator] = useState(shared.evaluator ?? "Saulo"),
    [started, setStarted] = useState(shared.started ?? ""),
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
    [servicePrices, setServicePrices] = useState<Record<number, number>>(
      shared.servicePrices ?? {},
    ),
    [manualServices, setManualServices] = useState(shared.manualServices ?? []),
    [proposalPaymentOptions, setProposalPaymentOptions] = useState<{
      pix: boolean;
      card: boolean;
    }>(shared.proposalPaymentOptions ?? { pix: true, card: true }),
    [patioNotes, setPatioNotes] = useState(shared.patioNotes ?? ""),
    [processStatus, setProcessStatus] = useState<"Em andamento" | "Finalizado">(
      shared.processStatus ?? "Em andamento",
    ),
    [purchaseChecks, setPurchaseChecks] = useState<
      Record<string, PurchaseCheck>
    >(shared.purchaseChecks ?? {}),
    [purchaseOrderStates, setPurchaseOrderStates] = useState<
      Record<string, PurchaseOrderState>
    >(shared.purchaseOrderStates ?? {}),
    [budgetReviewOpen, setBudgetReviewOpen] = useState(false),
    [budgetReviewChecks, setBudgetReviewChecks] = useState<
      Record<number, boolean>
    >({}),
    [budgetReviewCopied, setBudgetReviewCopied] = useState(false);
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
        servicePrices,
        manualServices,
        proposalPaymentOptions,
        patioNotes,
        processStatus,
        purchaseChecks,
        purchaseOrderStates,
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
    servicePrices,
    manualServices,
    proposalPaymentOptions,
    patioNotes,
    processStatus,
    purchaseChecks,
    purchaseOrderStates,
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
          if (!alive || !s || Date.now() < syncBlockedUntil.current) return;
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
          apply(setPurchaseChecks, purchaseChecks, s.purchaseChecks);
          apply(
            setPurchaseOrderStates,
            purchaseOrderStates,
            s.purchaseOrderStates,
          );
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
    purchaseChecks,
    purchaseOrderStates,
    footerSize,
    roundStep,
    onLogout,
  ]);
  const tireParts = parts.filter(isTirePart),
    tirePaymentMode = tireParts.some(
      (part: any) => part.tirePayment === "installment",
    )
      ? "installment"
      : "cash",
    piecesCash = parts.reduce(
      (sum: number, part: any) => sum + part.qty * cashSaleOf(part, roundStep),
      0,
    ),
    piecesInstallment = parts.reduce(
      (sum: number, part: any) =>
        sum +
        part.qty *
          (isTirePart(part)
            ? tireInstallmentSaleOf(part, roundStep)
            : cashSaleOf(part, roundStep)),
      0,
    ),
    pieces = parts.reduce(
      (s: number, p: any) => s + p.qty * saleOf(p, roundStep),
      0,
    ),
    serviceTotal =
      selectedServices.reduce(
        (s: number, i: number) =>
          s + servicePrice(i, servicePrices) * (serviceQty[i] ?? 0),
        0,
      ) + manualServices.reduce((s: number, x: any) => s + x.qty * x.value, 0),
    total = pieces + serviceTotal,
    totalCash = piecesCash + serviceTotal,
    totalInstallment = piecesInstallment + serviceTotal,
    tireTotal = tireParts.reduce(
      (sum: number, part: any) => sum + part.qty * saleOf(part, roundStep),
      0,
    ),
    pixDiscountBase = Math.max(0, total - tireTotal),
    pixTotal = pixDiscountBase * 0.95 + tireTotal;
  const reviewParts = parts
      .map((part: any, index: number) => ({ part, index }))
      .filter(
        ({ part }: any) =>
          String(part.item ?? "").trim() && Number(part.qty) > 0,
      ),
    totalPartQuantity = reviewParts.reduce(
      (sum: number, { part }: any) => sum + (Number(part.qty) || 0),
      0,
    ),
    allReviewPartsChecked = reviewParts.every(
      ({ index }: any) => !!budgetReviewChecks[index],
    ),
    reviewServices = [
      ...selectedServices.map(
        (index: number) =>
          `☐ ${quantityValue(serviceQty[index] ?? 0)}x ${SERVICES[index]?.[0] ?? "Serviço"}`,
      ),
      ...manualServices
        .filter((service: any) => service.name?.trim())
        .map(
          (service: any) =>
            `☐ ${quantityValue(Number(service.qty) || 0)}x ${service.name}`,
        ),
    ],
    budgetReviewSignature = JSON.stringify({
      parts: reviewParts.map(({ part }: any) => [
        part.item,
        part.brand,
        part.supplier,
        part.code,
        Number(part.qty) || 0,
      ]),
      services: reviewServices,
    }),
    internalReviewMessage = [
      "*CONFERÊNCIA INTERNA DO ORÇAMENTO*",
      `Cliente: ${activeAppointment?.client || "Não informado"}`,
      `Veículo: ${activeAppointment?.vehicle || "Não informado"} · Placa: ${activeAppointment?.plate || "Não informada"}`,
      "",
      "*PEÇAS*",
      ...(reviewParts.length
        ? reviewParts.map(({ part }: any) => {
            const details = [
              part.brand && `Marca: ${part.brand}`,
              part.supplier && `Fornecedor: ${part.supplier}`,
              part.code && `Código: ${part.code}`,
            ].filter(Boolean);
            return `☐ ${quantityValue(Number(part.qty) || 0)}x ${part.item}${details.length ? ` — ${details.join(" · ")}` : ""}`;
          })
        : ["Nenhuma peça incluída."]),
      `*Quantidade total: ${quantityValue(totalPartQuantity)} peça(s)*`,
      "",
      "*SERVIÇOS*",
      ...(reviewServices.length
        ? reviewServices
        : ["Nenhum serviço incluído."]),
      "",
      "Conferir os itens antes de liberar o orçamento ao cliente.",
    ].join("\n");
  const updateRequiredVehicleField = (
    field: "vehicle" | "plate" | "km",
    value: string,
  ) => {
    if (!activeAppointment) return;
    const updated: Appt = {
      ...activeAppointment,
      [field]: field === "plate" ? value.toLocaleUpperCase("pt-BR") : value,
      lastEditedBy: user.displayName,
      lastEditedAt: new Date().toISOString(),
      _updatedAt: Date.now(),
    };
    DISPLAY_APPT = updated;
    setActiveAppointment(updated);
    setAppointments((list) =>
      list.map((appointment) =>
        appointment.id === updated.id ? updated : appointment,
      ),
    );
  };
  const updateGeometryField = (
    item: string,
    field: keyof GeometryEntry,
    value: string,
  ) =>
    setGeometry((current) => {
      const previous = current[item];
      return {
        ...current,
        [item]: previous
          ? { ...previous, [field]: value }
          : {
              frontLeft: "",
              frontRight: "",
              rearLeft: "",
              rearRight: "",
              condition: "",
              [field]: value,
            },
      };
    });
  const reverseEvaluation = () => {
    if (!activeAppointment) return;
    const source = activeAppointment.sourceAppointmentId
        ? appointments.find(
            (appointment) =>
              appointment.id === activeAppointment.sourceAppointmentId,
          ) ?? activeAppointment
        : activeAppointment,
      linkedServiceId = source.serviceAppointmentId;
    if (
      !confirm(
        `ATENÇÃO: deseja estornar a avaliação de ${source.client}?\n\nA avaliação, o orçamento e uma eventual agenda de serviço vinculada serão apagados. O cliente permanecerá na agenda para uma nova avaliação.`,
      )
    )
      return;
    syncBlockedUntil.current = Date.now() + 4000;
    const now = new Date().toISOString(),
      reset: Appt = {
        ...source,
        status: "agendado",
        evaluation: undefined,
        budget: undefined,
        conference: undefined,
        quoteSentAt: undefined,
        quoteSentBy: undefined,
        serviceScheduled: false,
        serviceScheduledFor: undefined,
        serviceScheduledTime: undefined,
        sourceAppointmentId: undefined,
        serviceAppointmentId: undefined,
        startedAt: undefined,
        inProgress: true,
        evaluationRecordedBy: undefined,
        evaluationRecordedAt: undefined,
        budgetEditedBy: undefined,
        budgetEditedAt: undefined,
        lastEditedBy: user.displayName,
        lastEditedAt: now,
        _updatedAt: Date.now(),
      };
    DISPLAY_APPT = reset;
    setActiveAppointment(reset);
    if (linkedServiceId)
      setDeletedAppointmentIds((ids) => [
        ...new Set([...ids, linkedServiceId]),
      ]);
    setAppointments((list) =>
      list
        .filter(
          (appointment) =>
            !linkedServiceId || appointment.id !== linkedServiceId,
        )
        .map((appointment) =>
          appointment.id === reset.id ? reset : appointment,
        ),
    );
    setStatus({});
    setQuoteItems({});
    setCustom([]);
    setEvaluationNotes({});
    setParts([]);
    setSelectedServices([]);
    setServiceQty({});
    setServicePrices({});
    setManualServices([]);
    setProposalPaymentOptions({ pix: true, card: true });
    setPatioNotes("");
    setChecks({});
    setGeometry({});
    setStarted("");
    setProcessStatus("Em andamento");
    setSavedAt("");
    setCheckOpen(true);
    setView("avaliacao");
    scrollTo(0, 0);
    alert("Avaliação estornada. O preenchimento foi reiniciado.");
  };
  const sanitizeBudgetParts = (savedParts: any[] = []) => {
    const credentialValues = [user?.username, user?.displayName]
        .filter(Boolean)
        .map((value) => String(value).trim().toLocaleUpperCase("pt-BR")),
      cleanText = (value: unknown) => {
        const text = String(value ?? "").trim();
        return credentialValues.includes(text.toLocaleUpperCase("pt-BR"))
          ? ""
          : text;
      },
      cleanNumber = (value: unknown) => {
        const number = Number(value);
        return Number.isFinite(number) ? number : 0;
      };
    return savedParts.map((part) => ({
      ...part,
      brand: cleanText(part.brand),
      supplier: cleanText(part.supplier),
      code: cleanText(part.code),
      cost: cleanNumber(part.cost),
      margin: cleanNumber(part.margin),
      saleOverride:
        part.saleOverride === null || part.saleOverride === undefined
          ? null
          : Number.isFinite(Number(part.saleOverride))
            ? Number(part.saleOverride)
            : null,
    }));
  };
  const nav: [View, string, string][] = [
    ["agenda", "Agenda", "▦"],
    ["veiculos", "Veículos na oficina", "▣"],
    ["avaliacao", "Avaliação", "✓"],
    ["orcamento", "Orçamento", "$"],
    ["proposta", "Proposta", "▤"],
    ["torque", "Conferência", "◇"],
    ["compras", "Pedido de compra", "☑"],
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
      if (
        v === "proposta" &&
        view === "orcamento" &&
        !budgetReviewOpen &&
        activeAppointment?.budget?.internalReview?.signature !==
          budgetReviewSignature
      ) {
        if (!reviewParts.length && !reviewServices.length) {
          alert(
            "Inclua ao menos uma peça ou serviço antes de gerar o orçamento.",
          );
          return;
        }
        setBudgetReviewChecks({});
        setBudgetReviewCopied(false);
        setBudgetReviewOpen(true);
        return;
      }
      if (v === "avaliacao") {
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
        total: servicePrice(i, servicePrices) * (serviceQty[i] ?? 0),
        courtesy: serviceIsCourtesy(i),
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
    }\n\n${
      tireParts.length
        ? `TOTAL À VISTA: ${brl(totalCash)}\nTOTAL PARCELADO: ${brl(totalInstallment)}\n(Pneus com acréscimo de 10% no parcelamento)${
            proposalPaymentOptions.pix || proposalPaymentOptions.card
              ? `\n\nPagamento:\n${[
                  proposalPaymentOptions.pix
                    ? `• Pix com 5% de desconto em peças e serviços (pneus sem desconto): ${brl(pixTotal)}`
                    : "",
                  proposalPaymentOptions.card
                    ? `• Cartão: até 5x sem juros de ${brl(total / 5)}`
                    : "",
                ]
                  .filter(Boolean)
                  .join("\n")}`
              : ""
          }`
        : `TOTAL: ${brl(total)}${
            proposalPaymentOptions.pix || proposalPaymentOptions.card
              ? `\n\nPagamento:\n${[
                  proposalPaymentOptions.pix
                    ? `• Pix com 5% de desconto: ${brl(pixTotal)}`
                    : "",
                  proposalPaymentOptions.card
                    ? `• Cartão: até 5x sem juros de ${brl(total / 5)}`
                    : "",
                ]
                  .filter(Boolean)
                  .join("\n")}`
              : ""
          }`
    }`;
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
              if (
                a.type !== "bloqueio" &&
                a.type !== "revisao" &&
                a.status === "agendado" &&
                !a.serviceScheduled &&
                a.budget?.processStatus !== "Finalizado"
              ) {
                setEvaluationEntry(a);
                return;
              }
              const shouldStartScheduled =
                  !!a.serviceScheduled && a.status === "agendado",
                shouldStart =
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
                      status: shouldStartScheduled ? "servico" : a.status,
                      inProgress: shouldStartScheduled ? true : a.inProgress,
                      _updatedAt: Date.now(),
                    }
                  : a;
              DISPLAY_APPT = opened;
              setActiveAppointment(opened);
              setServiceScheduleDate(a.serviceScheduledFor ?? "");
              setServiceScheduleTime(a.serviceScheduledTime ?? "");
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
              setGeometry(a.conference?.geometry ?? {});
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
                setParts(sanitizeBudgetParts(a.budget.parts));
                setSelectedServices(a.budget.selectedServices ?? []);
                setServiceQty(a.budget.serviceQty ?? {});
                setServicePrices(a.budget.servicePrices ?? {});
                setManualServices(a.budget.manualServices ?? []);
                setProposalPaymentOptions(
                  a.budget.proposalPaymentOptions ?? { pix: true, card: true },
                );
                setPatioNotes(a.budget.patioNotes ?? "");
                setProcessStatus(a.budget.processStatus ?? "Em andamento");
              } else if (
                a.status === "agendado" ||
                activeAppointment?.id !== a.id
              ) {
                setParts([]);
                setSelectedServices([]);
                setServiceQty({});
                setServicePrices({});
                setManualServices([]);
                setProposalPaymentOptions({ pix: true, card: true });
                setPatioNotes("");
                setProcessStatus("Em andamento");
              }
              setView(
                a.type === "revisao" && !a.review
                  ? "revisao"
                  : a.budget?.processStatus === "Finalizado"
                    ? "atendimento"
                    : opened.status === "servico"
                      ? "torque"
                      : opened.status === "avaliou"
                        ? "orcamento"
                        : "avaliacao",
              );
              scrollTo(0, 0);
            }}
            edit={(a: Appt) => setModal(a)}
            preview={(a: Appt) => setAttendancePreview(a)}
            markNoShow={(a: Appt) => {
              const markAsNoShow = a.status !== "faltou";
              if (
                markAsNoShow &&
                !confirm(`Confirmar que ${a.client} faltou ao agendamento?`)
              )
                return;
              const now = new Date().toISOString();
              syncBlockedUntil.current = Date.now() + 4000;
              setAppointments((list) =>
                list.map((item) =>
                  item.id === a.id
                    ? {
                        ...item,
                        status: markAsNoShow
                          ? "faltou"
                          : item.statusBeforeNoShow ?? "agendado",
                        inProgress: markAsNoShow
                          ? false
                          : item.inProgressBeforeNoShow ?? false,
                        statusBeforeNoShow: markAsNoShow
                          ? item.status
                          : undefined,
                        inProgressBeforeNoShow: markAsNoShow
                          ? item.inProgress
                          : undefined,
                        noShowMarkedBy: markAsNoShow
                          ? user.displayName
                          : undefined,
                        noShowMarkedAt: markAsNoShow ? now : undefined,
                        lastEditedBy: user.displayName,
                        lastEditedAt: now,
                        _updatedAt: Date.now(),
                      }
                    : item,
                ),
              );
            }}
            remove={(a: Appt) => {
              if (
                confirm(
                  `ATENÇÃO: deseja realmente excluir ${a.type === "bloqueio" ? "esta ausência" : `o agendamento de ${a.client}`}?`,
                )
              ) {
                syncBlockedUntil.current = Date.now() + 4000;
                setDeletedAppointmentIds((ids) => [...new Set([...ids, a.id])]);
                setAppointments((list) => list.filter((x) => x.id !== a.id));
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
              onBack={() => {
                if (
                  confirm(
                    "Você já salvou a revisão?\n\nOK: sair para a agenda.\nCancelar: continuar nesta tela para salvar.",
                  )
                )
                  go("agenda");
              }}
              onSave={(review: ReviewState) => {
                syncBlockedUntil.current = Date.now() + 4000;
                const withService = !!activeAppointment.reviewWithService,
                  finishedAt = new Date().toISOString(),
                  finishedBudget: BudgetState = {
                    parts: activeAppointment.budget?.parts ?? [],
                    selectedServices:
                      activeAppointment.budget?.selectedServices ?? [],
                    serviceQty: activeAppointment.budget?.serviceQty ?? {},
                    servicePrices:
                      activeAppointment.budget?.servicePrices ?? {},
                    manualServices:
                      activeAppointment.budget?.manualServices ?? [],
                    proposalPaymentOptions:
                      activeAppointment.budget?.proposalPaymentOptions ?? {
                        pix: true,
                        card: true,
                      },
                    patioNotes: activeAppointment.budget?.patioNotes ?? "",
                    processStatus: "Finalizado",
                    internalReview:
                      activeAppointment.budget?.internalReview,
                  };
                const updated: Appt = {
                  ...activeAppointment,
                  status: withService ? "agendado" : "servico",
                  inProgress: withService
                    ? activeAppointment.inProgress
                    : false,
                  startedAt: withService
                    ? activeAppointment.startedAt ||
                      new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : activeAppointment.startedAt,
                  review,
                  budget: withService
                    ? activeAppointment.budget
                    : finishedBudget,
                  conference: withService
                    ? activeAppointment.conference
                    : {
                        checks: activeAppointment.conference?.checks ?? {},
                        geometry: activeAppointment.conference?.geometry ?? {},
                        finalizedAt: finishedAt,
                        finalizedBy: user.displayName,
                        finalization: {
                          serviceCompleted: true,
                          vehicleReleased: true,
                          clientOriented: true,
                          note: review.notes,
                          technician: review.reviewer,
                          executor: review.reviewer,
                          checker: user.displayName,
                        },
                      },
                  lastEditedBy: user.displayName,
                  lastEditedAt: finishedAt,
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
                if (!withService) setProcessStatus("Finalizado");
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
          view !== "revisao" &&
          view !== "compras" && (
            <section className="page">
              <Vehicle />
              <Steps view={view} />
              <StageActions
                view={view}
                status={processStatus}
                setStatus={setProcessStatus}
                printNoValues={printNoValues}
                printStage={printStage}
                exit={() => {
                  if (
                    confirm(
                      "Você já salvou as alterações?\n\nOK: sair para a agenda.\nCancelar: continuar nesta tela para salvar.",
                    )
                  ) {
                    go("agenda");
                  }
                }}
                save={() => {
                  syncBlockedUntil.current = Date.now() + 4000;
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
                            servicePrices,
                            manualServices,
                            proposalPaymentOptions,
                            patioNotes,
                            processStatus,
                            internalReview:
                              activeAppointment.budget?.internalReview,
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
                              geometry,
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
                  {(activeAppointment?.evaluation ||
                    activeAppointment?.budget) && (
                    <div className="reverse-evaluation-bar">
                      <span>
                        <b>Precisa refazer esta avaliação?</b>
                        <small>
                          Estorne para apagar a avaliação e o orçamento antigos
                          e começar um novo preenchimento.
                        </small>
                      </span>
                      <button onClick={reverseEvaluation}>
                        ↺ Estornar avaliação
                      </button>
                    </div>
                  )}
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
                    title="⚙ Suspensão e peças do veículo"
                    subtitle="Checklist de avaliação e itens para orçamento"
                    open={checkOpen}
                    set={() => setCheckOpen(!checkOpen)}
                  >
                    <div className="inspection-tools">
                      <label className="inspection-search">
                        <b>Pesquisar peça na avaliação</b>
                        <input
                          type="search"
                          value={evaluationSearch}
                          onChange={(e) => setEvaluationSearch(e.target.value)}
                          placeholder="Digite, por exemplo: amortecedor, pneu ou pivô"
                        />
                        <small>
                          As peças encontradas sobem para o início. A lista
                          completa permanece abaixo.
                        </small>
                      </label>
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
                      {evaluationRows.map(({ name: x, index: i }) => (
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
                          <label className="quote-check">
                            <input
                              type="checkbox"
                              checked={!!quoteItems[i + 1]}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setQuoteItems({
                                  ...quoteItems,
                                  [i + 1]: checked,
                                });
                                if (checked)
                                  setStatus({
                                    ...status,
                                    [i + 1]: "r",
                                  });
                              }}
                            />{" "}
                            Orçar
                          </label>
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
                          servicePrices,
                          manualServices,
                          proposalPaymentOptions,
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
                      <div className="budget-field-legend">
                        <span className="description-swatch">
                          Descrição da peça
                        </span>
                        <span className="entry-swatch">
                          Campos para preencher
                        </span>
                      </div>
                      {tireParts.length > 0 && (
                        <div className="tire-payment-panel">
                          <span>
                            <b>Forma de pagamento dos pneus</b>
                            <small>
                              No parcelado, o sistema acrescenta automaticamente
                              10% somente ao valor dos pneus.
                            </small>
                          </span>
                          <div>
                            <button
                              type="button"
                              className={
                                tirePaymentMode === "cash" ? "active" : ""
                              }
                              onClick={() =>
                                setParts(
                                  parts.map((part: any) =>
                                    isTirePart(part)
                                      ? { ...part, tirePayment: "cash" }
                                      : part,
                                  ),
                                )
                              }
                            >
                              À vista
                            </button>
                            <button
                              type="button"
                              className={
                                tirePaymentMode === "installment"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                setParts(
                                  parts.map((part: any) =>
                                    isTirePart(part)
                                      ? { ...part, tirePayment: "installment" }
                                      : part,
                                  ),
                                )
                              }
                            >
                              Parcelado (+10%)
                            </button>
                          </div>
                        </div>
                      )}
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
                                name={`budget-item-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].item = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                              <input
                                value={p.brand}
                                placeholder="Marca"
                                name={`budget-brand-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                data-lpignore="true"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].brand = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              inputMode="numeric"
                              placeholder="0"
                              aria-label={`Quantidade de ${p.item || "peça"}`}
                              name={`budget-quantity-${activeAppointment?.id ?? "novo"}-${i}`}
                              autoComplete="off"
                              data-form-type="other"
                              value={p.qty || ""}
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
                                name={`budget-supplier-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                data-lpignore="true"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].supplier = titleCase(e.target.value);
                                  setParts(a);
                                }}
                              />
                              <input
                                value={p.code}
                                placeholder="Código"
                                name={`budget-code-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                data-lpignore="true"
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].code =
                                    e.target.value.toLocaleUpperCase("pt-BR");
                                  setParts(a);
                                }}
                              />
                            </label>
                            <input
                              type="number"
                              className={!costs ? "masked-budget-input" : ""}
                              readOnly={!costs}
                              min="0"
                              step="0.01"
                              inputMode="decimal"
                              placeholder={costs ? "0,00" : ""}
                              aria-label={`Custo de ${p.item || "peça"} em reais`}
                              name={`budget-cost-${activeAppointment?.id ?? "novo"}-${i}`}
                              autoComplete="off"
                              data-form-type="other"
                              data-lpignore="true"
                              value={p.cost || ""}
                              onChange={(e) => {
                                const a = [...parts];
                                a[i].cost = +e.target.value;
                                setParts(a);
                              }}
                            />
                            <label>
                              <input
                                type="number"
                                className={!costs ? "masked-budget-input" : ""}
                                readOnly={!costs}
                                min="0"
                                step="1"
                                inputMode="numeric"
                                placeholder={costs ? "0" : ""}
                                aria-label={`Margem de ${p.item || "peça"} em porcentagem`}
                                name={`budget-margin-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                data-lpignore="true"
                                value={p.margin || ""}
                                onChange={(e) => {
                                  const a = [...parts];
                                  a[i].margin = Math.max(
                                    0,
                                    Math.trunc(Number(e.target.value)),
                                  );
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
                                inputMode="decimal"
                                placeholder="0,00"
                                aria-label={`Venda unitária de ${p.item || "peça"} em reais`}
                                name={`budget-sale-${activeAppointment?.id ?? "novo"}-${i}`}
                                autoComplete="off"
                                data-form-type="other"
                                value={cashSaleOf(p, roundStep) || ""}
                                onChange={(e) => {
                                  const a = [...parts];
                                  const value = +e.target.value;
                                  a[i].saleOverride = value;
                                  a[i].margin =
                                    a[i].cost > 0
                                      ? Math.round(
                                          (value / a[i].cost - 1) * 100,
                                        )
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
                              {isTirePart(p) && (
                                <small className="tire-price-preview">
                                  À vista: {brl(cashSaleOf(p, roundStep))}
                                  <br />
                                  Parcelado:{" "}
                                  {brl(tireInstallmentSaleOf(p, roundStep))}
                                </small>
                              )}
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
                          b="Selecione e informe a quantidade e o valor unitário."
                        />
                        <button
                          onClick={() =>
                            setManualServices([
                              ...manualServices,
                              { name: "", qty: 0, value: 0, category: "labor" },
                            ])
                          }
                        >
                          + Inserir serviço manual
                        </button>
                      </div>
                      <div className="budget-field-legend">
                        <span className="description-swatch">
                          Descrição do serviço
                        </span>
                        <span className="entry-swatch">
                          Campos para preencher
                        </span>
                      </div>
                      <div className="servicegrid">
                        {SERVICE_GROUPS.map((group) => (
                          <section className="service-group" key={group.title}>
                            <div
                              className="service-group-heading"
                              style={{ gridColumn: "1 / -1" }}
                            >
                              <h3>{group.title}</h3>
                              {group.title === "5. Gabaritagem" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setManualServices([
                                      ...manualServices,
                                      {
                                        name: "",
                                        qty: 1,
                                        value: 0,
                                        category: "gabaritagem",
                                      },
                                    ])
                                  }
                                >
                                  + Adicionar serviço
                                </button>
                              )}
                            </div>
                            {group.indexes.map((i) => {
                              const x = SERVICES[i];
                              return (
                                <div
                                  className={
                                    "service-row " +
                                    (selectedServices.includes(i)
                                      ? "selected"
                                      : "") +
                                    (selectedServices.includes(i) &&
                                    (activeAppointment?.status === "servico" ||
                                      activeAppointment?.budget
                                        ?.processStatus === "Finalizado")
                                      ? " approved"
                                      : "")
                                  }
                                  key={x[0]}
                                >
                                  <input
                                    type="checkbox"
                                    aria-label={`Selecionar ${x[0]}`}
                                    checked={selectedServices.includes(i)}
                                    onChange={() => {
                                      const selecting =
                                        !selectedServices.includes(i);
                                      setSelectedServices(
                                        selecting
                                          ? [...selectedServices, i]
                                          : selectedServices.filter(
                                              (v) => v !== i,
                                            ),
                                      );
                                      if (selecting && !serviceQty[i])
                                        setServiceQty({
                                          ...serviceQty,
                                          [i]: 1,
                                        });
                                    }}
                                  />
                                  <span>
                                    {x[0]}
                                    {selectedServices.includes(i) &&
                                      (activeAppointment?.status ===
                                        "servico" ||
                                        activeAppointment?.budget
                                          ?.processStatus === "Finalizado") && (
                                        <small className="approved-service-badge">
                                          ✓ Aprovado
                                        </small>
                                      )}
                                  </span>
                                  <div className="service-entry-fields">
                                    <label>
                                      <small>Qtd.</small>
                                      <input
                                        className="qty"
                                        type="number"
                                        min="1"
                                        inputMode="numeric"
                                        value={serviceQty[i] ?? ""}
                                        onChange={(e) => {
                                          const next = { ...serviceQty };
                                          if (e.target.value === "")
                                            delete next[i];
                                          else next[i] = +e.target.value;
                                          setServiceQty(next);
                                        }}
                                      />
                                    </label>
                                    {!serviceIsCourtesy(i) && (
                                      <label>
                                        <small>Valor unitário R$</small>
                                        <input
                                          className="service-value"
                                          type="text"
                                          inputMode="decimal"
                                          value={
                                            serviceValueDrafts[
                                              `service-${i}`
                                            ] ??
                                            decimalValue(
                                              servicePrice(i, servicePrices),
                                            )
                                          }
                                          placeholder="0,00"
                                          onFocus={(event) => {
                                            setServiceValueDrafts(
                                              (current) => ({
                                                ...current,
                                                [`service-${i}`]: decimalValue(
                                                  servicePrice(
                                                    i,
                                                    servicePrices,
                                                  ),
                                                ),
                                              }),
                                            );
                                            event.currentTarget.select();
                                          }}
                                          onChange={(e) => {
                                            const typed = e.target.value;
                                            setServiceValueDrafts(
                                              (current) => ({
                                                ...current,
                                                [`service-${i}`]: typed,
                                              }),
                                            );
                                            const next = { ...servicePrices };
                                            next[i] = parseDecimalValue(typed);
                                            setServicePrices(next);
                                          }}
                                          onBlur={() =>
                                            setServiceValueDrafts((current) => {
                                              const next = { ...current };
                                              delete next[`service-${i}`];
                                              return next;
                                            })
                                          }
                                        />
                                      </label>
                                    )}
                                  </div>
                                  <b>
                                    {serviceIsCourtesy(i)
                                      ? "Cortesia"
                                      : `${brl(servicePrice(i, servicePrices))}/ un.`}
                                  </b>
                                </div>
                              );
                            })}
                            {group.title === "5. Gabaritagem" && (
                              <div className="manualservices gabaritagem-manual-services">
                                {manualServices
                                .map((x, i) => ({ x, i }))
                                .filter(({ x }) =>
                                  isGabaritagemManualService(x),
                                )
                                .map(({ x, i }) => (
                                  <div
                                    className="manual-service-in-category"
                                    key={`gabaritagem-${i}`}
                                  >
                                    <input
                                      placeholder="Nome do serviço de gabaritagem"
                                      value={x.name}
                                      onChange={(e) => {
                                        const a = [...manualServices];
                                        a[i] = {
                                          ...a[i],
                                          name: e.target.value,
                                          category: "gabaritagem",
                                        };
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
                                          a[i] = {
                                            ...a[i],
                                            qty: +e.target.value,
                                            category: "gabaritagem",
                                          };
                                          setManualServices(a);
                                        }}
                                      />
                                    </label>
                                    <label>
                                      Valor unitário R$
                                      <input
                                        type="text"
                                        inputMode="decimal"
                                        value={
                                          serviceValueDrafts[`manual-${i}`] ??
                                          decimalValue(x.value)
                                        }
                                        onFocus={(event) => {
                                          setServiceValueDrafts((current) => ({
                                            ...current,
                                            [`manual-${i}`]: decimalValue(
                                              x.value,
                                            ),
                                          }));
                                          event.currentTarget.select();
                                        }}
                                        onChange={(e) => {
                                          const typed = e.target.value;
                                          setServiceValueDrafts((current) => ({
                                            ...current,
                                            [`manual-${i}`]: typed,
                                          }));
                                          const a = [...manualServices];
                                          a[i] = {
                                            ...a[i],
                                            value: parseDecimalValue(typed),
                                            category: "gabaritagem",
                                          };
                                          setManualServices(a);
                                        }}
                                        onBlur={() =>
                                          setServiceValueDrafts((current) => {
                                            const next = { ...current };
                                            delete next[`manual-${i}`];
                                            return next;
                                          })
                                        }
                                      />
                                    </label>
                                    <b>{brl(x.qty * x.value)}</b>
                                    <button
                                      type="button"
                                      className="manual-service-delete"
                                      aria-label={`Excluir serviço ${x.name || "sem nome"}`}
                                      title="Excluir este serviço"
                                      onClick={() => {
                                        if (
                                          confirm(
                                            `Excluir o serviço “${x.name || "sem nome"}”?`,
                                          )
                                        ) {
                                          setManualServices((current) =>
                                            current.filter(
                                              (_: any, index: number) =>
                                                index !== i,
                                            ),
                                          );
                                          setServiceValueDrafts({});
                                        }
                                      }}
                                    >
                                      🗑
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </section>
                        ))}
                      </div>
                      <div className="manualservices">
                        {manualServices
                          .map((x, i) => ({ x, i }))
                          .filter(({ x }) => !isGabaritagemManualService(x))
                          .map(({ x, i }) => (
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
                                type="text"
                                inputMode="decimal"
                                value={
                                  serviceValueDrafts[`manual-${i}`] ??
                                  decimalValue(x.value)
                                }
                                onFocus={(event) => {
                                  setServiceValueDrafts((current) => ({
                                    ...current,
                                    [`manual-${i}`]: decimalValue(x.value),
                                  }));
                                  event.currentTarget.select();
                                }}
                                onChange={(e) => {
                                  const typed = e.target.value;
                                  setServiceValueDrafts((current) => ({
                                    ...current,
                                    [`manual-${i}`]: typed,
                                  }));
                                  const a = [...manualServices];
                                  a[i].value = parseDecimalValue(typed);
                                  setManualServices(a);
                                }}
                                onBlur={() =>
                                  setServiceValueDrafts((current) => {
                                    const next = { ...current };
                                    delete next[`manual-${i}`];
                                    return next;
                                  })
                                }
                              />
                            </label>
                            <b>{brl(x.qty * x.value)}</b>
                            <button
                              type="button"
                              className="manual-service-delete"
                              aria-label={`Excluir serviço ${x.name || "sem nome"}`}
                              title="Excluir este serviço"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Excluir o serviço “${x.name || "sem nome"}”?`,
                                  )
                                ) {
                                  setManualServices((current) =>
                                    current.filter(
                                      (_: any, index: number) => index !== i,
                                    ),
                                  );
                                  setServiceValueDrafts({});
                                }
                              }}
                            >
                              🗑
                            </button>
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
                    {tireParts.length > 0 && (
                      <span className="tire-total-comparison">
                        Pneus: total à vista <b>{brl(totalCash)}</b> · total
                        parcelado <b>{brl(totalInstallment)}</b>
                      </span>
                    )}
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
                    next={() => {
                      if (!reviewParts.length && !reviewServices.length) {
                        alert(
                          "Inclua ao menos uma peça ou serviço antes de gerar o orçamento.",
                        );
                        return;
                      }
                      setBudgetReviewChecks({});
                      setBudgetReviewCopied(false);
                      setBudgetReviewOpen(true);
                    }}
                    b="Voltar à avaliação"
                    n="Conferir e gerar orçamento"
                  />
                  {budgetReviewOpen && (
                    <div className="backdrop" role="dialog" aria-modal="true">
                      <div className="modal budget-review-modal">
                        <div>
                          <span>
                            <h2>Conferência interna</h2>
                            <p>
                              Confira as quantidades antes de gerar o orçamento
                              do cliente.
                            </p>
                          </span>
                          <button
                            type="button"
                            onClick={() => setBudgetReviewOpen(false)}
                            aria-label="Fechar conferência"
                          >
                            ×
                          </button>
                        </div>
                        <div className="budget-review-client">
                          <span>
                            <b>{activeAppointment?.client}</b>
                            <small>
                              {activeAppointment?.vehicle || "Veículo não informado"}
                              {activeAppointment?.plate
                                ? ` · ${activeAppointment.plate}`
                                : ""}
                            </small>
                          </span>
                          <strong>
                            {quantityValue(totalPartQuantity)} peça(s)
                          </strong>
                        </div>
                        <div className="budget-review-heading">
                          <b>Peças para conferir</b>
                          <small>
                            Marque cada linha depois de conferir a quantidade.
                          </small>
                        </div>
                        <section className="budget-review-list">
                          {reviewParts.length ? (
                            reviewParts.map(({ part, index }: any) => (
                              <label
                                className={
                                  budgetReviewChecks[index] ? "checked" : ""
                                }
                                key={`${index}-${part.item}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={!!budgetReviewChecks[index]}
                                  onChange={(event) =>
                                    setBudgetReviewChecks({
                                      ...budgetReviewChecks,
                                      [index]: event.target.checked,
                                    })
                                  }
                                />
                                <strong>
                                  {quantityValue(Number(part.qty) || 0)}x
                                </strong>
                                <span>
                                  <b>{part.item}</b>
                                  <small>
                                    {[
                                      part.brand,
                                      part.supplier,
                                      part.code,
                                    ]
                                      .filter(Boolean)
                                      .join(" · ") || "Sem detalhes adicionais"}
                                  </small>
                                </span>
                              </label>
                            ))
                          ) : (
                            <p className="budget-review-empty">
                              Nenhuma peça incluída. Confira os serviços abaixo.
                            </p>
                          )}
                        </section>
                        {reviewServices.length > 0 && (
                          <div className="budget-review-services">
                            <b>Serviços incluídos</b>
                            {reviewServices.map((service: string, index: number) => (
                              <span key={`${index}-${service}`}>
                                {service.replace(/^☐\s*/, "")}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="budget-review-progress">
                          <b>
                            {reviewParts.filter(({ index }: any) =>
                              budgetReviewChecks[index],
                            ).length}
                            /{reviewParts.length} peças conferidas
                          </b>
                          <small>
                            O orçamento será liberado quando todas estiverem
                            marcadas.
                          </small>
                        </div>
                        <footer>
                          <button
                            type="button"
                            onClick={() => setBudgetReviewOpen(false)}
                          >
                            Voltar e corrigir
                          </button>
                          <button
                            type="button"
                            className="wa budget-review-copy"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  internalReviewMessage,
                                );
                                setBudgetReviewCopied(true);
                              } catch {
                                alert(
                                  "Não foi possível copiar automaticamente. Tente novamente pelo navegador.",
                                );
                              }
                            }}
                          >
                            {budgetReviewCopied
                              ? "Lista copiada ✓"
                              : "Copiar para WhatsApp"}
                          </button>
                          <button
                            type="button"
                            className="primary"
                            disabled={!allReviewPartsChecked}
                            onClick={() => {
                              if (!activeAppointment || !allReviewPartsChecked)
                                return;
                              const now = new Date().toISOString(),
                                internalReview: InternalBudgetReview = {
                                  signature: budgetReviewSignature,
                                  totalQuantity: totalPartQuantity,
                                  checkedItems: reviewParts.map(
                                    ({ part }: any) =>
                                      `${quantityValue(Number(part.qty) || 0)}x ${part.item}`,
                                  ),
                                  confirmedAt: now,
                                  confirmedBy: user.displayName,
                                },
                                budget: BudgetState = {
                                  parts,
                                  selectedServices,
                                  serviceQty,
                                  servicePrices,
                                  manualServices,
                                  proposalPaymentOptions,
                                  patioNotes,
                                  processStatus,
                                  internalReview,
                                },
                                updated: Appt = {
                                  ...activeAppointment,
                                  budget,
                                  budgetEditedBy: user.displayName,
                                  budgetEditedAt: now,
                                  lastEditedBy: user.displayName,
                                  lastEditedAt: now,
                                  _updatedAt: Date.now(),
                                };
                              syncBlockedUntil.current = Date.now() + 4000;
                              DISPLAY_APPT = updated;
                              setActiveAppointment(updated);
                              setAppointments((list) =>
                                list.map((appointment) =>
                                  appointment.id === updated.id
                                    ? updated
                                    : appointment,
                                ),
                              );
                              setSavedAt(
                                new Date().toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }),
                              );
                              setBudgetReviewOpen(false);
                              setView("proposta");
                              scrollTo(0, 0);
                            }}
                          >
                            Salvar e gerar orçamento
                          </button>
                        </footer>
                      </div>
                    </div>
                  )}
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
                          <small>
                            Unitário
                            {isTirePart(p)
                              ? p.tirePayment === "installment"
                                ? " parcelado"
                                : " à vista"
                              : ""}
                            : {brl(saleOf(p, roundStep))}
                          </small>
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
                            {serviceIsCourtesy(i)
                              ? "Cortesia"
                              : brl(servicePrice(i, servicePrices))}
                          </small>
                        </span>
                        <strong>
                          {serviceIsCourtesy(i)
                            ? "Cortesia"
                            : brl(
                                servicePrice(i, servicePrices) *
                                  (serviceQty[i] ?? 0),
                              )}
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
                    <div className="payment-options no-print">
                      <strong>Formas de pagamento exibidas na proposta</strong>
                      <label>
                        <input
                          type="checkbox"
                          checked={proposalPaymentOptions.pix}
                          onChange={(e) =>
                            setProposalPaymentOptions({
                              ...proposalPaymentOptions,
                              pix: e.target.checked,
                            })
                          }
                        />
                        Pix com 5% de desconto
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={proposalPaymentOptions.card}
                          onChange={(e) =>
                            setProposalPaymentOptions({
                              ...proposalPaymentOptions,
                              card: e.target.checked,
                            })
                          }
                        />
                        Cartão em até 5x sem juros
                      </label>
                      {!proposalPaymentOptions.pix &&
                        !proposalPaymentOptions.card && (
                          <small>Nenhuma forma de pagamento será enviada.</small>
                        )}
                    </div>
                    {(proposalPaymentOptions.pix ||
                      proposalPaymentOptions.card) && (
                      <div className="payments">
                        {proposalPaymentOptions.pix && (
                          <label>
                            Pix - 5% de desconto <b>{brl(pixTotal)}</b>
                            {tireParts.length > 0 && (
                              <small>
                                Desconto aplicado somente em peças e serviços.
                                Pneus permanecem sem desconto.
                              </small>
                            )}
                          </label>
                        )}
                        {proposalPaymentOptions.card && (
                          <label>
                            Cartão - até 5x sem juros
                            <b>5x de {brl(total / 5)}</b>
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="schedule-service-box">
                    <span>
                      <b>Cliente trará o veículo em outro dia?</b>
                      <small>
                        Agende o serviço mantendo esta avaliação e o orçamento.
                      </small>
                    </span>
                    <label>
                      Data do serviço
                      <input
                        type="date"
                        value={serviceScheduleDate}
                        onChange={(e) => setServiceScheduleDate(e.target.value)}
                      />
                    </label>
                    <label>
                      Horário
                      <input
                        type="time"
                        value={serviceScheduleTime}
                        onChange={(e) => setServiceScheduleTime(e.target.value)}
                      />
                    </label>
                    <button
                      className="schedule-service-button"
                      onClick={() => {
                        if (!activeAppointment) return;
                        if (!serviceScheduleDate || !serviceScheduleTime) {
                          alert("Informe a data e o horário do serviço.");
                          return;
                        }
                        const now = new Date().toISOString(),
                          scheduledId =
                            activeAppointment.serviceAppointmentId ??
                            Date.now(),
                          budget: BudgetState = {
                            parts,
                            selectedServices,
                            serviceQty,
                            servicePrices,
                            manualServices,
                            proposalPaymentOptions,
                            patioNotes,
                            processStatus: "Em andamento",
                            internalReview:
                              activeAppointment.budget?.internalReview,
                          },
                          source: Appt = {
                            ...activeAppointment,
                            status: "avaliou",
                            budget,
                            serviceScheduledFor: serviceScheduleDate,
                            serviceScheduledTime: serviceScheduleTime,
                            serviceAppointmentId: scheduledId,
                            budgetEditedBy: user.displayName,
                            budgetEditedAt: now,
                            lastEditedBy: user.displayName,
                            lastEditedAt: now,
                            _updatedAt: Date.now(),
                          },
                          scheduled: Appt = {
                            ...source,
                            id: scheduledId,
                            date: serviceScheduleDate,
                            time: serviceScheduleTime,
                            status: "agendado",
                            serviceScheduled: true,
                            sourceAppointmentId: activeAppointment.id,
                            serviceAppointmentId: undefined,
                            inProgress: false,
                            startedAt: undefined,
                            conference: undefined,
                            scheduledBy: user.displayName,
                            createdAt: now,
                            lastEditedBy: user.displayName,
                            lastEditedAt: now,
                            _updatedAt: Date.now() + 1,
                          };
                        syncBlockedUntil.current = Date.now() + 4000;
                        DISPLAY_APPT = source;
                        setActiveAppointment(source);
                        setAppointments((list) => {
                          const exists = list.some((a) => a.id === scheduledId),
                            updated = list.map((a) =>
                              a.id === source.id
                                ? source
                                : a.id === scheduledId
                                  ? scheduled
                                  : a,
                            );
                          return exists ? updated : [...updated, scheduled];
                        });
                        setSavedAt(
                          new Date().toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                        );
                        alert(
                          `Serviço agendado para ${new Date(`${serviceScheduleDate}T12:00:00`).toLocaleDateString("pt-BR")}, às ${serviceScheduleTime}.`,
                        );
                        setView("agenda");
                        scrollTo(0, 0);
                      }}
                    >
                      Agendar serviço
                    </button>
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
                            servicePrices,
                            manualServices,
                            proposalPaymentOptions,
                            patioNotes,
                            processStatus: "Em andamento",
                            internalReview:
                              activeAppointment.budget?.internalReview,
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
                      onClick={async () => {
                        if (!activeAppointment) {
                          alert("Selecione um atendimento antes de enviar o orçamento.");
                          return;
                        }
                        const transferCode = encodeBudgetTransfer({
                          version: 1,
                          transferId: `${activeAppointment.id}-${Date.now()}`,
                          serviceDate: activeAppointment.date,
                          customerName: activeAppointment.client,
                          phone: activeAppointment.phone,
                          vehicle: activeAppointment.vehicle,
                          plate: activeAppointment.plate,
                          items: [
                            ...parts
                              .filter(
                                (part: any) =>
                                  String(part.item ?? "").trim() &&
                                  Number(part.qty) > 0,
                              )
                              .map((part: any) => ({
                                category: isTirePart(part) ? "tires" : "parts",
                                description: [part.item, part.brand]
                                  .filter(Boolean)
                                  .join(" • "),
                                quantity: Number(part.qty) || 1,
                                unitPrice: saleOf(part, roundStep),
                                unitCost: Number(part.cost) || 0,
                                supplierName: String(part.supplier ?? ""),
                              })),
                            ...selectedServices.map((index: number) => ({
                              category: SERVICE_GROUPS[4].indexes.includes(
                                index,
                              )
                                ? "gabaritagem"
                                : "labor",
                              description:
                                SERVICES[index]?.[0] ?? "Serviço",
                              quantity: Number(serviceQty[index]) || 1,
                              unitPrice: servicePrice(index, servicePrices),
                            })),
                            ...manualServices
                              .filter((service: any) => service.name?.trim())
                              .map((service: any) => ({
                                category: isGabaritagemManualService(service)
                                  ? "gabaritagem"
                                  : "labor",
                                description: service.name.trim(),
                                quantity: Number(service.qty) || 1,
                                unitPrice: Number(service.value) || 0,
                              })),
                          ],
                        });
                        try {
                          await navigator.clipboard.writeText(transferCode);
                          alert(
                            "Orçamento copiado. Vá para o Pós/OS e clique em ‘Importar orçamento’ e depois em ‘Colar orçamento’.",
                          );
                        } catch {
                          window.prompt(
                            "Copie este código e cole no sistema de OS:",
                            transferCode,
                          );
                        }
                      }}
                    >
                      Enviar para Pós/OS
                    </button>
                    <button
                      className="primary"
                      onClick={() => {
                        if (activeAppointment) {
                          const budget: BudgetState = {
                            parts,
                            selectedServices,
                            serviceQty,
                            servicePrices,
                            manualServices,
                            proposalPaymentOptions,
                            patioNotes,
                            processStatus: "Em andamento",
                            internalReview:
                              activeAppointment.budget?.internalReview,
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
                    <Collapse
                      title="⌖ Geometria / Alinhamento"
                      subtitle="Medições de camber, caster e convergência"
                      open={!!torqueOpen.geometry}
                      set={() =>
                        setTorqueOpen({
                          ...torqueOpen,
                          geometry: !torqueOpen.geometry,
                        })
                      }
                    >
                      <div className="geometry bare">
                        {[
                          "Camber",
                          "Caster",
                          "Alinhamento (convergência)",
                          "Posição do volante",
                        ].map((item) => {
                          const values = geometry[item] ?? {
                            frontLeft: "",
                            frontRight: "",
                            rearLeft: "",
                            rearRight: "",
                            condition: "",
                          };
                          return (
                            <div key={item}>
                              <b>{item}</b>
                              <input
                                placeholder="Diant. Esq."
                                value={values.frontLeft}
                                onChange={(event) =>
                                  updateGeometryField(
                                    item,
                                    "frontLeft",
                                    event.target.value,
                                  )
                                }
                              />
                              <input
                                placeholder="Diant. Dir."
                                value={values.frontRight}
                                onChange={(event) =>
                                  updateGeometryField(
                                    item,
                                    "frontRight",
                                    event.target.value,
                                  )
                                }
                              />
                              <input
                                placeholder="Tras. Esq."
                                value={values.rearLeft}
                                onChange={(event) =>
                                  updateGeometryField(
                                    item,
                                    "rearLeft",
                                    event.target.value,
                                  )
                                }
                              />
                              <input
                                placeholder="Tras. Dir."
                                value={values.rearRight}
                                onChange={(event) =>
                                  updateGeometryField(
                                    item,
                                    "rearRight",
                                    event.target.value,
                                  )
                                }
                              />
                              <select
                                value={values.condition}
                                onChange={(event) =>
                                  updateGeometryField(
                                    item,
                                    "condition",
                                    event.target.value,
                                  )
                                }
                              >
                                <option value="">Situação</option>
                                <option>OK</option>
                                <option>Atenção</option>
                                <option>Não OK</option>
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    </Collapse>
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
                        {activeAppointment && (
                          <div className="conference-required-card">
                            <div>
                              <b>Dados obrigatórios para finalizar</b>
                              <small>
                                Preencha ou confira estes dados sem precisar
                                voltar ao agendamento.
                              </small>
                            </div>
                            <div className="conference-required-grid">
                              <label>
                                Veículo
                                <input
                                  value={activeAppointment.vehicle}
                                  placeholder="Informe o veículo"
                                  onChange={(e) =>
                                    updateRequiredVehicleField(
                                      "vehicle",
                                      e.target.value,
                                    )
                                  }
                                />
                              </label>
                              <label>
                                Placa
                                <input
                                  value={activeAppointment.plate}
                                  placeholder="Informe a placa"
                                  onChange={(e) =>
                                    updateRequiredVehicleField(
                                      "plate",
                                      e.target.value,
                                    )
                                  }
                                />
                              </label>
                              <label>
                                KM
                                <input
                                  value={activeAppointment.km}
                                  inputMode="numeric"
                                  placeholder="Informe o KM"
                                  onChange={(e) =>
                                    updateRequiredVehicleField(
                                      "km",
                                      e.target.value,
                                    )
                                  }
                                />
                              </label>
                              <span className="conference-current-status">
                                <b>Status atual</b>
                                <strong>
                                  {processStatus === "Finalizado"
                                    ? completedAttendanceLabel(
                                        activeAppointment,
                                      )
                                    : "Em conferência"}
                                </strong>
                              </span>
                            </div>
                          </div>
                        )}
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
                          Abra “Finalização” e complete:{" "}
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
                          `Não é possível finalizar. Preencha nesta tela: ${missing.join(", ")}.`,
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
                          servicePrices,
                          manualServices,
                          proposalPaymentOptions,
                          patioNotes,
                          processStatus: "Finalizado",
                          internalReview:
                            activeAppointment.budget?.internalReview,
                        },
                        conference: {
                          checks,
                          geometry,
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
              setGeometry(activeAppointment.conference?.geometry ?? {});
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
        {(view === "relatorios" || view === "veiculos") && (
          <Reports
            data={appointments}
            user={user}
            initialMode={view === "veiculos" ? "andamento" : reportStartMode}
            open={(a: Appt) => {
              DISPLAY_APPT = a;
              setActiveAppointment(a);
              setEvaluator(a.tech ?? availableTechs[0] ?? "");
              setStatus(a.evaluation?.status ?? {});
              setQuoteItems(a.evaluation?.quoteItems ?? {});
              setCustom(a.evaluation?.custom ?? []);
              setEvaluationNotes(a.evaluation?.notes ?? {});
              setChecks(a.conference?.checks ?? {});
              setGeometry(a.conference?.geometry ?? {});
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
                setParts(sanitizeBudgetParts(a.budget.parts));
                setSelectedServices(a.budget.selectedServices ?? []);
                setServiceQty(a.budget.serviceQty ?? {});
                setServicePrices(a.budget.servicePrices ?? {});
                setManualServices(a.budget.manualServices ?? []);
                setProposalPaymentOptions(
                  a.budget.proposalPaymentOptions ?? { pix: true, card: true },
                );
                setPatioNotes(a.budget.patioNotes ?? "");
                setProcessStatus(a.budget.processStatus ?? "Em andamento");
              } else {
                setParts([]);
                setSelectedServices([]);
                setServiceQty({});
                setServicePrices({});
                setManualServices([]);
                setProposalPaymentOptions({ pix: true, card: true });
                setPatioNotes("");
                setProcessStatus("Em andamento");
              }
              setView(
                a.type === "revisao" && !a.review
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
            updateQuoteFollowUp={(id: number, changes: Partial<Appt>) => {
              const now = new Date().toISOString();
              syncBlockedUntil.current = Date.now() + 4000;
              setAppointments((list) =>
                list.map((appointment) =>
                  appointment.id === id
                    ? {
                        ...appointment,
                        ...changes,
                        quoteFollowUpUpdatedBy: user.displayName,
                        quoteFollowUpUpdatedAt: now,
                        lastEditedBy: user.displayName,
                        lastEditedAt: now,
                        _updatedAt: Date.now(),
                      }
                    : appointment,
                ),
              );
            }}
            message={setMessage}
          />
        )}{" "}
        {view === "compras" && (
          <PurchaseOrders
            appointments={appointments}
            checks={purchaseChecks}
            orderStates={purchaseOrderStates}
            currentUser={user.displayName}
            setChecks={(updater: any) => {
              syncBlockedUntil.current = Date.now() + 4000;
              setPurchaseChecks(updater);
            }}
            setOrderStates={(updater: any) => {
              syncBlockedUntil.current = Date.now() + 4000;
              setPurchaseOrderStates(updater);
            }}
            setWorkOrder={(ownerId: number, workOrder: string) => {
              syncBlockedUntil.current = Date.now() + 4000;
              setAppointments((list) =>
                list.map((appointment) =>
                  appointment.id === ownerId ||
                  appointment.sourceAppointmentId === ownerId
                    ? {
                        ...appointment,
                        workOrder,
                        lastEditedBy: user.displayName,
                        lastEditedAt: new Date().toISOString(),
                        _updatedAt: Date.now(),
                      }
                    : appointment,
                ),
              );
            }}
          />
        )}
        {view === "historico" && <History />}
        {view === "config" && (
          <Config
            user={user}
            techs={availableTechs}
            setTechs={(names: string[]) =>
              setTechs(
                names.filter(
                  (name) => name.trim().toLocaleLowerCase("pt-BR") !== "anna",
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
        {attendancePreview && (
          <AttendancePreviewModal
            appointment={
              appointments.find((item) => item.id === attendancePreview.id) ??
              attendancePreview
            }
            roundStep={roundStep}
            close={() => setAttendancePreview(null)}
          />
        )}
        {evaluationEntry && (
          <EvaluationStartModal
            appointment={evaluationEntry}
            techs={availableTechs}
            currentUser={user.displayName}
            close={() => setEvaluationEntry(null)}
            proceed={({
              evaluator: selectedEvaluator,
              startedAt,
              vehicle,
              plate,
              evaluateParts,
            }: any) => {
              syncBlockedUntil.current = Date.now() + 4000;
              const skipPartsEvaluation = evaluateParts === "nao";
              const opened: Appt = {
                ...evaluationEntry,
                vehicle: vehicle.trim(),
                plate: plate.trim().toLocaleUpperCase("pt-BR"),
                tech: selectedEvaluator,
                startedAt,
                status: skipPartsEvaluation
                  ? "avaliou"
                  : evaluationEntry.status,
                partsEvaluationSkipped: skipPartsEvaluation,
                inProgress: true,
                lastEditedBy: user.displayName,
                lastEditedAt: new Date().toISOString(),
                _updatedAt: Date.now(),
              };
              DISPLAY_APPT = opened;
              setActiveAppointment(opened);
              setAppointments((list) =>
                list.map((item) => (item.id === opened.id ? opened : item)),
              );
              setEvaluator(selectedEvaluator);
              setStarted(startedAt);
              setStatus(opened.evaluation?.status ?? {});
              setQuoteItems(opened.evaluation?.quoteItems ?? {});
              setCustom(opened.evaluation?.custom ?? []);
              setEvaluationNotes(opened.evaluation?.notes ?? {});
              setChecks(opened.conference?.checks ?? {});
              setGeometry(opened.conference?.geometry ?? {});
              setFinalization(
                opened.conference?.finalization ?? {
                  serviceCompleted: false,
                  vehicleReleased: false,
                  clientOriented: false,
                  note: "",
                  technician: selectedEvaluator,
                  executor: "",
                  checker: "",
                },
              );
              if (opened.budget) {
                setParts(sanitizeBudgetParts(opened.budget.parts));
                setSelectedServices(opened.budget.selectedServices ?? []);
                setServiceQty(opened.budget.serviceQty ?? {});
                setServicePrices(opened.budget.servicePrices ?? {});
                setManualServices(opened.budget.manualServices ?? []);
                setProposalPaymentOptions(
                  opened.budget.proposalPaymentOptions ?? {
                    pix: true,
                    card: true,
                  },
                );
                setPatioNotes(opened.budget.patioNotes ?? "");
                setProcessStatus(opened.budget.processStatus ?? "Em andamento");
              } else {
                setParts([]);
                setSelectedServices([]);
                setServiceQty({});
                setServicePrices({});
                setManualServices([]);
                setProposalPaymentOptions({ pix: true, card: true });
                setPatioNotes("");
                setProcessStatus("Em andamento");
              }
              setCheckOpen(false);
              setPartsOpen(false);
              setServicesOpen(skipPartsEvaluation);
              setEvaluationEntry(null);
              setView(skipPartsEvaluation ? "orcamento" : "avaliacao");
              scrollTo(0, 0);
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
          servicePrices={servicePrices}
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
  const n = (
    { avaliacao: 1, orcamento: 2, proposta: 3, torque: 4 } as Partial<
      Record<View, number>
    >
  )[view] ?? 1;
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
  exit,
  save,
  savedAt,
}: any) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
      "idle",
    ),
    handleSave = () => {
      if (saveState === "saving") return;
      setSaveState("saving");
      save();
      window.setTimeout(() => setSaveState("saved"), 900);
      window.setTimeout(() => setSaveState("idle"), 3000);
    },
    saveLabel =
      saveState === "saving"
        ? "Salvando…"
        : saveState === "saved"
          ? "Salvo ✓"
          : "Salvar";
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
      <button
        className={saveState === "saved" ? "save-confirmed" : ""}
        onClick={handleSave}
        disabled={saveState === "saving"}
      >
        {saveLabel}
      </button>
      <button className="stage-exit" onClick={exit}>
        Sair para a agenda
      </button>
      <div className="stage-bottom-actions">
        <button className="stage-exit-bottom" onClick={exit}>
          Sair
        </button>
        <button
          className="stage-save-bottom"
          onClick={handleSave}
          disabled={saveState === "saving"}
          aria-label={`Salvar ${label}`}
        >
          {saveLabel}
        </button>
      </div>
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
      {items.map((x: string) => {
        const checked = tri ? !!vals[x + "-ok"] : !!vals[x],
          notApplicable = tri ? !!vals[x + "-na"] : false;
        return (
        <div
          key={x}
          className={
            checked
              ? "conference-row-selected conference-row-checked"
              : notApplicable
                ? "conference-row-selected conference-row-na"
                : ""
          }
          style={
            checked
              ? {
                  background: "#e7f7ee",
                  boxShadow: "inset 5px 0 #159957",
                }
              : notApplicable
                ? {
                    background: "#fff6dd",
                    boxShadow: "inset 5px 0 #e0a11a",
                  }
                : undefined
          }
        >
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
        );
      })}
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
  preview,
  markNoShow,
  remove,
  message,
}: any) {
  const today = new Date(),
    todayIso = iso(today);
  const [date, setDate] = useState(todayIso),
    [cursor, setCursor] = useState(
      new Date(today.getFullYear(), today.getMonth(), 1),
    ),
    [mode, setMode] = useState<"dia" | "semana" | "mes">(() => {
      if (typeof window === "undefined") return "mes";
      const savedMode = localStorage.getItem("monocenter-calendar-mode");
      return savedMode === "dia" ||
        savedMode === "semana" ||
        savedMode === "mes"
        ? savedMode
        : "mes";
    }),
    [openCal, setOpenCal] = useState(true),
    [showSaturday, setShowSaturday] = useState(false),
    [showOngoingVehicles, setShowOngoingVehicles] = useState(false),
    [expandedAppointments, setExpandedAppointments] = useState<number[]>([]);
  useEffect(() => {
    localStorage.setItem("monocenter-calendar-mode", mode);
  }, [mode]);
  const carryLimitIso = todayIso,
    isBusinessDay = (targetDate: string) => {
      const weekday = new Date(`${targetDate}T12:00:00`).getDay();
      return (
        weekday >= 1 &&
        weekday <= 5 &&
        !holidays.some((holiday: any) => holiday.date === targetDate)
      );
    },
    isCarriedInto = (appointment: Appt, targetDate: string) =>
      appointment.type !== "bloqueio" &&
      !!appointment.inProgress &&
      appointment.budget?.processStatus !== "Finalizado" &&
      appointment.date < targetDate &&
      targetDate <= carryLimitIso &&
      isBusinessDay(targetDate),
    appointmentsForDate = (targetDate: string) =>
      (data as Appt[]).filter(
        (appointment) =>
          appointment.date === targetDate ||
          isCarriedInto(appointment, targetDate),
      );
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
  const isOngoingVehicle = (appointment: Appt) =>
      appointment.type !== "bloqueio" &&
      !!appointment.inProgress &&
      appointment.budget?.processStatus !== "Finalizado",
    selectedDayAppointments =
      mode === "semana"
        ? (data as Appt[]).filter((appointment) => appointment.date === date)
        : appointmentsForDate(date),
    ongoingVehicles = (data as Appt[]).filter(isOngoingVehicle),
    dayAppointments = Array.from(
      new Map(
        [
          ...selectedDayAppointments.filter(
            (appointment) => !isOngoingVehicle(appointment),
          ),
          ...ongoingVehicles,
        ].map((appointment) => [appointment.id, appointment]),
      ).values(),
    ),
    list = [...dayAppointments].sort((first, second) => {
      const groupDifference =
        Number(isOngoingVehicle(first)) - Number(isOngoingVehicle(second));
      if (groupDifference !== 0) return groupDifference;
      if (isOngoingVehicle(first) && isOngoingVehicle(second)) {
        const dateDifference = second.date.localeCompare(first.date);
        if (dateDifference !== 0) return dateDifference;
      }
      return (
        first.time.localeCompare(second.time, "pt-BR", { numeric: true }) ||
        first.client.localeCompare(second.client, "pt-BR")
      );
    }),
    ongoingVehicleCount = ongoingVehicles.length,
    openQuotesCount = (data as Appt[]).filter(
      (a) =>
        a.type === "cliente" &&
        a.status === "avaliou" &&
        a.quoteFollowUpDecision !== "declined" &&
        !a.serviceAppointmentId &&
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
  const weekStartHour = 7,
    weekEndHour = 20,
    weekHourHeight = 116,
    weekHours = Array.from(
      { length: weekEndHour - weekStartHour + 1 },
      (_, index) => weekStartHour + index,
    ),
    appointmentMinute = (time?: string) => {
      const [hour, minute] = String(time || "").split(":").map(Number);
      return Number.isFinite(hour) && Number.isFinite(minute)
        ? hour * 60 + minute
        : weekStartHour * 60;
    },
    visibleWeekDays = calendarDays.filter(
      (day) => day.getDay() !== 0 && (showSaturday || day.getDay() !== 6),
    ),
    appointmentKindLabel = (appointment: Appt) => {
      if (appointment.type === "revisao") return "Revisão 30 dias";
      if (appointment.type === "retorno") return "Retorno";
      if (appointment.type === "garantia") return "Garantia";
      if (appointment.type === "bloqueio") return "Ausente";
      if (appointment.serviceScheduled) return "Serviço agendado";
      if (appointment.status === "avaliou") return "Orçamento";
      if (appointment.status === "servico") return "Serviço aprovado";
      return "Agendamento";
    };
  const weeklyProgressLabel = (appointment: Appt) => {
      if (appointment.budget?.processStatus === "Finalizado")
        return "Finalizado";
      if (appointment.status === "faltou") return "Faltou";
      if (appointment.inProgress || appointment.status === "servico")
        return "Em andamento";
      return "";
    },
    weeklyBudgetTypeLabel = (appointment: Appt) => {
      if (
        appointment.type === "revisao" ||
        appointment.type === "retorno" ||
        appointment.type === "garantia"
      )
        return "";
      const scheduledTypeLabels: Record<string, string> = {
        gabaritagem: "Orçamento: gabaritagem",
        pecas: "Orçamento: peças",
        alinhamento_3d: "Alinhamento 3D",
        alinhamento_balanceamento: "Alinhamento e balanceamento",
        servicos: "Orçamento: serviços",
      };
      if (appointment.appointmentServiceType)
        return scheduledTypeLabels[appointment.appointmentServiceType] ?? "";
      const budget = appointment.budget;
      if (!budget) return "";
      const selectedNames = (budget.selectedServices ?? [])
          .map((index) => SERVICES[index]?.[0] ?? "")
          .filter(Boolean),
        manualServices = budget.manualServices ?? [],
        manualNames = manualServices
          .map((service: any) => String(service?.name ?? "").trim())
          .filter(Boolean),
        serviceNames = [...selectedNames, ...manualNames],
        hasGabaritagem =
          (budget.selectedServices ?? []).some((index) => index >= 10) ||
          manualServices.some(isGabaritagemManualService),
        hasParts = (budget.parts ?? []).some(
          (part: any) =>
            String(part?.item ?? part?.name ?? "").trim() &&
            Number(part?.qty ?? 1) > 0,
        ),
        onlyAlignmentAndBalance =
          serviceNames.length > 0 &&
          serviceNames.every((name) =>
            /alinhamento de direção|balanceamento/i.test(name),
          );
      if (hasGabaritagem) return "Orçamento: gabaritagem";
      if (hasParts) return "Orçamento: peças";
      if (onlyAlignmentAndBalance) return "Alinhamento e balanceamento";
      if (serviceNames.length) return "Orçamento: serviços";
      return "";
    },
    teamAgendaDate = (() => {
      const next = new Date(today);
      if (next.getDay() === 5) {
        const saturday = new Date(next);
        saturday.setDate(next.getDate() + 1);
        const hasSaturdayAppointments = (data as Appt[]).some(
          (appointment) =>
            appointment.type !== "bloqueio" &&
            appointment.date === iso(saturday),
        );
        next.setDate(next.getDate() + (hasSaturdayAppointments ? 1 : 3));
      } else if (next.getDay() === 6) {
        next.setDate(next.getDate() + 2);
      } else if (next.getDay() === 0) {
        next.setDate(next.getDate() + 1);
      } else {
        next.setDate(next.getDate() + 1);
      }
      return next;
    })(),
    teamAgendaRows = (data as Appt[])
      .filter(
        (appointment) =>
          appointment.type !== "bloqueio" &&
          appointment.date === iso(teamAgendaDate),
      )
      .sort(
        (first, second) =>
          first.time.localeCompare(second.time) ||
          first.client.localeCompare(second.client, "pt-BR"),
      ),
    teamAgendaLabel = teamAgendaDate.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    }),
    teamAgendaMessage = [
      `*AGENDA MONOCENTER - ${teamAgendaDate
        .toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .toLocaleUpperCase("pt-BR")}*`,
      "",
      ...(teamAgendaRows.length
        ? teamAgendaRows.map((appointment) =>
            [
              `*${appointment.time} - ${appointment.client}*`,
              `${appointment.vehicle || "Veículo não informado"}${appointment.plate ? ` - ${appointment.plate}` : ""}`,
              `Situação: ${weeklyProgressLabel(appointment) || appointmentKindLabel(appointment)}`,
              weeklyBudgetTypeLabel(appointment)
                ? `Tipo: ${weeklyBudgetTypeLabel(appointment)}`
                : "",
              appointment.note ? `Observação: ${appointment.note}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
          )
        : ["Nenhum agendamento para este dia."]),
    ].join("\n\n");
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
      <style>{`
        .agenda-grid-semana{grid-template-columns:minmax(0,1fr) 430px!important;align-items:stretch}
        .agenda-grid-semana>.calendar,.agenda-grid-semana>.day{align-self:stretch;margin-top:0}
        .agenda-grid-semana>.day{position:relative;top:auto;height:auto;max-height:none;overflow-y:visible}
        .calendar-semana{overflow-x:auto!important;padding:0!important}
        .week-timeline{min-width:760px;overflow:hidden;border-radius:11px}
        .week-timeline-head{display:grid!important;grid-template-columns:54px repeat(var(--week-days),minmax(100px,1fr));position:sticky;top:0;z-index:5;min-height:66px;border-bottom:1px solid #cfd8e3;background:#fff}
        .week-time-zone{display:flex;align-items:flex-end;justify-content:center;padding:0 4px 9px;color:#64748b;font-size:9px;font-weight:800}
        .week-timeline-head button{display:flex!important;min-width:0;border:0!important;border-left:1px solid #e1e7ee!important;border-radius:0!important;background:#fff!important;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#172033!important}
        .week-timeline-head button small{text-transform:uppercase;font-size:9px;font-weight:800}
        .week-timeline-head button b{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;font-size:20px}
        .week-timeline-head button.today b{background:#2563eb;color:#fff}
        .week-timeline-head button.selected:not(.today){background:#fff6f6!important}
        .week-timeline-head button em{max-width:100%;overflow:hidden;color:#c51d25;font-size:8px;font-style:normal;text-overflow:ellipsis;white-space:nowrap}
        .week-timeline-body{position:relative!important;min-width:760px;background:repeating-linear-gradient(to bottom,transparent 0,transparent 115px,#dbe3ec 115px,#dbe3ec 116px)}
        .week-time-column{position:absolute!important;inset:0 auto 0 0;width:54px;background:#fff}
        .week-time-column span{position:absolute!important;right:8px;z-index:2;padding:0 2px;transform:translateY(-50%);background:#fff;color:#475569;font-size:10px;line-height:1}
        .week-day-columns{display:grid!important;height:100%;margin-left:54px;grid-template-columns:repeat(var(--week-days),minmax(100px,1fr))}
        .week-day-column{position:relative!important;min-width:0;border-left:1px solid #dbe3ec;cursor:pointer}
        .week-day-column.selected{background:rgba(227,27,35,.025);box-shadow:inset 0 0 0 2px rgba(227,27,35,.45)}
        .week-appointment{display:grid!important;position:absolute!important;right:4px;left:4px;z-index:3;min-height:64px;max-height:66px;overflow:hidden;border-left:4px solid #e31b23;border-radius:5px;padding:5px 6px;background:#fff0f0;align-content:start;grid-template-columns:auto minmax(0,1fr) auto;gap:2px 5px;color:#172033;font-size:9px;line-height:1.15;text-align:left;box-shadow:0 1px 3px rgba(15,23,42,.12)}
        .week-appointment>b{font-size:9px;white-space:nowrap}.week-appointment>strong{min-width:0;overflow:hidden;font-size:11px;text-overflow:ellipsis;white-space:nowrap}.week-appointment>small{grid-column:1/-1;min-width:0;overflow:hidden;color:#526274;font-size:9px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}.week-appointment>i{color:#087d47;font-style:normal;font-weight:900}
        .week-appointment>.week-appointment-status{color:#334155;font-size:8px;font-weight:900;letter-spacing:.03em;text-transform:uppercase}.week-appointment>.status-finalizado{color:#087d47}.week-appointment>.status-faltou{color:#c51d25}.week-appointment>.status-em-andamento{color:#1d4ed8}
        .week-appointment>.week-budget-type{color:#7c2d12;font-size:8px;font-weight:900;text-transform:uppercase}
        .day article .appointment-service-type{display:block;margin-top:3px;color:#7c2d12;font-size:10px;font-weight:900;text-transform:uppercase}
        .week-appointment.avaliou{border-left-color:#e7aa18;background:#fff9e8}.week-appointment.servico{border-left-color:#1b9b59;background:#ecf8f1}.week-appointment.inprogress{border-left-color:#2f74c0;background:#edf5ff}.week-appointment.conference{border-left-color:#7c3aed;background:#f5f0ff}.week-appointment.block{border-left-color:#64748b;background:#edf1f5}.week-appointment.retorno{border-left-color:#7c3aed;background:#f4efff}.week-appointment.revisao{border-left-color:#2563eb;background:#edf4ff}.week-appointment.garantia{border-left-color:#e77718;background:#fff1e5}.week-appointment.completed{border-left-color:#0891b2;background:#cffafe;color:#164e63}.week-appointment.scheduled-service{border-left-color:#4f46e5;background:#eef2ff;color:#312e81}.week-appointment.vehicle-in-shop{border-right:4px solid #009c9c}
        .week-appointment.faltou,.days span.faltou,.day article.faltou{border-color:#d71920!important;border-left:5px solid #d71920!important;background:#ffe5e7!important;color:#7f1d1d!important;box-shadow:inset 0 0 0 1px #f5a3a8!important}.day article.faltou p,.day article.faltou span>small{color:#8f1f27!important}.day article.faltou .appointment-stage{display:inline-flex;width:max-content;margin-top:5px;border-radius:999px;padding:3px 8px;background:#d71920!important;color:#fff!important;font-weight:900}.appointment-actions .no-show-action{border-color:#d71920;background:#fff1f2;color:#b30f19}.appointment-actions .no-show-action.undo{border-color:#64748b;background:#f1f5f9;color:#334155}
        .app.dark .week-appointment.faltou,.app.dark .days span.faltou,.app.dark .day article.faltou{background:#4d171b!important;color:#fff!important}.app.dark .day article.faltou p,.app.dark .day article.faltou span>small{color:#ffd7da!important}
        .week-appointment.review-30-days.completed,.days span.review-30-days.completed,.day article.review-30-days.completed{border-left-color:#7c3aed!important;background:#f4efff!important;color:#312e81!important;box-shadow:inset 0 0 0 1px #c4b5fd!important}.day article.review-30-days.completed p,.day article.review-30-days.completed span>small{color:#4c3a76!important}.app.dark .week-appointment.review-30-days.completed,.app.dark .days span.review-30-days.completed,.app.dark .day article.review-30-days.completed{border-left-color:#a78bfa!important;background:#f4efff!important;color:#312e81!important;box-shadow:inset 0 0 0 1px #c4b5fd!important}
        .team-agenda-reminder{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 10px;padding:10px 12px;border:1px solid #b8d5ff;border-radius:9px;background:#eef6ff}.team-agenda-reminder span{display:grid;gap:2px}.team-agenda-reminder small{color:#2563eb;font-size:10px;font-weight:900;text-transform:uppercase}.team-agenda-reminder b{font-size:13px;text-transform:capitalize}.team-agenda-reminder em{color:#526274;font-size:11px;font-style:normal}.team-agenda-reminder button{flex:0 0 auto;border:0;border-radius:7px;padding:8px 10px;background:#16864b;color:#fff;font-size:11px;font-weight:900}
        @media(min-width:1600px){.agenda{max-width:1600px!important}.agenda-grid-semana{grid-template-columns:minmax(0,1fr) 460px!important}.week-time-zone,.week-timeline-head button small{font-size:10px}.week-timeline-head button b{font-size:22px}.week-appointment{font-size:10px}.week-appointment>b{font-size:10px}.week-appointment>strong{font-size:12px}.week-appointment>small{font-size:10px}.week-appointment>.week-appointment-status,.week-appointment>.week-budget-type{font-size:9px}.week-time-column span{font-size:11px}.agenda-grid-semana .day article time>b{font-size:12px}.agenda-grid-semana .day article h3{font-size:13px}.agenda-grid-semana .day article p,.agenda-grid-semana .day article span>small{font-size:10px}.agenda-grid-semana .day article .appointment-toggle{font-size:11px!important}}
        @media(max-width:1500px){.agenda-grid-semana .agenda-finalization.compact{padding:6px 7px}.agenda-grid-semana .agenda-finalization.compact>b{display:block;font-size:11px!important;line-height:1.2;letter-spacing:-.04em;white-space:nowrap!important}}
        @media(max-width:1150px){.agenda-grid-semana{grid-template-columns:minmax(0,1fr)!important}.agenda-grid-semana>.day{position:static;max-height:none}.week-timeline,.week-timeline-body{min-width:680px}.week-timeline-head{grid-template-columns:50px repeat(var(--week-days),minmax(100px,1fr))}.week-day-columns{margin-left:50px;grid-template-columns:repeat(var(--week-days),minmax(100px,1fr))}.week-time-column{width:50px}}
      `}</style>
      <div className="agenda-brand">
        <b>Agenda Monocenter</b>
        <span>
          <i className="dot yellow" /> Aguardando orçamento{" "}
          <i className="dot green" /> Serviço aprovado{" "}
          <i className="dot conference-dot" /> Conferência{" "}
          <i className="dot red" /> Faltou <i className="dot purple" /> Retorno{" "}
          <i className="dot orange" /> Garantia <i className="dot blue" />{" "}
          Revisão 30 dias
          <i className="dot completed" /> Concluído
          <i className="dot scheduled-service-dot" /> Serviço agendado
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
          {mode === "semana" && (
            <button
              type="button"
              onClick={() => setShowSaturday((current) => !current)}
            >
              {showSaturday ? "Ocultar sábado" : "Mostrar sábado"}
            </button>
          )}
          <button onClick={() => setOpenCal(!openCal)}>
            {openCal ? "Ocultar calendário ⌃" : "Mostrar calendário ⌄"}
          </button>
          <button className="primary" onClick={add}>
            + Novo agendamento
          </button>
        </div>
      </div>
      <div
        className={`${openCal ? "aggrid" : "aggrid calendar-closed"} agenda-grid-${mode}`}
      >
        {openCal && (
          <div className={"calendar calendar-" + mode}>
            {mode === "semana" ? (
              <div
                className="week-timeline"
                style={{ "--week-days": visibleWeekDays.length } as any}
              >
                <div className="week-timeline-head">
                  <span className="week-time-zone">Horário</span>
                  {visibleWeekDays.map((d) => {
                    const ds = iso(d),
                      holiday = holidays.find((h: any) => h.date === ds);
                    return (
                      <button
                        type="button"
                        key={ds}
                        className={`${ds === date ? "selected" : ""}${ds === todayIso ? " today" : ""}`}
                        onClick={() => setDate(ds)}
                      >
                        <small>
                          {d
                            .toLocaleDateString("pt-BR", { weekday: "short" })
                            .replace(".", "")}
                        </small>
                        <b>{d.getDate()}</b>
                        {holiday && <em title={holiday.name}>{holiday.name}</em>}
                      </button>
                    );
                  })}
                </div>
                <div
                  className="week-timeline-body"
                  style={{
                    height: `${(weekEndHour - weekStartHour) * weekHourHeight}px`,
                  }}
                >
                  <div className="week-time-column">
                    {weekHours.map((hour) => (
                      <span
                        key={hour}
                        style={{ top: `${(hour - weekStartHour) * weekHourHeight}px` }}
                      >
                        {String(hour).padStart(2, "0")}:00
                      </span>
                    ))}
                  </div>
                  <div className="week-day-columns">
                    {visibleWeekDays.map((d) => {
                      const ds = iso(d),
                        apps = (data as Appt[]).filter(
                          (appointment) => appointment.date === ds,
                        );
                      return (
                        <div
                          className={`week-day-column${ds === date ? " selected" : ""}`}
                          key={ds}
                          onClick={() => setDate(ds)}
                        >
                          {[...apps]
                            .sort(
                              (first, second) =>
                                first.time.localeCompare(second.time) ||
                                first.client.localeCompare(second.client),
                            )
                            .map((a: Appt, appointmentIndex, sortedApps) => {
                            const stackedTops = sortedApps
                                .slice(0, appointmentIndex + 1)
                                .reduce<number[]>((tops, appointment, index) => {
                                  const minutes = appointmentMinute(
                                      appointment.time,
                                    ),
                                    naturalTop = Math.max(
                                      0,
                                      ((minutes - weekStartHour * 60) / 60) *
                                        weekHourHeight,
                                    ),
                                    previousTop = tops[index - 1];
                                  tops.push(
                                    index === 0
                                      ? naturalTop
                                      : Math.max(naturalTop, previousTop + 70),
                                  );
                                  return tops;
                                }, []),
                              top = stackedTops[stackedTops.length - 1] ?? 0;
                            return (
                              <span
                                className={`week-appointment ${apptClass(a)}${a.type === "revisao" && !a.reviewWithService ? " review-30-days" : ""}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}${isCarriedInto(a, ds) ? " carried-over" : ""}`}
                                key={a.id}
                                style={{
                                  top: `${top}px`,
                                }}
                                title={`${a.time} · ${a.client}${a.vehicle ? ` · ${a.vehicle}` : ""}`}
                              >
                                <b>{isCarriedInto(a, ds) ? "↳" : a.time}</b>
                                <strong>{a.client}</strong>
                                {a.quoteSentAt && <i>✓</i>}
                                <small>
                                  {a.vehicle || "Veículo não informado"} ·{" "}
                                  {appointmentKindLabel(a)}
                                </small>
                                {weeklyProgressLabel(a) && (
                                  <small
                                    className={`week-appointment-status status-${weeklyProgressLabel(a).toLocaleLowerCase("pt-BR").replaceAll(" ", "-")}`}
                                  >
                                    {weeklyProgressLabel(a)}
                                  </small>
                                )}
                                {weeklyBudgetTypeLabel(a) && (
                                  <small className="week-budget-type">
                                    {weeklyBudgetTypeLabel(a)}
                                  </small>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="week">
                  {weekLabels.map((x) => (
                    <b key={x}>{x}</b>
                  ))}
                </div>
                <div className="days">
                  {calendarDays.map((d) => {
                    const ds = iso(d),
                      apps = appointmentsForDate(ds),
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
                            className={`${apptClass(a)}${a.type === "revisao" && !a.reviewWithService ? " review-30-days" : ""}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}${isCarriedInto(a, ds) ? " carried-over" : ""}`}
                            key={a.id}
                          >
                            {isCarriedInto(a, ds) ? "↳ " : `${a.time} `}
                            {a.client.split(" ")[0]}
                            {a.quoteSentAt ? " ✓" : ""}
                          </span>
                        ))}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
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
          {date === todayIso && (
            <div className="team-agenda-reminder">
              <span>
                <small>Lembrete para a equipe</small>
                <b>{teamAgendaLabel}</b>
                <em>
                  {teamAgendaRows.length}{" "}
                  {teamAgendaRows.length === 1
                    ? "agendamento"
                    : "agendamentos"}
                </em>
              </span>
              <button type="button" onClick={() => message(teamAgendaMessage)}>
                Preparar WhatsApp
              </button>
            </div>
          )}
          {list.length === 0 && (
            <div className="emptyday">
              Nenhum agendamento. Clique em “Novo agendamento” para incluir.
            </div>
          )}
          {list.map((a: Appt, index: number) => {
            const expanded = expandedAppointments.includes(a.id);
            return (
              <Fragment key={a.id}>
                {isOngoingVehicle(a) &&
                  (index === 0 || !isOngoingVehicle(list[index - 1])) && (
                    <button
                      type="button"
                      className="day-group-heading ongoing"
                      onClick={() =>
                        setShowOngoingVehicles((current) => !current)
                      }
                      aria-expanded={showOngoingVehicles}
                    >
                      <span>
                        Veículos em andamento
                        <small>
                          {ongoingVehicleCount}{" "}
                          {ongoingVehicleCount === 1 ? "veículo" : "veículos"}
                        </small>
                      </span>
                      <strong>
                        {showOngoingVehicles
                          ? "Recolher ▲"
                          : "Mostrar veículos ▼"}
                      </strong>
                    </button>
                  )}
                {(!isOngoingVehicle(a) || showOngoingVehicles) && (
                  <article
                    className={`${a.type === "bloqueio" ? "absence" : apptClass(a)}${a.type === "revisao" && !a.reviewWithService ? " review-30-days" : ""}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}${isCarriedInto(a, date) ? " carried-over" : ""}`}
                  >
                <time>
                  <b>{a.time}</b>
                  <small>
                    {isCarriedInto(a, date)
                      ? "NA OFICINA"
                      : a.budget?.processStatus === "Finalizado"
                        ? "FINALIZADO"
                        : agendaStatusLabel(a)}
                  </small>
                  {expanded && a.type !== "bloqueio" && a.tech && (
                    <small className="card-tech">
                      {a.status === "avaliou" ? "Avaliado por" : "Téc."}{" "}
                      {a.tech}
                    </small>
                  )}
                  {expanded && a.type !== "bloqueio" && a.startedAt && (
                    <small className="card-start">Início: {a.startedAt}</small>
                  )}
                </time>
                <span>
                  <div className="appointment-heading">
                    <h3>{a.client}</h3>
                    <button
                      className="appointment-toggle"
                      onClick={() =>
                        setExpandedAppointments((current) =>
                          current.includes(a.id)
                            ? current.filter((id) => id !== a.id)
                            : [...current, a.id],
                        )
                      }
                      aria-expanded={expanded}
                      aria-label={
                        expanded
                          ? `Recolher atendimento de ${a.client}`
                          : `Ver atendimento completo de ${a.client}`
                      }
                      title={expanded ? "Recolher" : "Ver atendimento completo"}
                    >
                      {expanded ? "Recolher ▲" : "Ver detalhes ▼"}
                    </button>
                  </div>
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
                  {weeklyBudgetTypeLabel(a) && (
                    <small className="appointment-service-type">
                      {weeklyBudgetTypeLabel(a)}
                    </small>
                  )}
                  {isCarriedInto(a, date) && (
                    <small className="carry-over-notice">
                      ↳ Na oficina desde{" "}
                      {new Date(`${a.date}T12:00:00`).toLocaleDateString(
                        "pt-BR",
                      )}
                    </small>
                  )}
                  {a.budget?.processStatus === "Finalizado" ? (
                    <div className="agenda-finalization compact">
                      <b
                        style={{
                          display: "block",
                          fontSize: "clamp(8.5px, 0.72vw, 14px)",
                          letterSpacing: "-0.035em",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✓ {completedAttendanceLabel(a)}
                      </b>
                    </div>
                  ) : null}
                  {a.type === "cliente" &&
                    a.status === "avaliou" &&
                    a.quoteFollowUpDecision !== "declined" &&
                    !a.quoteSentAt &&
                    !a.serviceAppointmentId &&
                    a.budget?.processStatus !== "Finalizado" && (
                      <small className="quote-waiting">
                        {quoteWaitingLabel(a)}
                      </small>
                    )}
                  {a.quoteFollowUpDecision === "declined" && (
                    <small className="quote-waiting">
                      Cliente desistiu do serviço
                    </small>
                  )}
                  {a.quoteSentAt &&
                    a.budget?.processStatus !== "Finalizado" && (
                      <small className="quote-sent">
                        {a.status === "servico"
                          ? "✓ Orçamento aprovado"
                          : "✓ Orçamento enviado – EM ABERTO"}
                      </small>
                    )}
                  {a.budget?.processStatus !== "Finalizado" &&
                    !a.quoteSentAt &&
                    !(a.type === "cliente" && a.status === "avaliou") && (
                      <small className="appointment-stage">
                        {agendaStatusLabel(a)}
                      </small>
                    )}
                  {expanded && (
                    <div className="appointment-details">
                      {a.note && <small>{a.note}</small>}
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
                          Avaliação registrada no sistema por{" "}
                          {a.evaluationRecordedBy}
                          {a.evaluationRecordedAt
                            ? ` em ${new Date(
                                a.evaluationRecordedAt,
                              ).toLocaleString("pt-BR", {
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
                            ? ` em ${new Date(a.budgetEditedAt).toLocaleString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}`
                            : ""}
                        </small>
                      )}
                      {a.lastEditedBy && (
                        <small className="schedule-meta">
                          Última edição por {a.lastEditedBy}
                        </small>
                      )}
                      {a.status === "faltou" && a.noShowMarkedBy && (
                        <small className="schedule-meta no-show-meta">
                          Falta registrada por {a.noShowMarkedBy}
                          {a.noShowMarkedAt
                            ? ` em ${new Date(a.noShowMarkedAt).toLocaleString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}`
                            : ""}
                        </small>
                      )}
                      {a.quoteSentAt && (
                        <small className="schedule-meta">
                          Enviado em{" "}
                          {new Date(a.quoteSentAt).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {a.quoteSentBy ? ` por ${a.quoteSentBy}` : ""}
                        </small>
                      )}
                    </div>
                  )}
                </span>
                {expanded && (
                  <div className="appointment-actions">
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
                    {a.type !== "bloqueio" && (
                      <button
                        className="summary-button"
                        onClick={() => preview(a)}
                      >
                        Visualizar resumo
                      </button>
                    )}
                    {a.type !== "bloqueio" &&
                      a.budget?.processStatus !== "Finalizado" &&
                      (a.status === "agendado" || a.status === "faltou") && (
                        <button
                          className={`no-show-action${a.status === "faltou" ? " undo" : ""}`}
                          onClick={() => markNoShow(a)}
                        >
                          {a.status === "faltou"
                            ? "Desfazer falta"
                            : "Cliente faltou"}
                        </button>
                      )}
                    <button onClick={() => edit(a)}>Editar</button>
                    <button className="danger" onClick={() => remove(a)}>
                      Excluir
                    </button>
                    {a.type !== "bloqueio" && a.status !== "faltou" && (
                      <button onClick={() => start(a)}>
                        {a.type === "revisao" && !a.review
                          ? "Abrir revisão →"
                          : a.type === "retorno" && a.status === "agendado"
                            ? "Abrir retorno →"
                            : a.type === "garantia" && a.status === "agendado"
                              ? "Abrir garantia →"
                              : a.budget?.processStatus === "Finalizado"
                                ? "Visualizar atendimento →"
                                : a.status === "servico"
                                  ? "Abrir conferência →"
                                  : a.serviceScheduled &&
                                      a.status === "agendado"
                                    ? "Iniciar serviço →"
                                    : a.status === "avaliou"
                                      ? "Abrir orçamento →"
                                      : "Abrir atendimento →"}
                      </button>
                    )}
                  </div>
                )}
                  </article>
                )}
              </Fragment>
            );
          })}
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
            <b>Veículos na oficina</b>
            <small>Aguardando avaliação, revisão ou conclusão</small>
          </span>
          <strong>{inProgressCount}</strong>
          <i>Ver veículos →</i>
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
function AttendancePreviewModal({ appointment, roundStep, close }: any) {
  const budget = appointment.budget as BudgetState | undefined,
    evaluationStates = Object.values(
      appointment.evaluation?.status ?? {},
    ) as string[],
    evaluatedCount = evaluationStates.filter(
      (state) => state && state !== "na",
    ).length,
    attentionCount = evaluationStates.filter(
      (state) => state === "y" || state === "r",
    ).length,
    partRows = (budget?.parts ?? []).filter(
      (part: any) => String(part?.item ?? part?.name ?? "").trim(),
    ),
    selectedServiceRows = (budget?.selectedServices ?? [])
      .map((index: number) => ({
        name: SERVICES[index]?.[0] ?? "Serviço",
        quantity: Number(budget?.serviceQty?.[index] ?? 1),
        value: servicePrice(index, budget?.servicePrices),
        courtesy: serviceIsCourtesy(index),
      }))
      .filter((service: any) => service.quantity > 0),
    manualServiceRows = (budget?.manualServices ?? [])
      .filter((service: any) => String(service?.name ?? "").trim())
      .map((service: any) => ({
        name: service.name,
        quantity: Number(service.qty ?? 1),
        value: Number(service.value ?? 0),
        courtesy: false,
      })),
    serviceRows = [...selectedServiceRows, ...manualServiceRows],
    partsTotal = partRows.reduce(
      (total: number, part: any) =>
        total + Number(part.qty ?? 1) * saleOf(part, roundStep),
      0,
    ),
    servicesTotal = serviceRows.reduce(
      (total: number, service: any) =>
        total +
        (service.courtesy ? 0 : service.quantity * Number(service.value ?? 0)),
      0,
    ),
    conferenceChecks = Object.values(
      appointment.conference?.checks ?? {},
    ).filter(Boolean).length,
    serviceTypeLabels: Record<string, string> = {
      gabaritagem: "Orçamento: gabaritagem",
      pecas: "Orçamento: peças",
      alinhamento_3d: "Alinhamento 3D",
      alinhamento_balanceamento: "Alinhamento e balanceamento",
      servicos: "Orçamento: serviços",
    },
    attendanceType =
      appointment.type === "revisao"
        ? "Revisão de 30 dias"
        : appointment.type === "retorno"
          ? "Retorno"
          : appointment.type === "garantia"
            ? "Garantia"
            : (appointment.appointmentServiceType
                ? serviceTypeLabels[appointment.appointmentServiceType]
                : "") ||
              "Atendimento comum",
    statusLabel =
      appointment.budget?.processStatus === "Finalizado"
        ? completedAttendanceLabel(appointment)
        : agendaStatusLabel(appointment),
    dateTime = (value?: string) =>
      value
        ? new Date(value).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Não registrado";

  return (
    <div className="backdrop attendance-preview-backdrop" role="presentation">
      <section
        className="modal attendance-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-preview-title"
      >
        <header className="attendance-preview-header">
          <span>
            <small>VISUALIZAÇÃO RÁPIDA</small>
            <h2 id="attendance-preview-title">Resumo do atendimento</h2>
            <p>
              {appointment.client} · {appointment.vehicle || "Veículo não informado"}
              {appointment.plate ? ` · ${appointment.plate}` : ""}
            </p>
          </span>
          <button className="attendance-preview-close" onClick={close} aria-label="Fechar">
            ×
          </button>
        </header>

        <div className="attendance-preview-badges">
          <b>{statusLabel}</b>
          <span>{attendanceType}</span>
          {appointment.workOrder && <span>OS {appointment.workOrder}</span>}
        </div>

        <div className="attendance-preview-grid">
          <section>
            <h3>Agendamento</h3>
            <p><b>Data e horário</b>{fmt(appointment.date)}, às {appointment.time}</p>
            <p><b>Contato</b>{appointment.phone || "Não informado"}</p>
            <p><b>Quilometragem</b>{appointment.km ? `${appointment.km} km` : "Não informada"}</p>
            <p><b>Agendado por</b>{appointment.scheduledBy || "Não informado"}</p>
            <p><b>Registro</b>{dateTime(appointment.createdAt)}</p>
          </section>
          <section>
            <h3>Abertura e avaliação</h3>
            <p><b>Início</b>{appointment.startedAt || "Não iniciado"}</p>
            <p><b>Técnico</b>{appointment.tech || "Não informado"}</p>
            <p>
              <b>Avaliação de peças</b>
              {appointment.partsEvaluationSkipped
                ? "Não realizada por opção do atendimento"
                : evaluatedCount
                  ? `${evaluatedCount} itens avaliados${attentionCount ? ` · ${attentionCount} com atenção` : ""}`
                  : "Ainda sem itens registrados"}
            </p>
            <p><b>Registrada por</b>{appointment.evaluationRecordedBy || "Não informado"}</p>
            <p><b>Data do registro</b>{dateTime(appointment.evaluationRecordedAt)}</p>
          </section>
        </div>

        <section className="attendance-preview-section">
          <div className="attendance-preview-section-title">
            <h3>Orçamento e serviços</h3>
            <strong>{brl(partsTotal + servicesTotal)}</strong>
          </div>
          {!partRows.length && !serviceRows.length ? (
            <p className="attendance-preview-empty">Nenhum item de orçamento foi preenchido.</p>
          ) : (
            <div className="attendance-preview-items">
              {partRows.map((part: any, index: number) => (
                <div key={`part-${index}`}>
                  <span><b>{Number(part.qty ?? 1)}x</b> {part.item ?? part.name}</span>
                  <strong>{brl(Number(part.qty ?? 1) * saleOf(part, roundStep))}</strong>
                </div>
              ))}
              {serviceRows.map((service: any, index: number) => (
                <div key={`service-${index}`}>
                  <span><b>{service.quantity}x</b> {service.name}</span>
                  <strong>
                    {service.courtesy
                      ? "Cortesia"
                      : brl(service.quantity * service.value)}
                  </strong>
                </div>
              ))}
            </div>
          )}
          <div className="attendance-preview-meta">
            <span>
              <b>Orçamento preenchido por</b>
              {appointment.budgetEditedBy || "Não informado"}
              {appointment.budgetEditedAt ? ` · ${dateTime(appointment.budgetEditedAt)}` : ""}
            </span>
            <span>
              <b>Envio ao cliente</b>
              {appointment.quoteSentAt
                ? `${dateTime(appointment.quoteSentAt)}${appointment.quoteSentBy ? ` por ${appointment.quoteSentBy}` : ""}`
                : "Ainda não registrado"}
            </span>
          </div>
        </section>

        <div className="attendance-preview-grid">
          <section>
            <h3>Conferência</h3>
            <p><b>Marcações registradas</b>{conferenceChecks}</p>
            <p><b>Situação</b>{appointment.conference?.finalizedAt ? "Finalizada" : "Em aberto"}</p>
            <p><b>Finalizada por</b>{appointment.conference?.finalizedBy || "Não informado"}</p>
            <p><b>Data</b>{dateTime(appointment.conference?.finalizedAt)}</p>
          </section>
          <section>
            <h3>Observações</h3>
            <p className="attendance-preview-note">
              {appointment.note || budget?.patioNotes || "Nenhuma observação registrada."}
            </p>
            {appointment.note && budget?.patioNotes && (
              <p className="attendance-preview-note"><b>Pátio</b>{budget.patioNotes}</p>
            )}
            <p><b>Última edição</b>{appointment.lastEditedBy || "Não informado"}</p>
            <p><b>Data</b>{dateTime(appointment.lastEditedAt)}</p>
          </section>
        </div>

        <footer className="attendance-preview-footer">
          <small>Consulta rápida — nenhuma informação é alterada nesta janela.</small>
          <button className="primary" onClick={close}>Fechar resumo</button>
        </footer>
      </section>
      <style>{`
        .attendance-preview-backdrop{z-index:1200;padding:20px;overflow:auto}
        .attendance-preview-modal{width:min(900px,100%);max-height:calc(100vh - 40px);overflow:auto;padding:0;border-radius:18px;background:var(--card,#fff)}
        .attendance-preview-header{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;gap:20px;padding:22px 24px 16px;background:var(--card,#fff);border-bottom:1px solid var(--line,#dce2ea)}
        .attendance-preview-header small{color:#df1823;font-weight:900;letter-spacing:.08em}
        .attendance-preview-header h2{margin:3px 0;font-size:24px}
        .attendance-preview-header p{margin:0;color:var(--muted,#5d6878)}
        .attendance-preview-close{flex:0 0 42px;height:42px;font-size:27px;line-height:1}
        .attendance-preview-badges{display:flex;flex-wrap:wrap;gap:8px;padding:16px 24px 0}
        .attendance-preview-badges>*{padding:7px 11px;border-radius:999px;background:#edf2f7;font-size:12px;text-transform:uppercase}
        .attendance-preview-badges b{background:#dff7e9;color:#08723c}
        .attendance-preview-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:14px 24px 0}
        .attendance-preview-grid>section,.attendance-preview-section{border:1px solid var(--line,#dce2ea);border-radius:13px;padding:16px;background:var(--card,#fff)}
        .attendance-preview-grid h3,.attendance-preview-section h3{margin:0 0 12px;font-size:16px}
        .attendance-preview-grid p{display:grid;grid-template-columns:145px 1fr;gap:8px;margin:7px 0;font-size:13px;line-height:1.4}
        .attendance-preview-grid p b{color:var(--muted,#5d6878)}
        .attendance-preview-section{margin:14px 24px 0}
        .attendance-preview-section-title{display:flex;align-items:center;justify-content:space-between;gap:15px}
        .attendance-preview-section-title strong{font-size:19px;color:#df1823}
        .attendance-preview-items{display:grid;gap:6px;margin-top:8px}
        .attendance-preview-items>div{display:flex;justify-content:space-between;gap:20px;padding:8px 10px;border-radius:8px;background:#f4f7fa;font-size:13px}
        .attendance-preview-items span{min-width:0;overflow-wrap:anywhere}
        .attendance-preview-items span b{margin-right:5px}
        .attendance-preview-items strong{white-space:nowrap}
        .attendance-preview-meta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line,#dce2ea)}
        .attendance-preview-meta span{font-size:12px;line-height:1.4}
        .attendance-preview-meta b{display:block;color:var(--muted,#5d6878)}
        .attendance-preview-empty{margin:6px 0;color:var(--muted,#5d6878)}
        .attendance-preview-note{display:block!important;padding:10px;border-radius:8px;background:#f4f7fa;white-space:pre-wrap}
        .attendance-preview-note b{display:block;margin-bottom:4px}
        .attendance-preview-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 24px 24px}
        .attendance-preview-footer small{color:var(--muted,#5d6878)}
        .attendance-preview-footer button{white-space:nowrap}
        .dark .attendance-preview-items>div,.dark .attendance-preview-note,.dark .attendance-preview-badges>*{background:#1c2938}
        @media(max-width:720px){
          .attendance-preview-backdrop{padding:8px}
          .attendance-preview-modal{max-height:calc(100vh - 16px)}
          .attendance-preview-header,.attendance-preview-badges,.attendance-preview-grid,.attendance-preview-footer{padding-left:14px;padding-right:14px}
          .attendance-preview-grid,.attendance-preview-meta{grid-template-columns:1fr}
          .attendance-preview-section{margin-left:14px;margin-right:14px}
          .attendance-preview-grid p{grid-template-columns:125px 1fr}
          .attendance-preview-footer{align-items:stretch;flex-direction:column}
        }
      `}</style>
    </div>
  );
}
function EvaluationStartModal({
  appointment,
  techs,
  currentUser,
  close,
  proceed,
}: any) {
  const now = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    [form, setForm] = useState({
      evaluateParts: "",
      evaluator: appointment.tech || techs[0] || "",
      startedAt: appointment.startedAt || now,
      vehicle: appointment.vehicle || "",
      plate: appointment.plate || "",
    });
  return (
    <div className="backdrop">
      <form
        className="modal evaluation-start-modal"
        onSubmit={(event) => {
          event.preventDefault();
          proceed(form);
        }}
      >
        <div>
          <span>
            <h2>Iniciar atendimento</h2>
            <p>Confirme os dados e escolha se haverá avaliação de peças.</p>
          </span>
          <button type="button" onClick={close} aria-label="Fechar">
            ×
          </button>
        </div>
        <div className="evaluation-start-client">
          <b>{appointment.client}</b>
          <small>
            Agendado para {appointment.time} · Preenchendo agora: {currentUser}
          </small>
        </div>
        <section>
          <label className="wide">
            Será feita avaliação de peças?
            <select
              required
              value={form.evaluateParts}
              onChange={(event) =>
                setForm({ ...form, evaluateParts: event.target.value })
              }
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim — abrir avaliação de peças</option>
              <option value="nao">
                Não — ir direto para orçamento de serviços
              </option>
            </select>
          </label>
          <label>
            {form.evaluateParts === "nao"
              ? "Responsável pelo atendimento"
              : "Quem está avaliando"}
            <select
              required
              value={form.evaluator}
              onChange={(event) =>
                setForm({ ...form, evaluator: event.target.value })
              }
            >
              <option value="">Selecione o avaliador</option>
              {techs.map((name: string) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Horário de início
            <input
              required
              type="time"
              value={form.startedAt}
              onChange={(event) =>
                setForm({ ...form, startedAt: event.target.value })
              }
            />
          </label>
          <label>
            Veículo
            <input
              required
              value={form.vehicle}
              placeholder="Informe o veículo"
              onChange={(event) =>
                setForm({ ...form, vehicle: event.target.value })
              }
            />
          </label>
          <label>
            Placa
            <input
              required
              value={form.plate}
              placeholder="Informe a placa"
              maxLength={8}
              onChange={(event) =>
                setForm({
                  ...form,
                  plate: event.target.value.toLocaleUpperCase("pt-BR"),
                })
              }
            />
          </label>
        </section>
        <p className="evaluation-start-help">
          {form.evaluateParts === "nao"
            ? "A dispensa da avaliação ficará registrada e o orçamento abrirá diretamente na parte de serviços."
            : "O avaliador ficará registrado separadamente do usuário que está preenchendo o sistema."}
        </p>
        <footer>
          <button type="button" onClick={close}>
            Cancelar
          </button>
          <button type="submit" className="primary">
            {form.evaluateParts === "nao"
              ? "Confirmar e abrir orçamento →"
              : "Confirmar e abrir avaliação →"}
          </button>
        </footer>
      </form>
    </div>
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
        vehicleBrand: "",
        vehicleColor: "",
        vehicleBody: "",
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
                  appointmentServiceType:
                    e.target.value === "cliente"
                      ? f.appointmentServiceType
                      : undefined,
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
          {f.type === "cliente" && (
            <label className="wide">
              Tipo do serviço previsto
              <select
                required
                value={f.appointmentServiceType || ""}
                onChange={(e) =>
                  setF({
                    ...f,
                    appointmentServiceType: e.target.value as
                      | "gabaritagem"
                      | "pecas"
                      | "alinhamento_3d"
                      | "alinhamento_balanceamento"
                      | "servicos",
                  })
                }
              >
                <option value="">Selecione o motivo do agendamento</option>
                <option value="gabaritagem">Orçamento: gabaritagem</option>
                <option value="pecas">Orçamento: peças</option>
                <option value="alinhamento_3d">Alinhamento 3D</option>
                <option value="alinhamento_balanceamento">
                  Alinhamento e balanceamento
                </option>
                <option value="servicos">
                  Orçamento: serviços — outro tipo
                </option>
              </select>
              <small>
                Esta informação aparecerá imediatamente na agenda dos
                técnicos.
              </small>
            </label>
          )}
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
            Modelo do veículo
            <input
              list="vehicle-model-list"
              value={f.vehicle}
              onChange={(e) => {
                const vehicle = e.target.value;
                const found = findVehicle(vehicle);
                setF({
                  ...f,
                  vehicle,
                  vehicleBrand: found?.[1] ?? f.vehicleBrand,
                  vehicleBody: found?.[2] ?? f.vehicleBody,
                });
              }}
              placeholder="Digite, por exemplo: Gol"
            />
            <datalist id="vehicle-model-list">
              {VEHICLE_CATALOG.map(([model, brand]) => (
                <option key={`${brand}-${model}`} value={model}>
                  {brand}
                </option>
              ))}
            </datalist>
            <small>Ao reconhecer o modelo, o sistema preenche a marca.</small>
          </label>
          <label>
            Marca
            <input
              value={f.vehicleBrand || ""}
              onChange={(e) => setF({ ...f, vehicleBrand: e.target.value })}
              placeholder="Ex.: Volkswagen"
            />
          </label>
          <label>
            Cor do veículo
            <input
              list="vehicle-color-list"
              value={f.vehicleColor || ""}
              onChange={(e) => setF({ ...f, vehicleColor: e.target.value })}
              placeholder="Ex.: Branco"
            />
            <datalist id="vehicle-color-list">
              {["Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul", "Verde", "Bege", "Marrom"].map((color) => (
                <option key={color} value={color} />
              ))}
            </datalist>
          </label>
          <label>
            Tipo do veículo
            <select
              value={f.vehicleBody || ""}
              onChange={(e) => setF({ ...f, vehicleBody: e.target.value })}
            >
              <option value="">Automóvel</option>
              <option>Hatch</option>
              <option>Sedã</option>
              <option>SUV</option>
              <option>Picape</option>
              <option>Van</option>
            </select>
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
  servicePrices,
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
    budgetApproved =
      a.status === "servico" || a.budget?.processStatus === "Finalizado",
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
        {budgetApproved && (
          <div className="print-approval-banner">✓ ORÇAMENTO APROVADO</div>
        )}
        <h3>Peças</h3>
        {parts.map((p: any, i: number) => (
          <div className="a4-line" key={i}>
            <b>{p.qty}x</b>
            <span>
              {p.item} - {p.brand}
              {budgetApproved && (
                <small className="print-approved">✓ APROVADO</small>
              )}
            </span>
            <em>{brl(p.qty * saleOf(p, roundStep))}</em>
          </div>
        ))}
        <h3>Serviços</h3>
        {selectedServices.map((i: number) => (
          <div className="a4-line" key={i}>
            <b>{serviceQty[i] ?? 0}x</b>
            <span>
              {SERVICES[i][0]}
              {budgetApproved && (
                <small className="print-approved">✓ APROVADO</small>
              )}
            </span>
            <em>
              {brl(servicePrice(i, servicePrices) * (serviceQty[i] ?? 0))}
            </em>
          </div>
        ))}
        {manualServices
          .filter((service: any) => service.name)
          .map((service: any, i: number) => (
            <div className="a4-line" key={`manual-budget-${i}`}>
              <b>{service.qty || 0}x</b>
              <span>
                {service.name}
                {budgetApproved && (
                  <small className="print-approved">✓ APROVADO</small>
                )}
              </span>
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
        <BudgetHead
          title="PROPOSTA DE ORÇAMENTO"
          approvalBadge={budgetApproved}
        />
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
        {budgetApproved && (
          <div className="print-approval-banner">✓ ORÇAMENTO APROVADO</div>
        )}
        <h3>Peças e materiais</h3>
        {parts.map((p: any, i: number) => (
          <div className="a4-line no-price" key={i}>
            <b>{p.qty}x</b>
            <span>
              {p.item} - {p.brand}
              {budgetApproved && (
                <small className="print-approved">✓ APROVADO</small>
              )}
            </span>
          </div>
        ))}
        <h3>Serviços</h3>
        {selectedServices.map((i: number) => (
          <div className="a4-line no-price" key={i}>
            <b>{serviceQty[i] ?? 0}x</b>
            <span>
              {SERVICES[i][0]}
              {budgetApproved && (
                <small className="print-approved">✓ APROVADO</small>
              )}
            </span>
          </div>
        ))}
        {manualServices
          .filter((service: any) => service.name)
          .map((service: any, i: number) => (
            <div className="a4-line no-price" key={`manual-proposal-${i}`}>
              <b>{service.qty || 0}x</b>
              <span>
                {service.name}
                {budgetApproved && (
                  <small className="print-approved">✓ APROVADO</small>
                )}
              </span>
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
function BudgetHead({
  title,
  approvalBadge = false,
}: {
  title: string;
  approvalBadge?: boolean;
}) {
  return (
    <header className="a4-head budget-head">
      <img src="/logo-monocenter.jpg" alt="Monocenter" />
      <div>
        <h1>MONOCENTER ALINHAMENTO TÉCNICO</h1>
        <p>Av. Itavuvu, 5341 - Jd. Santa Cecília - Sorocaba/SP</p>
        <p>WhatsApp (15) 99657-4741</p>
        <h2>{title}</h2>
      </div>
      <strong className={approvalBadge ? "approval-head-badge" : ""}>
        {approvalBadge ? "APROVADO 👍" : DISPLAY_APPT.plate || "SEM PLACA"}
      </strong>
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

function PurchaseOrders({
  appointments,
  checks,
  setChecks,
  orderStates,
  setOrderStates,
  setWorkOrder,
  currentUser,
}: any) {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all"),
    [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const rows = useMemo(() => {
    const unique = new Map<string, any>();
    for (const appointment of appointments as Appt[]) {
      if (
        !appointment.budget ||
        appointment.budget.processStatus === "Finalizado" ||
        appointment.status === "faltou" ||
        (appointment.status !== "servico" && !appointment.serviceScheduled)
      )
        continue;
      const ownerId = appointment.sourceAppointmentId ?? appointment.id;
      appointment.budget.parts.forEach((part: any, index: number) => {
        if (!part.item?.trim() || Number(part.qty) <= 0) return;
        const key = `${ownerId}:${index}`;
        if (!unique.has(key))
          unique.set(key, {
            key,
            ownerId,
            appointment,
            part,
            serviceDate:
              appointment.serviceScheduledFor || appointment.date || "",
          });
      });
    }
    return [...unique.values()].sort((a, b) => {
      const aState = checks[a.key]?.received
          ? 2
          : checks[a.key]?.ordered
            ? 1
            : 0,
        bState = checks[b.key]?.received ? 2 : checks[b.key]?.ordered ? 1 : 0;
      return (
        aState - bState ||
        a.serviceDate.localeCompare(b.serviceDate) ||
        a.part.item.localeCompare(b.part.item, "pt-BR")
      );
    });
  }, [appointments, checks]);
  const itemCounts = {
      pending: rows.filter((row) => !checks[row.key]?.ordered).length,
      ordered: rows.filter(
        (row) => checks[row.key]?.ordered && !checks[row.key]?.received,
      ).length,
      received: rows.filter((row) => checks[row.key]?.received).length,
    },
    allGroups = rows.reduce((result: any[], row: any) => {
      let group = result.find((item) => item.ownerId === row.ownerId);
      if (!group) {
        group = {
          ownerId: row.ownerId,
          appointment: row.appointment,
          serviceDate: row.serviceDate,
          rows: [],
        };
        result.push(group);
      }
      group.rows.push(row);
      return result;
    }, []),
    groups = allGroups
      .map((group: any) => {
        const savedState: PurchaseOrderState = orderStates[group.ownerId] ?? {
            closed: false,
          },
          allReceived =
            group.rows.length > 0 &&
            group.rows.every((row: any) => checks[row.key]?.received),
          totalQuantity = group.rows.reduce(
            (total: number, row: any) => total + (Number(row.part.qty) || 0),
            0,
          );
        return { ...group, savedState, allReceived, totalQuantity };
      })
      .filter((group: any) => {
        if (filter === "open") return !group.savedState.closed;
        if (filter === "closed") return group.savedState.closed;
        return true;
      })
      .sort(
        (a: any, b: any) =>
          Number(a.savedState.closed) - Number(b.savedState.closed) ||
          a.serviceDate.localeCompare(b.serviceDate),
      ),
    orderCounts = {
      all: allGroups.length,
      open: allGroups.filter(
        (group: any) => !orderStates[group.ownerId]?.closed,
      ).length,
      closed: allGroups.filter(
        (group: any) => orderStates[group.ownerId]?.closed,
      ).length,
    },
    update = (
      ownerId: number,
      key: string,
      patch: Partial<PurchaseCheck>,
    ) => {
      setChecks((current: Record<string, PurchaseCheck>) => {
        const previous = current[key];
        return {
          ...current,
          [key]: {
            ...previous,
            ...patch,
            ordered: patch.ordered ?? previous?.ordered ?? false,
            received: patch.received ?? previous?.received ?? false,
            note: patch.note ?? previous?.note ?? "",
            updatedAt: new Date().toISOString(),
          },
        };
      });
      if (orderStates[ownerId]?.closed)
        setOrderStates(
          (current: Record<string, PurchaseOrderState>) => ({
            ...current,
            [ownerId]: { closed: false },
          }),
        );
    },
    closeOrder = (ownerId: number) => {
      setOrderStates((current: Record<string, PurchaseOrderState>) => ({
        ...current,
        [ownerId]: {
          closed: true,
          closedAt: new Date().toISOString(),
          closedBy: currentUser,
        },
      }));
      setExpanded((current) => ({ ...current, [ownerId]: false }));
    },
    reopenOrder = (ownerId: number) => {
      setOrderStates((current: Record<string, PurchaseOrderState>) => ({
        ...current,
        [ownerId]: { closed: false },
      }));
      setExpanded((current) => ({ ...current, [ownerId]: true }));
    };
  return (
    <section className="page purchase-page">
      <div className="purchase-summary">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Todos os pedidos <b>{orderCounts.all}</b>
        </button>
        <button
          className={filter === "open" ? "active pending" : ""}
          onClick={() => setFilter("open")}
        >
          Pedidos abertos <b>{orderCounts.open}</b>
        </button>
        <button
          className={filter === "closed" ? "active received" : ""}
          onClick={() => setFilter("closed")}
        >
          Pedidos fechados <b>{orderCounts.closed}</b>
        </button>
      </div>
      <div className="purchase-guidance">
        <b>Conferência do pedido</b>
        <span>
          Primeiro marque “Comprado”. Quando a peça chegar, marque “Recebido e
          conferido”. Depois clique em “Salvar e fechar pedido”.
        </span>
        <small className="purchase-item-totals">
          Peças: <b>{itemCounts.pending}</b> a comprar · <b>{itemCounts.ordered}</b>{" "}
          compradas · <b>{itemCounts.received}</b> conferidas
        </small>
      </div>
      {groups.length === 0 ? (
        <div className="emptyday">
          Nenhum pedido encontrado nesta situação. Os itens aparecerão após o
          orçamento ser aprovado ou o serviço ser agendado.
        </div>
      ) : (
        <div className="purchase-os-list">
          {groups.map((group: any) => {
            const isClosed = group.savedState.closed,
              isExpanded = expanded[group.ownerId] ?? !isClosed,
              pendingToClose = group.rows.filter(
                (row: any) => !checks[row.key]?.received,
              ).length;
            return (
            <section
              className={`purchase-os-card ${isClosed ? "closed" : "open"}`}
              key={group.ownerId}
            >
              <button
                type="button"
                className="purchase-os-summary"
                aria-expanded={isExpanded}
                onClick={() =>
                  setExpanded((current) => ({
                    ...current,
                    [group.ownerId]: !isExpanded,
                  }))
                }
              >
                <span className="purchase-os-chevron">
                  {isExpanded ? "▾" : "▸"}
                </span>
                <span>
                  <small>OS</small>
                  <b>{group.appointment.workOrder || "Sem número"}</b>
                </span>
                <span className="purchase-os-customer">
                  <small>Cliente / veículo</small>
                  <b>
                    {group.appointment.client} ·{" "}
                    {group.appointment.vehicle || "Veículo não informado"} ·{" "}
                    {group.appointment.plate || "Sem placa"}
                  </b>
                </span>
                <span>
                  <small>Resumo</small>
                  <b>
                    {group.rows.length} {group.rows.length === 1 ? "item" : "itens"}
                    {" · "}{group.totalQuantity} peças
                  </b>
                </span>
                <strong className={`purchase-order-badge ${isClosed ? "closed" : "open"}`}>
                  {isClosed ? "FECHADO" : "ABERTO"}
                </strong>
              </button>
              {isExpanded && (
                <>
              <header className="purchase-os-head">
                <label>
                  <span>Número da OS</span>
                  <input
                    value={group.appointment.workOrder ?? ""}
                    placeholder="Digite a OS"
                    onChange={(event) =>
                      setWorkOrder(group.ownerId, event.target.value)
                    }
                  />
                </label>
                <span>
                  <small>Cliente / veículo</small>
                  <b>
                    {group.appointment.client} ·{" "}
                    {group.appointment.vehicle || "Veículo não informado"} ·{" "}
                    {group.appointment.plate || "Sem placa"}
                  </b>
                </span>
                <span>
                  <small>Data do serviço</small>
                  <b>
                    {group.serviceDate
                      ? new Date(
                          `${group.serviceDate}T12:00:00`,
                        ).toLocaleDateString("pt-BR")
                      : "Não informada"}
                  </b>
                </span>
              </header>
              <div className="purchase-os-columns" aria-hidden="true">
                <b>Peça / fornecedor</b>
                <b>Qtd.</b>
                <b>Comprado</b>
                <b>Conferido</b>
              </div>
              <div className="purchase-os-items">
                {group.rows.map(({ key, part }: any) => {
                  const state: PurchaseCheck = checks[key] ?? {
                    ordered: false,
                    received: false,
                    note: "",
                  };
                  return (
                    <div
                      className={`purchase-os-row ${
                        state.received
                          ? "received"
                          : state.ordered
                            ? "ordered"
                            : "pending"
                      }`}
                      key={key}
                    >
                      <span className="purchase-os-part">
                        <b>{part.item}</b>
                        <small>
                          {part.brand || "Marca não informada"} ·{" "}
                          {part.supplier || "Fornecedor não informado"} · Cód.{" "}
                          {part.code || "não informado"}
                        </small>
                      </span>
                      <strong className="purchase-os-qty">{part.qty}</strong>
                      <label
                        className="purchase-os-tick"
                        title={
                          state.orderedBy
                            ? `Comprado por ${state.orderedBy}`
                            : "Marcar como comprado"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={state.ordered}
                          onChange={(event) =>
                            update(group.ownerId, key, {
                              ordered: event.target.checked,
                              received: event.target.checked
                                ? state.received
                                : false,
                              orderedBy: event.target.checked
                                ? currentUser
                                : undefined,
                              receivedBy: event.target.checked
                                ? state.receivedBy
                                : undefined,
                            })
                          }
                        />
                        <span>Comprado</span>
                      </label>
                      <label
                        className="purchase-os-tick"
                        title={
                          state.receivedBy
                            ? `Conferido por ${state.receivedBy}`
                            : "Marcar como recebido e conferido"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={state.received}
                          onChange={(event) =>
                            update(group.ownerId, key, {
                              ordered: event.target.checked
                                ? true
                                : state.ordered,
                              received: event.target.checked,
                              orderedBy: event.target.checked
                                ? state.orderedBy || currentUser
                                : state.orderedBy,
                              receivedBy: event.target.checked
                                ? currentUser
                                : undefined,
                            })
                          }
                        />
                        <span>Conferido</span>
                      </label>
                    </div>
                  );
                })}
              </div>
              <footer className="purchase-order-actions">
                {isClosed ? (
                  <>
                    <span className="purchase-order-saved">
                      ✓ Pedido fechado
                      {group.savedState.closedBy
                        ? ` por ${group.savedState.closedBy}`
                        : ""}
                    </span>
                    <button type="button" onClick={() => reopenOrder(group.ownerId)}>
                      Reabrir pedido
                    </button>
                  </>
                ) : (
                  <>
                    <span className={group.allReceived ? "ready" : "waiting"}>
                      {group.allReceived
                        ? "✓ Todas as peças foram conferidas."
                        : `Falta conferir ${pendingToClose} ${pendingToClose === 1 ? "item" : "itens"}.`}
                    </span>
                    <button
                      type="button"
                      className="close-order"
                      disabled={!group.allReceived}
                      onClick={() => closeOrder(group.ownerId)}
                    >
                      Salvar e fechar pedido
                    </button>
                  </>
                )}
              </footer>
                </>
              )}
            </section>
            );
          })}
        </div>
      )}
    </section>
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
          sum +
          servicePrice(index, budget.servicePrices) *
            (budget.serviceQty[index] ?? 0),
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
          <b>✓ {completedAttendanceLabel(appointment)}</b>
          <small>
            Finalizado em{" "}
            {appointment.conference?.finalizedAt
              ? new Date(appointment.conference.finalizedAt).toLocaleString(
                  "pt-BR",
                )
              : "data não registrada"}
          </small>
        </span>
        <strong>{completedAttendanceLabel(appointment)}</strong>
      </div>
      <div className="summary-card">
        <h2>Responsáveis pelo atendimento</h2>
        <p>
          <b>Técnico avaliador:</b> {appointment.tech || "Não informado"}
        </p>
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
              {serviceIsCourtesy(index)
                ? "Cortesia"
                : brl(
                    servicePrice(index, budget.servicePrices) *
                      (budget.serviceQty[index] ?? 0),
                  )}
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
  updateQuoteFollowUp,
  message,
}: any) {
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("todos"),
    [printRow, setPrintRow] = useState<Appt | null>(null),
    [reportMode, setReportMode] = useState<
      "registros" | "semana" | "amanha" | "abertos" | "andamento"
    >(
      initialMode === "abertos" || initialMode === "andamento"
        ? initialMode
        : "registros",
    ),
    [weekDate, setWeekDate] = useState(iso(new Date())),
    [reminderDayDrafts, setReminderDayDrafts] = useState<
      Record<number, number>
    >({});
  const isClissia =
    user?.username?.toLocaleLowerCase("pt-BR") === "clissia" ||
    user?.displayName?.toLocaleLowerCase("pt-BR") === "clissia";
  const category = (a: Appt) =>
    a.quoteFollowUpDecision === "declined"
      ? "Cliente desistiu"
      : a.budget?.processStatus === "Finalizado"
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
          a.quoteFollowUpDecision !== "declined" &&
          !a.serviceAppointmentId &&
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
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowIso = iso(tomorrow);
  const tomorrowRows = (data as Appt[])
    .filter((a) => a.type !== "bloqueio" && a.date === tomorrowIso)
    .sort((a, b) => a.time.localeCompare(b.time));
  const tomorrowMessage = [
    `*AGENDA MONOCENTER - ${tomorrow.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).toUpperCase()}*`,
    "",
    ...(tomorrowRows.length
      ? tomorrowRows.map((a) =>
          [
            `*${a.time} - ${a.client}*`,
            `${a.vehicle || "Veículo não informado"}${a.plate ? ` - ${a.plate}` : ""}`,
            `Situação: ${category(a)}${a.inProgress ? " - veículo na oficina" : ""}`,
            a.note ? `Observação: ${a.note}` : "",
          ].filter(Boolean).join("\n"),
        )
      : ["Nenhum agendamento para amanhã."]),
  ].join("\n\n");
  const openQuotes = (data as Appt[])
    .filter(
      (a) =>
        a.type === "cliente" &&
        a.status === "avaliou" &&
        a.quoteFollowUpDecision !== "declined" &&
        !a.serviceAppointmentId &&
        a.budget?.processStatus !== "Finalizado",
    )
    .sort((a, b) => {
      const aReminder = a.quoteFollowUpDueDate || "9999-12-31",
        bReminder = b.quoteFollowUpDueDate || "9999-12-31";
      return (
        aReminder.localeCompare(bReminder) ||
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
      );
    });
  const declinedQuotes = (data as Appt[])
    .filter(
      (a) =>
        a.type === "cliente" &&
        a.status === "avaliou" &&
        a.quoteFollowUpDecision === "declined" &&
        !a.serviceAppointmentId &&
        a.budget?.processStatus !== "Finalizado",
    )
    .sort((a, b) =>
      String(b.quoteFollowUpUpdatedAt || b.date).localeCompare(
        String(a.quoteFollowUpUpdatedAt || a.date),
      ),
    );
  const dueQuoteReminders = openQuotes.filter(
    (appointment) =>
      !!appointment.quoteFollowUpDueDate &&
      appointment.quoteFollowUpDueDate <= iso(new Date()),
  ).length;
  const reminderDaysFor = (appointment: Appt) =>
      reminderDayDrafts[appointment.id] ??
      appointment.quoteFollowUpDays ??
      3,
    reminderDateFromToday = (days: number) => {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + Math.max(1, Math.min(90, days)));
      return iso(date);
    },
    scheduleQuoteReminder = (appointment: Appt) => {
      const days = Math.max(
        1,
        Math.min(90, Number(reminderDaysFor(appointment)) || 3),
      );
      updateQuoteFollowUp(appointment.id, {
        quoteFollowUpDays: days,
        quoteFollowUpDueDate: reminderDateFromToday(days),
        quoteFollowUpDecision: "message",
      });
    },
    prepareQuoteFollowUp = (appointment: Appt) => {
      const days = Math.max(
        1,
        Math.min(90, Number(reminderDaysFor(appointment)) || 3),
      );
      updateQuoteFollowUp(appointment.id, {
        quoteFollowUpDays: days,
        quoteFollowUpDueDate: reminderDateFromToday(days),
        quoteFollowUpDecision: "message",
        quoteFollowUpPreparedBy: user.displayName,
        quoteFollowUpPreparedAt: new Date().toISOString(),
      });
      message(
        `Olá, ${appointment.client}! Tudo bem? Gostaríamos de saber se deseja dar continuidade ao orçamento da Monocenter para o veículo ${appointment.vehicle || ""}${appointment.plate ? `, placa ${appointment.plate}` : ""}. Podemos ajudar com o agendamento?`,
      );
    };
  const inProgress = (data as Appt[])
    .filter(
      (a) =>
        (a.inProgress ||
          a.status === "servico" ||
          (a.type === "revisao" && a.reviewWithService && !!a.review)) &&
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
            className={reportMode === "amanha" ? "active" : ""}
            onClick={() => setReportMode("amanha")}
          >
            Agenda de amanhã
          </button>
          <button
            className={reportMode === "abertos" ? "active" : ""}
            onClick={() => setReportMode("abertos")}
          >
            Orçamentos em aberto
            {dueQuoteReminders > 0
              ? ` · ${dueQuoteReminders} ${dueQuoteReminders === 1 ? "lembrete" : "lembretes"}`
              : ""}
          </button>
          <button
            className={reportMode === "andamento" ? "active" : ""}
            onClick={() => setReportMode("andamento")}
          >
            Veículos em andamento
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
        {reportMode === "amanha" && (
          <div className="management-report-panel tomorrow-agenda-panel">
            <div className="management-report-head">
              <span>
                <h2>Agenda do dia seguinte</h2>
                <p>
                  {tomorrow.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })} · {tomorrowRows.length} {tomorrowRows.length === 1 ? "registro" : "registros"}
                </p>
              </span>
              <button className="wa" onClick={() => message(tomorrowMessage)}>
                Copiar para WhatsApp
              </button>
            </div>
            <div className="tomorrow-agenda-list">
              {tomorrowRows.length ? (
                tomorrowRows.map((a) => (
                  <article key={a.id}>
                    <time>{a.time}</time>
                    <span>
                      <b>{a.client}</b>
                      <small>{a.vehicle || "Veículo não informado"} · {a.plate || "Sem placa"}</small>
                      {a.note && <small>Observação: {a.note}</small>}
                    </span>
                    <strong>{category(a)}</strong>
                  </article>
                ))
              ) : (
                <p>Nenhum agendamento para amanhã.</p>
              )}
            </div>
          </div>
        )}
        {reportMode === "abertos" && (
          <div className="management-report-panel open-quotes-panel">
            <style>{`
              .compact-quotes-wrap{overflow-x:auto;border:1px solid #d9e1ea;border-radius:10px;background:#fff}
              .compact-quotes-table{min-width:980px}
              .compact-quotes-head,.compact-quote-row{display:grid;grid-template-columns:minmax(210px,1.55fr) 130px minmax(210px,1.25fr) minmax(225px,1.3fr) 210px;gap:10px;align-items:center}
              .compact-quotes-head{padding:8px 12px;background:#eef2f6;color:#526274;font-size:10px;font-weight:900;text-transform:uppercase}
              .compact-quote-row{min-height:72px;padding:8px 12px;border-top:1px solid #e4e9ef}
              .compact-quote-row:first-child{border-top:0}
              .compact-quote-client{display:grid;gap:2px;min-width:0}
              .compact-quote-client b{overflow:hidden;font-size:13px;text-overflow:ellipsis;white-space:nowrap}
              .compact-quote-client small,.compact-quote-age small,.compact-reminder small{color:#64748b;font-size:10px;line-height:1.25}
              .compact-quote-age,.compact-reminder{display:grid;gap:3px}
              .compact-reminder-control{display:flex;align-items:center;gap:5px}
              .compact-reminder-control input{width:56px!important;min-width:56px;padding:5px 6px;text-align:center}
              .compact-reminder-control button{padding:6px 8px;font-size:10px}
              .compact-reminder-date{font-weight:800}
              .compact-reminder-date.due{color:#c51d25}
              .compact-quote-decision{display:grid;gap:5px}
              .compact-quote-decision label{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;cursor:pointer}
              .compact-quote-decision input{width:15px;height:15px;margin:0}
              .compact-quote-actions{display:flex;justify-content:flex-end;gap:6px}
              .compact-quote-actions button{padding:7px 9px;font-size:10px;white-space:nowrap}
              .compact-quote-actions .wa{background:#16864b;color:#fff}
              .declined-quotes{margin-top:12px;border:1px solid #f1c0c3;border-radius:9px;background:#fff7f7}
              .declined-quotes summary{padding:10px 12px;color:#a3131c;font-size:12px;font-weight:900;cursor:pointer}
              .declined-quote-row{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:8px 12px;border-top:1px solid #f1d4d6;font-size:11px}
              .declined-quote-row span{display:grid;gap:2px}.declined-quote-row small{color:#64748b}
              .declined-quote-row button{padding:6px 9px;font-size:10px}
              .app.dark .compact-quotes-wrap,.app.dark .compact-quote-row{background:#111c29}.app.dark .compact-quotes-head{background:#1c2938}.app.dark .declined-quotes{background:#36191c}
            `}</style>
            <div className="management-report-head">
              <span>
                <h2>Orçamentos em aberto</h2>
                <p>
                  {openQuotes.length} aguardando retorno do cliente
                  {dueQuoteReminders > 0
                    ? ` · ${dueQuoteReminders} ${dueQuoteReminders === 1 ? "lembrete vencido" : "lembretes vencidos"}`
                    : ""}
                </p>
              </span>
            </div>
            <div className="compact-quotes-wrap">
              <div className="compact-quotes-table">
                <div className="compact-quotes-head">
                  <span>Cliente e veículo</span>
                  <span>Tempo em aberto</span>
                  <span>Próximo lembrete</span>
                  <span>Decisão</span>
                  <span>Ações</span>
                </div>
              {openQuotes.length ? (
                openQuotes.map((a) => {
                  const daysOpen = Math.max(
                    0,
                    Math.floor(
                      (Date.now() - new Date(a.date + "T12:00:00").getTime()) /
                      86400000,
                    ),
                  ),
                    reminderDays = reminderDaysFor(a),
                    reminderDue =
                      !!a.quoteFollowUpDueDate &&
                      a.quoteFollowUpDueDate <= iso(new Date());
                  return (
                    <article className="compact-quote-row" key={a.id}>
                      <span className="compact-quote-client">
                        <b>{a.client}</b>
                        <small>
                          {a.vehicle || "Veículo não informado"} ·{" "}
                          {a.plate || "Sem placa"}
                        </small>
                      </span>
                      <span className="compact-quote-age">
                        <b>{daysOpen} {daysOpen === 1 ? "dia" : "dias"}</b>
                        <small>
                          {new Date(a.date + "T12:00:00").toLocaleDateString(
                            "pt-BR",
                          )}
                        </small>
                        {a.quoteSentAt && (
                          <small>
                            Enviado por {a.quoteSentBy || "não informado"}
                          </small>
                        )}
                      </span>
                      <span className="compact-reminder">
                        <span className="compact-reminder-control">
                          <input
                            type="number"
                            min="1"
                            max="90"
                            value={reminderDays}
                            onChange={(event) =>
                              setReminderDayDrafts((current) => ({
                                ...current,
                                [a.id]: Math.max(
                                  1,
                                  Math.min(90, Number(event.target.value) || 1),
                                ),
                              }))
                            }
                            aria-label={`Dias para lembrar ${a.client}`}
                          />
                          <small>dias</small>
                          <button onClick={() => scheduleQuoteReminder(a)}>
                            Programar
                          </button>
                        </span>
                        <small
                          className={`compact-reminder-date${reminderDue ? " due" : ""}`}
                        >
                          {a.quoteFollowUpDueDate
                            ? `${reminderDue ? "Lembrete vencido: " : "Lembrar em: "}${new Date(`${a.quoteFollowUpDueDate}T12:00:00`).toLocaleDateString("pt-BR")}`
                            : "Lembrete ainda não programado"}
                        </small>
                        {a.quoteFollowUpPreparedAt && (
                          <small>
                            Última mensagem preparada em{" "}
                            {new Date(a.quoteFollowUpPreparedAt).toLocaleDateString(
                              "pt-BR",
                            )}
                          </small>
                        )}
                      </span>
                      <span className="compact-quote-decision">
                        <label>
                          <input
                            type="checkbox"
                            checked={a.quoteFollowUpDecision === "message"}
                            onChange={(event) =>
                              updateQuoteFollowUp(a.id, {
                                quoteFollowUpDecision: event.target.checked
                                  ? "message"
                                  : undefined,
                              })
                            }
                          />
                          Mandar nova mensagem
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={(event) => {
                              if (
                                event.target.checked &&
                                confirm(
                                  `Confirmar que ${a.client} desistiu de fazer o serviço?`,
                                )
                              )
                                updateQuoteFollowUp(a.id, {
                                  quoteFollowUpDecision: "declined",
                                  quoteFollowUpDueDate: undefined,
                                });
                            }}
                          />
                          Cliente desistiu
                        </label>
                      </span>
                      <div className="compact-quote-actions">
                        <button onClick={() => open(a)}>Abrir orçamento</button>
                        <button
                          className="wa"
                          onClick={() => prepareQuoteFollowUp(a)}
                        >
                          Preparar mensagem
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p style={{ padding: 16 }}>Nenhum orçamento em aberto.</p>
              )}
              </div>
            </div>
            {declinedQuotes.length > 0 && (
              <details className="declined-quotes">
                <summary>
                  Clientes que desistiram ({declinedQuotes.length})
                </summary>
                {declinedQuotes.map((a) => (
                  <div className="declined-quote-row" key={a.id}>
                    <span>
                      <b>{a.client}</b>
                      <small>
                        {a.vehicle || "Veículo não informado"} ·{" "}
                        {a.plate || "Sem placa"}
                        {a.quoteFollowUpUpdatedBy
                          ? ` · registrado por ${a.quoteFollowUpUpdatedBy}`
                          : ""}
                      </small>
                    </span>
                    <button
                      onClick={() =>
                        updateQuoteFollowUp(a.id, {
                          quoteFollowUpDecision: "message",
                          quoteFollowUpDueDate: reminderDateFromToday(
                            reminderDaysFor(a),
                          ),
                        })
                      }
                    >
                      Reabrir acompanhamento
                    </button>
                  </div>
                ))}
              </details>
            )}
          </div>
        )}
        {reportMode === "andamento" && (
          <div className="management-report-panel open-quotes-panel">
            <div className="management-report-head">
              <span>
                <h2>Veículos na oficina</h2>
                <p>
                  {inProgress.length} {inProgress.length === 1 ? "veículo" : "veículos"} aguardando avaliação ou conclusão
                </p>
              </span>
            </div>
            <div className="open-quotes-list vehicle-progress-list">
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
                    <article key={a.id} className="vehicle-progress-card">
                      <VehiclePicture appointment={a} />
                      <span>
                        <strong className="vehicle-progress-status">
                          {inProgressLabel(a)}
                        </strong>
                        <b className="vehicle-progress-model">
                          {a.vehicle || "Modelo não informado"}
                          {a.vehicleColor ? ` · ${a.vehicleColor}` : ""}
                        </b>
                        <small>
                          Cliente: {a.client} · {a.plate || "Sem placa"}
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
  veiculos: [
    "Veículos na oficina",
    "Modelos aguardando avaliação, revisão ou conclusão do serviço.",
  ],
  atendimento: [
    "Atendimento concluído",
    "Avaliação, orçamento aprovado e conferência final.",
  ],
  avaliacao: [
    "Avaliação veicular",
    "Checklist técnico de suspensão, freios e peças do veículo.",
  ],
  orcamento: [
    "Montar orçamento",
    "Custos, margem, peças e tabela de serviços.",
  ],
  proposta: ["Orçamento do cliente", "Data, placa, pagamento e mensagem."],
  torque: [
    "Conferência de torque",
    "Geometria, alinhamento, segurança e finalização do serviço.",
  ],
  revisao: [
    "Revisão de 30 dias",
    "Conferência cortesia do serviço executado anteriormente.",
  ],
  compras: [
    "Pedido de compra",
    "Acompanhe as peças compradas, recebidas e conferidas.",
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
