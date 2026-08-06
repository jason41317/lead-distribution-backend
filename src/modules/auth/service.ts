import bcrypt from "bcrypt";
import authRepository from "./repository";
import { generateToken } from "../../utils/jwt";
import UnauthorizedError from "../../errors/UnauthorizedError";

class AuthService {
  async login(email: string, password: string) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
}

export default new AuthService();
