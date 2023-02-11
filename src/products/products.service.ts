import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductsDocument } from './schemas/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-produst.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { AddCommentDto } from './dto/add-coment.dto';
import { v4 as uuidv4 } from 'uuid';
import { deleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ListQueryParamsDto } from './dto/list-query-params.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductsDocument>,
    private filesService: FilesService,
  ) {}

  async getAllProducts(query: ListQueryParamsDto) {
    const page = query.page || 1,
      limit = query.limit || 100,
      sort = query.sort || 'createdAt',
      filter = typeof query.filter === 'string' ? [query.filter] : query.filter;

    const filterObj = filter
      ? filter.reduce((result: object, param: string) => {
          const paramArray = param.split(':');
          result[paramArray[0]] = { $regex: paramArray[1], $options: 'i' };
          return result;
        }, {})
      : {};

    const products = await this.model
      .find(filterObj)
      .limit(limit)
      .sort(sort)
      .skip((page - 1) * limit)
      .exec();
    return products;
  }
  async getOneProduct(id: string) {
    const product = await this.model.findOne({ _id: id });
    return product;
  }
  async createProduct(productDto: CreateProductDto, req: any, files: any) {
    if (files.length == 0) {
      throw new HttpException(
        'images must be 1 or more pictures',
        HttpStatus.BAD_REQUEST,
      );
    }
    const images = await this.filesService.createFiles(files);
    const product = await this.model.create({
      ...productDto,
      images,
      authorEmail: req.user.email,
    });
    return product;
  }
  async updateProduct(id: string, productDto: UpdateProductDto) {
    const product = await this.model.findByIdAndUpdate(
      { _id: id },
      {
        ...productDto,
      },
    );
    return product;
  }
  async addComment(id: string, commentDto: AddCommentDto, req: any) {
    const sendComments = {
      ...commentDto,
      username: req.user.username,
      userId: req.user.id,
      _id: uuidv4(),
    };
    const product = await this.model.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: sendComments } },
      { new: true },
    );
    return product;
  }
  async deleteComment(id: string, commentDto: deleteCommentDto) {
    const product = await this.model.findByIdAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentDto.id } } },
    );
    return product;
  }
  async deleteProduct(id: string) {
    const product = await this.model.findByIdAndRemove(id);
    return product;
  }
}
