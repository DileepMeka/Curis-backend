import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { eq } from "drizzle-orm";

import { db } from "../../config/db";

import { admins } from "../../db/schema/admin";

import { LoginInput } from "./auth.validations";

export class AuthService {
  static async login(
    payload: LoginInput
  ) {
    const { username, password } =
      payload;
    console.log("Login attempt for username:", username, "with password:", password);
    const admin = await db
      .select()
      .from(admins)
      .where(
        eq(
          admins.username,
          username
        )
      )
      .limit(1);

    if (!admin.length) {
      console.log("Login failed: User not found");
      throw new Error(
        "Invalid credentials"
      );
    }

    const isValidPassword =
      await bcrypt.compare(
        password,
        admin[0].passwordHash
      );

    if (!isValidPassword) {
      console.log("Login failed: Invalid password");
      throw new Error(
        "Invalid credentials"
      );
    }

    const token = jwt.sign(
      {
        adminId: admin[0].id,
        username:
          admin[0].username
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d"
      }
    );

    return {
      token,
      admin: {
        id: admin[0].id,
        username:
          admin[0].username
      }
    };
  }
}