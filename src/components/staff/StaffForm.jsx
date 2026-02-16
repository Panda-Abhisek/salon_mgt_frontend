import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";

const StaffForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Temporary password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Staff"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default StaffForm;
