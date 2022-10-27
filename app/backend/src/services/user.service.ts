import UserModel from '../database/models/user.model';
import tokenAuth from '../auths/tokenAuth';
import Login from '../interfaces/ILogin';

export default class UserService {
  constructor(private userModel: typeof UserModel) {}

  async login(login: Login): Promise<string | null> {
    if (!login.email || !login.password) throw new Error();

    const user = await this.userModel.findOne({ where: { email: login.email } });
  }
}
