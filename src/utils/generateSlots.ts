export const generateSlots = (
  start: string,
  end: string,
  duration: number
) => {
  const slots = [];

  const startDate = new Date(`2000-01-01T${start}:00`);
  const endDate = new Date(`2000-01-01T${end}:00`);

  while (startDate < endDate) {
    const slotStart = startDate.toTimeString().slice(0, 5);

    startDate.setMinutes(
      startDate.getMinutes() + duration
    );

    const slotEnd = startDate
      .toTimeString()
      .slice(0, 5);

    slots.push({
      startTime: slotStart,
      endTime: slotEnd
    });
  }

  return slots;
};