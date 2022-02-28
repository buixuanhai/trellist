import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { mutate } from 'swr';
import RepoRename from './RepoRename';
import { useNavigate } from 'react-router-dom';
import { Repo } from '../types';

type Props = {
  repo: Repo
};

const RepoMenu = ({ repo }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton edge="end" aria-label="open menu"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="repo-menu"
        data-testid={`repo-menu-${repo.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleClose();
          navigate(`/repo/${repo.id}`);
        }}
        >Open</MenuItem>
        <RepoRename repo={repo} handleClose={handleClose} />
        <MenuItem onClick={async () => {
          await fetch(`/api/repo/${repo.id}`, {
            method: 'DELETE'
          });
          mutate('/api/repo');
          handleClose();
        }}>Delete</MenuItem>
      </Menu>
    </div>
  );
};


export default RepoMenu;