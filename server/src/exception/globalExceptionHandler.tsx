import { Request, Response, NextFunction } from 'express';

/** Use for invalid input, bad ids, validation failures → 400 */
export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

/** Sends 400 for BadRequestError, 500 for any other error. */
export function globalExceptionHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof BadRequestError) {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
