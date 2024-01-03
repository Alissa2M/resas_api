import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { PrefectureApiProps, getPrefectures } from './api/prefecture';
import Prefecture from '../components/Prefecture';

export interface HomeProps {
  prefectures: PrefectureApiProps[];
}

export default function Home({ prefectures }: HomeProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckbox = (value: string, checked: boolean) => {
    setCheckedValues((prev) => {
      if (checked) {
        return [...prev, value];
      }
      return prev.filter((v) => v !== value);
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8">
      <h1 className="text-2xl mb-4">都道府県一覧</h1>
      <ul className="grid grid-rows-8  grid-flow-col gap-2">
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <Prefecture
              label={prefecture.prefName}
              value={prefecture.prefCode.toString()}
              checked={checkedValues.includes(prefecture.prefCode.toString())}
              onChange={handleCheckbox}
            />
          </li>
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
