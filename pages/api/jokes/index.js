import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    response.status(200).json(jokes);
    return;
  }

  if (request.method === "POST") {
    try {
      const newJoke = request.body;
      await Joke.create(newJoke);

      response.status(201).json({ status: "Joke created!" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error." });
    }
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}
