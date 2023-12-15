import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RequireAuth from './components/RequireAuth';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Books from './pages/Books';
import Signup from './pages/Signup';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/books',
        element: (
          <RequireAuth>
            <Books />
          </RequireAuth>
        ),
      },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </>
  );
}

export default App;
