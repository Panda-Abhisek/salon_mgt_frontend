import { Link } from "react-router-dom";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function PageHeader() {
  const breadcrumbs = useBreadcrumbs();
  const title = breadcrumbs.at(-1)?.label;

  return (
    <div className="m-3">
      {/* Breadcrumbs */}
      <nav className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((crumb, i) => (
            <li key={crumb.path} className="flex items-center gap-2">
              {i !== 0 && <span><ChevronRight size={19} /></span>}
              <Link
                to={crumb.path}
                className={cn(
                  "hover:text-foreground",
                  i === breadcrumbs.length - 1 &&
                    "text-foreground font-medium"
                )}
              >
                {crumb.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* Page title */}
      {/* <h1 className="text-2xl font-semibold mt-2">
        {title}
      </h1> */}
    </div>
  );
}
