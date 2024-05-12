import { Injectable } from '@nestjs/common';
import { TypeSubRepository } from './type_sub.repository';
import { CreateTypeSubDto } from './dto/create-type-sub.dto';
import { TypeSub } from './type_sub.model';

@Injectable()
export class TypeSubService {
    constructor(private typeSubRepository: TypeSubRepository) {}

    createTypeSub(createTypeSubDto: CreateTypeSubDto) {
      return this.typeSubRepository.createTypeSub(createTypeSubDto);
    }

    getAllTypeSub(): Promise<TypeSub[]> {
      return this.typeSubRepository.getAllTypeSub();
    }

    getTypeSubById(id: number): Promise<TypeSub> {
      return this.typeSubRepository.getTypeSubById(id);
    }

}
