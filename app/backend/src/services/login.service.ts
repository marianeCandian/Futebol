import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { newToken } from '../utils/generateToken';
import Users from '../database/models/UsersModel';
import { ILogin } from '../interfaces/ILogin';

export default class LoginService {
  private _userModel: ModelStatic<Users>;

  constructor(userModel: ModelStatic<Users>) {
    this._userModel = userModel;
  }

  public async login(userLogin:ILogin):Promise<{ code: number, message: string }> {
    const user = await this._userModel.findOne({
      where: {
        email: userLogin.email,
      },
    });
    if (!user) return { message: 'Invalid email or password', code: 401 };

    if (!await bcrypt.compare(userLogin.password, user.password)) {
      return { code: 401, message: 'Invalid email or password' };
    }

    const token = newToken(user);

    return { code: 200, message: token };
  }
}
