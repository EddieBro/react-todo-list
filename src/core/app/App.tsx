import {RouterProvider} from 'react-router-dom';
import {router} from '@/core/app/routes.tsx';
import {SessionProvider} from '@/core/session/SessionProvider.tsx';

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}

export default App
