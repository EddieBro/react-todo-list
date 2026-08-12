import {useLoaderData} from 'react-router-dom';
import type {User} from '@/core/models/models.ts';

export const useUser = () => useLoaderData() as User | null;
