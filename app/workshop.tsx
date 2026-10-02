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
const REVIEW_TECHNICIANS = ["Saulo", "Tiago", "Divair", "Vitor"] as const;
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
  | "geometria"
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
  absenceEndTime?: string;
  client: string;
  phone: string;
  vehicle: string;
  vehicleBrand?: string;
  vehicleColor?: string;
  vehicleBody?: string;
  plate: string;
  km: string;
  note: string;
  internalNote?: string;
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
  geometryReport?: {
    values: Record<string, any>;
    technician: string;
    notes: string;
    sourceName?: string;
    savedAt: string;
    savedBy?: string;
  };
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
const isEmployeeAbsence = (a: Appt) =>
  a.type === "bloqueio" || normalizeSearch(a.client).includes("ausente");
const employeeAbsenceName = (a: Appt) => {
  const name = a.client.split(/\s+ausente\b/i)[0]?.trim();
  return name || a.client;
};
const employeeAbsenceReason = (a: Appt) => {
  if (a.note?.trim()) return a.note.trim();
  const legacyReason = a.client.match(/\bausente\b\s*(.*)$/i)?.[1]?.trim();
  return legacyReason || "";
};
const employeeAbsencePeriod = (a: Appt) =>
  a.absenceEndTime ? `${a.time}–${a.absenceEndTime}` : `${a.time} em diante`;
const apptClass = (a: Appt) =>
  isEmployeeAbsence(a)
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
  if (isEmployeeAbsence(a)) return "AUSENTE";
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
  internalNote: "",
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
    saveGeometryReport = async (geometryReport: any) => {
      if (!activeAppointment) throw new Error("Atendimento não localizado.");
      const savedAt = new Date().toISOString();
      const updated: Appt = {
        ...activeAppointment,
        geometryReport: {
          ...geometryReport,
          savedAt,
          savedBy: user.displayName,
        },
        lastEditedBy: user.displayName,
        lastEditedAt: savedAt,
        _updatedAt: Date.now(),
      };
      const nextAppointments = appointments.map((item) =>
        item.id === updated.id ? updated : item,
      );
      syncBlockedUntil.current = Date.now() + 8000;
      DISPLAY_APPT = updated;
      setActiveAppointment(updated);
      setAppointments(nextAppointments);
      const response = await fetch("/api/state", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state: {
            appointments: nextAppointments,
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
          },
          action: "Salvou laudo de geometria",
          entity: "Laudo de geometria",
          detail: `${updated.client} · ${updated.plate || "sem placa"}`,
        }),
      });
      if (!response.ok) {
        throw new Error("O laudo ficou neste computador, mas não foi confirmado no banco compartilhado.");
      }
      setSavedAt(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
      return updated;
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
                    ? `• Cartão: total parcelado ${brl(totalInstallment)} em até 5x sem juros de ${brl(totalInstallment / 5)}`
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
              <Steps view={view} go={go} />
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
                            {tireParts.length > 0 && (
                              <small>
                                Total parcelado: {brl(totalInstallment)}
                              </small>
                            )}
                            <b>
                              5x de{" "}
                              {brl(
                                (tireParts.length > 0
                                  ? totalInstallment
                                  : total) / 5,
                              )}
                            </b>
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
              {view === "geometria" && activeAppointment && (
                <GeometryTechnicalReport
                  appointment={activeAppointment}
                  currentUser={user}
                  onBack={() => go("proposta")}
                  onContinue={() => go("torque")}
                  onSave={saveGeometryReport}
                />
              )}
            </section>
          )}
        {view === "atendimento" && activeAppointment && (
          <AttendanceSummary
            appointment={activeAppointment}
            currentUser={user}
            roundStep={roundStep}
            onBack={() => go("agenda")}
            onSaveGeometry={saveGeometryReport}
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
function Steps({ view, go }: { view: View; go: (view: View) => void }) {
  const n = (
    { avaliacao: 1, orcamento: 2, proposta: 3, geometria: 4, torque: 5 } as Partial<
      Record<View, number>
    >
  )[view] ?? 1;
  const stages: Array<[string, View]> = [
    ["Avaliação", "avaliacao"],
    ["Orçamento", "orcamento"],
    ["Proposta", "proposta"],
    ["Laudo 3D", "geometria"],
    ["Conferência", "torque"],
  ];
  return (
    <div className="steps">
      {stages.map(([label, target], i) => (
        <span role="button" tabIndex={0} className={i < n ? "done" : ""} key={label} onClick={() => go(target)} onKeyDown={(event) => event.key === "Enter" && go(target)}>
          <i>{i + 1}</i>
          {label}
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
    torque: "Etapa 5 - Conferência",
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
  const editCalendarAbsence = (appointment: Appt) =>
    edit(
      appointment.type === "bloqueio"
        ? appointment
        : {
            ...appointment,
            type: "bloqueio",
            client: employeeAbsenceName(appointment),
            note: employeeAbsenceReason(appointment),
            appointmentServiceType: undefined,
          },
    );
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
      !isEmployeeAbsence(appointment) &&
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
      !isEmployeeAbsence(appointment) &&
      !!appointment.inProgress &&
      appointment.budget?.processStatus !== "Finalizado",
    selectedDayAppointments =
      mode === "semana"
        ? (data as Appt[]).filter((appointment) => appointment.date === date)
        : appointmentsForDate(date),
    visibleSelectedDayAppointments = selectedDayAppointments.filter(
      (appointment) => !isEmployeeAbsence(appointment),
    ),
    ongoingVehicles = (data as Appt[]).filter(isOngoingVehicle),
    dayAppointments = Array.from(
      new Map(
        [
          ...visibleSelectedDayAppointments.filter(
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
        !isEmployeeAbsence(a) &&
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
      if (isEmployeeAbsence(appointment)) return "Ausente";
      if (appointment.type === "revisao") return "Revisão 30 dias";
      if (appointment.type === "retorno") return "Retorno";
      if (appointment.type === "garantia") return "Garantia";
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
            !isEmployeeAbsence(appointment) &&
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
          !isEmployeeAbsence(appointment) &&
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
              appointment.note
                ? `Relato do cliente: ${appointment.note}`
                : "",
              appointment.internalNote
                ? `Observação interna: ${appointment.internalNote}`
                : "",
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
        .week-appointment>.week-internal-note-indicator{position:absolute;right:3px;bottom:2px;z-index:2;width:auto;max-width:calc(100% - 8px);padding:1px 3px;border-radius:3px;background:#fff4cc;color:#7a4b00;font-size:8px;font-weight:900;line-height:1.1;text-transform:uppercase;white-space:nowrap}
        .app.dark .week-appointment>.week-internal-note-indicator{background:#493713;color:#ffe29a}
        .week-appointment.block,.days span.block,.day article.absence{border-color:#d18a00!important;border-left:5px solid #d18a00!important;background:rgb(255,232,124)!important;color:#4a3300!important;box-shadow:inset 0 0 0 1px #e1a900,0 2px 7px rgba(122,75,0,.22)!important}
        .week-appointment.block>small,.day article.absence p,.day article.absence span>small,.day article.absence time>small{color:#704600!important}.day article.absence time>small{font-weight:900}
        .week-appointment.block,.days span.block{cursor:pointer!important}.week-appointment.block>.absence-label{grid-column:1/-1;color:#704600!important;font-size:8px;font-weight:900;text-transform:uppercase}.week-appointment.block>.absence-person{grid-column:1/-1;padding-right:16px;color:#3f2c00;font-size:11px}.week-appointment.block>.absence-details{grid-column:1/-1;color:#704600!important;font-size:8px}.week-appointment.block>.absence-edit-icon{position:absolute;top:4px;right:5px;color:#704600;font-size:12px;font-style:normal}
        .app.dark .week-appointment.block,.app.dark .days span.block,.app.dark .day article.absence{background:rgb(255,232,124)!important;color:#3f2c00!important}
        .day article .appointment-service-type{display:block;margin-top:3px;color:#7c2d12;font-size:10px;font-weight:900;text-transform:uppercase}
        .day article .appointment-internal-note{display:block;margin-top:6px;padding:6px 7px;border-left:3px solid #d98b00;border-radius:5px;background:#fff4cc;color:#5d3b00!important;font-size:10px!important;line-height:1.35;overflow-wrap:anywhere;white-space:pre-wrap}
        .day article .appointment-internal-note b{font-weight:900}
        .day article .appointment-customer-note{display:block;white-space:pre-wrap}
        .app.dark .day article .appointment-internal-note{background:#493713;color:#ffe29a!important}
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
                                role={isEmployeeAbsence(a) ? "button" : undefined}
                                tabIndex={isEmployeeAbsence(a) ? 0 : undefined}
                                onClick={(event) => {
                                  if (!isEmployeeAbsence(a)) return;
                                  event.stopPropagation();
                                  editCalendarAbsence(a);
                                }}
                                onKeyDown={(event) => {
                                  if (
                                    isEmployeeAbsence(a) &&
                                    (event.key === "Enter" || event.key === " ")
                                  ) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    editCalendarAbsence(a);
                                  }
                                }}
                                style={{
                                  top: `${top}px`,
                                }}
                                title={
                                  isEmployeeAbsence(a)
                                    ? `${employeeAbsenceName(a)} · ${employeeAbsencePeriod(a)}${employeeAbsenceReason(a) ? ` · ${employeeAbsenceReason(a)}` : ""}`
                                    : `${a.time} · ${a.client}${a.vehicle ? ` · ${a.vehicle}` : ""}`
                                }
                              >
                                {isEmployeeAbsence(a) ? (
                                  <>
                                    <small className="absence-label">
                                      Funcionário ausente
                                    </small>
                                    <strong className="absence-person">
                                      {employeeAbsenceName(a)}
                                    </strong>
                                    <i className="absence-edit-icon" aria-hidden="true">
                                      ✎
                                    </i>
                                    <small className="absence-details">
                                      {employeeAbsencePeriod(a)}
                                      {employeeAbsenceReason(a)
                                        ? ` · ${employeeAbsenceReason(a)}`
                                        : ""}
                                    </small>
                                  </>
                                ) : (
                                  <>
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
                                    {a.internalNote?.trim() && (
                                      <small
                                        className="week-internal-note-indicator"
                                        title="Há uma observação interna registrada"
                                      >
                                        * Observação interna
                                      </small>
                                    )}
                                  </>
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
                            onClick={(event) => {
                              if (!isEmployeeAbsence(a)) return;
                              event.stopPropagation();
                              editCalendarAbsence(a);
                            }}
                            title={
                              isEmployeeAbsence(a)
                                ? "Clique para editar ou excluir esta ausência"
                                : undefined
                            }
                          >
                            {isEmployeeAbsence(a)
                              ? `FUNCIONÁRIO AUSENTE · ${employeeAbsenceName(a)} · ${employeeAbsencePeriod(a)}${employeeAbsenceReason(a) ? ` · ${employeeAbsenceReason(a)}` : ""}`
                              : `${isCarriedInto(a, ds) ? "↳ " : `${a.time} `}${a.client.split(" ")[0]}${a.quoteSentAt ? " ✓" : ""}`}
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
                    className={`${isEmployeeAbsence(a) ? "absence" : apptClass(a)}${a.type === "revisao" && !a.reviewWithService ? " review-30-days" : ""}${a.inProgress ? " vehicle-in-shop" : ""}${a.budget?.processStatus === "Finalizado" ? " completed" : ""}${isCarriedInto(a, date) ? " carried-over" : ""}`}
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
                  {expanded && !isEmployeeAbsence(a) && a.tech && (
                    <small className="card-tech">
                      {a.status === "avaliou" ? "Avaliado por" : "Téc."}{" "}
                      {a.tech}
                    </small>
                  )}
                  {expanded && !isEmployeeAbsence(a) && a.startedAt && (
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
                    {isEmployeeAbsence(a)
                      ? "Ausência de funcionário"
                      : a.vehicle}
                    {a.plate && (
                      <>
                        {" "}
                        · <b>{a.plate}</b>
                      </>
                    )}
                  </p>
                  {!isEmployeeAbsence(a) && weeklyBudgetTypeLabel(a) && (
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
                      {a.internalNote?.trim() && (
                        <small className="appointment-internal-note">
                          <b>OBSERVAÇÃO INTERNA:</b> {a.internalNote.trim()}
                        </small>
                      )}
                      {a.note?.trim() && (
                        <small className="appointment-customer-note">
                          <b>Relato do cliente:</b> {a.note.trim()}
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
                    {!isEmployeeAbsence(a) && (
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
                    {!isEmployeeAbsence(a) && (
                      <button
                        className="summary-button"
                        onClick={() => preview(a)}
                      >
                        Visualizar resumo
                      </button>
                    )}
                    {!isEmployeeAbsence(a) &&
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
                    {!isEmployeeAbsence(a) && a.status !== "faltou" && (
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
  onBack,
  onSave,
}: any) {
  const previous = appointments.filter(
    (a: Appt) =>
      a.id !== appointment.id &&
      !isEmployeeAbsence(a) &&
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
  const savedReviewer =
    saved?.reviewer === "Victor" ? "Vitor" : saved?.reviewer ?? "";
  const [reviewer, setReviewer] = useState(
    REVIEW_TECHNICIANS.includes(savedReviewer as (typeof REVIEW_TECHNICIANS)[number])
      ? savedReviewer
      : "",
  );
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
            Quem fez a revisão? *
            <select
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              required
            >
              <option value="">Selecione o responsável</option>
              {REVIEW_TECHNICIANS.map((x) => (
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
          <button
            className="primary"
            onClick={() => {
              if (!reviewer.trim()) {
                alert(
                  "Selecione quem fez a revisão de 30 dias antes de finalizar.",
                );
                return;
              }
              onSave({ ...review, reviewer: reviewer.trim() });
            }}
          >
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
              <b>Relato do cliente</b>
              {appointment.note?.trim() || "Não informado."}
            </p>
            <p className="attendance-preview-note attendance-preview-internal-note">
              <b>Observação interna da equipe</b>
              {appointment.internalNote?.trim() || "Nenhuma observação interna."}
            </p>
            {budget?.patioNotes?.trim() && (
              <p className="attendance-preview-note"><b>Orientações para o pátio</b>{budget.patioNotes}</p>
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
        .attendance-preview-internal-note{background:#fff4cc!important;border-left:4px solid #d98b00;color:#5d3b00}
        .attendance-preview-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 24px 24px}
        .attendance-preview-footer small{color:var(--muted,#5d6878)}
        .attendance-preview-footer button{white-space:nowrap}
        .dark .attendance-preview-items>div,.dark .attendance-preview-note,.dark .attendance-preview-badges>*{background:#1c2938}
        .dark .attendance-preview-internal-note{background:#493713!important;color:#ffe29a}
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
        absenceEndTime: "",
        client: "",
        phone: "",
        vehicle: "",
        vehicleBrand: "",
        vehicleColor: "",
        vehicleBody: "",
        plate: "",
        km: "",
        note: "",
        internalNote: "",
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
        className="modal appointment-modal"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            f.type === "bloqueio" &&
            (!f.absenceEndTime || f.absenceEndTime <= f.time)
          ) {
            alert("Informe um horário final posterior ao início da ausência.");
            return;
          }
          save(f);
        }}
      >
        <style>{`
          .appointment-modal{display:flex;flex-direction:column;width:min(1120px,calc(100vw - 40px))!important;max-width:1120px!important;max-height:calc(100vh - 30px)!important;overflow:hidden!important}
          .appointment-modal>div:first-of-type{flex:0 0 auto}
          .appointment-modal>section{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:11px 12px!important;min-height:0;overflow-y:auto;padding-right:5px}
          .appointment-modal>section>label{min-width:0;margin:0!important}
          .appointment-modal>section>label.wide{grid-column:span 2}
          .appointment-modal input,.appointment-modal select{min-width:0}
          .appointment-modal textarea{min-height:82px;resize:vertical}
          .appointment-customer-note-field{grid-column:1/span 2!important}
          .appointment-internal-note-field{grid-column:3/span 2!important}
          .appointment-modal .appointment-progress-toggle{grid-column:1/-1!important}
          .appointment-modal>.toggle{flex:0 0 auto;margin:10px 0 0!important}
          .appointment-modal>footer{position:sticky;bottom:0;z-index:3;flex:0 0 auto;margin-top:8px;padding-top:10px;background:var(--card,#fff);box-shadow:0 -8px 16px rgba(255,255,255,.88)}
          .appointment-internal-note-field{padding:10px;border:1px solid #efd58b;border-radius:9px;background:#fffaf0}
          .appointment-internal-note-field textarea{background:#fffef9}
          .appointment-internal-note-field>small{display:block;margin-top:5px;color:#7a5a13;font-size:11px}
          .app.dark .appointment-internal-note-field{border-color:#735c25;background:#302816}
          .app.dark .appointment-internal-note-field textarea{background:#17202c}
          .app.dark .appointment-internal-note-field>small{color:#ffe29a}
          .app.dark .appointment-modal>footer{background:#111c29;box-shadow:0 -8px 16px rgba(17,28,41,.9)}
          @media(max-width:900px){
            .appointment-modal{width:min(650px,calc(100vw - 24px))!important;max-height:calc(100vh - 20px)!important}
            .appointment-modal>section{grid-template-columns:repeat(2,minmax(0,1fr))!important}
            .appointment-customer-note-field,.appointment-internal-note-field{grid-column:1/-1!important}
          }
          @media(max-width:580px){
            .appointment-modal{width:calc(100vw - 12px)!important}
            .appointment-modal>section{grid-template-columns:1fr!important}
            .appointment-modal>section>label.wide,.appointment-customer-note-field,.appointment-internal-note-field,.appointment-modal .appointment-progress-toggle{grid-column:1!important}
            .appointment-modal>footer{display:grid!important;grid-template-columns:1fr 1fr}
            .appointment-modal>footer .danger{grid-column:1/-1}
          }
        `}</style>
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
            {f.type === "bloqueio" ? "Início da ausência" : "Horário"}
            <input
              required
              type="time"
              value={f.time}
              onChange={(e) => setF({ ...f, time: e.target.value })}
            />
          </label>
          {f.type === "bloqueio" && (
            <label>
              Final da ausência
              <input
                required
                type="time"
                value={f.absenceEndTime || ""}
                onChange={(e) =>
                  setF({ ...f, absenceEndTime: e.target.value })
                }
              />
            </label>
          )}
          <label>
            {f.type === "bloqueio"
              ? "Nome do funcionário ausente"
              : "Nome do cliente / funcionário"}
            <input
              required
              value={f.client}
              onChange={(e) => setF({ ...f, client: e.target.value })}
            />
          </label>
          {f.type !== "bloqueio" && (
            <>
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
            </>
          )}
          <label className="wide appointment-customer-note-field">
            {f.type === "bloqueio"
              ? "Motivo da ausência (opcional)"
              : "Relato do cliente (opcional)"}
            <textarea
              value={f.note}
              onChange={(e) => setF({ ...f, note: e.target.value })}
              placeholder={
                f.type === "bloqueio"
                  ? "Ex.: consulta médica, compromisso particular ou outro motivo."
                  : f.type === "revisao"
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
            <label className="wide appointment-internal-note-field">
              Observação interna da equipe (opcional)
              <textarea
                value={f.internalNote || ""}
                onChange={(e) => setF({ ...f, internalNote: e.target.value })}
                placeholder="Anote aqui orientações importantes para a equipe antes de abrir o atendimento."
              />
              <small>
                Visível apenas para a equipe. Não será enviada nas mensagens ao cliente.
              </small>
            </label>
          )}
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
        {f.type !== "bloqueio" && (
          <label className="toggle">
            <input type="checkbox" defaultChecked /> Preparar lembrete um dia
            antes
          </label>
        )}
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
  currentUser,
  roundStep,
  onBack,
  onEditConference,
  onSaveGeometry,
}: any) {
  const [summaryView, setSummaryView] = useState<"summary" | "geometry">("summary");
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
  const finalization = appointment.conference?.finalization,
    performedBy =
      finalization?.executor?.trim() ||
      finalization?.technician?.trim() ||
      appointment.review?.reviewer?.trim() ||
      appointment.tech?.trim() ||
      "Não informado",
    checkedBy =
      finalization?.checker?.trim() ||
      appointment.conference?.finalizedBy?.trim() ||
      "Não informado",
    finalizedBy =
      appointment.conference?.finalizedBy?.trim() || checkedBy,
    finalizedAt = appointment.conference?.finalizedAt
      ? new Date(appointment.conference.finalizedAt).toLocaleString("pt-BR")
      : "Data não registrada";
  const shareAsPdf = () => {
    document.body.classList.add("print-attendance-summary");
    const cleanup = () =>
      document.body.classList.remove("print-attendance-summary");
    window.addEventListener("afterprint", cleanup, { once: true });
    setTimeout(() => window.print(), 50);
    setTimeout(cleanup, 15000);
  };
  if (summaryView === "geometry") {
    return (
      <GeometryTechnicalReport
        appointment={appointment}
        currentUser={currentUser}
        onBack={() => setSummaryView("summary")}
        onSave={onSaveGeometry}
      />
    );
  }
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
        <section className="attendance-responsibles">
          <h3>Responsáveis pela execução e conferência</h3>
          <div>
            <p>
              <small>Serviço executado por</small>
              <b>{performedBy}</b>
            </p>
            <p>
              <small>Serviço conferido por</small>
              <b>{checkedBy}</b>
            </p>
            <p>
              <small>Finalização registrada por</small>
              <b>{finalizedBy}</b>
              <span>{finalizedAt}</span>
            </p>
          </div>
        </section>
      </div>
      <div className="summary-actions">
        <button onClick={onBack}>← Voltar à agenda</button>
        <button className="geometry-report" onClick={() => setSummaryView("geometry")}>
          Laudo de geometria técnica
        </button>
        <button className="share-pdf" onClick={shareAsPdf}>
          Compartilhar em PDF
        </button>
        <button className="primary" onClick={onEditConference}>
          Editar conferência
        </button>
      </div>
      <style>{`
        .attendance-responsibles{margin-top:18px;border:1px solid #d8e0e8;border-radius:12px;overflow:hidden;background:#f8fafc}
        .attendance-responsibles>h3{margin:0;padding:12px 15px;background:#111d2b;color:#fff;font-size:16px}
        .attendance-responsibles>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#d8e0e8}
        .attendance-responsibles p{display:flex;flex-direction:column;gap:4px;margin:0;padding:14px;background:#fff;min-width:0}
        .attendance-responsibles small{color:#667085;font-weight:700}
        .attendance-responsibles b{font-size:16px;overflow-wrap:anywhere}
        .attendance-responsibles span{font-size:12px;color:#667085}
        .summary-actions .share-pdf{background:#087f45;color:#fff;border-color:#087f45}
        .summary-actions .geometry-report{background:#111d2b;color:#fff;border-color:#111d2b}
        @media(max-width:700px){
          .attendance-responsibles>div{grid-template-columns:1fr}
          .attendance-summary .summary-actions{display:grid;grid-template-columns:1fr;gap:10px}
          .attendance-summary .summary-actions button{width:100%}
        }
        @media print{
          body.print-attendance-summary *{visibility:hidden!important}
          body.print-attendance-summary .attendance-summary,
          body.print-attendance-summary .attendance-summary *{visibility:visible!important}
          body.print-attendance-summary .attendance-summary{position:absolute!important;left:0!important;top:0!important;width:100%!important;max-width:none!important;margin:0!important;padding:12mm!important;background:#fff!important;color:#111!important;overflow:visible!important}
          body.print-attendance-summary .summary-actions{display:none!important}
          body.print-attendance-summary .summary-card,
          body.print-attendance-summary .attendance-responsibles{break-inside:avoid;page-break-inside:avoid}
          body.print-attendance-summary .printheader{display:block!important}
          body.print-attendance-summary .attendance-responsibles>h3{background:#111d2b!important;color:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          @page{size:A4;margin:10mm}
        }
      `}</style>
    </section>
  );
}

const GEOMETRY_FIELDS = [
  ["Camber dianteiro", "", "", false],
  ["Caster", "", "", false],
  ["Convergência dianteira", "", "", false],
  ["Convergência total dianteira", "", "", true],
  ["KPI / SAI", "", "", false],
  ["Ângulo de inclusão", "", "", false],
  ["Setback dianteira", "", "", true],
  ["Camber traseiro", "", "", false],
  ["Convergência traseira", "", "", false],
  ["Convergência total traseira", "", "", true],
  ["Ângulo de impulsão", "", "", true],
  ["Setback traseira", "", "", true],
];

function AxleTechnicalIllustration({ title, leftCamber, rightCamber, leftToe, rightToe, rear = false }: any) {
  return (
    <div className="axle-illustration">
      <h3>{title}</h3>
      <div className="axle-label left"><b>{leftCamber || "--"}</b><span>CAMBER</span></div>
      <div className="axle-label right"><b>{rightCamber || "--"}</b><span>CAMBER</span></div>
      <svg viewBox="0 0 520 250" role="img" aria-label={`Representação técnica do ${title.toLowerCase()}`}>
        <defs><linearGradient id={rear ? "metalRear" : "metalFront"} x1="0" x2="1"><stop stopColor="#1c2430"/><stop offset=".5" stopColor="#68717b"/><stop offset="1" stopColor="#151b24"/></linearGradient><marker id={rear ? "arrowRear" : "arrowFront"} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#079447"/></marker></defs>
        <path d="M105 160 L185 120 L260 132 L335 120 L415 160" fill="none" stroke="#28313c" strokeWidth="18" strokeLinecap="round"/>
        <path d="M180 120 L205 83 M340 120 L315 83" fill="none" stroke="#555f6a" strokeWidth="11"/>
        <path d="M205 84 l-10 -12 20 -12 -20 -12 20 -12 -12 -13 M315 84 l10 -12-20 -12 20 -12-20 -12 12 -13" fill="none" stroke="#222a33" strokeWidth="7"/>
        <rect x="80" y="65" width="58" height="142" rx="21" fill={`url(#${rear ? "metalRear" : "metalFront"})`} transform="rotate(-5 109 136)"/>
        <rect x="382" y="65" width="58" height="142" rx="21" fill={`url(#${rear ? "metalRear" : "metalFront"})`} transform="rotate(5 411 136)"/>
        <circle cx="260" cy="132" r="23" fill="#151b24" stroke="#78818c" strokeWidth="6"/>
        <path d="M83 221 H142 M378 221 H437" stroke="#079447" strokeWidth="6" markerEnd={`url(#${rear ? "arrowRear" : "arrowFront"})`}/>
        <path d="M142 232 H83 M437 232 H378" stroke="#079447" strokeWidth="6"/>
        <path d="M109 52 L102 215 M411 52 L418 215" stroke="#df171f" strokeWidth="3" strokeDasharray="7 5"/>
        <text x="260" y="185" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111d2b">{rear ? "TRASEIRA" : "FRENTE"} DO VEÍCULO</text>
      </svg>
      <div className="axle-toe left"><b>{leftToe || "--"}</b><span>CONVERGÊNCIA</span></div>
      <div className="axle-toe right"><b>{rightToe || "--"}</b><span>CONVERGÊNCIA</span></div>
    </div>
  );
}

function GeometryTechnicalReport({ appointment, currentUser, onBack, onContinue, onSave }: any) {
  const storageKey = `geometry-report-${appointment.id ?? appointment.plate ?? appointment.name}`;
  const extraStorageKey = `${storageKey}-extra-fields`;
  const recommendedReviewKm = (() => {
    const digits = String(appointment.km ?? "").replace(/\D/g, "");
    const currentKm = Number(digits);
    return Number.isFinite(currentKm) && currentKm > 0
      ? (currentKm + 10000).toLocaleString("pt-BR")
      : "";
  })();
  const withRecommendedReviewKm = (saved: any) => ({
    ...(saved || {}),
    nextReviewKm: saved?.nextReviewKm || recommendedReviewKm,
  });
  const normalizeGeometryValues = (stored: any) => {
    if (!stored || typeof stored !== "object") return {};
    const rows = Object.values(stored) as any[];
    if (rows.some((row) => row?.beforeLeft !== undefined || row?.afterLeft !== undefined)) return stored;
    const migrated: any = {};
    const oldToNew: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 4, 4: 5, 5: 7, 6: 8, 7: 9, 8: 10 };
    Object.entries(oldToNew).forEach(([oldIndex, newIndex]) => {
      const row: any = stored[Number(oldIndex)];
      if (!row) return;
      migrated[newIndex] = {
        min: row.min ?? "",
        max: row.max ?? "",
        beforeLeft: "",
        beforeRight: "",
        afterLeft: row.left ?? "",
        afterRight: row.right ?? "",
      };
    });
    return migrated;
  };
  const [sourcePdf, setSourcePdf] = useState("");
  const [sourceName, setSourceName] = useState(appointment.geometryReport?.sourceName || "");
  const [technician, setTechnician] = useState(appointment.geometryReport?.technician || appointment.tech || "");
  const [notes, setNotes] = useState(appointment.geometryReport?.notes || "Realizado alinhamento conforme especificação do fabricante.");
  const [readingPdf, setReadingPdf] = useState(false);
  const [savingGeometry, setSavingGeometry] = useState(false);
  const [readMessage, setReadMessage] = useState("");
  const [pendingValues, setPendingValues] = useState<any>(null);
  const [measureEditing, setMeasureEditing] = useState(false);
  const [adminUnlockOpen, setAdminUnlockOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminUnlockError, setAdminUnlockError] = useState("");
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [values, setValues] = useState<any>(() => {
    if (appointment.geometryReport?.values) return normalizeGeometryValues(appointment.geometryReport.values);
    if (typeof window === "undefined") return {};
    try { return normalizeGeometryValues(JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch { return {}; }
  });
  const [extraFields, setExtraFields] = useState<any>(() => {
    if (appointment.geometryReport?.extraFields) return withRecommendedReviewKm(appointment.geometryReport.extraFields);
    if (typeof window === "undefined") return withRecommendedReviewKm({});
    try { return withRecommendedReviewKm(JSON.parse(localStorage.getItem(extraStorageKey) || "{}")); } catch { return withRecommendedReviewKm({}); }
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [storageKey, values]);
  useEffect(() => {
    localStorage.setItem(extraStorageKey, JSON.stringify(extraFields));
  }, [extraStorageKey, extraFields]);
  useEffect(() => () => { if (sourcePdf) URL.revokeObjectURL(sourcePdf); }, [sourcePdf]);
  const numberOf = (value: any) => {
    const raw = String(value ?? "").trim().replace(",", ".");
    const angle = raw.match(/([+-]?\d+)[°º]\s*(\d+)?/);
    if (angle) {
      const negative = angle[1].startsWith("-");
      const decimal = Math.abs(Number(angle[1])) + Number(angle[2] || 0) / 60;
      return negative ? -decimal : decimal;
    }
    const normalized = raw.replace(/[^0-9+-.]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  };
  const stateOf = (value: any, min: any, max: any) => {
    const current = numberOf(value), low = numberOf(min), high = numberOf(max);
    if (current === null || low === null || high === null) return "pending";
    return current >= low && current <= high ? "ok" : "bad";
  };
  const clampAngle = (value: any, scale = 6) => {
    const parsed = numberOf(value);
    return parsed === null ? 0 : Math.max(-14, Math.min(14, parsed * scale));
  };
  const guideColor = (field: number, value: any) => {
    const row = values[field] || {};
    return stateOf(
      value,
      row.min ?? GEOMETRY_FIELDS[field][1],
      row.max ?? GEOMETRY_FIELDS[field][2],
    ) === "ok" ? "#079447" : "#df171f";
  };
  const beforeLeftOf = (row: any) => row?.beforeLeft ?? "";
  const beforeRightOf = (row: any) => row?.beforeRight ?? "";
  const afterLeftOf = (row: any) => row?.afterLeft ?? row?.left ?? "";
  const afterRightOf = (row: any) => row?.afterRight ?? row?.right ?? "";
  const updateValue = (index: number, field: string, value: string) =>
    setValues((current: any) => ({ ...current, [index]: { ...(current[index] || {}), [field]: value } }));
  const updateExtra = (field: string, value: string) =>
    setExtraFields((current: any) => ({ ...current, [field]: value }));
  const formatAngle = (raw: string) => {
    const cleaned = raw.replace(/\s/g, "").replace(",", ".");
    const match = cleaned.match(/([+-]?\d+)[°º](?:(\d+)[\'’′\"”″])?/);
    if (!match) return cleaned;
    const sign = match[1].startsWith("-") ? "-" : "";
    const degrees = String(Math.abs(Number(match[1])));
    const minutes = String(Number(match[2] || 0)).padStart(2, "0");
    return `${sign}${degrees}°${minutes}'`;
  };
  const findGeometryLine = (text: string, pattern: RegExp) =>
    text.split(/\r?\n/).find((line) => pattern.test(line.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) || "";
  const readGeometryText = (text: string) => {
    const definitions: Array<[number, RegExp, boolean]> = [
      [0, /camber dianteir|cambagem dianteir/i, false],
      [1, /caster/i, false],
      [2, /converg.ncia dianteira(?! total)/i, false],
      [3, /converg.ncia total dianteir/i, true],
      [4, /\bkpi\b|sai/i, false],
      [5, /angulo de inclusao/i, false],
      [6, /setback dianteir/i, true],
      [7, /camber traseir|cambagem traseir/i, false],
      [8, /converg.ncia traseira(?! total)/i, false],
      [9, /converg.ncia total traseir/i, true],
      [10, /angulo de (impulsao|empurrao)/i, true],
      [11, /setback traseir/i, true],
    ];
    const next: any = {};
    let recognized = 0;
    definitions.forEach(([index, pattern, single]) => {
      const line = findGeometryLine(text, pattern);
      const angles = line.match(/[+-]?\d+[°º]\s*\d*[\'’′\"”″]?/g) || [];
      if (!single && angles.length >= 6) {
        next[index] = {
          ...(values[index] || {}),
          min: formatAngle(angles[0]),
          max: formatAngle(angles[1]),
          beforeLeft: formatAngle(angles[angles.length - 4]),
          afterLeft: formatAngle(angles[angles.length - 3]),
          beforeRight: formatAngle(angles[angles.length - 2]),
          afterRight: formatAngle(angles[angles.length - 1]),
        };
        recognized += 4;
      } else if (single && angles.length >= 4) {
        next[index] = {
          ...(values[index] || {}),
          min: formatAngle(angles[0]),
          max: formatAngle(angles[1]),
          beforeLeft: formatAngle(angles[angles.length - 2]),
          beforeRight: "",
          afterLeft: formatAngle(angles[angles.length - 1]),
          afterRight: "",
        };
        recognized += 2;
      } else if (!single && angles.length >= 4) {
        next[index] = {
          ...(values[index] || {}),
          min: formatAngle(angles[0]),
          max: formatAngle(angles[1]),
          beforeLeft: "",
          beforeRight: "",
          afterLeft: formatAngle(angles[angles.length - 2]),
          afterRight: formatAngle(angles[angles.length - 1]),
        };
        recognized += 2;
      }
    });
    return { next, recognized };
  };
  const readGeometryMetadata = (text: string) => {
    const normalized = text.replace(/\u00a0/g, " ");
    const rimMatch = normalized.match(/(?:tamanho\s+do\s+aro|\baro\b)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d)?)/i);
    return rimMatch ? { rim: rimMatch[1].replace(",", ".") } : {};
  };
  const scanPdf = async (file: File) => {
    setReadingPdf(true);
    setReadMessage("Preparando a página do laudo...");
    try {
      const pdfjs: any = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const textRows: Array<{ y: number; parts: Array<{ x: number; text: string }> }> = [];
      (textContent.items || []).forEach((item: any) => {
        const text = String(item.str || "").trim();
        if (!text) return;
        const x = Number(item.transform?.[4] || 0);
        const y = Number(item.transform?.[5] || 0);
        let row = textRows.find((candidate) => Math.abs(candidate.y - y) < 2.5);
        if (!row) { row = { y, parts: [] }; textRows.push(row); }
        row.parts.push({ x, text });
      });
      const embeddedText = textRows
        .sort((a, b) => b.y - a.y)
        .map((row) => row.parts.sort((a, b) => a.x - b.x).map((part) => part.text).join(" "))
        .join("\n");
      const embeddedReading = readGeometryText(embeddedText);
      if (embeddedReading.recognized >= 4) {
        const metadata = readGeometryMetadata(embeddedText);
        if (Object.keys(metadata).length) setExtraFields((current:any) => ({ ...current, ...metadata }));
        setPendingValues(embeddedReading.next);
        setReadMessage(`${embeddedReading.recognized} medidas reconhecidas diretamente do PDF. Confira a tela de confirmação antes de importar.`);
        return;
      }
      const viewport = page.getViewport({ scale: 2.4 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Não foi possível preparar a imagem do PDF.");
      await page.render({ canvasContext: context, viewport }).promise;
      setReadMessage("Lendo textos e medidas do alinhador...");
      const { createWorker }: any = await import("tesseract.js");
      const worker = await createWorker("por");
      const result = await worker.recognize(canvas);
      await worker.terminate();
      const { next, recognized } = readGeometryText(result.data.text || "");
      const metadata = readGeometryMetadata(result.data.text || "");
      if (Object.keys(metadata).length) setExtraFields((current:any) => ({ ...current, ...metadata }));
      setPendingValues(recognized ? next : null);
      setReadMessage(
        recognized
          ? `${recognized} medidas reconhecidas. Confira a tela de confirmação antes de importar.`
          : "O PDF foi importado, mas as medidas não foram reconhecidas com segurança. Preencha ou corrija os campos abaixo.",
      );
    } catch (error: any) {
      setReadMessage(`Não foi possível concluir a leitura automática: ${error?.message || "erro desconhecido"}. Confira as medidas manualmente.`);
    } finally {
      setReadingPdf(false);
    }
  };
  const importPdf = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (sourcePdf) URL.revokeObjectURL(sourcePdf);
    setSourcePdf(URL.createObjectURL(file));
    setSourceName(file.name);
    await scanPdf(file);
  };
  const printGeometry = () => {
    const report = document.querySelector(".geometry-template-sheet") as HTMLElement | null;
    if (!report) { setReadMessage("Não foi possível localizar o laudo para impressão."); return; }
    const printWindow = window.open("", "_blank", "width=980,height=1080");
    if (!printWindow) {
      setReadMessage("O navegador bloqueou a janela de impressão. Permita pop-ups para este site e clique novamente.");
      return;
    }
    const copy = report.cloneNode(true) as HTMLElement;
    const originalFields = report.querySelectorAll("input, textarea");
    const copiedFields = copy.querySelectorAll("input, textarea");
    originalFields.forEach((field: any, index) => {
      const copied: any = copiedFields[index];
      if (!copied) return;
      if (copied.tagName === "TEXTAREA") copied.textContent = field.value;
      else copied.setAttribute("value", field.value);
    });
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join("\n");
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><base href="${window.location.origin}/"><title>Laudo de geometria - ${appointment.client || appointment.name || "Cliente"}</title>${styles}<style>html,body{margin:0!important;padding:0!important;background:#fff!important}.geometry-template-sheet{display:block!important;width:210mm!important;max-width:none!important;height:297mm!important;min-height:297mm!important;margin:0!important;padding:5mm!important;box-shadow:none!important;overflow:hidden!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.geometry-template-sheet input,.geometry-template-sheet textarea{outline:0!important}@page{size:A4 portrait;margin:0}</style></head><body>${copy.outerHTML}</body></html>`);
    printWindow.document.close();
    let opened = false;
    const openDialog = () => {
      if (opened) return;
      opened = true;
      printWindow.focus();
      printWindow.print();
    };
    printWindow.addEventListener("load", () => window.setTimeout(openDialog, 250), { once: true });
    window.setTimeout(openDialog, 700);
    setReadMessage("A impressão foi aberta em uma nova janela. Escolha a impressora ou Salvar como PDF.");
  };
  const saveGeometry = async () => {
    if (savingGeometry) return false;
    setSavingGeometry(true);
    setReadMessage("Salvando o laudo no sistema compartilhado...");
    try {
      if (!onSave) throw new Error("Não foi possível acessar o salvamento compartilhado.");
      await onSave({ schemaVersion: 3, values, technician, notes, sourceName, extraFields });
      setReadMessage("Laudo salvo e confirmado no sistema. Ele já pode ser aberto em outro computador.");
      return true;
    } catch (error: any) {
      setReadMessage(error?.message || "Não foi possível confirmar o salvamento do laudo.");
      return false;
    } finally {
      setSavingGeometry(false);
    }
  };
  const openMeasureUnlock = () => {
    if (measureEditing) {
      setMeasureEditing(false);
      setReadMessage("Quadro de medidas bloqueado novamente.");
      return;
    }
    setAdminUnlockError("");
    setAdminPassword("");
    setAdminUnlockOpen(true);
  };
  const unlockMeasureEditing = (event: any) => {
    event.preventDefault();
    if (checkingAdmin) return;
    setCheckingAdmin(true);
    setAdminUnlockError("");
    if (adminPassword !== "3010") {
      setAdminUnlockError("Senha de edição incorreta.");
      setCheckingAdmin(false);
      return;
    }
    setMeasureEditing(true);
    setAdminUnlockOpen(false);
    setAdminPassword("");
    setCheckingAdmin(false);
    setReadMessage("Edição das medidas liberada. Revise os valores e salve o laudo ao concluir.");
  };
  const renderMeasureRow = ([label, defaultMin, defaultMax, single]: any, index: number) => {
    const row = values[index] || {};
    const min = row.min ?? defaultMin;
    const max = row.max ?? defaultMax;
    if (single) return <div className="a4-measure-row single" key={label}>
      <b>{label}</b>
      <input readOnly={!measureEditing} className={stateOf(beforeLeftOf(row),min,max)} value={beforeLeftOf(row)} onChange={(e)=>updateValue(index,"beforeLeft",e.target.value)}/>
      <span><input readOnly={!measureEditing} value={min} onChange={(e)=>updateValue(index,"min",e.target.value)}/> a <input readOnly={!measureEditing} value={max} onChange={(e)=>updateValue(index,"max",e.target.value)}/></span>
      <input readOnly={!measureEditing} className={stateOf(afterLeftOf(row),min,max)} value={afterLeftOf(row)} onChange={(e)=>updateValue(index,"afterLeft",e.target.value)}/>
    </div>;
    return <div className="a4-measure-row" key={label}>
      <b>{label}</b>
      <input readOnly={!measureEditing} className={stateOf(beforeLeftOf(row),min,max)} value={beforeLeftOf(row)} onChange={(e)=>updateValue(index,"beforeLeft",e.target.value)}/>
      <input readOnly={!measureEditing} className={stateOf(beforeRightOf(row),min,max)} value={beforeRightOf(row)} onChange={(e)=>updateValue(index,"beforeRight",e.target.value)}/>
      <span><input readOnly={!measureEditing} value={min} onChange={(e)=>updateValue(index,"min",e.target.value)}/> a <input readOnly={!measureEditing} value={max} onChange={(e)=>updateValue(index,"max",e.target.value)}/></span>
      <input readOnly={!measureEditing} className={stateOf(afterLeftOf(row),min,max)} value={afterLeftOf(row)} onChange={(e)=>updateValue(index,"afterLeft",e.target.value)}/>
      <input readOnly={!measureEditing} className={stateOf(afterRightOf(row),min,max)} value={afterRightOf(row)} onChange={(e)=>updateValue(index,"afterRight",e.target.value)}/>
    </div>;
  };
  const measureHead = <div className="a4-measure-head">
    <b className="measure-parameter-head">PARÂMETRO<button type="button" className={`measure-edit-button no-print ${measureEditing ? "unlocked" : ""}`} onClick={openMeasureUnlock} title={measureEditing ? "Bloquear edição das medidas" : "Alterar medidas com senha administrativa"} aria-label={measureEditing ? "Bloquear edição das medidas" : "Alterar medidas com senha administrativa"}>{measureEditing ? "🔒" : "✎"}</button></b>
    <span><strong>ANTES DO AJUSTE</strong><i>ESQ.</i><i>DIR.</i></span>
    <b>ESPECIFICAÇÃO</b>
    <span><strong>APÓS O AJUSTE</strong><i>ESQ.</i><i>DIR.</i></span>
  </div>;
  return (
    <div className="geometry-report-page">
      <div className="geometry-toolbar">
        <span className="geometry-version">Laudo A4 V23</span>
        <button type="button" onClick={onBack}>← Voltar à proposta</button>
        <label className={`pdf-upload ${readingPdf ? "disabled" : ""}`}>{readingPdf ? "Lendo PDF..." : "Importar e ler PDF do alinhador"}<input type="file" accept="application/pdf" onChange={importPdf} disabled={readingPdf}/></label>
        <button type="button" onClick={saveGeometry} disabled={savingGeometry}>{savingGeometry ? "Salvando..." : "Salvar laudo"}</button>
        <button type="button" className="primary print-geometry-button" onClick={printGeometry}>Imprimir / compartilhar PDF</button>
        {onContinue && <button type="button" className="primary" disabled={savingGeometry} onClick={async () => { if (await saveGeometry()) onContinue(); }}>Ir para conferência →</button>}
      </div>
      <details className="geometry-extra-editor" open>
        <summary>Editar dados complementares do laudo</summary>
        <div className="geometry-extra-grid">
          <label>Técnico<input value={technician} onChange={(e)=>setTechnician(e.target.value)}/></label>
          <label>Aro<input value={extraFields.rim || ""} onChange={(e)=>updateExtra("rim",e.target.value)} placeholder="Ex.: 16"/></label>
          <label>Pneu dianteiro esquerdo<input value={extraFields.tireFrontLeft || ""} onChange={(e)=>updateExtra("tireFrontLeft",e.target.value)}/></label>
          <label>Pneu dianteiro direito<input value={extraFields.tireFrontRight || ""} onChange={(e)=>updateExtra("tireFrontRight",e.target.value)}/></label>
          <label>Pneu traseiro esquerdo<input value={extraFields.tireRearLeft || ""} onChange={(e)=>updateExtra("tireRearLeft",e.target.value)}/></label>
          <label>Pneu traseiro direito<input value={extraFields.tireRearRight || ""} onChange={(e)=>updateExtra("tireRearRight",e.target.value)}/></label>
          <label>Ângulo do volante<input value={extraFields.steeringAngle || ""} onChange={(e)=>updateExtra("steeringAngle",e.target.value)}/></label>
          <label>Próxima revisão - data<input value={extraFields.nextReviewDate || ""} onChange={(e)=>updateExtra("nextReviewDate",e.target.value)}/></label>
          <label>Próxima revisão - KM<input value={extraFields.nextReviewKm || ""} onChange={(e)=>updateExtra("nextReviewKm",e.target.value)}/></label>
          <label className="wide">Observações técnicas<textarea value={notes} onChange={(e)=>setNotes(e.target.value)}/></label>
        </div>
        <p>As alterações aparecem automaticamente no laudo abaixo. Clique em <b>Salvar laudo</b> ao terminar.</p>
      </details>
      {readMessage && <div className={`ocr-message ${readingPdf ? "reading" : ""}`}>{readMessage}</div>}
      {pendingValues && (
        <section className="geometry-import-review" role="dialog" aria-modal="true" aria-label="Confirmar medidas lidas do PDF">
          <div className="geometry-import-card">
            <header>
              <div><small>LEITURA DO PDF</small><h2>Confirme as medidas antes de importar</h2></div>
              <button onClick={() => setPendingValues(null)} aria-label="Fechar conferência">×</button>
            </header>
            <p>Confira os valores lidos no relatório do alinhador. Eles só serão aplicados ao laudo depois da confirmação.</p>
            <div className="import-measure-table">
              <div className="import-measure-row heading"><b>Parâmetro</b><b>Antes E.</b><b>Antes D.</b><b>Especificação</b><b>Após E.</b><b>Após D.</b></div>
              {GEOMETRY_FIELDS.map(([label, defaultMin, defaultMax, single], index) => {
                const row = pendingValues[index] || {};
                if (!pendingValues[index]) return null;
                return <div className={`import-measure-row ${single ? "single" : ""}`} key={label}>
                  <b>{label}</b>
                  <input value={row.beforeLeft || ""} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],beforeLeft:e.target.value}}))}/>
                  {!single && <input value={row.beforeRight || ""} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],beforeRight:e.target.value}}))}/>} 
                  <span><input value={row.min ?? defaultMin} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],min:e.target.value}}))}/> a <input value={row.max ?? defaultMax} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],max:e.target.value}}))}/></span>
                  <input value={row.afterLeft || ""} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],afterLeft:e.target.value}}))}/>
                  {!single && <input value={row.afterRight || ""} onChange={(e) => setPendingValues((current:any) => ({...current,[index]:{...current[index],afterRight:e.target.value}}))}/>} 
                </div>;
              })}
            </div>
            <footer>
              <button onClick={() => { setPendingValues(null); setReadMessage("Importação cancelada. Nenhuma medida foi alterada."); }}>Cancelar</button>
              <button className="primary" onClick={() => {
                setValues((current:any) => ({...current,...pendingValues}));
                setPendingValues(null);
                setReadMessage("Medidas confirmadas e importadas para o laudo. Confira o resultado e salve.");
              }}>Confirmar e importar medidas</button>
            </footer>
          </div>
        </section>
      )}
      {adminUnlockOpen && (
        <section className="geometry-admin-unlock no-print" role="dialog" aria-modal="true" aria-labelledby="admin-unlock-title">
          <form onSubmit={unlockMeasureEditing}>
            <header>
              <div><small>EDIÇÃO PROTEGIDA</small><h2 id="admin-unlock-title">Liberar alteração das medidas</h2></div>
              <button type="button" onClick={() => setAdminUnlockOpen(false)} aria-label="Fechar">×</button>
            </header>
            <p>Digite a senha exclusiva para liberar a alteração das medidas.</p>
            <label>Senha de edição<input type="password" inputMode="numeric" maxLength={4} value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value.replace(/\D/g,""))} autoComplete="off" required autoFocus/></label>
            {adminUnlockError && <p className="geometry-admin-error" role="alert">{adminUnlockError}</p>}
            <footer><button type="button" onClick={() => setAdminUnlockOpen(false)}>Cancelar</button><button type="submit" className="primary" disabled={checkingAdmin}>{checkingAdmin ? "Conferindo..." : "Liberar edição"}</button></footer>
          </form>
        </section>
      )}
      <article className={`geometry-template-sheet geometry-a4-sheet ${measureEditing ? "measure-editing" : ""}`}>
        <header className="a4-report-header">
          <div className="a4-brand"><img src="/logo-monocenter.jpg" alt="Monocenter Alinhamento Técnico"/></div>
          <div className="a4-title"><b>LAUDO TÉCNICO DE GEOMETRIA</b><span>ALINHAMENTO 3D</span></div>
        </header>
        <section className="a4-customer-data">
          <div className="data-client"><small>CLIENTE</small><b>{appointment.client || appointment.name || "Não informado"}</b></div>
          <div className="data-vehicle"><small>VEÍCULO</small><b>{appointment.vehicle || appointment.model || "Não informado"}</b></div>
          <div className="data-year"><small>ANO / MODELO</small><b>{appointment.vehicleYear || appointment.year || "Não informado"}</b></div>
          <div className="data-plate"><small>PLACA</small><b>{appointment.plate || "Não informada"}</b></div>
          <div className="data-km"><small>KM</small><b>{appointment.km || "Não informado"}</b></div>
          <div className="data-rim"><small>ARO</small><b>{extraFields.rim || (appointment as any).rim || "Não informado"}</b></div>
          <div className="data-chassis"><small>CHASSI</small><b>{appointment.chassis || "Não informado"}</b></div>
          <div className="data-date"><small>DATA / HORA</small><b>{new Date().toLocaleDateString("pt-BR")} · {new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</b></div>
          <label className="data-tech"><small>TÉCNICO</small><input value={technician} onChange={(e)=>setTechnician(e.target.value)} placeholder="Nome do técnico"/></label>
        </section>

        <section className="a4-axis-section front">
          <h2>EIXO DIANTEIRO</h2>
          <div className="a4-axis-grid">
            <div className="a4-axle-visual">
              <div className="a4-angle-strip four">
                <span className={stateOf(afterLeftOf(values[0]),values[0]?.min??GEOMETRY_FIELDS[0][1],values[0]?.max??GEOMETRY_FIELDS[0][2])}><small>CAMBER E.</small><b>{afterLeftOf(values[0]) || "—"}</b></span>
                <span className={stateOf(afterLeftOf(values[1]),values[1]?.min??GEOMETRY_FIELDS[1][1],values[1]?.max??GEOMETRY_FIELDS[1][2])}><small>CASTER E.</small><b>{afterLeftOf(values[1]) || "—"}</b></span>
                <span className={stateOf(afterRightOf(values[1]),values[1]?.min??GEOMETRY_FIELDS[1][1],values[1]?.max??GEOMETRY_FIELDS[1][2])}><small>CASTER D.</small><b>{afterRightOf(values[1]) || "—"}</b></span>
                <span className={stateOf(afterRightOf(values[0]),values[0]?.min??GEOMETRY_FIELDS[0][1],values[0]?.max??GEOMETRY_FIELDS[0][2])}><small>CAMBER D.</small><b>{afterRightOf(values[0]) || "—"}</b></span>
              </div>
              <div className="a4-mechanical-image">
                <img src="/eixo-dianteiro-laudo.png" alt="Conjunto técnico do eixo dianteiro"/>
                <svg viewBox="0 0 600 250" preserveAspectRatio="none" aria-hidden="true">
                  <defs><marker id="a4fg" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#07883e"/></marker><marker id="a4fr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#d71920"/></marker></defs>
                  <g className="angle-reference"><line x1="88" y1="214" x2="88" y2="58"/><line x1="512" y1="214" x2="512" y2="58"/><line x1="197" y1="174" x2="163" y2="52"/><line x1="403" y1="174" x2="437" y2="52"/></g>
                  {afterLeftOf(values[0]) && <line className="angle-measure" x1="88" y1="214" x2="88" y2="58" stroke={guideColor(0,afterLeftOf(values[0]))} markerEnd={stateOf(afterLeftOf(values[0]),values[0]?.min??GEOMETRY_FIELDS[0][1],values[0]?.max??GEOMETRY_FIELDS[0][2])==="ok"?"url(#a4fg)":"url(#a4fr)"} transform={`rotate(${clampAngle(afterLeftOf(values[0]),-4)} 88 214)`}/>} 
                  {afterRightOf(values[0]) && <line className="angle-measure" x1="512" y1="214" x2="512" y2="58" stroke={guideColor(0,afterRightOf(values[0]))} markerEnd={stateOf(afterRightOf(values[0]),values[0]?.min??GEOMETRY_FIELDS[0][1],values[0]?.max??GEOMETRY_FIELDS[0][2])==="ok"?"url(#a4fg)":"url(#a4fr)"} transform={`rotate(${clampAngle(afterRightOf(values[0]),4)} 512 214)`}/>} 
                  {afterLeftOf(values[1]) && <line className="angle-measure" x1="197" y1="174" x2="163" y2="52" stroke={guideColor(1,afterLeftOf(values[1]))} markerEnd={stateOf(afterLeftOf(values[1]),values[1]?.min??GEOMETRY_FIELDS[1][1],values[1]?.max??GEOMETRY_FIELDS[1][2])==="ok"?"url(#a4fg)":"url(#a4fr)"} transform={`rotate(${clampAngle(afterLeftOf(values[1]),-1.4)} 197 174)`}/>} 
                  {afterRightOf(values[1]) && <line className="angle-measure" x1="403" y1="174" x2="437" y2="52" stroke={guideColor(1,afterRightOf(values[1]))} markerEnd={stateOf(afterRightOf(values[1]),values[1]?.min??GEOMETRY_FIELDS[1][1],values[1]?.max??GEOMETRY_FIELDS[1][2])==="ok"?"url(#a4fg)":"url(#a4fr)"} transform={`rotate(${clampAngle(afterRightOf(values[1]),1.4)} 403 174)`}/>} 
                  {afterLeftOf(values[0]) && <text className="guide-label" x="88" y="38" textAnchor="middle" fill={guideColor(0,afterLeftOf(values[0]))}>CAMBER E.</text>}
                  {afterLeftOf(values[1]) && <text className="guide-label caster-label" x="190" y="38" textAnchor="middle" fill={guideColor(1,afterLeftOf(values[1]))}>CASTER E.</text>}
                  {afterRightOf(values[1]) && <text className="guide-label caster-label" x="410" y="38" textAnchor="middle" fill={guideColor(1,afterRightOf(values[1]))}>CASTER D.</text>}
                  {afterRightOf(values[0]) && <text className="guide-label" x="512" y="38" textAnchor="middle" fill={guideColor(0,afterRightOf(values[0]))}>CAMBER D.</text>}
                  {afterLeftOf(values[2]) && <line className="toe-measure" x1="35" y1="232" x2="137" y2="232" stroke={guideColor(2,afterLeftOf(values[2]))} transform={`rotate(${-clampAngle(afterLeftOf(values[2]),18)} 86 232)`} markerEnd={stateOf(afterLeftOf(values[2]),values[2]?.min??GEOMETRY_FIELDS[2][1],values[2]?.max??GEOMETRY_FIELDS[2][2])==="ok"?"url(#a4fg)":"url(#a4fr)"}/>} 
                  {afterRightOf(values[2]) && <line className="toe-measure" x1="565" y1="232" x2="463" y2="232" stroke={guideColor(2,afterRightOf(values[2]))} transform={`rotate(${clampAngle(afterRightOf(values[2]),18)} 514 232)`} markerEnd={stateOf(afterRightOf(values[2]),values[2]?.min??GEOMETRY_FIELDS[2][1],values[2]?.max??GEOMETRY_FIELDS[2][2])==="ok"?"url(#a4fg)":"url(#a4fr)"}/>} 
                </svg>
              </div>
              <div className="a4-toe-values"><span className={stateOf(afterLeftOf(values[2]),values[2]?.min??GEOMETRY_FIELDS[2][1],values[2]?.max??GEOMETRY_FIELDS[2][2])}>CONVERGÊNCIA E. <b>{afterLeftOf(values[2]) || "—"}</b></span><span className={stateOf(afterRightOf(values[2]),values[2]?.min??GEOMETRY_FIELDS[2][1],values[2]?.max??GEOMETRY_FIELDS[2][2])}>CONVERGÊNCIA D. <b>{afterRightOf(values[2]) || "—"}</b></span></div>
            </div>
            <div className="a4-measure-table">
              {measureHead}
              {GEOMETRY_FIELDS.slice(0,7).map((field,index)=>renderMeasureRow(field,index))}
            </div>
          </div>
        </section>

        <section className="a4-axis-section rear">
          <h2>EIXO TRASEIRO</h2>
          <div className="a4-axis-grid">
            <div className="a4-axle-visual">
              <div className="a4-angle-strip two"><span className={stateOf(afterLeftOf(values[7]),values[7]?.min??GEOMETRY_FIELDS[7][1],values[7]?.max??GEOMETRY_FIELDS[7][2])}><small>CAMBER E.</small><b>{afterLeftOf(values[7]) || "—"}</b></span><span className={stateOf(afterRightOf(values[7]),values[7]?.min??GEOMETRY_FIELDS[7][1],values[7]?.max??GEOMETRY_FIELDS[7][2])}><small>CAMBER D.</small><b>{afterRightOf(values[7]) || "—"}</b></span></div>
              <div className="a4-mechanical-image rear-image">
                <img src="/eixo-traseiro-laudo.png" alt="Conjunto técnico do eixo traseiro"/>
                <svg viewBox="0 0 600 230" preserveAspectRatio="none" aria-hidden="true">
                  <defs><marker id="a4rg" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#07883e"/></marker><marker id="a4rr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#d71920"/></marker></defs>
                  <g className="angle-reference"><line x1="88" y1="198" x2="88" y2="50"/><line x1="512" y1="198" x2="512" y2="50"/></g>
                  {afterLeftOf(values[7]) && <line className="angle-measure" x1="88" y1="198" x2="88" y2="50" stroke={guideColor(7,afterLeftOf(values[7]))} markerEnd={stateOf(afterLeftOf(values[7]),values[7]?.min??GEOMETRY_FIELDS[7][1],values[7]?.max??GEOMETRY_FIELDS[7][2])==="ok"?"url(#a4rg)":"url(#a4rr)"} transform={`rotate(${clampAngle(afterLeftOf(values[7]),-4)} 88 198)`}/>} 
                  {afterRightOf(values[7]) && <line className="angle-measure" x1="512" y1="198" x2="512" y2="50" stroke={guideColor(7,afterRightOf(values[7]))} markerEnd={stateOf(afterRightOf(values[7]),values[7]?.min??GEOMETRY_FIELDS[7][1],values[7]?.max??GEOMETRY_FIELDS[7][2])==="ok"?"url(#a4rg)":"url(#a4rr)"} transform={`rotate(${clampAngle(afterRightOf(values[7]),4)} 512 198)`}/>} 
                  {afterLeftOf(values[7]) && <text className="guide-label" x="88" y="32" textAnchor="middle" fill={guideColor(7,afterLeftOf(values[7]))}>CAMBER E.</text>}
                  {afterRightOf(values[7]) && <text className="guide-label" x="512" y="32" textAnchor="middle" fill={guideColor(7,afterRightOf(values[7]))}>CAMBER D.</text>}
                  {afterLeftOf(values[8]) && <line className="toe-measure" x1="70" y1="220" x2="175" y2="220" stroke={guideColor(8,afterLeftOf(values[8]))} transform={`rotate(${-clampAngle(afterLeftOf(values[8]),18)} 122.5 220)`} markerEnd={stateOf(afterLeftOf(values[8]),values[8]?.min??GEOMETRY_FIELDS[8][1],values[8]?.max??GEOMETRY_FIELDS[8][2])==="ok"?"url(#a4rg)":"url(#a4rr)"}/>} 
                  {afterRightOf(values[8]) && <line className="toe-measure" x1="530" y1="220" x2="425" y2="220" stroke={guideColor(8,afterRightOf(values[8]))} transform={`rotate(${clampAngle(afterRightOf(values[8]),18)} 477.5 220)`} markerEnd={stateOf(afterRightOf(values[8]),values[8]?.min??GEOMETRY_FIELDS[8][1],values[8]?.max??GEOMETRY_FIELDS[8][2])==="ok"?"url(#a4rg)":"url(#a4rr)"}/>} 
                </svg>
              </div>
              <div className="a4-toe-values"><span className={stateOf(afterLeftOf(values[8]),values[8]?.min??GEOMETRY_FIELDS[8][1],values[8]?.max??GEOMETRY_FIELDS[8][2])}>CONVERGÊNCIA E. <b>{afterLeftOf(values[8]) || "—"}</b></span><span className={stateOf(afterRightOf(values[8]),values[8]?.min??GEOMETRY_FIELDS[8][1],values[8]?.max??GEOMETRY_FIELDS[8][2])}>CONVERGÊNCIA D. <b>{afterRightOf(values[8]) || "—"}</b></span></div>
            </div>
            <div className="a4-measure-table rear-table">
              {measureHead}
              {GEOMETRY_FIELDS.slice(7).map((field,offset)=>renderMeasureRow(field,offset+7))}
            </div>
          </div>
        </section>

        <section className="a4-extra-data">
          <div className="a4-extra-card"><h3>CONDIÇÃO DOS PNEUS</h3><label>Dianteiro esquerdo<input value={extraFields.tireFrontLeft||""} onChange={(e)=>updateExtra("tireFrontLeft",e.target.value)}/></label><label>Dianteiro direito<input value={extraFields.tireFrontRight||""} onChange={(e)=>updateExtra("tireFrontRight",e.target.value)}/></label><label>Traseiro esquerdo<input value={extraFields.tireRearLeft||""} onChange={(e)=>updateExtra("tireRearLeft",e.target.value)}/></label><label>Traseiro direito<input value={extraFields.tireRearRight||""} onChange={(e)=>updateExtra("tireRearRight",e.target.value)}/></label></div>
          <div className="a4-extra-card steering"><h3>ÂNGULO DO VOLANTE</h3><label>Posição / medida<input value={extraFields.steeringAngle||""} onChange={(e)=>updateExtra("steeringAngle",e.target.value)}/></label><div className="steering-status">VOLANTE CENTRALIZADO</div></div>
        </section>
        <p className="a4-unit-note"><b>UNIDADE DAS MEDIDAS:</b> sistema sexagesimal (60 graus): 1 grau (1°) corresponde a 60 minutos (60').</p>
        <section className="a4-report-footer">
          <label><b>OBSERVAÇÕES TÉCNICAS</b><textarea value={notes} onChange={(e)=>setNotes(e.target.value)}/></label>
          <div><b>PRÓXIMA REVISÃO</b><label>Data<input value={extraFields.nextReviewDate||""} onChange={(e)=>updateExtra("nextReviewDate",e.target.value)}/></label><label>KM<input value={extraFields.nextReviewKm||""} onChange={(e)=>updateExtra("nextReviewKm",e.target.value)}/></label></div>
        </section>
        <footer className="a4-address">MONOCENTER ALINHAMENTO TÉCNICO · Av. Itavuvu, 5341 · Jd. Santa Cecília · Sorocaba/SP</footer>
      </article>

      <article className="legacy-geometry-template">
        <img className="geometry-template-bg" src="/laudo-geometria-template.png" alt="Laudo técnico de geometria Monocenter no modelo oficial"/>
        <div className="geometry-official-logo" aria-label="Logo oficial Monocenter">
          <img src="/logo-monocenter.jpg" alt="Monocenter Alinhamento Técnico"/>
        </div>
        <div className="geometry-template-overlay">
          <b className="header-value" style={{left:"14.4%",top:"10.15%"}}>{appointment.client || appointment.name || ""}</b>
          <b className="header-value" style={{left:"14.4%",top:"12.2%"}}>{appointment.vehicle || appointment.model || ""}</b>
          <b className="header-value" style={{left:"14.4%",top:"14.25%"}}>{appointment.vehicleYear || appointment.year || ""}</b>
          <b className="header-value" style={{left:"14.4%",top:"16.3%"}}>{appointment.plate || ""}</b>
          <b className="header-value right" style={{left:"50.8%",top:"10.15%"}}>{appointment.km || ""}</b>
          <b className="header-value right" style={{left:"50.8%",top:"12.2%"}}>{appointment.chassis || ""}</b>
          <b className="header-value date" style={{left:"50.8%",top:"14.25%"}}>{new Date().toLocaleDateString("pt-BR")}</b>
          <b className="header-value time" style={{left:"65.2%",top:"14.25%"}}>{new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</b>
          <b className="header-value right" style={{left:"50.8%",top:"16.3%"}}>{technician}</b>
          {[
            [0,"23.2%"],[1,"26.9%"],[2,"30.7%"],[3,"34.4%"],[4,"37.5%"],
            [5,"56.8%"],[6,"60.7%"],[7,"63.5%"],[8,"65.4%"],
          ].flatMap(([field,top]:any)=>{
            const row=values[field]||{}, min=row.min??GEOMETRY_FIELDS[field][1], max=row.max??GEOMETRY_FIELDS[field][2];
            return [
              <b key={`${field}-l`} className={`cell-value ${stateOf(row.left,min,max)}`} style={{left:"70.8%",top}}>{row.left||""}</b>,
              <b key={`${field}-s`} className="cell-spec" style={{left:"81.7%",top}}>{min} a {max}</b>,
              <b key={`${field}-r`} className={`cell-value ${stateOf(row.right,min,max)}`} style={{left:"93.0%",top}}>{row.right||""}</b>,
            ];
          })}
          <input className="editable-report-field chassis-a" aria-label="Diagonal esquerda A" placeholder="Editar" value={extraFields.chassisA || ""} onChange={(e)=>updateExtra("chassisA",e.target.value)}/>
          <input className="editable-report-field chassis-b" aria-label="Diagonal direita B" placeholder="Editar" value={extraFields.chassisB || ""} onChange={(e)=>updateExtra("chassisB",e.target.value)}/>
          <input className="editable-report-field chassis-difference" aria-label="Diferença A menos B" placeholder="Editar" value={extraFields.chassisDifference || ""} onChange={(e)=>updateExtra("chassisDifference",e.target.value)}/>
          <input className="editable-report-field wheelbase-front" aria-label="Entre eixos dianteiro" placeholder="Editar" value={extraFields.wheelbaseFront || ""} onChange={(e)=>updateExtra("wheelbaseFront",e.target.value)}/>
          <input className="editable-report-field wheelbase-rear" aria-label="Entre eixos traseiro" placeholder="Editar" value={extraFields.wheelbaseRear || ""} onChange={(e)=>updateExtra("wheelbaseRear",e.target.value)}/>
          <input className="editable-report-field track-front" aria-label="Bitola dianteira" placeholder="Editar" value={extraFields.trackFront || ""} onChange={(e)=>updateExtra("trackFront",e.target.value)}/>
          <input className="editable-report-field track-rear" aria-label="Bitola traseira" placeholder="Editar" value={extraFields.trackRear || ""} onChange={(e)=>updateExtra("trackRear",e.target.value)}/>
          <input className="editable-report-field tire-front-left" aria-label="Condição pneu dianteiro esquerdo" placeholder="Editar" value={extraFields.tireFrontLeft || ""} onChange={(e)=>updateExtra("tireFrontLeft",e.target.value)}/>
          <input className="editable-report-field tire-front-right" aria-label="Condição pneu dianteiro direito" placeholder="Editar" value={extraFields.tireFrontRight || ""} onChange={(e)=>updateExtra("tireFrontRight",e.target.value)}/>
          <input className="editable-report-field tire-rear-left" aria-label="Condição pneu traseiro esquerdo" placeholder="Editar" value={extraFields.tireRearLeft || ""} onChange={(e)=>updateExtra("tireRearLeft",e.target.value)}/>
          <input className="editable-report-field tire-rear-right" aria-label="Condição pneu traseiro direito" placeholder="Editar" value={extraFields.tireRearRight || ""} onChange={(e)=>updateExtra("tireRearRight",e.target.value)}/>
          <input className="editable-report-field steering-angle" aria-label="Ângulo do volante" placeholder="Editar" value={extraFields.steeringAngle || ""} onChange={(e)=>updateExtra("steeringAngle",e.target.value)}/>
          <input className="editable-report-field next-review-date" aria-label="Data da próxima revisão" placeholder="Data" value={extraFields.nextReviewDate || ""} onChange={(e)=>updateExtra("nextReviewDate",e.target.value)}/>
          <input className="editable-report-field next-review-km" aria-label="Quilometragem da próxima revisão" placeholder="KM" value={extraFields.nextReviewKm || ""} onChange={(e)=>updateExtra("nextReviewKm",e.target.value)}/>
          <textarea className="editable-report-field template-notes" aria-label="Observações técnicas" value={notes} onChange={(e)=>setNotes(e.target.value)}/>
        </div>
      </article>
      <article className="geometry-sheet geometry-entry-sheet" aria-hidden="true">
        <header className="geometry-header">
          <div><strong>MONOCENTER</strong><small>ALINHAMENTO TÉCNICO</small></div>
          <h1>LAUDO TÉCNICO<br/>DE GEOMETRIA <small>ALINHAMENTO 3D</small></h1>
        </header>
        <section className="geometry-customer">
          <p><small>CLIENTE</small><b>{appointment.client || appointment.name || "Não informado"}</b></p>
          <p><small>VEÍCULO</small><b>{appointment.vehicle || appointment.model || "Não informado"}</b></p>
          <p><small>PLACA</small><b>{appointment.plate || "Não informada"}</b></p>
          <p><small>KM</small><b>{appointment.km || "Não informado"}</b></p>
          <p><small>DATA</small><b>{new Date().toLocaleDateString("pt-BR")}</b></p>
          <label><small>TÉCNICO</small><input value={technician} onChange={(e) => setTechnician(e.target.value)} placeholder="Nome do técnico"/></label>
        </section>
        <div className="geometry-legend"><span className="ok">■ Dentro da especificação</span><span className="bad">■ Fora da especificação</span></div>
        <section className="geometry-axis">
          <h2>EIXO DIANTEIRO</h2>
          <AxleTechnicalIllustration title="EIXO DIANTEIRO" leftCamber={values[0]?.left} rightCamber={values[0]?.right} leftToe={values[2]?.left} rightToe={values[2]?.right}/>
          <div className="geometry-table">
            <div className="geometry-row heading"><b>PARÂMETRO</b><b>ESQUERDA</b><b>ESPECIFICAÇÃO</b><b>DIREITA</b></div>
            {GEOMETRY_FIELDS.slice(0, 4).map(([label, defaultMin, defaultMax], index) => {
              const row = values[index] || {}, min = row.min ?? defaultMin, max = row.max ?? defaultMax;
              const leftState = stateOf(row.left, min, max), rightState = stateOf(row.right, min, max);
              return <div className="geometry-row" key={label}>
                <b>{label}</b>
                <input className={leftState} value={row.left || ""} onChange={(e) => updateValue(index,"left",e.target.value)} placeholder="0,00°"/>
                <span><input value={min} onChange={(e) => updateValue(index,"min",e.target.value)}/> a <input value={max} onChange={(e) => updateValue(index,"max",e.target.value)}/></span>
                <input className={rightState} value={row.right || ""} onChange={(e) => updateValue(index,"right",e.target.value)} placeholder="0,00°"/>
              </div>;
            })}
          </div>
        </section>
        <section className="geometry-axis rear-axis">
          <h2>EIXO TRASEIRO</h2>
          <AxleTechnicalIllustration rear title="EIXO TRASEIRO" leftCamber={values[4]?.left} rightCamber={values[4]?.right} leftToe={values[5]?.left} rightToe={values[5]?.right}/>
          <div className="geometry-table">
            <div className="geometry-row heading"><b>PARÂMETRO</b><b>ESQUERDA</b><b>ESPECIFICAÇÃO</b><b>DIREITA</b></div>
            {GEOMETRY_FIELDS.slice(4).map(([label, defaultMin, defaultMax], offset) => {
              const index = offset + 4, row = values[index] || {}, min = row.min ?? defaultMin, max = row.max ?? defaultMax;
              const leftState = stateOf(row.left, min, max), rightState = stateOf(row.right, min, max);
              return <div className="geometry-row" key={label}>
                <b>{label}</b>
                <input className={leftState} value={row.left || ""} onChange={(e) => updateValue(index,"left",e.target.value)} placeholder="0,00°"/>
                <span><input value={min} onChange={(e) => updateValue(index,"min",e.target.value)}/> a <input value={max} onChange={(e) => updateValue(index,"max",e.target.value)}/></span>
                <input className={rightState} value={row.right || ""} onChange={(e) => updateValue(index,"right",e.target.value)} placeholder="0,00°"/>
              </div>;
            })}
          </div>
          <div className="rear-summary">
            <p><small>CONVERGÊNCIA TOTAL</small><b className={stateOf(values[6]?.left, values[6]?.min ?? "-0.20", values[6]?.max ?? "0.40")}>{values[6]?.left || "--"}</b></p>
            <p><small>ÂNGULO DE IMPULSÃO</small><b className={stateOf(values[7]?.left, values[7]?.min ?? "-0.15", values[7]?.max ?? "0.15")}>{values[7]?.left || "--"}</b></p>
          </div>
        </section>
        <section className="geometry-notes"><h3>OBSERVAÇÕES TÉCNICAS</h3><textarea value={notes} onChange={(e) => setNotes(e.target.value)}/><aside><b>PRÓXIMA REVISÃO</b><span>A cada 10.000 km<br/>ou 6 meses.</span></aside></section>
      </article>
      {sourcePdf && <section className="source-pdf"><h3>PDF original do alinhador: {sourceName}</h3><object data={sourcePdf} type="application/pdf"><a href={sourcePdf} target="_blank">Abrir PDF original</a></object></section>}
      <style>{`
        .geometry-toolbar{display:flex;gap:10px;align-items:center;justify-content:flex-end;margin-bottom:14px}.geometry-version{margin-right:auto;border-radius:999px;background:#e9f8ef;color:#08783b;padding:7px 11px;font-size:12px;font-weight:900}.geometry-toolbar button,.pdf-upload{border:1px solid #cad2dc;border-radius:9px;background:#fff;padding:11px 14px;font-weight:800;cursor:pointer}.pdf-upload{background:#111d2b;color:#fff}.pdf-upload.disabled{opacity:.65;cursor:wait}.pdf-upload input{display:none}.geometry-extra-editor{max-width:1050px;margin:0 auto 14px;border:1px solid #b9c8da;border-radius:12px;background:#fff;overflow:hidden}.geometry-extra-editor summary{padding:13px 16px;background:#111d2b;color:#fff;font-weight:900;cursor:pointer}.geometry-extra-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px}.geometry-extra-grid label{display:flex;flex-direction:column;gap:5px;color:#344054;font-size:12px;font-weight:800}.geometry-extra-grid input,.geometry-extra-grid textarea{width:100%;box-sizing:border-box;border:1px solid #9fb0c3;border-radius:7px;background:#fff;padding:9px;color:#111;font-size:14px}.geometry-extra-grid .wide{grid-column:1/-1}.geometry-extra-grid textarea{min-height:70px;resize:vertical}.geometry-extra-editor>p{margin:0;padding:0 14px 14px;color:#475467}.ocr-message{max-width:1050px;margin:0 auto 14px;padding:12px 15px;border:1px solid #9dc0f8;border-radius:10px;background:#edf5ff;color:#174c91;font-weight:800}.ocr-message.reading{animation:pulse 1s infinite alternate}@keyframes pulse{to{opacity:.65}}.geometry-import-review{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:#07111dcc}.geometry-import-card{width:min(900px,96vw);max-height:92vh;overflow:auto;border-radius:16px;background:#fff;box-shadow:0 24px 80px #0008}.geometry-import-card>header{display:flex;align-items:flex-start;justify-content:space-between;padding:18px 20px;background:#111d2b;color:#fff;border-bottom:5px solid #e31b23}.geometry-import-card h2{margin:3px 0 0}.geometry-import-card header small{color:#ff4a52;font-weight:900}.geometry-import-card header button{border:0;background:transparent;color:#fff;font-size:30px;line-height:1;cursor:pointer}.geometry-import-card>p{margin:0;padding:15px 20px;background:#edf5ff}.import-measure-table{margin:16px 20px;border:1px solid #d8e0e8}.import-measure-row{display:grid;grid-template-columns:1.45fr .7fr 1.15fr .7fr;border-top:1px solid #d8e0e8}.import-measure-row:first-child{border-top:0}.import-measure-row>*{min-width:0;padding:10px;border:0;border-right:1px solid #d8e0e8}.import-measure-row.heading{background:#111d2b;color:#fff}.import-measure-row input{text-align:center;font-weight:800;background:#f8fafc}.import-measure-row>span{display:flex;align-items:center;justify-content:center;gap:5px}.import-measure-row>span input{width:72px;padding:5px}.geometry-import-card>footer{display:flex;justify-content:flex-end;gap:10px;padding:0 20px 20px}.geometry-import-card>footer button{padding:11px 15px;border:1px solid #cbd5e1;border-radius:9px;background:#fff;font-weight:900}.geometry-import-card>footer .primary{background:#168b4b;color:#fff;border-color:#168b4b}.geometry-sheet{max-width:1050px;margin:auto;background:#fff;border:1px solid #d8e0e8;border-radius:12px;overflow:hidden;box-shadow:0 12px 30px #0f172a14}.geometry-header{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;padding:24px 32px;background:linear-gradient(120deg,#0d1622,#05070a);color:#fff;border-bottom:5px solid #e31b23}.geometry-header>div{display:flex;flex-direction:column}.geometry-header strong{font-size:34px;color:#e31b23;letter-spacing:-1px}.geometry-header small{letter-spacing:4px}.geometry-header h1{margin:0;font-size:31px;line-height:.95;border-left:3px solid #e31b23;padding-left:24px}.geometry-header h1 small{display:block;margin-top:10px;font-size:12px}.geometry-customer{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#d8e0e8;margin:18px}.geometry-customer p,.geometry-customer label{display:flex;flex-direction:column;gap:4px;margin:0;padding:10px 12px;background:#fff}.geometry-customer small{font-weight:800;color:#667085}.geometry-customer input{border:0;border-bottom:1px solid #ccd5df;padding:3px;font-weight:800}.geometry-legend{display:flex;justify-content:flex-end;gap:20px;margin:0 20px 12px;font-weight:800}.geometry-legend .ok{color:#079447}.geometry-legend .bad{color:#df171f}.geometry-axis{margin:0 18px 18px;border:1px solid #d8e0e8}.geometry-axis h2,.geometry-notes h3{margin:0;padding:10px 16px;background:#111d2b;color:#fff;border-left:6px solid #e31b23}.axle-illustration{position:relative;min-height:320px;background:radial-gradient(circle at center,#fff,#eef1f4);overflow:hidden}.axle-illustration>h3{position:absolute;left:50%;top:14px;transform:translateX(-50%);margin:0;color:#111d2b}.axle-illustration svg{display:block;width:100%;height:280px;margin-top:30px}.axle-label,.axle-toe{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;color:#df171f}.axle-label b,.axle-toe b{font-size:22px}.axle-label span,.axle-toe span{font-size:10px;font-weight:900}.axle-label.left{left:10%;top:45px}.axle-label.right{right:10%;top:45px}.axle-toe.left{left:8%;bottom:12px;color:#079447}.axle-toe.right{right:8%;bottom:12px;color:#079447}.geometry-row{display:grid;grid-template-columns:1.35fr .65fr 1fr .65fr;align-items:stretch;border-top:1px solid #d8e0e8}.geometry-row>*{padding:9px;border:0;border-right:1px solid #d8e0e8;min-width:0}.geometry-row.heading{background:#111d2b;color:#fff}.geometry-row input{text-align:center;font-weight:900;font-size:15px;background:#f8fafc}.geometry-row>input.ok,.rear-summary b.ok{color:#07883e;background:#e9f8ef}.geometry-row>input.bad,.rear-summary b.bad{color:#cf121b;background:#fff0f1}.geometry-row>span{display:flex;align-items:center;justify-content:center;gap:4px}.geometry-row>span input{width:48px;padding:3px}.rear-summary{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#d8e0e8}.rear-summary p{display:flex;align-items:center;justify-content:space-between;margin:0;padding:12px;background:#fff}.rear-summary small{font-weight:900}.rear-summary b{padding:5px 10px;border-radius:7px}.geometry-notes{display:grid;grid-template-columns:1fr 220px;margin:18px;border:1px solid #d8e0e8}.geometry-notes h3{grid-column:1/-1}.geometry-notes textarea{min-height:90px;border:0;padding:12px;resize:vertical}.geometry-notes aside{display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px;border-left:1px solid #d8e0e8}.source-pdf{max-width:1050px;margin:18px auto;background:#fff;padding:15px;border-radius:12px}.source-pdf object{width:100%;height:680px}.source-pdf h3{margin-top:0}
        .a4-measure-row input[readonly]{cursor:not-allowed}.measure-editing .a4-measure-row input:not([readonly]){outline:1px solid #e0a800;outline-offset:-1px;background:#fff9d8}.measure-parameter-head{position:relative!important;padding-right:7mm!important}.measure-edit-button{position:absolute;right:.7mm;top:50%;display:flex;align-items:center;justify-content:center;width:5.5mm;height:5.5mm;padding:0;border:.25mm solid #8ea0b5;border-radius:1.2mm;background:#fff;color:#152236;font-size:8pt;line-height:1;transform:translateY(-50%);cursor:pointer}.measure-edit-button.unlocked{border-color:#07883e;background:#e7f8ee}.geometry-admin-unlock{position:fixed;z-index:10000;inset:0;display:grid;place-items:center;padding:20px;background:#0f172ab8}.geometry-admin-unlock form{width:min(440px,100%);padding:20px;border-radius:14px;background:#fff;box-shadow:0 24px 70px #0006}.geometry-admin-unlock header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.geometry-admin-unlock header small{color:#d71920;font-weight:900}.geometry-admin-unlock h2{margin:4px 0 0;font-size:21px}.geometry-admin-unlock header>button{width:38px;height:38px;border:1px solid #d8e0e8;border-radius:9px;background:#fff;font-size:24px}.geometry-admin-unlock>form>p{margin:14px 0;color:#475467}.geometry-admin-unlock label{display:grid;gap:6px;margin-top:12px;font-weight:800}.geometry-admin-unlock input{height:42px;padding:0 12px;border:1px solid #aeb9c7;border-radius:8px;font-size:16px}.geometry-admin-unlock footer{display:flex;justify-content:flex-end;gap:10px;margin-top:18px}.geometry-admin-error{padding:9px 11px;border-radius:7px;background:#fff0f1!important;color:#b42318!important;font-weight:800}@media print{.no-print,.measure-edit-button,.geometry-admin-unlock{display:none!important}}
        .legacy-geometry-template{display:none!important}
        .geometry-a4-sheet{box-sizing:border-box;width:210mm;max-width:100%;height:297mm;margin:0 auto 18px;padding:5mm;background:#fff;color:#111;overflow:hidden;font-family:Arial,Helvetica,sans-serif;box-shadow:0 12px 30px #0f172a20}
        .geometry-a4-sheet *{box-sizing:border-box}.geometry-a4-sheet input,.geometry-a4-sheet textarea{min-width:0;color:#111;font-family:inherit}
        .a4-report-header{height:18mm;display:grid;grid-template-columns:62mm 1fr;align-items:center;background:#101d2d;border-bottom:2mm solid #e31b23;color:#fff;overflow:hidden}.a4-brand{height:16mm;padding:1.5mm 4mm;background:#fff}.a4-brand img{display:block;width:100%;height:100%;object-fit:contain}.a4-title{display:flex;flex-direction:column;justify-content:center;height:100%;padding-left:7mm;border-left:.4mm solid #ffffff55}.a4-title b{font-size:16pt;line-height:1.05;letter-spacing:.2mm}.a4-title span{margin-top:1.2mm;color:#ff323b;font-size:8.5pt;font-weight:900;letter-spacing:1.2mm}
        .a4-customer-data{height:23mm;display:grid;grid-template-columns:1.25fr 1.25fr .8fr .75fr;grid-template-rows:1fr 1fr;gap:.5mm;margin:2mm 0;background:#d8e0e8;overflow:hidden}.a4-customer-data>div,.a4-customer-data>label{display:flex;min-width:0;flex-direction:column;justify-content:center;margin:0;padding:1.2mm 2.1mm;background:#fff;overflow:hidden}.a4-customer-data small{color:#5d6877;font-size:6.5pt;font-weight:900;line-height:1}.a4-customer-data b,.a4-customer-data input{width:100%;margin-top:.8mm;border:0;background:transparent;font-size:8.2pt;font-weight:800;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.a4-customer-data input{padding:0;border-bottom:.25mm dashed #9aa5b2}
        .a4-axis-section{height:69mm;margin:0 0 2mm;border:.3mm solid #cfd7e1;overflow:hidden}.a4-axis-section.rear{height:58mm}.a4-axis-section h2{height:7mm;margin:0;padding:1.65mm 3mm;background:#101d2d;border-left:2.4mm solid #e31b23;color:#fff;font-size:10pt;line-height:1}.a4-axis-grid{display:grid;grid-template-columns:53% 47%;height:calc(100% - 7mm)}
        .a4-axle-visual{position:relative;display:grid;grid-template-rows:9mm 1fr 7mm;border-right:.3mm solid #cfd7e1;background:linear-gradient(#fff,#f5f7f9);overflow:hidden}.a4-angle-strip{display:grid;align-items:stretch;background:#f5f7f9;border-bottom:.25mm solid #d6dde6}.a4-angle-strip.four{grid-template-columns:repeat(4,1fr)}.a4-angle-strip.two{grid-template-columns:repeat(2,1fr)}.a4-angle-strip span{display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:.25mm solid #d6dde6;line-height:1}.a4-angle-strip span:last-child{border-right:0}.a4-angle-strip small{font-size:5.4pt;font-weight:900}.a4-angle-strip b{margin-top:.7mm;font-size:8pt}.a4-angle-strip .ok,.a4-toe-values .ok{color:#07883e}.a4-angle-strip .bad,.a4-toe-values .bad{color:#cf121b}.a4-angle-strip .pending{color:#4d5968}
        .a4-mechanical-image{position:relative;min-height:0;overflow:hidden}.a4-mechanical-image img{position:absolute;inset:1mm 7mm .5mm;width:calc(100% - 14mm);height:calc(100% - 1.5mm);object-fit:contain}.a4-mechanical-image svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.a4-mechanical-image line{vector-effect:non-scaling-stroke}.a4-toe-values{display:grid;grid-template-columns:1fr 1fr;align-items:center;border-top:.25mm solid #d6dde6;background:#fff}.a4-toe-values span{padding:0 2mm;text-align:center;font-size:5.6pt;font-weight:900;white-space:nowrap}.a4-toe-values b{margin-left:1mm;font-size:7.3pt}
        .a4-measure-table{display:grid;grid-template-rows:7mm repeat(5,1fr);height:100%;overflow:hidden}.a4-measure-table.rear-table{grid-template-rows:7mm repeat(4,1fr)}.a4-measure-head,.a4-measure-row{display:grid;grid-template-columns:1.35fr .62fr 1.12fr .62fr;align-items:stretch}.a4-measure-head{background:#101d2d;color:#fff}.a4-measure-head>*{display:flex;align-items:center;justify-content:center;padding:1mm;border-right:.25mm solid #ffffff38;font-size:6.3pt}.a4-measure-row{border-top:.25mm solid #d8e0e8}.a4-measure-row>*{min-width:0;border:0;border-right:.25mm solid #d8e0e8}.a4-measure-row>b{display:flex;align-items:center;padding:1mm 1.7mm;font-size:6.7pt;line-height:1.08}.a4-measure-row>input{width:100%;padding:.5mm;text-align:center;background:#f8fafc;font-size:7.8pt;font-weight:900}.a4-measure-row>input.ok{color:#07883e;background:#e8f8ef}.a4-measure-row>input.bad{color:#cf121b;background:#fff0f1}.a4-measure-row>span{display:flex;align-items:center;justify-content:center;gap:.5mm;padding:.4mm;font-size:6pt}.a4-measure-row>span input{width:42%;border:0;border-bottom:.25mm dotted #9aa5b2;background:#fff;text-align:center;font-size:6.3pt;font-weight:800}
        .a4-extra-data{height:50mm;display:grid;grid-template-columns:1.12fr 1fr .88fr;gap:1.5mm;margin-bottom:2mm;overflow:hidden}.a4-extra-card{border:.3mm solid #cfd7e1;overflow:hidden}.a4-extra-card h3{height:7mm;margin:0;padding:1.8mm 2.2mm;background:#101d2d;color:#fff;font-size:7.4pt}.a4-extra-card label{display:grid;grid-template-columns:1.25fr .75fr;align-items:center;height:6mm;padding:0 1.8mm;border-top:.25mm solid #d8e0e8;font-size:6.3pt;font-weight:800}.a4-extra-card input{width:100%;height:4.4mm;border:0;border-bottom:.25mm dashed #9ca7b4;background:#fffceb;text-align:center;font-size:6.7pt;font-weight:800}.a4-extra-card.steering label{grid-template-columns:1fr;height:15mm;padding:2mm}.a4-extra-card.steering label input{height:7mm;margin-top:1mm;font-size:9pt}.steering-status{margin:4mm 3mm;padding:3mm 1mm;border:.3mm solid #cfd7e1;border-radius:2mm;color:#07883e;text-align:center;font-size:7.2pt;font-weight:900}
        .a4-report-footer{height:29mm;display:grid;grid-template-columns:1fr 50mm;border:.3mm solid #cfd7e1;overflow:hidden}.a4-report-footer>label{display:flex;flex-direction:column;padding:2mm}.a4-report-footer>label>b,.a4-report-footer>div>b{font-size:7pt}.a4-report-footer textarea{flex:1;width:100%;margin-top:1mm;padding:1.5mm;border:.25mm solid #d5dde6;background:#fff;resize:none;font-size:7.2pt;line-height:1.3}.a4-report-footer>div{display:grid;grid-template-columns:1fr 1fr;gap:1.5mm;padding:2mm;border-left:.3mm solid #cfd7e1}.a4-report-footer>div>b{grid-column:1/-1}.a4-report-footer>div label{font-size:6.2pt;font-weight:800}.a4-report-footer>div input{width:100%;margin-top:1mm;padding:1mm;border:.25mm solid #d5dde6;background:#fffceb;font-size:7pt}.a4-address{height:7mm;display:flex;align-items:center;justify-content:center;background:#101d2d;color:#fff;font-size:6.2pt;font-weight:700;letter-spacing:.15mm}
        @media(max-width:900px){.geometry-a4-sheet{width:100%;height:auto;min-height:297mm;padding:3mm}.a4-report-header{grid-template-columns:42% 58%}.a4-title b{font-size:12pt}.a4-title span{font-size:7pt}.a4-customer-data{grid-template-columns:1fr 1fr}.a4-axis-grid{grid-template-columns:51% 49%}.a4-measure-row>b{font-size:5.8pt}.a4-extra-card label{font-size:5.7pt}}
        @media(max-width:720px){.geometry-toolbar{display:grid}.geometry-extra-grid{grid-template-columns:1fr 1fr}.geometry-customer{grid-template-columns:1fr 1fr}.geometry-header{grid-template-columns:1fr}.geometry-header h1{font-size:24px}.geometry-row{grid-template-columns:1.2fr .7fr 1fr .7fr;font-size:11px}.geometry-row>*{padding:6px}.geometry-notes{grid-template-columns:1fr}.geometry-notes aside{border-left:0;border-top:1px solid #d8e0e8}.geometry-a4-sheet{min-width:760px;transform-origin:top left}}
        .geometry-entry-sheet{display:none!important}.geometry-template-sheet{position:relative;container-type:inline-size;max-width:1024px;margin:0 auto 18px;background:#fff;box-shadow:0 12px 30px #0f172a20}.geometry-template-bg{position:relative;z-index:1;display:block;width:100%;height:auto}
        .geometry-official-logo{position:absolute;z-index:5;left:2.2%;top:.6%;width:36%;height:7.5%;overflow:hidden;background:#080b0e;text-align:center}.geometry-official-logo img{display:block;width:100%;height:78%;object-fit:cover;object-position:center center;filter:brightness(0) invert(1)}.geometry-official-logo span{display:block;margin-top:-.25cqw;color:#fff;font:600 1.05cqw/1 Arial,sans-serif;letter-spacing:.34cqw}
        .geometry-dynamic-guides{position:absolute;z-index:3;inset:0;width:100%;height:100%;pointer-events:none}.geometry-template-overlay{position:absolute;z-index:4;inset:0;font-family:Arial,sans-serif;color:#111;pointer-events:none}.geometry-template-overlay>b{position:absolute;max-width:27%;overflow:hidden;text-overflow:ellipsis;font-size:12px;font-size:1.18cqw;line-height:1.1;white-space:nowrap}.geometry-template-overlay .header-value{width:20%;padding:0 .35cqw .32cqw;background:#fff;overflow:hidden}.geometry-template-overlay .header-value.right{width:18%}.geometry-template-overlay .header-value.date{width:8.2%}.geometry-template-overlay .header-value.time{width:7%}
        .geometry-template-overlay .measure{font-size:9px;font-size:.85cqw;transform:translateX(-50%);padding:.08cqw .2cqw;background:#fffffff5;border-radius:3px;box-shadow:0 0 0 1px #ffffff80}.geometry-template-overlay .diagram-mask{display:none!important}.geometry-template-overlay .ok{color:#07883e}.geometry-template-overlay .bad{color:#df171f}.geometry-template-overlay .pending{color:#111}.geometry-template-overlay .cell-value{width:8%;text-align:center;transform:translateX(-50%);font-size:13px;font-size:1.2cqw;padding:.15% 0;background:#fffffff5}.geometry-template-overlay .cell-spec{width:13%;text-align:center;transform:translateX(-50%);font-size:10px;font-size:.94cqw;font-weight:700;padding:.2% 0;background:#fffffff5}
        .editable-report-field{position:absolute;z-index:7;box-sizing:border-box;pointer-events:auto!important;border:0;border-bottom:1px solid #7c8793;background:#fffdf2;padding:0 .25cqw;color:#111;font:700 1cqw/1.2 Arial,sans-serif;text-align:center;outline:none}.editable-report-field:focus{background:#fff1a8;box-shadow:0 0 0 2px #d91d2a}.chassis-a{left:35.7%;top:76.05%;width:8%}.chassis-b{left:35.7%;top:78.02%;width:8%}.chassis-difference{left:35.7%;top:79.95%;width:8%}.wheelbase-front{left:35.7%;top:82.05%;width:8%}.wheelbase-rear{left:35.7%;top:84.02%;width:8%}.track-front{left:35.7%;top:85.98%;width:8%}.track-rear{left:35.7%;top:87.92%;width:8%}.tire-front-left{left:54.8%;top:78.2%;width:7.6%}.tire-front-right{left:69.8%;top:78.2%;width:7.6%}.tire-rear-left{left:54.8%;top:84.55%;width:7.6%}.tire-rear-right{left:69.8%;top:84.55%;width:7.6%}.steering-angle{left:84.2%;top:75.8%;width:10%}.next-review-date{left:82.6%;top:93.2%;width:14%}.next-review-km{left:82.6%;top:95.1%;width:14%}.template-notes{left:3.4%;top:93.65%;width:70%;height:3.65%;resize:none;text-align:left;line-height:1.45;border:0;background:#ffffffee;padding:.15cqw .4cqw;font-size:9px;font-size:.82cqw;overflow:hidden}.print-geometry-button{pointer-events:auto!important;cursor:pointer!important;opacity:1!important}
        .geometry-official-logo{left:2.2%;top:.5%;width:34.5%;height:7.6%;display:flex;align-items:center;justify-content:center;background:#fff}.geometry-official-logo img{width:96%;height:92%;object-fit:contain;object-position:center;filter:none}.geometry-official-logo span{display:none}
        .geometry-template-overlay{pointer-events:auto}.geometry-template-overlay>b{pointer-events:none}.geometry-template-overlay .header-value{display:flex;align-items:center;width:21%;height:1.55%;min-height:0;padding:0 .45cqw;background:#fff;overflow:hidden}.geometry-template-overlay .header-value.right{width:19%}.geometry-template-overlay .header-value.date{width:9.2%}.geometry-template-overlay .header-value.time{width:8%}
        .editable-report-field{z-index:12;height:1.65%;pointer-events:auto!important;cursor:text;border:1px solid #e7c95b;border-radius:2px;background:#fff9d8;padding:0 .3cqw}.editable-report-field::placeholder{color:#78691e;opacity:1}.template-notes{left:3.4%;top:93.55%;width:70%;height:4.05%;padding:.34cqw .45cqw 0;border:0;border-radius:0;background:repeating-linear-gradient(to bottom,#fff 0,#fff 1.22cqw,#aeb5bd 1.27cqw,#fff 1.33cqw);font-size:.82cqw;line-height:1.33cqw;overflow:hidden}
        .geometry-toolbar{position:relative!important;z-index:100!important}.geometry-toolbar button,.geometry-toolbar .pdf-upload{position:relative!important;z-index:101!important;pointer-events:auto!important}
        .a4-report-header{align-items:stretch!important;background:#fff!important;border:.3mm solid #d8e0e8!important;border-bottom:2mm solid #e31b23!important}.a4-brand{display:flex!important;align-items:center!important;justify-content:center!important;height:100%!important;padding:1mm 4mm!important;background:#fff!important}.a4-title{height:100%!important;padding-left:7mm!important;border-left:0!important;background:#101d2d!important}.a4-title b{font-family:Arial,Helvetica,sans-serif!important;font-weight:800!important;letter-spacing:0!important}.a4-title span{font-family:Arial,Helvetica,sans-serif!important;font-weight:800!important;letter-spacing:.8mm!important}
        .a4-mechanical-image .angle-reference line{stroke:#59636e;stroke-width:1.8;stroke-dasharray:5 4;opacity:.72}.a4-mechanical-image .angle-measure{stroke-width:3.2;stroke-linecap:round}.a4-mechanical-image .toe-measure{stroke-width:3.2;stroke-linecap:round}.a4-toe-values span{font-weight:800!important}
        .a4-report-header{display:grid!important;position:static!important;top:auto!important;z-index:auto!important;height:17mm!important;grid-template-columns:52mm 1fr!important;padding:0!important}.a4-brand{padding:2.5mm 7mm!important}.a4-brand img{width:100%!important;height:10.5mm!important;object-fit:contain!important}.a4-title{padding-left:6mm!important;background:#fff!important;border-left:.3mm solid #d8e0e8!important}.a4-title b{color:#111!important;font-size:15pt!important}.a4-title span{color:#e31b23!important;font-size:8pt!important}
        .a4-customer-data{height:24mm!important}.a4-axis-section{height:82mm!important}.a4-axis-section.rear{height:70mm!important}.a4-extra-data{height:30mm!important;grid-template-columns:1fr 1fr!important}.a4-report-footer{height:39mm!important}.a4-mechanical-image .guide-label{font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:900;paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round}.a4-toe-values .ok{color:#07883e!important}.a4-toe-values .bad{color:#cf121b!important}.a4-toe-values .pending{color:#4d5968!important}.a4-measure-row>b{line-height:1.2!important}.a4-measure-head>*{line-height:1.15!important}
        .a4-axis-grid{grid-template-columns:46% 54%!important}.a4-measure-table{grid-template-rows:10mm repeat(7,1fr)!important}.a4-measure-table.rear-table{grid-template-rows:10mm repeat(5,1fr)!important}.a4-measure-head{display:grid!important;grid-template-columns:1.3fr 1.12fr 1fr 1.12fr!important;background:#fff!important;color:#111!important;border-bottom:.45mm solid #e31b23!important}.a4-measure-head>b,.a4-measure-head>span{min-width:0;border-right:.25mm solid #cfd7e1!important}.a4-measure-head>b{display:flex;align-items:center;justify-content:center;padding:.7mm;font-size:5.3pt!important;text-align:center}.a4-measure-head>span{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;align-items:center;text-align:center}.a4-measure-head>span strong{grid-column:1/-1;padding:.45mm .2mm;border-bottom:.25mm solid #cfd7e1;font-size:4.8pt;line-height:1}.a4-measure-head>span i{font-size:4.7pt;font-style:normal}.a4-measure-row{grid-template-columns:1.3fr .56fr .56fr 1fr .56fr .56fr!important}.a4-measure-row.single>input:nth-of-type(1){grid-column:2/4}.a4-measure-row.single>span{grid-column:4}.a4-measure-row.single>input:nth-of-type(2){grid-column:5/7}.a4-measure-row>b{font-size:5.45pt!important;padding:.7mm 1mm!important}.a4-measure-row>input{font-size:6.2pt!important;padding:.25mm!important}.a4-measure-row>span{gap:.2mm!important;padding:.2mm!important;font-size:4.7pt!important}.a4-measure-row>span input{width:43%!important;font-size:5pt!important}.a4-axis-section h2,.a4-extra-card h3{background:#fff!important;color:#111!important;border-top:0!important;border-bottom:.45mm solid #e31b23!important}.a4-axis-section h2{border-left:2.4mm solid #e31b23!important}.a4-extra-card h3{border-left:1.5mm solid #e31b23!important}.a4-address{background:#fff!important;color:#111!important;border-top:.55mm solid #e31b23!important}.a4-unit-note{display:flex;align-items:center;height:8mm;margin:0;padding:0 2mm;border:.3mm solid #cfd7e1;border-bottom:0;background:#fff;color:#4b5563;font-size:6.1pt}.a4-unit-note b{margin-right:1.2mm;color:#111}.a4-extra-card label{height:5.5mm!important}.a4-extra-card.steering label{height:11mm!important}.steering-status{margin:2mm 3mm!important;padding:2mm 1mm!important}
        /* V17: mantém todos os títulos legíveis e as guias junto às rodas. */
        .a4-customer-data small{display:block!important;min-height:2.6mm!important;line-height:1.25!important;overflow:visible!important}.a4-customer-data b,.a4-customer-data input{margin-top:.45mm!important;line-height:1.2!important}.a4-customer-data input{height:4.3mm!important}.a4-customer-data>label{justify-content:flex-start!important;padding-top:1.35mm!important;overflow:visible!important}
        .a4-mechanical-image .guide-label{font-family:Arial,Helvetica,sans-serif!important;font-size:9.5px!important;font-weight:800!important;letter-spacing:.15px!important;paint-order:stroke!important;stroke:#fff!important;stroke-width:2.2px!important;stroke-linejoin:round!important}.a4-mechanical-image .guide-label.caster-label{font-size:9px!important;stroke-width:2px!important}
        .a4-measure-table{grid-template-rows:12mm repeat(7,1fr)!important}.a4-measure-table.rear-table{grid-template-rows:12mm repeat(5,1fr)!important}.a4-measure-head{overflow:visible!important}.a4-measure-head>*{line-height:1.25!important;overflow:visible!important}.a4-measure-head>b{padding:1mm .7mm!important;line-height:1.25!important;white-space:normal!important}.a4-measure-head>span{grid-template-rows:minmax(5.8mm,auto) 1fr!important;align-items:stretch!important;overflow:visible!important}.a4-measure-head>span strong{display:flex!important;align-items:center!important;justify-content:center!important;min-height:5.8mm!important;padding:.8mm .3mm!important;line-height:1.25!important;white-space:normal!important;overflow:visible!important}.a4-measure-head>span i{display:flex!important;align-items:center!important;justify-content:center!important;padding:.45mm!important;line-height:1.2!important}
        .a4-axis-section h2,.a4-extra-card h3{display:flex!important;align-items:center!important;line-height:1.2!important;overflow:visible!important}.a4-extra-card h3{height:7mm!important;margin:0!important;padding:1mm 2.2mm!important;font-size:7.4pt!important;white-space:nowrap!important}
        /* V18: cabeçalho completo, mais espaço nos pneus/volante e observações compactas. */
        .a4-customer-data{grid-template-columns:repeat(6,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;overflow:visible!important}.a4-customer-data .data-client{grid-column:span 2}.a4-customer-data .data-vehicle{grid-column:span 2}.a4-customer-data .data-year,.a4-customer-data .data-plate,.a4-customer-data .data-km,.a4-customer-data .data-rim{grid-column:span 1}.a4-customer-data .data-chassis{grid-column:span 1}.a4-customer-data .data-date{grid-column:span 2}.a4-customer-data .data-tech{grid-column:span 1}.a4-customer-data>div,.a4-customer-data>label{justify-content:flex-start!important;padding:1.1mm 1.6mm!important;overflow:visible!important}.a4-customer-data small{flex:0 0 auto!important}.a4-customer-data b,.a4-customer-data input{flex:0 0 auto!important;min-height:3.8mm!important;line-height:1.25!important}
        .a4-measure-row{overflow:visible!important}.a4-measure-row>*{overflow:visible!important}.a4-measure-row>b{font-size:5.25pt!important;line-height:1.28!important;white-space:normal!important}.a4-measure-row>input{line-height:1.2!important}.a4-measure-row>span,.a4-measure-row>span input{line-height:1.2!important}
        .a4-extra-data{height:36mm!important;margin-bottom:2mm!important;overflow:visible!important}.a4-extra-card{overflow:visible!important}.a4-extra-card h3{height:8mm!important;padding:1.2mm 2.4mm!important;font-size:7.6pt!important;line-height:1.25!important}.a4-extra-card label{height:6.7mm!important;padding:0 2mm!important;font-size:6.4pt!important;line-height:1.25!important;overflow:visible!important}.a4-extra-card label input{height:4.8mm!important;line-height:1.2!important}.a4-extra-card.steering label{height:13mm!important;padding:1.5mm 2mm!important}.a4-extra-card.steering label input{height:6.5mm!important;margin-top:.7mm!important}.steering-status{display:flex!important;align-items:center!important;justify-content:center!important;min-height:8mm!important;margin:2mm 3mm 0!important;padding:1.5mm 1mm!important;line-height:1.2!important;overflow:visible!important}.a4-report-footer{height:33mm!important}.a4-report-footer textarea{line-height:1.35!important;overflow:hidden!important}
        .import-measure-row{grid-template-columns:1.45fr .7fr .7fr 1.15fr .7fr .7fr!important}.import-measure-row.single>input:nth-of-type(1){grid-column:2/4}.import-measure-row.single>span{grid-column:4}.import-measure-row.single>input:nth-of-type(2){grid-column:5/7}.import-measure-row.heading{background:#fff!important;color:#111!important;border-bottom:3px solid #e31b23}.import-measure-row.heading>*{display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px}
        /* V22: visualização ampliada na tela e tipografia mais legível nos eixos. */
        .a4-axis-section h2{font-size:10.8pt!important}.a4-angle-strip small{font-size:6.1pt!important}.a4-angle-strip b{font-size:8.7pt!important}.a4-toe-values span{font-size:6.1pt!important}.a4-toe-values b{font-size:8pt!important}.a4-measure-head>b{font-size:5.9pt!important}.a4-measure-head>span strong{font-size:5.35pt!important}.a4-measure-head>span i{font-size:5.2pt!important}.a4-measure-row>b{font-size:5.8pt!important}.a4-measure-row>input{font-size:6.75pt!important}.a4-measure-row>span{font-size:5.15pt!important}.a4-measure-row>span input{font-size:5.45pt!important}
        @media screen and (min-width:1300px){.geometry-a4-sheet{zoom:1.3}}
        @media print{.geometry-a4-sheet{zoom:1!important}}
        @media print{html,body{width:210mm!important;height:297mm!important;margin:0!important;padding:0!important;overflow:visible!important}body.print-geometry-report *{visibility:hidden!important}body.print-geometry-report .geometry-report-page{position:static!important;inset:auto!important;margin:0!important;padding:0!important;transform:none!important}body.print-geometry-report .geometry-template-sheet,body.print-geometry-report .geometry-template-sheet *{visibility:visible!important}body.print-geometry-report .geometry-template-sheet{position:fixed!important;left:0!important;top:0!important;width:210mm!important;max-width:none!important;height:297mm!important;min-height:0!important;margin:0!important;padding:5mm!important;box-shadow:none!important;transform:none!important;overflow:hidden!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}body.print-geometry-report .geometry-template-sheet .a4-report-header{display:grid!important;position:static!important;top:auto!important;z-index:auto!important;padding:0!important}body.print-geometry-report .geometry-template-sheet input,body.print-geometry-report .geometry-template-sheet textarea{outline:0!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}body.print-geometry-report .geometry-entry-sheet{display:none!important}@page{size:A4 portrait;margin:0}}
      `}</style>
    </div>
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
    .filter((a) => !isEmployeeAbsence(a))
    .filter(matches)
    .filter((a) =>
      `${a.client} ${a.vehicle} ${a.plate} ${a.note} ${a.internalNote ?? ""}`
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
      !isEmployeeAbsence(a) && a.date >= iso(monday) && a.date <= iso(saturday),
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
    .filter((a) => !isEmployeeAbsence(a) && a.date === tomorrowIso)
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
            a.note ? `Relato do cliente: ${a.note}` : "",
            a.internalNote ? `Observação interna: ${a.internalNote}` : "",
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
        !isEmployeeAbsence(a) &&
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
                      {a.note && <small>Relato do cliente: {a.note}</small>}
                      {a.internalNote && (
                        <small className="tomorrow-internal-note">
                          Observação interna: {a.internalNote}
                        </small>
                      )}
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
