const baseUrl = process.env.REACT_APP_DOMAIN! + '/api-commons/download';

export const Endpoints = {
  RECIBOS_PDF: baseUrl + '/receiptPDF',
  RECIBOS_ZIP: baseUrl + '/receiptZIP',

  RECIBOS_PDF_BY_LINK: baseUrl + '/receiptPDFbyLink',
  RECIBOS_ZIP_BY_LINK: baseUrl + '/receiptZIPbyLink',

  COMPROBANTE_PDF: baseUrl + '/paymentReceiptPDF',
  COMPROBANTE_ZIP: baseUrl + '/paymentReceiptZIP',

  RECIBO_DE_SUELDO: baseUrl + '/salaryReceipt',

  ARCHIVO_LICITACION: baseUrl + '/tenderFile',
};
