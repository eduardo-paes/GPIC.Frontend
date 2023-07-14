import { Request, Response } from 'express';
import { IAuthService } from "../../../domain/usecases/authentication-interface";

export class LoginController {
  constructor(private readonly authService: IAuthService) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    try {
      const token = await this.authService.login(email, password);
      response.status(200).json({ token });
    } catch (error) {
      response.status(401).json({ message: error.message });
    }
  }
}
