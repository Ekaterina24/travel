import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TypeSub } from "./type_sub.model";
import { CreateTypeSubDto } from "./dto/create-type-sub.dto";

@Injectable()
export class TypeSubRepository extends Repository<TypeSub> {

    constructor(dataSource: DataSource) {
        super(TypeSub, dataSource.createEntityManager());
    }

    async createTypeSub(
        createTypeSubDto: CreateTypeSubDto
      ) {
        const { period, price} = createTypeSubDto;
    
        const typeSub = new TypeSub();
        typeSub.period = period;
        typeSub.price = price;
    
        try {
          await typeSub.save();
        } catch (error) {
          throw new InternalServerErrorException();
        }
    
      }
    
      async getAllTypeSub(): Promise<TypeSub[]> {
        const query = this.createQueryBuilder('type-sub');
    
        try {
          const typeSubs = await query.getMany();
          return typeSubs; 
        } catch (error) {
          throw new InternalServerErrorException();
        }
        
  }
  
  async getTypeSubById(id: number): Promise<TypeSub> {
    const found = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Тип подписки с ID ${id} не найден.`);
    }
    return found;
  }

}
