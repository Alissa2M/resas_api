import { NextApiRequest, NextApiResponse } from 'next';

export interface PrefectureApiProps {
  prefCode: number;
  prefName: string;
}

export async function getPrefectures(): Promise<PrefectureApiProps[]> {
  try {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      {
        headers: new Headers({
          'X-API-KEY': apiKey?.toString() || '',
          'Content-Type': 'application/json',
        }),
      },
    );

    if (response.ok) {
      const data = (await response.json()) as { result: PrefectureApiProps[] };
      return data.result;
    }
    throw new Error('Failed to fetch data');
  } catch (error) {
    console.error('Error during fetch:', error);
    return [];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrefectureApiProps[]>,
) {
  const data = await getPrefectures();
  res.status(200).json(data);
}
