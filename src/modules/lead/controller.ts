import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import leadService from "./service.js";
import { CreateLeadSchema, UpdateLeadSchema } from "./schema.js";
import { success } from "../../utils/response.js";
import { getPagination } from "../../utils/pagination.js";

class LeadController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = getPagination(req.query);
    const search = String(req.query.search ?? "");
    const leads = await leadService.findAll(page, limit, search);

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
