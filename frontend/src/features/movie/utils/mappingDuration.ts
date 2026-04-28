type BEDuration = "short" | "medium" | "long";

export const mapDuration = (
  duration?: string | null
): BEDuration | undefined => {
  const map: Record<string, BEDuration> = {
    "Under 1h": "short",
    "1h - 2h": "medium",
    "Over 2h": "long",
  };

  if (!duration) return undefined;

  return map[duration];
};