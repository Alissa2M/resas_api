import { GetServerSideProps } from 'next';
import { Prefecture, getPrefectures } from './api/prefecture';

export interface HomeProps {
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
    const prefectures = await getPrefectures();
    return {
      props: {
        prefectures,
      },
    };
  } catch (error) {
    console.error('Error during fetch:', error);
    return {
      props: {
        prefectures: [],
      },
    };
  }
};
