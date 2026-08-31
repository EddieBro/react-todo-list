import {useAppDispatch} from '@/core/store';
import {useSession} from '@/core/session/useSession.ts';
import {useCallback} from 'react';
import type {Column} from '@/core/models/models.ts';
import {createId} from '@/shared/utils/id.ts';
import {addTask} from '../store/boardActions.ts';

export type TaskDraft = {title: string; description: string};

export const useAddTask = () => {
  const dispatch = useAppDispatch();
  const {currentUserId} = useSession();

  return useCallback((draft: TaskDraft, columnId: Column['id']) => {
    if (!currentUserId) return;

    dispatch(addTask({
      task: {
        id: createId(),
        title: draft.title.trim(),
        description: draft.description.trim(),
        authorId: currentUserId,
      },
      columnId,
    }));
  }, [dispatch, currentUserId]);
}
