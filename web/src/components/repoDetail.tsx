import moment from 'moment';

const REPO_DETAIL = (props: any) => {
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
          </div>
        </>
      )}
    </>
  );
};
export default REPO_DETAIL;
