import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import leadService from "./service";
import { CreateLeadSchema, UpdateLeadSchema } from "./schema";
import { success } from "../../utils/response";

class LeadController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.findAll();

    success(res, leads);
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.findById(Number(req.params.id));

    success(res, lead);
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateLeadSchema.parse(req.body);

    const lead = await leadService.create(body);

    success(res, lead, "Lead created successfully", 201);
  });

  storePublic = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateLeadSchema.parse(req.body);

    const lead = await leadService.create(body);

    success(res, lead, "Lead created successfully", 201);
  });
}

export default new LeadController();
