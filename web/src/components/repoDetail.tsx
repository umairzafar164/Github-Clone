import { useState } from 'react';
import README_FILE from './readme';
import moment from 'moment';
import { Divider, Button, Modal } from 'antd';

const REPO_DETAIL = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {props.selectedRepoData && (
        <>
          <div>
            <h2>Author: {props.selectedRepoData[0]?.commit.author.name}</h2>
            <h3>
              Date:
              {moment(props.selectedRepoData[0]?.commit.author.date).format(
                'MM/DD/YYYY'
              )}
            </h3>
            <h3>Commit Message: {props.selectedRepoData[0]?.commit.message}</h3>
            <Button type="primary" onClick={() => setShowModal(true)}>
              View readme file
            </Button>
          </div>
          <Divider type="horizontal" />
          <Modal
            open={showModal}
            title="Readme.md"
            width={1000}
            cancelText="Close"
            maskClosable={true}
            destroyOnClose={true}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setShowModal(false)}
          >
            <README_FILE selectedRepoWiki={props.selectedRepoWiki} />
          </Modal>
        </>
      )}
    </>
  );
};
export default REPO_DETAIL;
