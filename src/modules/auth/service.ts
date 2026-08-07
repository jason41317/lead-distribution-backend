import bcrypt from "bcrypt";
import authRepository from "./repository.js";
import { generateToken } from "../../utils/jwt.js";
import UnauthorizedError from "../../errors/UnauthorizedError.js";

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
