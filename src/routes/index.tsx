import { Redirect } from 'react-router-dom';
import { AppRoute } from '@Types/routing';
import LoginPage from '@Components/pages/auth/LoginPage';
import ActivateAccountPage from '@Components/pages/auth/ActivateAccountPage';
import ForgotPasswordPage from '@Components/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@Components/pages/auth/ResetPasswordPage';
import ChangePasswordPage from '@Components/pages/auth/ChangePasswordPage';
import DashboardPage from '@Components/pages/protected/DashboardPage';

export const auth_routes: AppRoute[] = [
  {
    path: '/login',
    url: '/login',
    exact: true,
    component: LoginPage,
    displayName: 'Login',
  },
  {
    path: '/activate-account',
    url: '/activate-account',
    exact: true,
    component: ActivateAccountPage,
    displayName: 'ActivateAccount',
  },
  {
    path: '/forgot-password',
    url: '/forgot-password',
    exact: true,
    component: ForgotPasswordPage,
    displayName: 'ForgotPassword',
  },
  {
    path: '/reset-password',
    url: '/reset-password',
    exact: true,
    component: ResetPasswordPage,
    displayName: 'ResetPassword',
  },
  {
    path: '/change-password',
    url: '/change-password',
    exact: true,
    component: ChangePasswordPage,
    displayName: 'ChangePassword',
  },
];

export const select_account_routes: AppRoute[] = [];

export const routes: AppRoute[] = [
  {
    path: '/',
    url: '/',
    exact: true,
    component: DashboardPage,
    displayName: 'Dashboard',
  },
  {
    path: '/documents',
    url: '/documents',
    exact: true,
    component: () => <Redirect to='/documents/all-documents' />,
    displayName: 'Documents',
  },
];

export const public_routes: AppRoute[] = [];
