import { Injectable } from "@nestjs/common";
import { CARS_SEED } from "./data/cars.seed";
import { BRANSD_SEED } from "./data/brands.seed";
import { CarsService } from "src/cars/cars.service";
import { BrandsService } from "src/brands/brands.service";

@Injectable()
export class SeedService {
  /**
   *
   */
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) {}
  populateBD() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANSD_SEED);
    return `SEED executed`;
  }
}
