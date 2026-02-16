import { useEffect, useState } from "react";
import api from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { serviceApi } from "@/api/service.api";
import { toast } from "sonner";

const AssignServicesDialog = ({ open, staff, onClose, onSuccess }) => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- fetch data ---------------- */

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      setLoading(true);
      try {
        const [servicesRes, assignedRes] = await Promise.all([
          serviceApi.getAll(),
          api.get(`/api/salons/staff/${staff.id}/services`),
        ]);
        setServices(servicesRes.data);

        setSelected(
          new Set(assignedRes.data.map((s) => s.id))
        );
      } catch {
        toast("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open, staff.id]);

  /* ---------------- actions ---------------- */

  const toggleService = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.put(
        `/api/salons/staff/${staff.id}/services`,
        { serviceIds: Array.from(selected) }
      );
      onSuccess?.();
      onClose();
    } catch {
      toast("Failed to assign services");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Assign Services — {staff.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {services.map((service) => (
              <label
                key={service.id}
                className="flex items-center gap-3 rounded-md border p-2 cursor-pointer hover:bg-muted"
              >
                <Checkbox
                  checked={selected.has(service.id)}
                  onCheckedChange={() => toggleService(service.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{service.price} • {service.durationMinutes} min
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignServicesDialog;
