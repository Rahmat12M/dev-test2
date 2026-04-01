import type Users from "../models/Users";

export interface IUserFun {
  /**
   * Den Benutzer aus der DB lesen.
   * 
   * @param username Der eindeutige Benutzername
   * @returns { username: string; password: string; } | null: null, wenn kein Benutzer gefunden wurde.
   */
  getUser(username: string): Promise<Users | null>;

  /**
   * Vergleichen von zwei Passwoertern.
   * 
   * @param pwd1 Passwort 1.
   * @param pwd2 Passwort 2.
   * @returns TRUE, wenn die Passwoerter passen. Sonst FALSE.
   */
  comparePwd(pwd1: string, pwd2: string): boolean;

  /**
   * Einen neuen Benutzer in die Datenbank eintragen
   *
   * @param username Der Benutzername
   * @param password Das Passwort
   * @returns TRUE, wenn es erfolgreich gelaufen ist. Sonst FALSE.
   */
  createUser(username: string, password: string): Promise<boolean>;

  /**
   * Hole mir einen Benutzer bei seiner id.
   * 
   * @param id Die Id des Benutzers.
   */
  getUserById(id: number): Promise<Users | null>;
}