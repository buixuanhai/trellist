import React, { useContext } from 'react';
import { Repo } from '../components/types';
import { RepoAction } from './useRepoReducer';

type ContextData = {
  dispatch: (action: RepoAction) => void;
  repo?: Repo;
};

export const RepoContext = React.createContext<ContextData>({} as ContextData);

export function useRepo() {
  return useContext(RepoContext);
}
