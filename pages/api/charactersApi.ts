import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name = '', pageNumber = 1, quantity = 20 } = req.query;

  const nameQuery = name ? `&name=${name}` : '';
  const url = `https://rickandmortyapi.com/api/character?page=${pageNumber}${nameQuery}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Проблема при запросе данных');
    }
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
