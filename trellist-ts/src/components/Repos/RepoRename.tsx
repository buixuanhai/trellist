import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { mutate } from 'swr';
import { Repo } from '../types';

type Props = {
  handleClose: () => void,
  repo: Repo
};

const RepoRename = ({ handleClose, repo }: Props) => {
  const [open, setOpen] = useState(false);
  const [repoName, setRepoName] = useState(repo?.name);

  return (
    <div>
      <MenuItem onClick={() => {
        // handleClose()
        setOpen(true);
      }}>Rename</MenuItem>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)} aria-labelledby={'Create repo dialog'}>
        <DialogTitle >
          Rename repo
        </DialogTitle>
        <DialogContent>
          <TextField
            data-testid="repo-name"
            fullWidth
            id="name"
            label="Repo name"
            value={repoName}
            variant="standard"
            onChange={e => setRepoName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            if (!repoName) {
              return;
            }
            await fetch(`/api/repo/${repo.id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: repo.id, name: repoName })
            });

            mutate('/api/repo');
            setOpen(false);
            setRepoName('');
            handleClose();
          }}>
            Save
          </Button>
          <Button onClick={async () => {
            setOpen(false);
            handleClose();
            setRepoName('');
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

RepoRename.propTypes = {};

export default RepoRename;