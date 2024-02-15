import Card from "@components/base/Card";
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
    isLoadingFranchisesByUser,
    monthlyBooking,
    isLoadingBooking,
    yearlyBooking,
    isLoadingYearlyBooking,
    bookings,
    isLoadingBookings,
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
      <div className={"flex flex-row justify-between mb-3"}>
        <Card classNames={"w-full mr-3"}>
          <h3 className={"font-bold"}>{t("franchiseNumber")}</h3>
          {isLoadingFranchisesByUser && <p>{t("loading")}</p>}
          <p>{franchisesByUser}</p>
        </Card>
        <Card classNames={"w-full mr-3"}>
          <h3 className={"font-bold"}>{t("bookingsTakenThisMonth")}</h3>
          {isLoadingBookings && <p>{t("loading")}</p>}
          <p>{bookings}</p>
        </Card>
        <Card classNames={"w-full"}>
          <h3 className={"font-bold"}>{t("bookingsTakenThisYear")}</h3>
          {isLoadingYearlyBooking && <p>{t("loading")}</p>}
          <p>{yearlyBooking}</p>
        </Card>
      </div>
      <Card>
        {isLoadingBooking && <p>{t("loading")}</p>}
        <Line data={data} options={options} />
      </Card>
    </>
  );
}
