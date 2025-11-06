export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type DashboardFilters = {
  consultantId?: string;
  consultantEmail?: string;
  startDate?: Date;
  endDate?: Date;
};
