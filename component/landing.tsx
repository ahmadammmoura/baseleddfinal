"use client";
import React, { useState } from "react";
import styles from "./LetterForm.module.css";
import axios from "axios";

const LetterForm = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/createMessage`, {
        name,
        message,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error posting message:");
    }
    setSubmitted(true);
  };

  return (
    <>
      <div
        className={`${styles.wrapper} ${styles.centered} ${
          submitted ? styles.sent : ""
        }`}
      >
        <article className={styles.letter}>
          <div className={`${styles.side}`}>
            <h1 className={styles.h1}>wish us luck</h1>
            <p>
              <textarea
                className={styles.textarea}
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className={`${styles.side}`}>
            <p>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </p>
            <p>
              <button
                id="sendLetter"
                onClick={handleSubmit}
                className={styles.button}
              >
                Send
              </button>
            </p>
          </div>
        </article>
        <div className={`${styles.envelope} ${styles.front}`}></div>
        <div className={`${styles.envelope} ${styles.back}`}></div>
      </div>
      {submitted && (
        <p className={`${styles["result-message"]} ${styles.centered}`}>
          Thank you for your message
        </p>
      )}
    </>
  );
};

export default LetterForm;
