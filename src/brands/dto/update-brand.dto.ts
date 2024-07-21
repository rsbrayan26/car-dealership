import { PartialType } from "@nestjs/mapped-types";
import { CreateBrandDto } from "./create-brand.dto";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsUUID()
  @IsOptional()
  readonly id?: string;
}
