import { Car } from "src/interfaces/cars.interface";
import { v4 as uuid } from "uuid";

export const CARS_SEED: Car[] = [
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
];
