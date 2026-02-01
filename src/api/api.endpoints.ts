export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  tasks: {
    base: '/task/',
    byId: (id: string) => `/task/${id}`,
  }
};
