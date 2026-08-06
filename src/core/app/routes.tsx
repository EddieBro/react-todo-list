import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/layout/RootLayout.tsx';
import {BoardPage} from '@/modules/board';
import {HomePage} from '@/modules/home';
import {UserPage, UserListPage} from '@/modules/users';
import {BoardListPage} from '@/modules/boards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'users', element: <UserListPage />},
      {path: 'users/:userId', element: <UserPage />},
      {path: 'boards', element: <BoardListPage />},
      {path: 'boards/:boardId', element: <BoardPage />},
    ],
  },
]);
