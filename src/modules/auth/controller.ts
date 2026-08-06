import authService from "./service";
import { LoginSchema } from "./schema";
import asyncHandler from "express-async-handler";
import { success } from "../../utils/response";

class AuthController {
  login = asyncHandler(async (req, res) => {
    const body = LoginSchema.parse(req.body);

    const response = await authService.login(body.email, body.password);

    success(res, response, "Login successful", 200);
  });
}

export default new AuthController();
