import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useRepo } from '../../hooks/useRepo';
import { Card } from '../types';

type Props = {
  card: Card;
};

const CardTitle = ({ card }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.text);
  const { dispatch } = useRepo();
  const updateCardTitle = async () => {
    await fetch(`/api/card/${card.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: card.id, text: title })
    });

    setEditing(false);
    dispatch({
      type: 'UPDATE_CARD',
      card: { ...card, text: title }
    });
  };

  return (
    <Box
      sx={{
        fontSize: '15pt',
        mb: 2
      }}
    >
      {!editing && (
        <Box
          onClick={() => {
            setEditing(true);
          }}
          onBlur={() => setEditing(false)}
        >
          {title}
        </Box>
      )}

      {editing && (
        <Box sx={{ display: 'flex' }}>
          <TextField
            data-testid="card-title"
            value={title}
            variant="standard"
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
          <IconButton onClick={updateCardTitle}>
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setEditing(false);
              setTitle(card.text);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

CardTitle.propTypes = {};

export default CardTitle;
