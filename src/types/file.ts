export interface FileMetaData {
  default?: boolean;
  order: number;
  fitBracketSize: boolean;
}

export interface File {
  id: string;
  name: string;
  metaData: FileMetaData;
  url: string;
  category?: string;
}
