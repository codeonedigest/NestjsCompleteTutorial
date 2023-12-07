import { Controller, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { Get, Param, Post, Body } from '@nestjs/common/decorators';
import { BookDto } from './book.dto';

@Controller('book')
export class BookController {
    logger = new Logger(BookController.name);

    constructor(private bookService: BookService) {}

    @Get('all')
    public async getAll() {
      this.logger.debug("Get all books");
      return await this.bookService.getAll();
    }

    @Get(':id')
    public async getOne(@Param() params: any): Promise<any> {
        this.logger.debug("Get book by id Request");
        return await this.bookService.getOne(params.id);
    }

    @Post()
    public async save(@Body() itembody: BookDto) {
        this.logger.debug("Saving book "+ itembody);
        return await this.bookService.save(itembody);
    }
}
