import {RouterProvider} from 'react-router-dom';
import {router} from '@/core/app/routes.tsx';

function App() {
  return <RouterProvider router={router} />
}

export default App
