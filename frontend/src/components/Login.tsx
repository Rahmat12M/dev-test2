import { AuthContext } from "@/contexts/authContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import styles from './Login.module.css';

function Login() {
  const {errorMsg, login, setErrorMsg, handleFocus } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    setErrorMsg(null);
  }, []);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <>
     <div className={`${styles['login-container']}`}>
      <form className={`${styles["login-box"]}`} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {errorMsg && <p className={`${styles["error"]}`}>{errorMsg}</p>}

        <label>
          Benutzername
          <input
            type="text"
            value={username}
            name="username"
            onChange={e => setUsername(e.target.value)}
            onFocus={handleFocus}
            required
          />
        </label>

        <label>
          Passwort
          <input
            type="password"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
            onFocus={handleFocus}
            required
          />
        </label>

        <button type="submit">Einloggen</button>
      </form>
    </div>

    </>
  );
}

export default Login;