import {useLoaderData} from 'react-router-dom';
import type {User} from '@/core/models/models.ts';

export const useUsers = () => useLoaderData() as User[];
