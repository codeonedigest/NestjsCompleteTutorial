import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common/services';
import { Book } from 'src/model/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from './book.dto';
import { BookRepository } from './book.repository';
 

@Injectable()
export class BookService {
    logger = new Logger(BookService.name);
    
    constructor(@InjectRepository(Book) private readonly repo: BookRepository) { }

    public async getAll() {
        this.logger.debug("Find all books from repository");
        return await this.repo.find();
    }

    public async getOne(id: string) {
        this.logger.debug("Find book with id in repository " + id);
        return await this.repo.findOne({
          where:{
            id:id,
          },
        });
    }

    public async save(book: BookDto) {
        this.logger.debug("Saving book " + book);
        return await this.repo.save(book);
    }
}
