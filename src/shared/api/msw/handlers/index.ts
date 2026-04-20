import { authHandlers } from './auth';
import { userHandlers } from './users';
import { productHandlers } from './products';
import { reviewHandlers } from './reviews';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...productHandlers,
  ...reviewHandlers,
];
