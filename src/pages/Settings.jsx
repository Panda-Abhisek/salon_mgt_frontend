import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <SettingsIcon className="w-6 h-6" />
        System Settings
      </h1>
      <p className="text-muted-foreground mt-2">Settings page coming soon...</p>
    </div>
  );
}
