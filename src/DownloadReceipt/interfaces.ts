import { ContentType } from './enums';

type LinkParamOptions = {
  token?: string | null;
  id?: string | null;
  zip?: string | null;
};

export type ReceiptOptions = {
  receipts: string | string[] | null;
  usuario?: string | null;
};

type TendersParams = {
  idLicitacion: number | null;
  nombreArchivo: string | null;
};

export interface DownloadParams {
  fileName?: string;
  param: LinkParamOptions | ReceiptOptions | TendersParams;
  url: string;
  type?: ContentType;
}

export type DownloadDTOParams = Omit<DownloadParams, 'type' | 'fileName'>;

export interface DownloadReducerState {
  token: string | null;
  id: string | null;
  zip: string | null;
  receiptsDownload: ReceiptOptions;
  isFetching: boolean;
  progress: number;
}

export type DownloadActionType =
  | { type: 'setToken'; payload: string | null }
  | { type: 'setId'; payload: string | null }
  | { type: 'setZip'; payload: string | null }
  | { type: 'setReceipts'; payload: ReceiptOptions }
  | { type: 'changeIsFetching' }
  | { type: 'setProgress'; payload: number }
  | { type: 'reset' };

export interface DownloadFileDTO {
  estado: number;
  rowcount: number;
  datos: DownloadFile[];
  mensaje: string;
}

export interface DownloadFile {
  nombreArchivo: string;
  contenido: string;
  contentType: string;
}
