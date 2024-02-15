import { useRef } from "react";
import Card from "@components/base/Card";
import { useTranslation } from "@/translation/useTranslation";
import useKpisAdmin from "@/hooks//useKpisAdmin";
import { Grid } from "@mui/material";
import useChart from "@/hooks//useChart";

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const {
    monthlyBooking,
    isLoadingMonthlyBooking,
    yearlyBooking,
    isLoadingYearlyBooking,
    companies,
    isLoadingCompanies,
    bookingStates,
    isLoadingBookingStates,
  } = useKpisAdmin();

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

  const lineData = {
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
  const lineOptions = {
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
  const lineRef = useRef(null);

  const doughnutData = {
    labels: [t("pending"), t("rejected"), t("accepted")],
    datasets: [
      {
        label: t("stateOfDemandCompanyCreation"),
        data: [
          bookingStates.pending,
          bookingStates.rejected,
          bookingStates.accepted,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("stateOfDemandCompanyCreation"),
      },
    },
  };
  const doughnutRef = useRef(null);

  useChart(lineRef, "line", lineData, lineOptions);
  useChart(doughnutRef, "doughnut", doughnutData, doughnutOptions);

  return (
    <>
      <Grid container spacing={2} width={"100%"}>
        <Grid item xs={6}>
          <Card classNames={"w-full mr-3 mb-3"}>
            <h3 className={"font-bold"}>{t("companyNumber")}</h3>
            {isLoadingCompanies && <p>{t("loading")}</p>}
            <p>{companies}</p>
          </Card>

          <Card classNames={"w-full h-[75%]"}>
            {isLoadingBookingStates && <p>{t("loading")}</p>}
            <canvas ref={doughnutRef} />
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card classNames={"w-full mr-3 mb-3"}>
            <h3 className={"font-bold"}>{t("bookingsTakenThisYear")}</h3>
            {isLoadingYearlyBooking && <p>{t("loading")}</p>}
            <p>{yearlyBooking}</p>
          </Card>
          <Card classNames={"w-full"}>
            {isLoadingMonthlyBooking && <p>{t("loading")}</p>}
            <canvas ref={lineRef} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
