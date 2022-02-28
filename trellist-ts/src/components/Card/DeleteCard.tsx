import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useRepo } from '../../hooks/useRepo';
import { Card } from '../types';

type Props = {
  card: Card,
  handleClose: () => void
};

const DeleteCard = ({ card, handleClose: handleCloseMenu }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { dispatch } = useRepo();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const onDelete = async () => {
    await fetch(`/api/card/${card?.id}`, {
      method: 'DELETE'
    });
    handleCloseMenu();
    dispatch({
      type: 'DELETE_CARD',
      card
    });
  };

  return (
    <MenuItem onClick={() => {
      handleClickOpen();
    }}>
      Delete
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm delete card
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDelete} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </MenuItem>
  );
};

DeleteCard.propTypes = {};

export default DeleteCard;