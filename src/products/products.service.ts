import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PRODUCT } from 'src/commons/constants/schemaConst';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
import { QueryProduct } from './dto/query-product.dto';
import { filterParams } from 'src/commons/utils/filterParams';
import { JwtUser } from 'src/auth/inteface/jwtUser';
import { Paginate } from 'src/commons/dto/paginate.dto';
import { UserRole } from 'src/users/interface/userRoles';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(PRODUCT) private model: Model<ProductDocument>,
  ) { }
  create(dto: CreateProductDto, authUser: JwtUser) {
    if(authUser.role != UserRole.Edit){
      throw new ForbiddenException();
    }
    return this.model.create(dto);
  }

  async findAll(authUser: JwtUser, query?:  Paginate & QueryProduct ) {

    let filter: FilterQuery<ProductDocument> = {};

    if (query.search) {
      filter.$or = [
        { $text: { $search: `.*${query.search}.*`, $language: "en" } },
        { code: { $regex: `^${query.search}` } },
        { code: { $regex: `${query.search}$` } },
      ]
    }
   
    const cond = filterParams(query, ['category']);
    const cmd = this.model.find({ ...filter, ...cond })
      .lean({ autopopulate: true })
    
    if (query.show != undefined) {
      cmd.where('show', query.show);
    }
    if (query.limit) {
      cmd.limit(query.limit);
    }
    if (query.offset) {
      cmd.skip(query.offset);
    }
    const totalCmd = this.model.countDocuments(cmd.getQuery());
    const [data, total] = await Promise.all([cmd.exec(), totalCmd.exec()]);

    return { total, data };

  }

  findOne(id: string, authUser: JwtUser) {
    return this.model.findById(id)
      .lean({ autopopulate: true })
      .orFail(new NotFoundException())
      .exec();
  }

  update(id: string, dto: UpdateProductDto, authUser: JwtUser) {
    if(authUser.role != UserRole.Edit){
      throw new ForbiddenException();
    }
    return this.model.findByIdAndUpdate(id, dto, { new: true })
      .orFail(new NotFoundException())
      .exec();
  }

  remove(id: string, authUser: JwtUser) {
    if(authUser.role != UserRole.Edit){
      throw new ForbiddenException();
    }
    return this.model.findByIdAndDelete(id)
      .orFail(new NotFoundException())
      .exec();
  }
}
