import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import LetterForm from "../component/landing";
import StackedPaper from "../component/paper";
import { useEffect, useState } from "react";
import axios from "axios";

type ConnectionStatus = {
  isConnected: boolean;
};
type Message = {
  _id: string;
  name: string;
  message: string;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [messagesList, setMessages] = useState([]);

  useEffect(() => {
    getMessage();
  }, []);

  async function getMessage() {
    try {
      const response = await axios.get("/api/getMessages");

      console.log(response.data);
      setMessages(response.data);
    } catch (error) {}
  }

  return (
    <>
      <Head>
        <title>M & B Landing Page</title>
        <meta name="description" content="M & B Landing Page" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      <main>
        <div
          style={{
            margin: "auto",
            position: "relative",
            width: "100%",
            height: "70vh",
          }}
        >
          <LetterForm />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {messagesList.map((item: Message) => (
            <StackedPaper
              _id={item._id}
              name={item.name}
              message={item.message}
            />
          ))}
        </div>
      </main>

      <style jsx global>{`
        @import url(https://fonts.googleapis.com/css?family=Dancing+Script:400,700);

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          /* background-color: #c8e7d8; */
          color: #4e5e72;
          text-align: center;
          font-family: monospace;
        }

        h1,
        p {
          margin: 0;
          padding: 0;
        }

        h1 {
          font-size: 2rem;
          font-family: "Dancing Script";
        }

        .small {
          display: block;
          padding: 1rem 0;
          font-size: 0.8rem;
          transition: opacity 0.33s;
        }

        textarea,
        input,
        button {
          line-height: 1.5rem;
          border: 0;
          outline: none;
          font-family: inherit;
          appearance: none;
        }

        textarea,
        input {
          color: #4e5e72;
          background-color: transparent;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgb(229, 225, 187)' x='0' y='23' width='10' height='1'/></svg>");
          max-height: 100%;
          font-size: 16px;
        }
        textarea,
        input:focus {
          touch-action: none;
        }

        textarea {
          width: 100%;
          height: 8rem;
          resize: none;
        }

        input {
          width: 50%;
          margin-bottom: 1rem;
        }

        input[type="text"]:invalid,
        input[type="email"]:invalid {
          box-shadow: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgba(240, 132, 114, 0.5)' x='0' y='23' width='10' height='1'/></svg>");
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          background-color: rgba(78, 94, 114, 0.9);
          color: white;
          font-size: 1rem;
          transition: background-color 0.2s;
        }

        button:hover,
        button:focus {
          outline: none;
          background-color: rgba(78, 94, 114, 1);
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        textarea:focus {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgba(78, 94, 114, 0.3)' x='0' y='23' width='10' height='1'/></svg>");
          outline: none;
        }
      `}</style>
    </>
  );
}
