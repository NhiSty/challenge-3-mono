import Card from "@components/base/Card";
import toTranslate from "@/utils/translate";
import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Nombre de rendez-vous par mois',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function DashboardPage() {

  return (
      <>
        <div className={'flex flex-row justify-between mb-3'}>
          <Card classNames={'w-full mr-3'}>
            <h3 className={'font-bold'}>{toTranslate('Nombre de franchise')}</h3>
            <p>3</p>
          </Card>
          <Card classNames={'w-full mr-3'}>
            <h3 className={'font-bold'}>{toTranslate('CA total')}</h3>
            <p>3 Millions €</p>
          </Card>
          <Card classNames={'w-full'}>
            <h3 className={'font-bold'}>{toTranslate('Rdv pris')}</h3>
            <p>500 K</p>
          </Card>
        </div>
        <Card>
          <Line
              data={data}
              options={options}
          />
        </Card>
      </>
  );
}
