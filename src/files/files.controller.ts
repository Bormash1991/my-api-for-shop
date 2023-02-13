import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { unlink } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  @Delete('/:id')
  deleteImage(@Param('id') id: string) {
    unlink(join(__dirname, '..', 'static', id), (err) => {
      if (err) {
        throw new HttpException(
          'deletion error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }
}
