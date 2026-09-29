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
