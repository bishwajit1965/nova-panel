export const normalizeDate = (v) => {
  try {
    const raw =
      typeof v === "string"
        ? v
        : v?.$date
          ? v.$date
          : v?._seconds
            ? v._seconds * 1000
            : null;

    if (!raw) return "-";

    const d = new Date(raw);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  } catch {
    return "-";
  }
};
