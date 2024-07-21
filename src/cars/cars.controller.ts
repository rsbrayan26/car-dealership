import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller("cars")
// @UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(":id")
  getCarById(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createOne(createCarDto);
  }

  @Put(":id")
  updateCar(@Body() updateCarDto: UpdateCarDto, @Param("id") id: string) {
    return this.carsService.updateCar(updateCarDto, id);
  }

  @Delete(":id")
  deleteCar(@Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.deleteOne(id);
  }
}
