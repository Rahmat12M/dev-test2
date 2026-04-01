import { Books } from "@/db/index";
import type { IBookFun } from "@/db/func/IBookFun";

export class BookFun implements IBookFun {
  /**
   * 
   */
  async getAllBooks(): Promise<Books[] | null> {
    const books = await Books.findAll({
      order: [
        ['name', "ASC"]
      ]
    });
    
    return books;
  }

  /*
   */
  async getBook(isbn: string): Promise<Books | null> {
    const book = await Books.findOne({
      where: {isbn: isbn}
    });

    return book;
  }

  /*
   */
  async addBook(name: string, isbn: string, author: string): Promise<boolean> {
    if (!name || !isbn || !author) return false;

    try {
      await Books.create({ name: name, isbn: isbn, author: author });
      return true;
    } catch (err) {
      return false;
    }
  }
}
