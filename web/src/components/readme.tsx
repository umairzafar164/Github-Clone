import ReactMarkdown from 'react-markdown';

const README_FILE = (props: any) => {
  return (
    <>
      {props.selectedRepoWiki && (
        <ReactMarkdown>{props.selectedRepoWiki}</ReactMarkdown>
      )}
    </>
  );
};
export default README_FILE;
