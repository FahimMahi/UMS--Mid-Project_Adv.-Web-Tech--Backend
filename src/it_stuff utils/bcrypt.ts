import * as bcrypt from 'bcrypt';
 
export class PasswordUtil {
  static async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
 
  static async encodePassword(rawPassword: string): Promise<string> {
    const SALT_ROUNDS = 10; 
    return bcrypt.hash(rawPassword, SALT_ROUNDS);
  }
}