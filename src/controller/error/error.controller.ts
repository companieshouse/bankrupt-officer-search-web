import { Request, Response } from 'express';
import { userSession } from '../../utils'

export function notFoundErrorHandler(req: Request, res: Response): void {
  const userEmail = userSession.getLoggedInUserEmail(req.session) 
  return res.status(404).render('error-pages/404', { userEmail });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function serverErrorHandler(err, req: Request, res: Response): void {
  const userEmail = userSession.getLoggedInUserEmail(req.session) 
  return res.status(err.statusCode || 500).render('error-pages/500', { userEmail });
}
