import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { unlink } from 'fs';
import { join } from 'path';
import { ProductsService } from '../products/products.service';
@Injectable()
export class FilesService {
  constructor() {}
  async createFiles(files: any[]) {
    try {
      const filePath = path.join(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, { recursive: true }, () => {});
      }
      return files.map((file) => {
        const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
        fs.writeFile(path.join(filePath, fileName), file.buffer, (error) => {});
        return fileName;
      });
    } catch (error) {
      throw new HttpException(
        'error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteImage(id: string) {
    try {
      unlink(join(__dirname, '..', 'static', id), (err) => {});
    } catch (error) {
      throw new HttpException(
        'deletion error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
