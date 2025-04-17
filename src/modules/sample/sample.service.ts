import { Prisma } from "@prisma/client";
import { PrismaClient, Sample } from "../../generated/prisma";
import { ApiError } from "../../utils/api-error";

export class SampleService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  getSamples = async () => {
    const samples = await this.prisma.sample.findMany();
    return samples;
  };

  getSample = async (id: number) => {
    return await this.findSampleId(id);
  };

  createSample = async (body: Sample) => {
    return await this.prisma.sample.create({
      data: body,
    });
  };

  updateSample = async (id: number, body: Partial<Sample>) => {
    await this.findSampleId(id);

    return await this.prisma.sample.update({
      where: { id },
      data: body,
    });
  };

  deleteSample = async (id: number) => {
    await this.findSampleId(id);

    await this.prisma.sample.delete({
      where: { id },
    });

    return { message: "Sample Deleted" };
  };

  private async findSampleId(id: number) {
    const sample = await this.prisma.sample.findFirst({
      where: { id },
    });

    if (!sample) {
      throw new ApiError("Sample not found", 404);
    }

    return sample;
  }
}
