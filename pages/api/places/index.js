import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      console.log(placeData);
      response.status(201).json({ status: "Created new Place!" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
