import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileUploadService {
  // handleFileUpload(file: Express.Multer.File) {
  //   return { message: 'File uploaded successfully', filePath: file.path };
  // }

  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    // validate file type
    //const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    // if (!allowedMimeTypes.includes(file.mimetype)) {
    //   throw new BadRequestException('invalid file type');
    // }

    // validate file size (e.g., max 5mb)
    //const maxSize = 5 * 1024 * 1024;
    // if (file.size > maxSize) {
    //   throw new BadRequestException('file is too large!');
    // }

    return { message: 'File uploaded successfully', filePath: file.path };
  }

  getFileUrl(filename: string): string {
    const filePath = join(process.cwd(), 'uploads', filename);

    if (!existsSync(filePath)) {
      throw new BadRequestException('File does not exist');
    }

    return filePath;
  }
}
