import { useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRepo } from '../../hooks/useRepo';
import { Card } from '../types';
import { stageMap } from '../constants';

type Props = {
  card: Card,
  index: number
};

const StageTransition = ({ card, index }: Props) => {
  const { dispatch, repo } = useRepo();

  const currentStage = useMemo(() => {
    return stageMap[card.stage];
  }, [card]);


  return (
    <div>
      <Select
        variant="standard"
        value={card.stage}
        label="Stage"
      >
        <MenuItem key={card.stage} value={card.stage}>
          {currentStage.text}
        </MenuItem>
        {currentStage.nextStages?.map(stage => {
          return (
            <MenuItem key={stage} value={stageMap[stage].text}
              onClick={() => {
                dispatch({
                  type: 'MOVE_CARD_BETWEEN_LIST',
                  source: {
                    index,
                    droppableId: repo?.lists.find(l => l.stage === card.stage)?.id
                  },
                  destination: {
                    index,
                    droppableId: repo?.lists.find(l => l.stage === stage)?.id
                  }
                });
              }}
            >
              {stageMap[stage].text}
            </MenuItem>
          );
        })}

      </Select>
    </div>
  );
};

export default StageTransition;