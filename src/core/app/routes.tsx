import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/layout/RootLayout.tsx';
import {BoardPage} from '@/modules/board';
import {HomePage} from '@/modules/home';
import {UserPage, UserListPage} from '@/modules/users';
import {BoardListPage} from '@/modules/boards';
import {userApi} from '@/shared/api/userApi.ts';
import {boardApi} from '@/shared/api/boardApi.ts';
import {RouteError} from '@/core/layout/RouteError/RouteError.tsx';

export const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <RouteError />,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'users', element: <UserListPage />, loader: () => userApi.getUsers()},
      {path: 'users/:userId', element: <UserPage />},
      {path: 'boards', element: <BoardListPage />, loader: () => boardApi.getBoards()},
      {path: 'boards/:boardId', element: <BoardPage/>, loader: ({params}) =>
            boardApi.getBoard(params.boardId!)},
    ],
  },
]);
