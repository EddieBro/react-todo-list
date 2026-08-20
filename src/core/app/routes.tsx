import {createBrowserRouter} from 'react-router-dom';
import {RootLayout} from '@/core/layout/RootLayout.tsx';
import {BoardPage} from '@/modules/board';
import {HomePage} from '@/modules/home';
import {UserPage, UserListPage, usersModuleEnter} from '@/modules/users';
import {BoardListPage, boardsModuleEnter} from '@/modules/boards';
import {boardApi} from '@/shared/api/boardApi.ts';
import {RouteError} from '@/core/layout/RouteError/RouteError.tsx';
import {store} from '@/core/store/store.ts';

export const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <RouteError />,
    loader: () => store.dispatch(usersModuleEnter()),
    children: [
      {index: true, element: <HomePage/>},
      {path: 'users', element: <UserListPage />},
      {path: 'users/:userId', element: <UserPage />},
      {
        path: 'boards',
        element: <BoardListPage />,
        loader: async () => store.dispatch(boardsModuleEnter())
      },
      {path: 'boards/:boardId', element: <BoardPage/>, loader: ({params}) =>
            boardApi.getBoard(params.boardId!)},
    ],
  },
]);
