import UserModel from '../models/user.model';
import TokenAuth from '../auths/tokenAuth';
import Login from '../interfaces/ILogin';

export default class UserService {
  constructor(private userModel: typeof UserModel) { }

  async login(login: Login): Promise<string | null> {
    if (!login.email || !login.password) throw new Error();

    const user = await this.userModel.findOne({ where: { email: login.email } });

    if (!user) return null;

    const validateUserPass = TokenAuth.compare(user.password, login.password);

    if (validateUserPass) {
      const token = TokenAuth.encrypt(user);
      return token;
    }
    return null;
  }

  async loginValidate(auth: string | undefined) {
    if (!auth) throw new Error();

    const { data } = TokenAuth.decrypt(auth);

    const user = await this.userModel.findOne({ where: { password: data.password } });

    return user as UserModel;
  }
}
