import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/books.schema';
import { UpdateBookStatusDto } from './dto/update-status.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    updateBookStatus(id: string, updateBookStatusDto: UpdateBookStatusDto): Promise<Book>;
    remove(id: string): Promise<void>;
}
