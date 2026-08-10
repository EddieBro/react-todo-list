import {useLoaderData} from 'react-router-dom';
import type {BoardDetails} from '@/core/models/models.ts';

export const useBoard = () => useLoaderData() as BoardDetails | null;
