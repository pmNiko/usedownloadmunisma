export enum ContentType {
    PDF = 'application/pdf; charset=utf-8',
    ZIP = 'application/zip; charset=utf-8',
}

export enum DownloadText {
    ToastInfo = 'Su recibo ya esta pago o el link es inválido.',
    ToastSuccess = 'Su descarga se ha completado con éxito!',
    ToastErrorDTO = 'Error generando el archivo, por favor intente más tarde.',
    ToastException = 'Servicio no disponible intente más tarde.',
    FileNamePdfDefault = 'Recibos-munisma.pdf',
    FileNameZipDefault = 'Recibos-munisma.zip',
}
