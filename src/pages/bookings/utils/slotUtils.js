export function buildSlots(availability, durationMinutes) {
  const slots = [];

  availability.forEach(({ start, end }) => {
    let cursor = new Date(start);
    const endTime = new Date(end);

    while (true) {
      const slotEnd = new Date(
        cursor.getTime() + durationMinutes * 60000
      );

      if (slotEnd > endTime) break;

      slots.push({
        start: cursor.toISOString(),
        end: slotEnd.toISOString(),
      });

      cursor = slotEnd;
    }
  });

  return slots;
}
