import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/app/RootLayout.tsx';
import {UserPage} from '@/modules/user/containers/UserPage.tsx';
import {BoardListPage} from '@/modules/board/containers/BoardListPage.tsx';
import {BoardPage} from '@/modules/board/containers/BoardPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {path: 'user', element: <UserPage />},
      {path: 'board', element: <BoardListPage />},
      {path: 'board/:boardId', element: <BoardPage />},
    ],
  },
]);
