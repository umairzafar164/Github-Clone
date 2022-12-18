import HttpBase from '../services/http.base';
import AppConstants from '../constants/constants';

class HttpRepo extends HttpBase {
  getAll = () => this.GET(`${AppConstants.baseURL}/repos`);
  getCommitHistory = (owner, repoName) =>
    this.GET(`https://api.github.com/repos/${owner}/${repoName}/commits`);
  getRepoWiki = (owner, repoName) =>
    this.GET(
      `https://raw.githubusercontent.com/${owner}/${repoName}/master/README.md`
    );
}
const HttpRepos = new HttpRepo();
export default HttpRepos;
