import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import PageTransition from "@/components/common/PageTransition";
import PageHeader from "@/components/common/PageHeader";

export default function AppLayout() {
  const location = useLocation();

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

        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <PageHeader />
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

