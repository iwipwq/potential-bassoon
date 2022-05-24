import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;
    // try catch로 에러핸들링 가능
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      console.log("resultconsole", result);

      client.close();

      res.status(201).json({ messege: "Meetup 추가됨" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messege: "알 수 없는 에러발생"});
    }
  }
}

export default handler;
