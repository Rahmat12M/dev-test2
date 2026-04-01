import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  /**
   * Autologin.
   * Dieser wird am Anfang einmal aufgerufen und geschaut, ob bereits eingeloggt.
   */
  useEffect(() => {
    // Pruefe, ob bereits ein Login besteht. Session
    console.log("UseEffect ProtectedRoute");
    fetch("http://localhost:3000/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok && response.status === 202) {
          console.log("Bereits eingeloggt");
          setIsLoggedIn(true);
          return response.json();
        } else {
          setIsLoggedIn(false);
          return
        }
      })
      .then((data) => {
        if (!data) return;
        setUsername(data.user);
      });
  }, []);

  /**
   * Login.
   * Die Loginfunktion ruft `http://localhost:3000/login` auf.
   *
   * @param username Der eindeutige Benutzername.
   * @param password Das Passwort.
   */
  function login(username: string, password: string) {
    console.log('In Login');
    const payload = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        setIsLoggedIn(false);
        if (response.status === 401) {
          // Fehler bei der Anmeldung
          setErrorMsg("Falsche Eingabewerte!");
        } else if (response.status !== 202 || !response.ok) {
          // Irgendein anderer Fehler
          setErrorMsg("Es ist ein Fehler bei der Anmeldung aufgetreten!");
        } else {
          return response.json();
        }
      })
      .then((data: { user: string }) => {
        console.log("Erfolgreich angemeldet: ", data.user);
        setErrorMsg(null);
        setUsername(data.user);
        setIsLoggedIn(true);
      });
  }

  /**
   * Logout.
   */
  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok && response.status === 200) {
        setIsLoggedIn(false);
      }
    });
  }

  /**
   * 
   * @param username 
   * @param password 
   */
  function register(username: string, password: string) {
    const payload = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.ok && response.status === 201) {
        console.log('Registrierung erfolgreich');
        login(username, password);
      } else {
        setErrorMsg(
          "Es trat ein Fehler beim Registrierung auf. Pruefen sie die Daten.",
        );
      }
    });
  }

  /**
   * 
   * @param e 
   */
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setErrorMsg(null);
    e.target.select();
  }

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, username, errorMsg, login, logout, register, setErrorMsg, handleFocus }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
