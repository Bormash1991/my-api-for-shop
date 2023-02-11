import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
@Injectable()
export class FilesService {
  async createFiles(files: any[]) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      return files.map((file) => {
        const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        return fileName;
      });
    } catch (error) {
      throw new HttpException(
        'error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}