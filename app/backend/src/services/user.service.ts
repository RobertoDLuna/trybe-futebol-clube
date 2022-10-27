import UserModel from '../database/models/user.model';
import tokenAuth from '../auths/tokenAuth';
import Login from '../interfaces/ILogin';

export default class UserService {
  constructor(private userModel: typeof UserModel) {}

  async login(login: Login): Promise<string | null> {
    if (!login.email || !login.password) throw new Error();

    const user = await this.userModel.findOne({ where: { email: login.email } });

    if (!user) return null;

    const validateUserPass = tokenAuth.compare(user.email, user.password);

    if (validateUserPass) {
      const token = tokenAuth.encrypt(user);
      return token;
    }
    return null;
  }

  async validateLogin(auth: string | undefined) {
    if (!auth) throw new Error();

    const decrypted = tokenAuth.decrypt(auth);
    const user = await this.userModel.findOne({ where: { password: decrypted } });
    return user as UserModel;
  }
}
