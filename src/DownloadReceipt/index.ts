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
import { Endpoints } from './endpoints';

/**
 * - useDownload
 *
 *   - receiptPDF (recibos desde el listado .PDF)
 *   - receiptZIP (recibos desde el listado .ZIP)
 *
 *    **select** cargar número de recibos en formato (csv)
 *--------------
 *
 *  - paymentReceiptPDF (comprobantes de pago desde el listado .PDF)
 *  - paymentReceiptZIP (comprobantes de pago desde el listado .ZIP)
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
 *  - tenderFile (ID - nombreArchivo)
 *     - no necesita manejador de estado
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
  const receiptPDF = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoints.RECIBOS_PDF,
    });
  };

  const receiptZIP = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoints.RECIBOS_ZIP,
    });
  };
  // ----------------- END ----------------------//

  // ---- Recibos por link --------------- //
  const receiptPDFbyLink = () => {
    handleDownloadDTO({
      param: { token, id },
      url: Endpoints.RECIBOS_PDF_BY_LINK,
    });
  };

  const receiptZIPbyLink = () => {
    handleDownloadDTO({
      param: { zip },
      url: Endpoints.RECIBOS_ZIP_BY_LINK,
    });
  };

  const receiptByLink = () => {
    !!zip ? receiptZIPbyLink() : receiptPDFbyLink();
  };
  // ----------------- END ----------------------//

  // ---- Comprobantes Seleccionados --------------- //
  const paymentReceiptPDF = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoints.COMPROBANTE_PDF,
    });
  };

  const paymentReceiptZIP = () => {
    handleDownloadDTO({
      param: receiptsDownload,
      url: Endpoints.COMPROBANTE_ZIP,
    });
  };
  // ----------------- END ----------------------//

  const salaryReceipt = () => {
    handleDownloadDTO({
      param: { id },
      url: Endpoints.RECIBO_DE_SUELDO,
    });
  };

  const tenderFile = (idLicitacion: number, nombreArchivo: string) => {
    handleDownloadDTO({
      param: { idLicitacion, nombreArchivo },
      url: Endpoints.ARCHIVO_LICITACION,
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

    receiptPDF,
    receiptZIP,
    receiptByLink,

    paymentReceiptPDF,
    paymentReceiptZIP,

    salaryReceipt,

    tenderFile,
  };
};
