import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductsDocument } from './schemas/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-produst.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { AddCommentDto } from './dto/add-coment.dto';
import { v4 as uuidv4 } from 'uuid';
import { deleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductsDocument>,
  ) {}

  async getAllProducts() {
    const products = await this.model.find();
    return products;
  }
  async getOneProduct(id: string) {
    const product = await this.model.findOne({ _id: id });
    return product;
  }
  async createProduct(productDto: CreateProductDto, req: any) {
    const product = await this.model.create({
      ...productDto,
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
  //   async updateComment(id: string, commentDto: UpdateCommentDto, req: any) {
  //     const sendComments = {
  //       text: commentDto?.text,
  //       stars: commentDto?.stars,
  //       username: req.user.username,
  //       userId: req.user.id,
  //       _id: commentDto.id,
  //     };
  //     const product = await this.model.findOneAndUpdate(
  //       { 'comments._id': commentDto.id },
  //       {
  //         $set: {
  //           'comments.$[element].text': sendComments.text,
  //           'comments.$[element].stars': sendComments.stars,
  //         },
  //       },
  //       { arrayFilters: [{ 'element._id': commentDto.id }], new: true },
  //     );
  //     return product;
  //   }
}
