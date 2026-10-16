import { useEffect, useState } from "react";
import { fetchFactors, type Factor } from "../api/factors";

type State =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; items: Factor[] };

export function FactorLibraryPage() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchFactors()
      .then((list) => {
        if (!cancelled) setState({ kind: "ready", items: list.items });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ kind: "error", message: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2>Factor library</h2>
      <p className="notice">Workshop sample values, not real emission factors.</p>

      {state.kind === "loading" && <p>Loading factors...</p>}
      {state.kind === "error" && <p role="alert" className="error">{state.message}</p>}
      {state.kind === "ready" && state.items.length === 0 && <p>No factors found.</p>}
      {state.kind === "ready" && state.items.length > 0 && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Scope</th>
                <th>Unit</th>
                <th className="num">kg CO2e per unit</th>
                <th>Version</th>
                <th>Valid from</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((f) => (
                <tr key={f.id}>
                  <td>
                    <div>{f.label}</div>
                    <div className="muted">{f.id}</div>
                  </td>
                  <td>
                    <span className={f.scope === 1 ? "badge badge-scope1" : "badge badge-scope2"}>
                      Scope {f.scope}
                    </span>
                  </td>
                  <td>{f.unit}</td>
                  <td className="num">{f.kgCo2ePerUnit}</td>
                  <td><span className="chip">v{f.version}</span></td>
                  <td>{f.validFrom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
