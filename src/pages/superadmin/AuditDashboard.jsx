import { useState } from "react";
import { useAuditLogs } from "@/hooks/audits/useAuditLogs";

const AuditDashboard = () => {
  const [filters, setFilters] = useState({});
  const { data, status } = useAuditLogs(filters);

  const setSalon = (e) => {
    const id = e.target.value;
    setFilters(id ? { salonId: id } : {});
  };

  const setAction = (e) => {
    const action = e.target.value;
    setFilters(action ? { action } : {});
  };

  const setRange = (from, to) => {
    if (!from || !to) return;
    setFilters({
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      <h1 className="text-xl font-semibold">Audit Logs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">

        <input
          placeholder="Salon ID"
          className="px-3 py-1 border rounded"
          onChange={setSalon}
        />

        <input
          placeholder="Action (e.g. SUBSCRIPTION_CANCEL_REQUESTED)"
          className="px-3 py-1 border rounded"
          onChange={setAction}
        />

        <input type="date" id="from" className="px-2 py-1 border rounded" />
        <input type="date" id="to" className="px-2 py-1 border rounded" />

        <button
          className="px-3 py-1 bg-orange-400 rounded"
          onClick={() =>
            setRange(
              document.getElementById("from").value,
              document.getElementById("to").value
            )
          }
        >
          Apply Range
        </button>

        <button
          className="px-3 py-1 bg-muted rounded"
          onClick={() => setFilters({})}
        >
          Reset
        </button>
      </div>

      {/* Table */}
      {status === "loading" && <div>Loading audits...</div>}
      {status === "error" && <div>Failed to load audits</div>}

      {status === "success" && (
        <div className="overflow-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Time</th>
                <th className="p-2">Salon</th>
                <th className="p-2">Actor</th>
                <th className="p-2">Action</th>
                <th className="p-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 text-center">{a.salonId ?? "-"}</td>
                  <td className="p-2 text-center">{a.actor}</td>
                  <td className="p-2 text-center font-mono text-xs">
                    {a.action}
                  </td>
                  <td className="p-2 text-xs text-muted-foreground">
                    {a.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditDashboard;