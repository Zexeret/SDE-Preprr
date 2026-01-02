export const formatLastSaved = (timestamp: number | null): string => {
  if (!timestamp) return "Never";

  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    const date = new Date(timestamp);
    return `Today at ${date.toLocaleTimeString()}`;
  } else {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
};
