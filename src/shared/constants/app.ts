export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  ENTITIES: '/entities',
  SETTINGS: '/settings',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const PAGINATION_LIMIT = 20;
