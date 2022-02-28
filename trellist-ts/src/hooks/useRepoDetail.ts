import { useMemo } from 'react';
import useSWR from 'swr';
import { Repo } from '../components/types';

export function useRepoDetail(repoId: string | undefined) {
  const { data } = useSWR<Repo>(`/api/repo/${repoId}`);

  const repo = useMemo(() => {
    if (!data) {
      return data;
    }
    return {
      ...data,
      lists: data.lists?.map(list => {
        return {
          ...list,
          cards: list.cards?.map(card => {
            return {
              ...card, stage: list.stage
            };
          }) ?? []
        };
      }) ?? []
    };
  }, [data]);

  return { data: repo };
}
