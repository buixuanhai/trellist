import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardList from '../CardList/CardList';
import { RepoContext } from '../../hooks/useRepo';
import useRepoReducer from '../../hooks/useRepoReducer';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { stageMap } from '../constants';
import { Repo } from '../types';

type Props = {
  repo: Repo,
  navigate: (path: string) => void
};

const RepoDetail = ({ repo: repoProp, navigate }: Props) => {
  const [repo, dispatch] = useRepoReducer(repoProp);
  const [allowedDroppables, setAllowedDroppables] = useState<string[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;


    dispatch({
      type: source.droppableId === destination.droppableId ? 'REORDER_CARD_IN_LIST' : 'MOVE_CARD_BETWEEN_LIST',
      source,
      destination
    });

  };

  const onDragStart = ({ source }: DragStart) => {
    const sourceStage = repo?.lists?.find(l => l.id === source.droppableId)?.stage;
    if (sourceStage) {
      setAllowedDroppables([...stageMap[sourceStage].nextStages ?? [], sourceStage]);
    }
  };


  return (
    <RepoContext.Provider value={{ repo, dispatch }}>
      <Box>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between'
        }}>
          <Button variant="text" onClick={() => {
            navigate('/');
          }}>
            <ArrowBackIcon /> Back to repo list
          </Button>
        </Box>
        <Box>
          <Typography sx={{ textAlign: 'center', mb: 2 }} variant="h5" >{repo?.name}</Typography>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

            <Grid container spacing={2}>
              {repo?.lists.map((list) => {
                return <Grid key={list.id} item xs={12} sm={3}>
                  <CardList list={list} isDropDisabled={!allowedDroppables.includes(list.stage)} />
                </Grid>;
              })}
            </Grid>
          </DragDropContext>

        </Box>
      </Box>
    </RepoContext.Provider>
  );
};


export default RepoDetail;