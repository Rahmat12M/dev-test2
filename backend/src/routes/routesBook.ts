import { BookFun } from "@/db/func/BookFun";
import type { IBookFun } from "@/db/func/IBookFun";
import { Router } from "express";
import type { Request, Response } from "express";
import { requireLogin } from "./middleware/requireLogin";
import type { RequestUser } from "@/@types/types";
import { Users, type Books } from "@/db";
import type { IUserFun } from "@/db/func/IUserFun";
import { UserFun } from "@/db/func/UserFun";

const routesBook: Router = Router();

/**
 * Ein neues Buch hinzufuegen.
 */
routesBook.post("/book", requireLogin, async (req: Request, res: Response) => {
  const bookFun: IBookFun = new BookFun();
  const { name, isbn, author } = req.body;

  const bookAdded: boolean = await bookFun.addBook(name, isbn, author);
  if (bookAdded) return res.sendStatus(201);

  // Not acceptable
  return res.sendStatus(406);
});

/**
 * Ein Buch dem aktuellen Nutzer zuweisen.
 */
routesBook.post(
  "/book/borrow/:isbn",
  requireLogin,
  async (req: RequestUser, res: Response) => {
    console.log(
      `borrow a book: ${req.params.isbn} fuer Benutzer: ${req.user?.username}`,
    );
    const bookFun: IBookFun = new BookFun();

    const book = await bookFun.getBook(req.params.isbn as string);
    if (!book) return res.sendStatus(404);

    try {
      await book.setUser(req.user);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
);

/**
 * Ein Buch dem aktuellen Nutzer zuweisen.
 */
routesBook.post(
  "/book/return/:isbn",
  requireLogin,
  async (req: RequestUser, res: Response) => {
    console.log(
      `return a book: ${req.params.isbn} fuer Benutzer: ${req.user?.username}`,
    );
    const bookFun: IBookFun = new BookFun();
    const userFun: IUserFun = new UserFun();

    const book = await bookFun.getBook(req.params.isbn as string);
    if (!book) return res.sendStatus(404);

    const user = await userFun.getUserById(book.userId);
    if (user?.username !== req.user?.username)
      return res.sendStatus(403);    

    try {
      await book.setUser(null);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
);

/**
 * Die Buchdetails anzeigen lassen.
 */
routesBook.get(
  "/book/:isbn",
  requireLogin,
  async (req: RequestUser, res: Response) => {
    const bookFun: IBookFun = new BookFun();
    const userFun: IUserFun = new UserFun();
    let username: string | null = null;

    const book = await bookFun.getBook(req.params.isbn as string);
    if (!book) return res.sendStatus(404);

    // Um den evtl. Benutzer zu ermitteln, der das Buch ausgeliehen hat.
    if (book.userId) {
      const user = await userFun.getUserById(Number(book.userId));
      username = user?.username ? user?.username : null;
    }

    return res.status(302).json({ book, username: username });
  },
);

/**
 * Alle Buecher der Bibliothek anzeigen lassen.
 */
routesBook.get("/book", requireLogin, async (req: Request, res: Response) => {
  const bookFun: IBookFun = new BookFun();

  const books = await bookFun.getAllBooks();
  if (!books) return res.sendStatus(404);

  return res.status(302).json({ books });
});

export default routesBook;
