const NANOS_PER_MS = 1_000_000;

const DEFAULT_TIMESTAMP_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
};

const DEFAULT_DATE_STRING_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

/**
 * Format a backend timestamp (nanoseconds since the Unix epoch) as a localized
 * date string.
 */
export function formatTimestamp(
  timestamp: bigint,
  options: Intl.DateTimeFormatOptions = DEFAULT_TIMESTAMP_OPTIONS,
): string {
  const ms = Number(timestamp) / NANOS_PER_MS;
  return new Date(ms).toLocaleDateString("en-IN", options);
}

/**
 * Format an ISO date string as a localized date string, falling back to the
 * raw input if it cannot be parsed.
 */
export function formatDateString(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_STRING_OPTIONS,
): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", options);
  } catch {
    return dateStr;
  }
}
