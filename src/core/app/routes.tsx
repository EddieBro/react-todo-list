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
      {path: 'users/:userId', element: <UserPage />, loader: ({params}) => userApi.getUser(params.userId!)},
      {
        path: 'boards',
        element: <BoardListPage />,
        loader: async () => {
          const [boards, users] = await Promise.all([boardApi.getBoards(), userApi.getUsers()]);
          return {boards, users};
        }
      },
      {path: 'boards/:boardId', element: <BoardPage/>, loader: ({params}) =>
            boardApi.getBoard(params.boardId!)},
    ],
  },
]);
