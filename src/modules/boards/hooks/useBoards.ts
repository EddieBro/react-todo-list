import {useLoaderData} from 'react-router-dom';
import type {Board, User} from '@/core/models/models.ts';

type BoardsLoaderData = {boards: Board[]; users: User[]};

export const useBoards = () => useLoaderData() as BoardsLoaderData;
