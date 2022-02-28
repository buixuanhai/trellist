import { useParams } from 'react-router-dom';
import RepoDetail from './RepoDetail';
import { useNavigate } from 'react-router-dom';
import { useRepoDetail } from '../../hooks/useRepoDetail';

const RepoDetailContainer = () => {
  const { repoId } = useParams();
  const { data } = useRepoDetail(repoId);
  console.log(data);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  return <RepoDetail repo={data} navigate={navigate} />;
};

RepoDetailContainer.propTypes = {};

export default RepoDetailContainer;
