import { useEffect, useState } from 'react';
import HttpRepo from '../rest/http.repo';
import REPO_DETAIL from './repoDetail';
import { IRepo } from '../interfaces/repo.interface';
import { toast } from 'react-toastify';
import { List, Row, Col } from 'antd';
import { AiOutlineFork } from 'react-icons/ai';
import { HiLanguage } from 'react-icons/hi2';
import '../styles/styles.css';

const REPO_LIST = () => {
  const [repos, setRepos] = useState([] as any);
  const [selectedRepoData, setSelectedRepoData] = useState<any>(undefined);
  const [selectedRepoWiki, setSelectedRepoWiki] = useState<any>(undefined);

  useEffect(() => {
    HttpRepo.getAll()
      .then((response) => {
        let sortedData = [...response];
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
        setRepos(sortedData);
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

  return (
    <>
      <Row>
        <Col span={8}>
          <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <List
              itemLayout="vertical"
              dataSource={repos}
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
