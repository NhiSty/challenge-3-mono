import Card from "@components/shared/Card";
import { useTranslation } from "@/translation/useTranslation";
import { Line } from "react-chartjs-2";
import useKpisManager from "@/hooks/useKpisManager";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ManagerDashboardPage() {
  const { t } = useTranslation();

  const {
    franchisesByUser,
    monthlyBooking,
    yearlyBooking,
    bookings,
    isLoading,
  } = useKpisManager();

  const labels = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: t("bookingByMonth"),
        data: monthlyBooking,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("bookingByMonth"),
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className={"flex flex-row justify-between mb-3"}>
            <Card classNames={"w-full mr-3"}>
              <h3 className={"font-bold"}>{t("franchiseNumber")}</h3>
              <p>{franchisesByUser}</p>
            </Card>
            <Card classNames={"w-full mr-3"}>
              <h3 className={"font-bold"}>{t("bookingsTakenThisMonth")}</h3>
              <p>{bookings}</p>
            </Card>
            <Card classNames={"w-full"}>
              <h3 className={"font-bold"}>{t("bookingsTakenThisYear")}</h3>
              <p>{yearlyBooking}</p>
            </Card>
          </div>
          <Card>
            <Line data={data} options={options} />
          </Card>
        </>
      )}
    </>
  );
}
