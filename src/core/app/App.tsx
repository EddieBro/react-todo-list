import {RouterProvider} from 'react-router-dom';
import {router} from '@/core/app/routes.tsx';
import {Provider} from 'react-redux';
import {store} from '@/core/store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
