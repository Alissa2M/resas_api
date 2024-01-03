import { NextApiRequest, NextApiResponse } from 'next';

export interface PrefectureApiProps {
  prefCode: number;
  prefName: string;
}

interface PopulationApiResponse {
  result: string[] | null;
  error?: string;
}

// 都道府県一覧を取得する関数
export async function getPrefectures(): Promise<PrefectureApiProps[]> {
  try {
    const apiKey = process.env.API_KEY;
    const headers = {
      'X-API-KEY': apiKey?.toString() || '',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers },
    );

    if (response.ok) {
      const { result } = (await response.json()) as {
        result: PrefectureApiProps[];
      };
      return result;
    }

    throw new Error('データの取得に失敗しました');
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    return [];
  }
}

// 人口データを取得する関数
async function fetchPopulationData(prefCode: string): Promise<PopulationApiResponse> {
  try {
    const apiKey = process.env.API_KEY;
    const headers = {
      'X-API-KEY': apiKey?.toString() || '',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      { headers },
    );

    if (response.ok) {
      const data = (await response.json()) as PopulationApiResponse;
      return data;
    }

    console.log('データの取得中にエラーが発生しました:', response.statusText);
    return { result: null, error: 'データの取得に失敗しました' };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    return { result: null, error: '内部サーバーエラー' };
  }
}

// APIのエンドポイントハンドラー
export default async function dataHandler(
  req: NextApiRequest,
  res: NextApiResponse<PrefectureApiProps[] | PopulationApiResponse>,
) {
  try {
    const { query } = req;
    const prefCode = query.prefCode as string;

    if (prefCode) {
      const data = await fetchPopulationData(prefCode);
      res.status(200).json(data);
    } else {
      const data = await getPrefectures();
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('処理中にエラーが発生しました:', error);
    res.status(500).json({ result: null, error: '内部サーバーエラー' });
  }
}
