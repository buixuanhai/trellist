import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useRepo } from '../../hooks/useRepo';
import { CardList } from '../types';

type Props = {
  list: CardList
};

const CreateCard = ({ list }: Props) => {
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNote, setCardNote] = useState('');
  const { dispatch } = useRepo();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <div>
    <Box sx={{ textAlign: 'center' }}>
      <Button sx={{ mt: 2, mb: 3 }} variant='outlined' size="small" onClick={handleClickOpen}>
        <AddIcon /> Add a card
      </Button>
    </Box>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>New card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          value={cardName}
          onChange={e => setCardName(e.target.value)}
        />

        <TextField
          margin="dense"
          id="note"
          label="Note"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={cardNote}
          onChange={e => setCardNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={async () => {

          await fetch(`/api/list/${list?.id}/card`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: cardName, note: cardNote })
          }).then(async res => {
            const card = await res.json();
            dispatch({
              type: 'ADD_CARD',
              card,
              listId: list.id
            });
          }).catch(e => console.log('error', e))


          handleClose();
          setCardName('');
          setCardNote('');

        }}>Save</Button>
      </DialogActions>
    </Dialog>
  </div>;
};

CreateCard.propTypes = {};

export default CreateCard;