import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ProductsService } from 'src/products/products.service';

@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
  ) {}
  @Delete('/:id')
  async deleteImage(@Param('id') id: string) {
    this.filesService.deleteImage(id);
   
  }
}
