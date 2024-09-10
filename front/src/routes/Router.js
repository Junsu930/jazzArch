import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContexet.js';
import SignUp from '../views/ui/SignUp.js';
import WritePost from '../views/ui/WritePost.js';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter.js'));
const Clubs = lazy(() => import('../views/ui/ClubList.js'));
const LoginPage = lazy(() => import('../views/ui/Login.js'));
const Contact = lazy(() => import('../views/ui/Contact.js'));
const Freeboard = lazy(() => import('../views/ui/Freeboard.js'));
const BoardDetail = lazy(() => import('../views/ui/BoardDetail.js'));
const PrivateRouter = lazy(() => import('./PrivateRouter.js'));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: (
      <AuthProvider>
        <FullLayout />
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <Navigate to="/starter" /> },
      { path: '/starter', exact: true, element: <Starter /> },
      {
        path: '/jazzClubSchedule',
        exact: true,
        element: <Navigate to="/clubList" />,
      },
      { path: '/clubList', exact: true, element: <Clubs region="metro" /> },
      { path: '/board', exact: true, element: <Navigate to="/freeboard" /> },
      { path: '/freeboard', exact: true, element: <Freeboard /> },
      { path: '/ask', exact: true, element: <Contact /> },
      { path: '/login', exact: true, element: <LoginPage /> },
      { path: '/signUp', exact: true, element: <SignUp /> },
      { path: '/post/:id', exact: true, element: <BoardDetail /> },
      {
        path: '/writePost',
        exact: true,
        element: <PrivateRouter element={<WritePost />}> </PrivateRouter>,
      },
    ],
  },
];

export default ThemeRoutes;
