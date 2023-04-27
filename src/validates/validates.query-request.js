import { query } from 'express-validator';

export const queryPagination = [
  query('limit').optional().isNumeric('limit must is numberic'),
  query('page').optional().isNumeric('page must is numberic'),
  query('searchKey').optional().isString('searchKey must is string'),
];

export const bankQuery = [...queryPagination];
