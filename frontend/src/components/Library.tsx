import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Library.module.css';

function Library() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/book", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 302) {
          return response.json();
        } else {
          // Routing zu Loginseite
          navigate("/login");
          return;
        }
      })
      .then((data: { books: any[] }) => {
        if (!data) return;
        setBooks(data.books);
      });
  }, []);

  return (
    <>
      <h1>Available Books</h1>
      <div className={`${styles['books-wrapper']}`}>
        {books.map((book) => (
          <div className={`${styles['book-container']}`} key={book.isbn} onClick={() => navigate(`/book/${book.isbn}`)}>
            {book.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default Library;
