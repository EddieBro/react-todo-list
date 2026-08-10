import {useLoaderData} from 'react-router-dom';
import type {Board} from '@/core/models/models.ts';

export const useBoards = () => useLoaderData() as Board[];
