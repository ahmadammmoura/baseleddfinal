// pages/api/createMessage.js

import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });  // Method Not Allowed
    }

    try {
        const { name,message } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const client = await clientPromise;
        const db = client.db("messages");

        // Insert the message into the 'messagesList' collection
        const result = await db.collection('messagesList').insertOne({ name,message,date:new Date });

        res.status(200).json({ success: true, message: 'Message created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error', details: e.message });
    }
};
