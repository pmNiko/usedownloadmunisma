const baseUrl = process.env.REACT_APP_DOMAIN! + '/api-commons/download';

export const Endpoint = {
  RECIBOS_PDF_SELECCIONADOS: baseUrl + '/downloadPDFDto',
  RECIBOS_ZIP_SELECCIONADOS: baseUrl + '/downloadZIPDto',

  COMPROBANTE_PDF_SELECCIONADOS: baseUrl + '/downloadPaymentReceiptPdfDTO',
  COMPROBANTE_ZIP_SELECCIONADOS: baseUrl + '/downloadPaymentReceiptZipDTO',

  RECIBOS_PDF_DESDE_EMAIL: baseUrl + '/downloadPDFDtoFromEmail',
  RECIBOS_ZIP_DESDE_EMAIL: baseUrl + '/downloadZIPDtoFromEmail',

  RECIBO_DE_SUELDO: baseUrl + '/downloadSalaryReceipt',
};
