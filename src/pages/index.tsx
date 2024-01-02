import { GetServerSideProps } from 'next';
import { Prefecture } from './api/prefecture';

interface HomeProps {
  prefectures: Prefecture[];
}

export default function Home({ prefectures }: HomeProps) {
  return (
    <div>
      <h1>都道府県一覧</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>{prefecture.prefName}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/prefecture'); // 本番環境では適切なURLに変更
    if (response.ok) {
      const prefectures = await response.json();
      return {
        props: {
          prefectures,
        },
      };
    }
    throw new Error('Failed to fetch data');
  } catch (error) {
    console.error('Error during fetch:', error);
    return {
      props: {
        prefectures: [],
      },
    };
  }
};
