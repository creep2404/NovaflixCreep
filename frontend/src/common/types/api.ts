export type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiError = {
  message: string;
  code?: string;
  errors?: {
    field: string;
    message: string;
  }[];
};