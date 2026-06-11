import {RouterProvider} from 'react-router'
import {router} from './app.routes'
import {useAuth} from '../features/auth/hook/useAuth'
import {useEffect} from 'react'

function App(){

  const auth = useAuth()

  // useEffect(() => {
  //   auth.handleGetme()
  // },[])
  useEffect(() => {
  const init = async () => {
    try {
      await auth.handleGetme();
    } catch (err) {
      // Ignore 401
    }
  };

  init();
}, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App