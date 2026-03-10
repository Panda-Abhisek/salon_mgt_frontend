import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Staff & Date" },
  { num: 3, label: "Time Slot" },
];

const BookingStepIndicator = ({ currentStep }) => {
  return (
    <nav aria-label="Booking progress" className="w-full max-w-2xl mb-6">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map(({ num, label }, idx) => {
          const isCompleted = currentStep > num;
          const isCurrent = currentStep === num;

          return (
            <li
              key={num}
              className={cn(
                "flex items-center gap-2 flex-1 last:flex-none",
                idx < STEPS.length - 1 && "after:content-[''] after:flex-1 after:h-px after:bg-border after:mx-2"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : isCurrent ? (
                  <span aria-hidden>{num}</span>
                ) : (
                  <Circle className="h-4 w-4" aria-hidden />
                )}
              </span>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BookingStepIndicator;
