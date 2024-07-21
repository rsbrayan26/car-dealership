import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Car } from "src/interfaces/cars.interface";
import { CreateCarDto, UpdateCarDto } from "./dto/car.dto";

@Injectable()
export class CarsService {
  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car)
      throw new NotFoundException(`El carro con id: ${id} no se encuentra`);
    return car;
  }

  createOne(createCarDto: CreateCarDto) {
    const existCar = this.cars.find((car) => car.brand === createCarDto.brand);
    console.log(existCar);

    if (existCar)
      throw new NotAcceptableException(
        `El carro de la marca ${existCar.brand} ya se ecuentra registrado`
      );

    const car: Car = { id: uuid(), ...createCarDto };
    this.cars.push(car);
    return car;
  }

  updateCar(updateCarDto: UpdateCarDto, id: string) {
    if (updateCarDto.id && id !== updateCarDto.id)
      throw new BadRequestException();
    const existCar = this.cars.find(
      (car) => car.id !== id && car.brand === updateCarDto.brand
    );
    if (existCar)
      throw new NotAcceptableException(
        `El carro de la marca ${existCar.brand} ya se ecuentra registrado`
      );
    let carUpdate = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carUpdate = {
          ...carUpdate,
          ...updateCarDto,
          id,
        };
        return carUpdate;
      }
      return car;
    });
    return { updateCarDto };
  }

  deleteOne(id: string) {
    // const carDelete = this.cars.find((car) => car.id === id);
    // if (!carDelete)
    //   throw new NotFoundException(`El carro con id: ${id} no se encuentra`);
    const carDelete = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== carDelete.id);
    return { message: "Vehiculo eliminado" };
  }

  private cars: Car[] = [
    {
      id: uuid(),
      brand: "Toyota",
      models: ["Camry", "Corolla", "Rav4", "Prius", "Highlander"],
    },
    {
      id: uuid(),
      brand: "Ford",
      models: ["F-150", "Mustang", "Escape", "Explorer", "Focus"],
    },
    {
      id: uuid(),
      brand: "Chevrolet",
      models: ["Silverado", "Equinox", "Malibu", "Camaro", "Traverse"],
    },
    {
      id: uuid(),
      brand: "Honda",
      models: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    },
    {
      id: uuid(),
      brand: "Volkswagen (VW)",
      models: ["Golf", "Jetta", "Passat", "Tiguan", "Atlas"],
    },
    {
      id: uuid(),
      brand: "BMW",
      models: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
    },
    {
      id: uuid(),
      brand: "Mercedes-Benz",
      models: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
    },
    { id: uuid(), brand: "Audi", models: ["A4", "A6", "Q5", "Q7", "TT"] },
    {
      id: uuid(),
      brand: "Nissan",
      models: ["Altima", "Sentra", "Rogue", "Pathfinder", "Titan"],
    },
    {
      id: uuid(),
      brand: "Hyundai",
      models: ["Elantra", "Sonata", "Santa Fe", "Tucson", "Kona"],
    },
  ];
}
