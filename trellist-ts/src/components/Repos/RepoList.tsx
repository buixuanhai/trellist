import useSWR from 'swr';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CreateRepo from './CreateRepo';
import { Paper, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import RepoMenu from './RepoMenu';
import { Link } from 'react-router-dom';
import { Repo } from '../types';

const RepoList = () => {
  const { data } = useSWR('/api/repo');

  return <Paper sx={{ pt: 2 }}>
    <Typography sx={{ textAlign: 'center' }} variant="h5" >Repositories</Typography>
    <CreateRepo />
    <List>
      {data?.repos.map((repo: Repo) => {
        return <ListItem key={repo.id} sx={{ cursor: 'pointer' }}
          secondaryAction={
            <RepoMenu repo={repo} />
          }
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <Link to={`repo/${repo.id}`}>{repo.name}</Link>
        </ListItem>;
      })}
    </List>

  </Paper >;
};

RepoList.propTypes = {};

export default RepoList;