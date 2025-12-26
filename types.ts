
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface ImageAsset {
  id: string;
  url: string;
  publicId: string;
  fileName: string;
  size: number;
  uploadedAt: string;
  userId: string;
  tags: string[];
}

export interface BackendStat {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
}

export enum ViewState {
  Dashboard = 'dashboard',
  UserManagement = 'users',
  MediaLibrary = 'media',
  SchemaExplorer = 'schema',
  CodeGenerator = 'code',
  APIReference = 'api'
}
