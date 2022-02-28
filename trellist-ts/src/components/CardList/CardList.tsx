import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CreateCard from '../Card/CreateCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CardDetail from '../Card/CardDetail';
import { CardList as CardListType } from '../types';

type Props = {
  list: CardListType,
  isDropDisabled: boolean
};

const CardList = ({ list, isDropDisabled }: Props) => {

  return (
    <div>

      <Droppable
        droppableId={list.id}
        isDropDisabled={isDropDisabled}
      >
        {(
          dropProvided,
          dropSnapshot,
        ) => {
          return <Paper sx={{
            p: 1,
            ...dropSnapshot.isDraggingOver && ({ backgroundColor: '#e3f2fd' })
          }} >
            <List
              ref={dropProvided.innerRef}
              subheader={
                <ListSubheader sx={{ textDecoration: 'underline', textTransform: 'uppercase' }} component="div" id="nested-list-subheader">
                  {list.title}
                </ListSubheader>
              }
            >
              {list?.cards?.map((item, index) => {
                return <Draggable key={item.id} draggableId={item.id} index={index}>
                  {
                    (draggableProvided, ) => (
                      <Box sx={{ cursor: 'pointer', backgroundColor: '#eee', mb: 1 }}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={draggableProvided.draggableProps.style}
                        key={item.id}>
                        <CardDetail card={item} index={index} />
                      </Box>)
                  }
                </Draggable>;
              })}
              {dropProvided.placeholder}

            </List>
          </Paper>;
        }
        }
      </Droppable>
      <CreateCard list={list} />
    </div>
  );
};

export default CardList;