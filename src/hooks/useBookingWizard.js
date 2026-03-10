import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useServices } from "@/hooks/useServices";
import { useSalonServices } from "@/hooks/useSalonServices";

import { fetchAvailability, createBooking } from "@/api/booking.api";
import { fetchStaffForService } from "@/api/service.api";
import { salonPublicApi } from "@/api/salon.api";

import { buildSlots } from "@/pages/bookings/utils/slotUtils";
import { toast } from "sonner";

export function useBookingWizard() {
  const navigate = useNavigate();
  const { salonId } = useParams();

  const adminMode = !salonId;

  const {
    services: adminServices,
    status: adminStatus,
  } = useServices();

  const {
    services: publicServices,
    status: publicStatus,
  } = useSalonServices(salonId);

  const services = adminMode ? adminServices : publicServices;
  const status = adminMode ? adminStatus : publicStatus;

  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [date, setDate] = useState("");

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [creating, setCreating] = useState(false);

  /* ---------- Step 2: Load staff ---------- */
  useEffect(() => {
    if (step !== 2 || !service) return;

    const loadStaff = async () => {
      setLoadingStaff(true);
      try {
        let data;

        if (adminMode) {
          const res = await fetchStaffForService(service.id);
          data = res.data;
        } else {
          const res =
            await salonPublicApi.getPublicStaffForService(service.id);
          data = res.data;
        }

        setStaff(data.filter((s) => s.enabled));
      } finally {
        setLoadingStaff(false);
      }
    };

    loadStaff();
  }, [step, service, adminMode]);

  /* ---------- Step 3: Load slots ---------- */
  useEffect(() => {
    if (step !== 3 || !service || !selectedStaff || !date) return;

    const loadSlots = async () => {
      setLoadingSlots(true);
      try {
        const { data } = await fetchAvailability({
          staffId: selectedStaff.id,
          serviceId: service.id,
          date,
        });

        setSlots(buildSlots(data, service.durationMinutes));
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [step, service, selectedStaff, date]);

  /* ---------- Create booking ---------- */
  const confirmBooking = useCallback(async () => {
    if (!service || !selectedStaff || !selectedSlot) return;

    setCreating(true);
    try {
      const { data } = await createBooking({
        serviceId: service.id,
        staffId: selectedStaff.id,
        startTime: selectedSlot.start,
      });

      toast.success("Booking confirmed");
      navigate(`/bookings/${data.id}`);
    } catch {
      toast.error("Failed to create booking");
    } finally {
      setCreating(false);
    }
  }, [service, selectedStaff, selectedSlot, navigate]);

  const goToStep = useCallback((s) => setStep(s), []);

  return {
    services,
    status,
    step,
    service,
    setService,
    staff,
    selectedStaff,
    setSelectedStaff,
    date,
    setDate,
    slots,
    selectedSlot,
    setSelectedSlot,
    loadingStaff,
    loadingSlots,
    creating,
    confirmBooking,
    goToStep,
  };
}
