import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import leadService from "./service.js";
import { CreateLeadSchema, UpdateLeadSchema } from "./schema.js";
import { success } from "../../utils/response.js";
import { getPagination } from "../../utils/pagination.js";
import { LeadStatus } from "@prisma/client";

class LeadController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = getPagination(req.query);
    const search = String(req.query.search ?? "");
    const brokerId = Number(req.query.brokerId ?? null);
    const formId = Number(req.query.formId ?? null);
    const status = String(req.query.status ?? "") as LeadStatus;
    const leads = await leadService.findAll(page, limit, search, brokerId, formId, status);

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

  update = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateLeadSchema.parse(req.body);

    const lead = await leadService.update(
      Number(req.params.id),
      body,
    );

    success(res, lead, "Lead updated successfully");
  });
}

export default new LeadController();
