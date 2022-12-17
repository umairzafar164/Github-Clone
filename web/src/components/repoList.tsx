import { useEffect, useState } from 'react';
import HttpRepo from '../rest/http.repo';
import { IRepo } from '../interfaces/repo.interface';
import { toast } from 'react-toastify';
import { List, Row, Col } from 'antd';
import { AiOutlineFork } from 'react-icons/ai';
import { HiLanguage } from 'react-icons/hi2';

const REPO_LIST = () => {
  const [repos, setRepos] = useState([] as any);

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
  return (
    <>
      <Row>
        <Col span={8}>
          <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <List
              itemLayout="vertical"
              dataSource={repos}
              renderItem={(item: IRepo) => (
                <List.Item className="highlight-on-hover">
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
      </Row>
    </>
  );
};
export default REPO_LIST;
