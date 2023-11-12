import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error: any) {
      const error_message = JSON.parse(error.message);

      return res.status(400).json({
        status: "Bad request!",
        message: error_message,
      });
    }
  };

export default validate;
