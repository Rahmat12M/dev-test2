import { useState } from "react";
import styles from "./ManageBook.module.css";
import { useNavigate } from "react-router-dom";

function ManageBooks() {
  const [name, setName] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * 
   * @param e 
   */
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const payload = {
      name: name,
      isbn: isbn,
      author: author,
    };

    fetch(`http://localhost:3000/book`, {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.status === 401) {
        // Not autorized
        navigate("/login");
      } else if (response.status === 201) {
        setMessage("Book successfully added");
      } else if (response.status === 406) {
        setMessage('Book not acceptable. Double ISBN.')
      }
    });
  };

  /**
   * 
   * @param e 
   */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    setMessage(null);
  }

  return (
    <>
      <h1>Add Book</h1>
      <form className={`${styles["form-wrapper"]}`} onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Title"
          onFocus={handleFocus}
          required
        />

        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          onFocus={handleFocus}
          required
        />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          onFocus={handleFocus}
          required
        />

        <button type="submit">Buch hinzufügen</button>
        <p className={`${styles['message']}`}>{message}</p>
      </form>
    </>
  );
}

export default ManageBooks;
