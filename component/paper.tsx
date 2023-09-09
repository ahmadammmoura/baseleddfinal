import React from "react";
import styles from "./paper.module.css";

interface StackedPaperProps {
  name: string;
  message: string;
  _id: string;
}

const StackedPaper = ({ name, message, _id }: StackedPaperProps) => {
  return (
    <div className={styles.letter} key={_id}>
      <p style={{ textAlign: "left", fontFamily: "monospace" }}>{name}.</p>
      <div style={{ flex: 1, padding: "1rem " }}>
        <p style={{ textAlign: "left" }}>{message}</p>
      </div>
    </div>
  );
};

export default StackedPaper;
