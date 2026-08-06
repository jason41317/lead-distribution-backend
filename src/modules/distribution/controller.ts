import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import distributionService from "./service";
import { CreateDistributionSchema, UpdateDistributionSchema } from "./schema";
import { success } from "../../utils/response";

class DistributionController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const distributions = await distributionService.findAll();

    success(res, distributions);
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const distribution = await distributionService.findById(
      Number(req.params.id),
    );

    success(res, distribution);
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateDistributionSchema.parse(req.body);

    const distribution = await distributionService.create(body);

    success(res, distribution, "Distribution created successfully", 201);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const body = UpdateDistributionSchema.parse(req.body);

    const distribution = await distributionService.update(
      Number(req.params.id),
      body,
    );

    success(res, distribution, "Distribution updated successfully");
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    const response = await distributionService.delete(Number(req.params.id));

    success(res, null, response.message);
  });
}

export default new DistributionController();
