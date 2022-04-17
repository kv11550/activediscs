import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account',
    authenticatedSelector: (state: any) => state && state.user && state.user.user,
    wrapperDisplayName: 'Authenticated'
}) as any;
