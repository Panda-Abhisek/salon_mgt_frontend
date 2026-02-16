import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditSalonForm = ({ salon, onSave, onCancel, saving }) => {
  const [name, setName] = useState(salon.salonName);
  const [address, setAddress] = useState(salon.salonAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      salonName: name,
      salonAddress: address,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Salon name"
        required
      />

      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Salon address"
        required
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>

        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditSalonForm;
