import {v4 as uuidv4} from 'uuid';

export const generateId = (prefix: string): string => {
  return `${prefix}-${uuidv4()}`;
};

export const stripHtmlTags = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
};

export const calculateCompletionRate = (
  completed: number,
  total: number
): number => {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

/**
 * Validates if a string is a valid URL
 * @param url - The string to validate
 * @returns true if the string is a valid URL, false otherwise
 */
export const isValidUrl = (url: string | null): boolean => {
  if (!url || url.trim() === "") return false;

  try {
    const urlObj = new URL(url);
    // Check if protocol is http or https
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};
