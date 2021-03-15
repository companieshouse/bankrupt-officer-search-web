import { Request, Response } from 'express';

export function notFoundErrorHandler(req: Request, res: Response): void {
  return res.status(404).render('error-pages/404');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function serverErrorHandler(err, req: Request, res: Response): void {
  return res.status(err?.statusCode || 500).render('error-pages/500');
}
