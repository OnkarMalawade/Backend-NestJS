import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No File Uploaded', HttpStatus.BAD_REQUEST);
    }
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: this.fileUploadService.getFileUrl(file.filename),
    };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res) {
    const path = join(process.cwd(), 'uploads', filename);

    if (!existsSync(path)) {
      throw new HttpException('File Not Here', HttpStatus.NOT_FOUND);
    }

    return res.sendFile(path);
  }
}
