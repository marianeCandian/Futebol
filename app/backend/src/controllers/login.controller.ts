import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private _loginService: LoginService) { }

  public login = async (
    req: Request<object, object, ILogin>,
    res: Response,
  ) => {
    const userLogin = req.body;
    const { message, code } = await this._loginService.login(userLogin);
    if (code !== 200) return res.status(code).json({ message });

    return res.status(code).json({ token: message });
  };

  public getRole = async (_req: Request, res: Response) => {
    const { payload } = res.locals;
    const { data: { role } } = payload;
    console.log(role);

    return res.status(200).json({ role });
  };
}
