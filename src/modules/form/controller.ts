import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import formService from "./service";
import { CreateFormSchema, UpdateFormSchema } from "./schema";
import { success } from "../../utils/response";

class FormController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const forms = await formService.findAll();

    success(res, forms);
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const form = await formService.findById(Number(req.params.id));

    success(res, form);
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateFormSchema.parse(req.body);

    const form = await formService.create(body);

    success(res, form, "Form created successfully", 201);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const body = UpdateFormSchema.parse(req.body);

    const form = await formService.update(Number(req.params.id), body);

    success(res, form, "Form updated successfully");
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    const response = await formService.delete(Number(req.params.id));

    success(res, null, response.message);
  });
}

export default new FormController();
