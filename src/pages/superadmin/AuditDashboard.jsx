import { useState } from "react";
import { useAuditLogs } from "@/hooks/audits/useAuditLogs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Audit Logs
        </h1>
        <p className="text-sm text-muted-foreground">
          Inspect key actions across salons with filters for salon, action, and date range.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Salon ID"
          className="w-full sm:w-40"
          onChange={setSalon}
        />

        <Input
          placeholder="Action (e.g. SUBSCRIPTION_CANCEL_REQUESTED)"
          className="w-full sm:flex-1 min-w-48"
          onChange={setAction}
        />

        <Input
          type="date"
          id="from"
          className="w-full sm:w-auto"
        />
        <Input
          type="date"
          id="to"
          className="w-full sm:w-auto"
        />

        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={() =>
            setRange(
              document.getElementById("from").value,
              document.getElementById("to").value
            )
          }
        >
          Apply Range
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setFilters({})}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      {status === "loading" && <div>Loading audits...</div>}
      {status === "error" && <div>Failed to load audits</div>}

      {status === "success" && data && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-center">Salon</th>
                  <th className="p-2 text-center">Actor</th>
                  <th className="p-2 text-center">Action</th>
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
                    <td className="p-2 text-center font-mono text-[10px] sm:text-xs">
                      {a.action}
                    </td>
                    <td className="p-2 text-[11px] sm:text-xs text-muted-foreground">
                      {a.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditDashboard;