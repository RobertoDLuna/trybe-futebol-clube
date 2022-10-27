import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UserModel from '../database/models/user.model';

export default class TokenAuth {
  static compare(token: string, password: string): boolean {
    return compareSync(token, password);
  }

  static encrypt(user: UserModel): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static decrypt(token: string) {
    const secret = process.env.JWT_SECRET as Secret;
    const decrypted = verify(token, secret);

    return decrypted as JwtPayload;
  }
}
