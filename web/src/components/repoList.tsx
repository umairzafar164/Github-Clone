import { useEffect, useState } from 'react';
import HttpRepo from '../rest/http.repo';
import REPO_DETAIL from './repoDetail';
import { IRepo } from '../interfaces/repo.interface';
import { toast } from 'react-toastify';
import { List, Row, Col, Button, Spin } from 'antd';
import { AiOutlineFork } from 'react-icons/ai';
import { HiLanguage } from 'react-icons/hi2';
import '../styles/styles.css';

const REPO_LIST = () => {
  const [repos, setRepos] = useState([] as any); // All repos
  const [filteredRepos, setFilteredRepos] = useState([] as any); // Repos that are being rendered on the screen
  const [selectedRepoData, setSelectedRepoData] = useState<any>(undefined);
  const [selectedRepoWiki, setSelectedRepoWiki] = useState<any>(undefined);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    HttpRepo.getAll()
      .then((response) => {
        let sortedData = [...response];
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
        setRepos(sortedData);
        setFilteredRepos([...sortedData]);
        setLanguages(
          response.filter(
            (a: any, i: any) =>
              response.findIndex((s: any) => a.language === s.language) === i
          )
        );
      })
      .catch((err) => {
        toast.error('Sorry! There is an error at the backend.');
      });
  }, []);

  const getRepoWiki = (owner: string, repoName: string) => {
    HttpRepo.getRepoWiki(owner, repoName)
      .then((data) => {
        setSelectedRepoWiki(data);
      })
      .catch((err) => {
        toast.warn('No Readme.md file found');
      });
  };

  const setRepoDetails = (item: any) => {
    if (item === undefined) {
      setRepoDetails(undefined);
    } else if (repos) {
      const owner = item.owner.login;
      const repoName = item.name;
      HttpRepo.getCommitHistory(owner, repoName)
        .then((data) => {
          setSelectedRepoData(data);
          getRepoWiki(owner, repoName);
        })
        .catch((err) => {
          toast.error('Commit history does not exist.');
        });
    }
  };

  const filtering = (language: any) => {
    setFilteredRepos([...repos]);
    setFilteredRepos([...repos.filter((r: any) => r.language === language)]);
  };

  const viewAll = () => {
    setFilteredRepos(repos);
  };

  return (
    <>
      <Row>
        <Col span={8}>
          {repos && repos.length > 0 ? (
            <>
              <div className="ml-2 mt-2">
                <Button className="mr-2" onClick={() => viewAll()}>
                  All
                </Button>
                {languages.map((repo: IRepo) => (
                  <Button
                    className="mr-2"
                    key={repo.id}
                    onClick={() => filtering(repo.language)}
                  >
                    {repo.language}
                  </Button>
                ))}
              </div>
              <div style={{ overflowY: 'scroll', height: '100vh' }}>
                <List
                  itemLayout="vertical"
                  dataSource={filteredRepos}
                  renderItem={(item: IRepo) => (
                    <List.Item
                      className="highlight-on-hover"
                      onClick={(e: any) => {
                        setRepoDetails(item);
                      }}
                    >
                      <List.Item.Meta
                        title={<p className="text-primary">{item.name}</p>}
                        description={
                          !item.description
                            ? 'No description provided'
                            : item.description
                        }
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                          <HiLanguage size={20} className="mr-2" />
                          <p>{item.language}</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <AiOutlineFork size={20} className="mr-2" />
                          <p>{item.forks_count}</p>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </>
          ) : (
            <Spin className="mt-50 ml-50" />
          )}
        </Col>
        <Col span={16}>
          <div className="ml-2">
            <REPO_DETAIL
              selectedRepoData={selectedRepoData}
              selectedRepoWiki={selectedRepoWiki}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default REPO_LIST;
