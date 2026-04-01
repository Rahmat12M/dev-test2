import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import { AuthContext } from "@/contexts/authContext/AuthContext";

function BookDetails() {
  const { isbn } = useParams();
  const { username } = useContext(AuthContext);
  const [book, setBook] = useState<any | null>(null);
  const [usernameBorrow, setUsernameBorrow] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Hole mir bei mounten die Details des Buches.
   */
  useEffect(() => {
    fetch(`http://localhost:3000/book/${isbn}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 302) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Bookdetails: ", data.book);
        setBook(data.book);
        setUsernameBorrow(data.username);
      });
  }, [trigger]);

  /**
   * 
   */
  const handleBookBorrow = () => {
    setMessage(null);

    fetch(`http://localhost:3000/book/borrow/${isbn}`, {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 401) {
        // Nicht autorisiert
        navigate("/login");
      } else if (response.status === 200) {
        setMessage("Book successfully borrows");
        setTrigger((val) => !val);
      }
    });
  };

  /**
   * 
   */
  const handleBookReturn = () => {
    setMessage(null);

    fetch(`http://localhost:3000/book/return/${isbn}`, {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 401) {
        // Nicht autorisiert
        navigate("/login");
      } else if (response.status === 200) {
        setMessage("Book successfully returned");
        setTrigger((val) => !val);
      } else if (response.status === 403) {
        setMessage("Aktion nicht erlaubt");
      }
    });
  };

  return (
    <>
      {book && (
        <>
          <h1>{book.name}</h1>
          <div className={`${styles["font-big"]}`}>
            <p>
              <span className={`${styles["font-bold"]}`}>Author:</span>{" "}
              {book.author}
            </p>
            <p>
              <span className={`${styles["font-bold"]}`}>ISBN:</span>{" "}
              {book.isbn}
            </p>
            {usernameBorrow && (
              <>
                <p>
                  <span className={`${styles["font-bold"]}`}>Borrowed by:</span>{" "}
                  {usernameBorrow}
                </p>
                {usernameBorrow === username && <button onClick={handleBookReturn}>Return book</button>}
              </>
            )}
            {!usernameBorrow && (
              <button onClick={handleBookBorrow}>Borrow Book</button>
            )}
            <p>{message}</p>
          </div>
        </>
      )}
    </>
  );
}

export default BookDetails;
