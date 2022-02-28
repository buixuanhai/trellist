import React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import CardDetailMenu from './CardDetailMenu';
import { Grid } from '@mui/material';
import StageTransition from './StageTransition';
import CardTitle from './CardTitle';
import CardNote from './CardNote';
import { Card } from '../types';

type Props = {
  card: Card;
  index: number;
};

const CardDetail = ({ card, index }: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem onClick={handleClickOpen}>
        <ListItemText primary={card.text} />
      </ListItem>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {card.text}
            </Typography>
            <CardDetailMenu card={card} />
          </Toolbar>
        </AppBar>
        <Grid sx={{ height: 400, p: 3 }} container>
          <Grid item xs={12} sm={8}>
            <CardTitle card={card} />
            <CardNote card={card} />
          </Grid>
          <Grid sx={{ pl: 2 }} item xs={12} sm={4}>
            <StageTransition card={card} index={index} />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

CardDetail.propTypes = {};

export default CardDetail;
