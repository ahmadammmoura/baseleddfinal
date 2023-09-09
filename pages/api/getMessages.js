import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("messages");

       const messages = await db
           .collection("messagesList")
           .find({})
           .sort({ date: -1 })
           .toArray();

       res.json(messages);
   } catch (e) {
       console.error(e);
   }
};