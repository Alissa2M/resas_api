import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { PrefectureApiProps, getPrefectures } from './api/resasApi';
import Prefecture from '../components/Prefecture';

interface HomeProps {
  prefectures: PrefectureApiProps[];
}

export default function Home({ prefectures }: HomeProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [totalPopulationData, setTotalPopulationData] = useState<object[]>([]);
  const [youngPopulationData, setYoungPopulationData] = useState<object[]>([]);
  const [workingAgePopulationData, setWorkingAgePopulationData] = useState<object[]>([]);
  const [elderlyPopulationData, setElderlyPopulationData] = useState<object[]>([]);

  const handleCheckbox = async (value: string, checked: boolean) => {
    setCheckedValues((prev) => {
      if (checked) {
        return [...prev, value];
      }
      return prev.filter((v) => v !== value);
    });

    const prefCodes = value;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/resasApi?prefCode=${prefCodes}`);

        if (response.ok) {
          const data = await response.json();
          setTotalPopulationData((prev) => [...prev, data.result.data[0].data]);
          setYoungPopulationData((prev) => [...prev, data.result.data[1].data]);
          setWorkingAgePopulationData((prev) => [...prev, data.result.data[2].data]);
          setElderlyPopulationData((prev) => [...prev, data.result.data[3].data]);
          console.log(
            totalPopulationData,
            youngPopulationData,
            workingAgePopulationData,
            elderlyPopulationData,
          );
        } else {
          console.error('Error during fetch:', response.statusText);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    fetchData();
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8">
      <h1 className="text-2xl mb-4">都道府県一覧</h1>
      <ul className="grid grid-rows-8 grid-flow-col gap-2">
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
