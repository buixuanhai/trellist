import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { mutate } from 'swr';
import AddIcon from '@mui/icons-material/Add';

const CreateRepo = () => {
  const [open, setOpen] = useState(false);
  const [repoName, setRepoName] = useState('');
  return (
    <div>
      <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={() => {
        setOpen(true);
      }}>
        <AddIcon /> Create repo
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)} aria-labelledby={'Create repo dialog'}>
        <DialogTitle >
          Create repo
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
            await fetch('/api/repo', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: repoName })
            }).then(res => res.json());

            mutate('/api/repo');
            setOpen(false);
            setRepoName('');

          }}>
            Save
          </Button>
          <Button onClick={async () => {
            setOpen(false);
            setRepoName('');
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateRepo.propTypes = {};

export default CreateRepo;