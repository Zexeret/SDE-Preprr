export interface Tag {
  id: string;
  name: string;
  isCustom: boolean;
}

export interface Problem {
  id: string;
  link: string;
  tags: Tag[];
  notes: string;
  isDone: boolean;
  createdAt: number;
  updatedAt: number;
}

export type SortBy = "dateAdded" | "dateUpdated" | "status" | "name";
export type SortOrder = "asc" | "desc";

export interface ExportData {
  version: string;
  problems: Problem[];
  customTags: Tag[];
  exportedAt: number;
}
