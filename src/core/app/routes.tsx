import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/layout/RootLayout.tsx';
import {BoardPage} from '@/modules/board/pages/BoardPage.tsx';
import {HomePage} from '@/modules/home/pages/HomePage.tsx';
import {UserPage} from '@/modules/users/pages/UserPage.tsx';
import {UserListPage} from '@/modules/users/pages/UserListPage.tsx';
import {BoardListPage} from '@/modules/boards/pages/BoardListPage.tsx';

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
