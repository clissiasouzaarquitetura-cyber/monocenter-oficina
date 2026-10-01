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
