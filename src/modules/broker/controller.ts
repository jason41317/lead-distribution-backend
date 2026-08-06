import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import brokerService from "./service";
import { CreateBrokerSchema, UpdateBrokerSchema } from "./schema";
import { success } from "../../utils/response";

class BrokerController {
  index = asyncHandler(async (req: Request, res: Response) => {
    const brokers = await brokerService.findAll();

    success(res, brokers);
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const broker = await brokerService.findById(Number(req.params.id));

    success(res, broker);
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const body = CreateBrokerSchema.parse(req.body);

    const broker = await brokerService.create(body);

    success(res, broker, "Broker created successfully", 201);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const body = UpdateBrokerSchema.parse(req.body);

    const broker = await brokerService.update(Number(req.params.id), body);

    success(res, broker, "Broker updated successfully");
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    const response = await brokerService.delete(Number(req.params.id));

    success(res, null, response.message);
  });
}

export default new BrokerController();
