import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export abstract class HashManager {
  private static readonly SALT_ROUNDS = 10;
  private static readonly PEPPER = process.env.PEPPER || "";

  // Hash a plain string (like a password) with pepper
  static async hash(value: string): Promise<string> {
    console.log(process.env.PEPPER)
    const valueWithPepper = value + this.PEPPER;
    const hashed = await bcrypt.hash(valueWithPepper, this.SALT_ROUNDS);
    return hashed;
  }

  // Compare a plain string with a hashed string, including pepper
  static async compare(value: string, hash: string): Promise<boolean> {
    const valueWithPepper = value + this.PEPPER;
    const isMatch = await bcrypt.compare(valueWithPepper, hash);
    return isMatch;
  }
}
