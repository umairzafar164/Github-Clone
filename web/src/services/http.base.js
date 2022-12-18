import axios from 'axios';
import { toast } from 'react-toastify';

export default class HttpBase {
  GET = (url) => {
    return axios
      .get(url)
      .then(this.successHandlerBase.bind(this))
      .catch(this.errorHandlerBase.bind(this));
  };

  successHandlerBase = (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  };

  errorHandlerBase = (error) => {
    if (error.response?.status === 404) {
      toast.error('Commit history does not exist.', {
        toastId: 'commit_history',
      });
    } else {
      toast.error('Unknown error received. Please contact administrator.', {
        toastId: 'contact_administrator',
      });
    }

    return undefined;
  };
}
