import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RequireAuth from './components/RequireAuth';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/books',
//         element: (
//           <RequireAuth>
//             <Books />
//           </RequireAuth>
//         ),
//       },
//       { path: '/signup', element: <Signup /> },
//       { path: '/login', element: <Login /> },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <>
//       <ApolloProvider client={client}>
//         <RouterProvider router={router}>
//           <AppLayout />
//         </RouterProvider>
//       </ApolloProvider>
//     </>
//   );
// }

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={
              <RequireAuth>
                <Books />
              </RequireAuth>
            }
          />
          <Route
            path="/books/:id"
            element={
              <RequireAuth>
                <BookDetails />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
