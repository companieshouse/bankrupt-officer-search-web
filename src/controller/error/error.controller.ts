import { NextFunction, Request, Response } from 'express';

export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction): void {
  res.status(404).render('error-pages/404');
};

export function serverErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  res.status(err.statusCode || 500).render('error-pages/500');
};
