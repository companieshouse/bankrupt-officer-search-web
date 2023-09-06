import { Request, Response } from 'express';

export function notFoundErrorHandler(req: Request, res: Response): void {
  return res.status(404).render('error-pages/404');
}

export function serverErrorHandler(err: {[key: string]: number}, req: Request, res: Response): void {
  return res.status(err?.statusCode || 500).render('error-pages/500');
}
