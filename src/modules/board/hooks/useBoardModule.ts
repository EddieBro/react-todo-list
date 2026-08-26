import type { Board } from '@/core/models/models.ts';
import {useModuleLifecycle} from '@/core/store';
import {boardModuleEnter, boardModuleExit} from '../store/boardActions.ts';

export const useBoardModule = (boardId: Board['id']) =>
    useModuleLifecycle(boardModuleEnter, boardModuleExit, boardId);
