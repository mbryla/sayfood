import * as express from 'express';

declare global {
  namespace Express {
    interface Response {
      normalized: <T>(code: number, result: T) => void;
      normalizedFromPromise: <T>(code: number, promise: Promise<T>) => void;
    }
  }
}

const normalizeResponse = <T>(req: express.Request, res: express.Response, code: number, result: T) => {
  const response = {
    code,
    method: req.method,
    request: req.baseUrl,
    timestamp: new Date().toISOString(),
    result,
  };

  if (!result) {
    delete response.result;
  }

  res.status(code).json(response);
};

export const normalizedResponse = (req: express.Request, res: express.Response, next: () => void) => {
  res.normalized = <T>(code: number, result: T) => normalizeResponse(req, res, code, result);
  res.normalizedFromPromise = <T>(code: number, promise: Promise<T>) =>
    promise
      .then(result => normalizeResponse(req, res, code, result))
      .catch(error => normalizeResponse(req, res, error.status || 500, { error: error.message }));
  next();
};

export const normalizedError = (err: Error, req: express.Request, res: express.Response, next: () => void) => {
  normalizeResponse(req, res, 500, { error: err.message });
};
