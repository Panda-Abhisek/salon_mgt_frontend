import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";

const ServiceForm = ({ initialData, onSubmit, loading }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [duration, setDuration] = useState(initialData?.durationMinutes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      durationMinutes: duration,
      active: initialData?.active ?? true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Service name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <Input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ServiceForm;
