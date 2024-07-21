import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { Brand } from "./entities/brand.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class BrandsService {
  create(createBrandDto: CreateBrandDto) {
    const existBrand = this.brands.find(
      (brand) => brand.name === createBrandDto.name
    );
    if (existBrand)
      throw new BadRequestException(
        `La marca ${createBrandDto.name} ya se encuentra registrada`
      );
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toUpperCase(),
      createdAt: new Date().getDate(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Marca no se encuentra`);
    // return `This action returns a #${id} brand`;
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    if (updateBrandDto.id && id !== updateBrandDto.id)
      throw new BadRequestException("por aca");
    const existBrand = this.brands.find(
      (brand) => brand.id !== id && brand.name === updateBrandDto.name
    );
    if (existBrand)
      throw new NotAcceptableException(
        `El carro de la marca ${existBrand.name} ya se ecuentra registrado`
      );
    let brandUpdate = this.findOne(id);
    const updatedAt = new Date().getDate();
    this.brands = this.brands.map((car) => {
      if (car.id === id) {
        brandUpdate = {
          ...brandUpdate,
          ...updateBrandDto,
          id,
          updatedAt,
        };
        return brandUpdate;
      }
      return car;
    });
    return { updateBrandDto };
  }

  remove(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Marca no se encuentra`);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return `Se elimino la marca con id ${id}`;
  }

  private brands: Brand[] = [
    { id: uuid(), name: "Toyota", createdAt: new Date().getTime() },
  ];
}
