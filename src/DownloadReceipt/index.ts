import { useReducer } from 'react';
import axios from 'axios';
import { useMessageToast } from 'toast-munisma';
import {
  downloadReducer,
  initialStateDownloadReducer,
} from './downloadReducer';
import { DownloadText } from './enums';
import {
  DownloadDTOParams,
  DownloadFileDTO,
  ReceiptOptions,
} from './interfaces';
import { Endpoint } from './endpoint';

/**
 * - useDownload
 *
 *   - receiptPdf (recibos desde el listado .PDF)
 *   - receiptZip (recibos desde el listado .ZIP)
 *
 *    **select** cargar número de recibos en formato (csv)
 *--------------
 *
 *  - paymentReceiptPdf (comprobantes de pago desde el listado .PDF)
 *  - paymentReceiptZip (comprobantes de pago desde el listado .ZIP)
 *
 *    **select** cargar número de recibos en formato (csv)
 *--------------
 *  - receiptByLink (link desde el email)
 *     - **setId** cargar hash formato .PDF
 *     - **setToken** cargar hash formato .PDF
 *     - **setZip** cargar hash formato .ZIP
 *--------------
 *  - salaryReceipt (link desde el email)
 *     - **setId** cargar hash formato .PDF
 *--------------
 * @customHook para descarga de recibos del contribuyente
 */
export const useDownload = () => {
  const { setToastState } = useMessageToast({
    infoShow: true,
    successShow: true,
  });
  const [
    { isFetching, progress, zip, id, token, receiptsDownload },
    dispatch,
  ] = useReducer(downloadReducer, initialStateDownloadReducer);

  /**
   * Metodo root encargado de realizar la peticón de datos para la descarga
   */
  const handleDownloadDTO = async ({ url, param }: DownloadDTOParams) => {
    try {
      dispatch({ type: 'changeIsFetching' });

      const response = await axios({
        method: 'post',
        url,
        data: param,
        onDownloadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch({ type: 'setProgress', payload: percentCompleted });
        },
      });

      const { datos, estado, mensaje } = response.data as DownloadFileDTO;

      if (estado === 0) {
        dispatch({ type: 'changeIsFetching' });
        setToastState({
          status: 'error',
          message: mensaje || DownloadText.ToastErrorDTO,
        });
        return;
      }

      const linkSource = `data:${datos.at(0)?.contentType};base64,${
        datos.at(0)?.contenido
      }`;
      const downloadLink = document.createElement('a');

      downloadLink.href = linkSource;
      downloadLink.download = datos.at(0)?.nombreArchivo || '';
      downloadLink.click();

      setToastState({ status: 'success', message: DownloadText.ToastSuccess });
      dispatch({ type: 'changeIsFetching' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'changeIsFetching' });
      setToastState({ status: 'error', message: DownloadText.ToastException });
      dispatch({ type: 'reset' });
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  // ---- Recibos Seleccionados --------------- //
  const receiptPdf = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoint.RECIBOS_PDF_SELECCIONADOS,
    });
  };

  const receiptZip = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoint.RECIBOS_ZIP_SELECCIONADOS,
    });
  };
  // ----------------- END ----------------------//

  // ---- Comprobantes Seleccionados --------------- //
  const paymentReceiptPdf = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoint.COMPROBANTE_PDF_SELECCIONADOS,
    });
  };

  const paymentReceiptZip = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoint.COMPROBANTE_ZIP_SELECCIONADOS,
    });
  };
  // ----------------- END ----------------------//

  // ---- Recibos por link --------------- //
  const receiptPdfFromEmail = () => {
    handleDownloadDTO({
      param: { token, id },
      url: Endpoint.RECIBOS_PDF_DESDE_EMAIL,
    });
  };

  const receiptZipFromEmail = () => {
    handleDownloadDTO({
      param: { zip },
      url: Endpoint.RECIBOS_ZIP_DESDE_EMAIL,
    });
  };

  const receiptByLink = () => {
    !!zip ? receiptZipFromEmail() : receiptPdfFromEmail();
  };
  // ----------------- END ----------------------//

  const salaryReceipt = () => {
    handleDownloadDTO({
      param: { id },
      url: Endpoint.RECIBO_DE_SUELDO,
    });
  };

  return {
    isFetching,
    progress,

    setToken: (payload: string | null) =>
      dispatch({ type: 'setToken', payload }),
    setId: (payload: string | null) => dispatch({ type: 'setId', payload }),
    setZip: (payload: string | null) => dispatch({ type: 'setZip', payload }),
    select: (payload: ReceiptOptions) =>
      dispatch({ type: 'setReceipts', payload }),

    receiptPdf,
    receiptZip,
    receiptByLink,

    paymentReceiptPdf,
    paymentReceiptZip,

    salaryReceipt,
  };
};
