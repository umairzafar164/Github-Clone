import HttpBase from '../services/http.base';
import AppConstants from '../constants/constants';

class HttpRepo extends HttpBase {
  getAll = () => this.GET(`${AppConstants.baseURL}/repos`);
  getCommitHistory = (owner, repoName) =>
    this.GET(`https://api.github.com/repos/${owner}/${repoName}/commits`);
}
const HttpRepos = new HttpRepo();
export default HttpRepos;
