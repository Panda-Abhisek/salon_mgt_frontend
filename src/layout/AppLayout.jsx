import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import PageTransition from "@/components/common/PageTransition";
import PageHeader from "@/components/common/PageHeader";
import { useEffect, useState } from "react";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import LifecycleBanner from "@/components/billing/LifecycleBanner";

export default function AppLayout() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paywallData, setPaywallData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      setPaywallData(e.detail);
      setUpgradeOpen(true);
    };

    window.addEventListener("paywall", handler);
    return () => window.removeEventListener("paywall", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden border-b p-2">
          <MobileSidebar />
        </header>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <LifecycleBanner />
        </motion.div>
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <PageHeader />
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
      />
    </div>
  );
}

