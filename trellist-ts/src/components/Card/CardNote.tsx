import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useRepo } from '../../hooks/useRepo';
import { Card } from '../types';

type Props = {
  card: Card
};

const CardNote = ({ card }: Props) => {
  const [editing, setEditing] = useState(false);
  const [cardNote, setCardNote] = useState(card.note ?? '');
  const { dispatch } = useRepo();

  const updateCardTitle = async () => {
    const updatedCard = { id: card.id, text: card.text, note: cardNote };
    await fetch(`/api/card/${card.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCard)
    });


    setEditing(false);
    dispatch({
      type: 'UPDATE_CARD',
      card: { ...card, note: cardNote }
    });
  };

  if (editing) {
    return (
      <Box sx={{
        position: 'relative'
      }}>
        <TextField
          autoFocus
          value={cardNote}
          fullWidth
          label="Notes"
          multiline
          minRows={10}
          onChange={e => setCardNote(e.target.value)}
          maxRows={10}
        />

        <Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
          <IconButton onClick={updateCardTitle}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => {
            setEditing(false);
            setCardNote(card.text);
          }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return <div>
    <p>Note</p>
    <Box sx={{
      minHeight: 250,
      border: '1px solid #eee',
      pl: 2,
      pr: 2,
      '&:hover': {
        backgroundColor: '#eee',
      }
    }}
      onClick={() => setEditing(true)}
    >
      <p>{card.note}</p>
    </Box>
  </div>;

};


export default CardNote;