type StageMap = {
  [key: string]: {
    text: string;
    nextStages?: string[];
  };
};

export const stageMap: StageMap = {
  open: {
    text: 'Open',
    nextStages: ['confirmed', 'falsePositive', 'fixed']
  },
  confirmed: {
    text: 'Confirmed',
    nextStages: ['fixed']
  },
  falsePositive: {
    text: 'False positive'
  },
  fixed: {
    text: 'Fixed'
  }
};
