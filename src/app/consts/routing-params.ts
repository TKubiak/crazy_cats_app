export interface RoutingParams {
  [k: string]: {
    path: string;
    url: string;
  };
}

export const ROUTING_PARAMS: RoutingParams = {
  DASHBOARD: {
    path: '',
    url: '/',
  },
  SIGN_IN: {
    path: 'login',
    url: '/login',
  },
};
