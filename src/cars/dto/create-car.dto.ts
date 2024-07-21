import { IsArray, IsString, MinLength } from "class-validator";

export class CreateCarDto {
  @IsString()
  @MinLength(3)
  readonly brand: string;

  @IsArray()
  readonly models: string[];
}
