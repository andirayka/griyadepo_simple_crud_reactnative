import {CancelToken, create} from 'apisauce';
import {setLocalStorage, getLocalStorage} from './localStorage';

// apisauce instance with base url
const api = create({
  baseURL: 'https://api.tes-flutter.griyadepo.com/api/',
});

// for cancel request
const source = CancelToken.source();

// Post data to api
export const apiPost = async ({url, payload}) => {
  try {
    const {ok, data} = await api.post(url, payload, {
      cancelToken: source.token,
    });

    console.log({data});
    // If success
    if (ok) {
      return {success: true, data: data.data};
    }

    return {success: false, data: null};
  } catch (error) {
    return {success: false, data: null};
  }
};

// Get data from api
export const apiGet = async ({url, params}) => {
  try {
    const {ok, data} = await api.get(url, params, {
      cancelToken: source.token,
    });

    // If success
    if (ok) {
      return {success: true, data: data.data};
    }

    return {success: false, data: null};
  } catch (error) {
    return {success: false, data: null};
  }
};

// Delete data
export const apiDelete = async ({url, params}) => {
  try {
    const {ok, data} = await api.delete(url, params, {
      cancelToken: source.token,
    });

    // If success
    if (ok) {
      return {success: true, data: data.data};
    }

    return {success: false, data: null};
  } catch (error) {
    return {success: false, data: null};
  }
};

// Cancel any request
export const cancelApiRequest = () => {
  source.cancel();
};
