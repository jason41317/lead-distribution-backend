import { Prisma } from "@prisma/client";
import formRepository from "./repository";
import NotFoundError from "../../errors/NotFoundError";
import { CreateFormRequest, UpdateFormRequest } from "./schema";
import ValidationError from "../../errors/ValidationError";

class FormService {
  async findAll() {
    return formRepository.findAll();
  }

  async findBySlug(slug: string) {
    const form = await formRepository.findBySlug(slug);

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return form;
  }

  async findById(id: number) {
    const form = await formRepository.findById(id);

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return form;
  }

  async create(data: CreateFormRequest) {
    const forms = await formRepository.findAll();

    if (forms.length >= 1) {
      throw new ValidationError("Only one form can be created");
    }

    return formRepository.create(data as Prisma.FormCreateInput);
  }

  async update(id: number, data: UpdateFormRequest) {
    const form = await formRepository.findById(id);

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return formRepository.update(id, data as Prisma.FormUpdateInput);
  }

  async delete(id: number) {
    const form = await formRepository.findById(id);

    if (!form) {
      throw new NotFoundError("Form not found");
    }
    await formRepository.update(id, {
      deletedAt: new Date(),
    } as Prisma.FormUpdateInput);

    return {
      message: "Form deleted successfully",
    };
  }
}

export default new FormService();
