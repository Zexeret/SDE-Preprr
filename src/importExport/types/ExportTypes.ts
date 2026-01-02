export type ExportWrapper =
  | {
      readonly compressed: true;
      readonly version: number;
      readonly checksum: string;
      readonly data: ReadonlyArray<number>;
    }
  | {
      readonly compressed: false;
      readonly version: number;
      readonly checksum: string;
      readonly data: unknown;
    };

export interface ExportOptions {
  readonly compress?: boolean;
  readonly onProgress?: (progress: number) => void;
}

export interface ImportOptions {
  readonly onProgress?: (progress: number) => void;
  readonly validateOnly?: boolean;
}
