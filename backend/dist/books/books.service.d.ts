import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    updateStatus(id: string, status: number): Promise<Book>;
    remove(id: string): Promise<void>;
}
