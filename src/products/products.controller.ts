import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Role } from 'src/auth/role-auth.decorator';
import { RoleAuthGuard } from 'src/auth/role.guard';
import { AddCommentDto } from './dto/add-coment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { deleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateProductDto } from './dto/create-produst.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.productsService.getAllProducts(query);
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.productsService.getOneProduct(id);
  }

  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Post()
  create(@Body() productDto: CreateProductDto, @Request() req: any) {
    return this.productsService.createProduct(productDto, req);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, productDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('comment/:id')
  addComment(
    @Param('id') id: string,
    @Body() commentDto: AddCommentDto,
    @Request() req: any,
  ) {
    return this.productsService.addComment(id, commentDto, req);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('comment-del/:id')
  deleteComment(@Param('id') id: string, @Body() commentDto: deleteCommentDto) {
    return this.productsService.deleteComment(id, commentDto);
  }
  @Role('ADMIN')
  @UseGuards(RoleAuthGuard)
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
  // Try to make possibility to update comment
  // @UseGuards(JwtAuthGuard)
  // @Patch('comment-upd/:id')
  // updateComment(
  //   @Param('id') id: string,
  //   @Body() commentDto: UpdateCommentDto,
  //   @Request() req: any,
  // ) {
  //   return this.productsService.deleteComment(id, commentDto, req);
  // }
}
