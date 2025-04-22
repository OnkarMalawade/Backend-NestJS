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
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // up to 10 files
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    return files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      path: this.fileUploadService.getFileUrl(file.filename),
    }));
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
