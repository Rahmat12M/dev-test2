import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Register.module.css";
import { AuthContext } from "@/contexts/authContext/AuthContext";

function Register() {
  const { register, errorMsg, setErrorMsg, handleFocus } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRepeatRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setErrorMsg(null);
  }, []);

  /**
   * Klickevent beim Versenden des Formulars.
   * @param e 
   */
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (password === passwordRepeat) {
      setErrorMsg(null);
      register(username, password);
    } else {
      setErrorMsg("Die Passwoerter passen nicht ueberein!");
    }
  }

  /**
   * Vergleiche die Passwoerter. Wenn diese nicht gleich sind,
   * wird ein roter Rahmen gesetzt.
   * @param e 
   */
  function handleCompare() {
    console.log(`handle Compare: ${inputRef.current?.value} - ${inputRepeatRef.current?.value}`);

    if (inputRef.current?.value === '' && inputRepeatRef.current?.value === '') {
      inputRepeatRef.current?.classList.remove(styles['error-mark']);
      inputRepeatRef.current?.classList.remove(styles['success-mark']);
    } else if (inputRef.current?.value === inputRepeatRef.current?.value) {
      inputRepeatRef.current?.classList.remove(styles['error-mark']);
      inputRepeatRef.current?.classList.add(styles['success-mark']);
    } else {
      inputRepeatRef.current?.classList.add(styles['error-mark']);
    }
  }

  return (
    <>
      <div className={`${styles["register-container"]}`}>
        <form className={`${styles["register-box"]}`} onSubmit={handleSubmit}>
          <h2>Registrieren</h2>

          {errorMsg && <p className={`${styles["info"]}`}>{errorMsg}</p>}

          <label>
            Benutzername
            <input
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={handleFocus}
              required
            />
          </label>

          <label>
            Passwort
            <input
              ref={inputRef}
              name="password"
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value); handleCompare();}}
              onFocus={handleFocus}
              required
            />
          </label>

          <label>
            Passwort wiederholen
            <input
              ref={inputRepeatRef}
              name="confirmPassword"
              type="password"
              value={passwordRepeat}
              onChange={(e) => {setPasswordRepeat(e.target.value); handleCompare();}}
              onFocus={handleFocus}
              required
            />
          </label>

          <button type="submit">Registrieren</button>
        </form>
      </div>
    </>
  );
}

export default Register;
