import HttpBase from '../services/http.base';
import AppConstants from '../constants/constants';

class HttpRepo extends HttpBase {
  getAll = () => this.GET(`${AppConstants.baseURL}/repos`);
}
const HttpRepos = new HttpRepo();
export default HttpRepos;
