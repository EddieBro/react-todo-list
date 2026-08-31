import type {Column} from '@/core/models/models.ts';
import {createId} from '@/shared/utils/id.ts';

export const createDefaultColumns = (): Column[] => [
  {id: createId(), title: 'To Do', taskIds: []},
  {id: createId(), title: 'In Progress', taskIds: []},
  {id: createId(), title: 'Done', taskIds: []},
];
