import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';


const App = lazy(() => import('./App.jsx'))
const CheckEmail = lazy(() => import('./pages/CheckEmail.jsx'))
const CheckPassword = lazy(() => import('./pages/CheckPassword.jsx'))
const Register = lazy(() => import('./pages/Registration.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))


import './index.css'
import Protected from './components/Protected.jsx'
import Header from './components/Header.jsx'
import MessagePage from './components/MessagePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "email",
        element: (
          <Protected userAuthenticated={true} >
            <Suspense fallback={<p>Loading</p>}>
              <Header>
                <CheckEmail />
              </Header>
            </Suspense>
          </Protected>
        )
      },
      {
        path: "register",
        element: (
          <Protected userAuthenticated={true} >
            <Suspense fallback={<p>Loading</p>}>
              <Header>
                <Register />
              </Header>
            </Suspense>
          </Protected>
        )
      },

      {
        path: "password",
        element: (
          <Protected userAuthenticated={true} >
            <Suspense fallback={<p>Loading</p>}>
              <Header>
                <CheckPassword />
              </Header>
            </Suspense>
          </Protected>
        )
      },
      {
        path: "/",
        element: (
          <Protected userAuthenticated={true} redirect={"/email"}>
            <Suspense fallback={<p>Loading</p>}>
              <Home />
            </Suspense>
          </Protected>
        ),
        children:[
          {
            path : ':userId',
            element: (
              <Protected userAuthenticated={true} >
                <Suspense fallback={<p>Loading</p>}>
                  
                  <MessagePage/>
                </Suspense>
              </Protected>
            )
          },
        ]
      },
      

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>


  </React.StrictMode>,
)
