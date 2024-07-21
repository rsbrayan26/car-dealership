import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CreateCarDto {
  @IsString()
  @MinLength(3)
  readonly brand: string;

  @IsArray()
  readonly models: string[];
}

export class UpdateCarDto {
  @IsString()
  // @MinLength(3)
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  // @MinLength(3)
  readonly brand: string;

  @IsArray()
  @IsOptional()
  readonly models: string[];
}
