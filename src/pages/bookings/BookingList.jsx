import { useEffect, useState, useCallback } from "react";
import { fetchBookings } from "@/api/booking.api";
import PageWrapper from "@/components/common/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyStateCard from "@/components/common/EmptyStateCard";
import BookingCard from "@/components/bookings/BookingCard";
import { useSearchParams } from "react-router-dom";

const FILTERS = [
  "ALL",
  "TODAY",
  "UPCOMING",
  "PAST",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

// const ITEMS_PER_PAGE = 4;

const BookingList = () => {
  const [params] = useSearchParams();

  const initialFilter =
    params.get("filter") ||
    params.get("range") ||
    params.get("status") ||
    "ALL";

  // const initialStatus = params.get("status");

  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading");

  const [filter, setFilter] = useState(initialFilter);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // backend is 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const PAGE_SIZE_OPTIONS = [4, 5, 10, 20];

  const [size, setSize] = useState(5);

  /* ---------- Fetch from backend ---------- */
  const loadBookings = useCallback(() => {
    setStatus(prev => prev !== "loading" ? "loading" : prev);

    fetchBookings({
      page,
      size,
      status: ["CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"].includes(filter)
        ? filter
        : null,
      range: ["TODAY", "UPCOMING", "PAST"].includes(filter)
        ? filter
        : null,
      search: search || null,
    }).then((res) => {
      setBookings(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
      setStatus("ok");
    })
      .catch(() => setStatus("error"));
  }, [page, size, filter, search]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  /* Reset page when filter/search changes */
  useEffect(() => {
    setPage(prev => prev !== 0 ? 0 : prev);
  }, [filter, search, size]);

  /* ---------- Loading ---------- */
  if (status === "loading") {
    return (
      <PageWrapper>
        <Skeleton className="h-40 w-full max-w-2xl" />
      </PageWrapper>
    );
  }

  /* ---------- Empty ---------- */
  if (bookings.length === 0) {
    return (
      <PageWrapper>
        <EmptyStateCard
          title="No bookings found"
          description="Try adjusting your search or filters."
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="w-full max-w-4xl mx-auto space-y-4">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            {totalElements} total • Showing {bookings.length} per page
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by customer, staff, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-3 py-2 rounded-md bg-muted border focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Items per page:
          </span>

          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="px-2 py-1 rounded-md bg-muted border text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-sm transition ${filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/70"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onActionSuccess={loadBookings}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-2 justify-center pt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-3 py-1 rounded-md text-sm transition ${page === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/70"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default BookingList;
