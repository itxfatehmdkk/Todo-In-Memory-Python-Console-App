/** Authentication service for the Todo Full-Stack Web Application. */

import { authApi } from './api';

// Re-export the auth API functions to maintain the same interface
export const login = authApi.login;
export const signup = authApi.signup;
export const logout = authApi.logout;
export const isAuthenticated = authApi.isAuthenticated;
export const getCurrentUser = authApi.getCurrentUser;