import {
  Request,
  Response
} from "express";

import {
  loginSchema
} from "./auth.validations";

import {
  AuthService
} from "./auth.service";

export class AuthController {
  static async login(
    req: Request,
    res: Response
  ) {
    try {
      const payload =
        loginSchema.parse(
          req.body
        );

      const result =
        await AuthService.login(
          payload
        );

      return res.status(200).json({
        success: true,
        message:
          "Login successful",
        data: result
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message:
          error.message ||
          "Login failed"
      });
    }
  }
}