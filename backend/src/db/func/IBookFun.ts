import type Books from "@/db/models/Books";

export interface IBookFun {
  /**
   * Fuege ein neues Buch der Tabelle hinzu
   * 
   * @param name Der Name des Buches.
   * @param isbn Die zugehoerige ISBN.
   * @param author Der Author des Buches.
   * @returns TRUE, wenn das Buch erfolgreich hinzugefuegt wurde. Sonst FALSE.
   */
  addBook(name: string, isbn: string, author: string): Promise<boolean>;

  /**
   * Hole ein Buch an Hand der isbn-Nummer
   * 
   * @param isbn Die eindeutige ISBN-Nummer des gesuchten Buches.
   * @returns Books oder null, wenn das Buch nicht gefunden wurde.
   */
  getBook(isbn: string): Promise<Books | null>;

  /**
   * Hole eine Liste mit allen Buechern aus der DB.
   * 
   * @returns Die Liste mit allen Buechern oder null, wenn kein Buch gefunden wurde.
   */
  getAllBooks(): Promise<Books[] | null>;
}