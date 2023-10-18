import { DownloadActionType, DownloadReducerState } from './interfaces';

export const initialStateDownloadReducer: DownloadReducerState = {
  token: '',
  id: '',
  zip: '',
  receiptsDownload: { receipts: '', usuario: '' },
  isFetching: false,
  progress: 0,
};

export const downloadReducer = (
  state: DownloadReducerState,
  action: DownloadActionType
) => {
  switch (action.type) {
    case 'setToken':
      return { ...state, token: action.payload };
    case 'setId':
      return { ...state, id: action.payload };
    case 'setZip':
      return { ...state, zip: action.payload };
    case 'setReceipts':
      return { ...state, receiptsDownload: action.payload };
    case 'changeIsFetching':
      return { ...state, isFetching: !state.isFetching };
    case 'setProgress':
      return { ...state, progress: action.payload };

    case 'reset':
      return { ...initialStateDownloadReducer };

    default:
      return state;
  }
};
