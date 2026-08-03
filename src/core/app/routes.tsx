import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/layout/RootLayout.tsx';
import {UserPage} from '@/modules/user/pages/UserPage.tsx';
import {BoardListPage} from '@/modules/board/pages/BoardListPage.tsx';
import {BoardPage} from '@/modules/board/pages/BoardPage.tsx';
import {HomePage} from '@/modules/home/pages/HomePage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'user', element: <UserPage />},
      {path: 'board', element: <BoardListPage />},
      {path: 'board/:boardId', element: <BoardPage />},
    ],
  },
]);
