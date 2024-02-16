import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import Map from "@components/shared/Map";
import { useCompanyContext } from "@components/company/useCompanyContext";
import { useTranslation } from "@/translation/useTranslation";

export default function CompanyInfo() {
  const { t } = useTranslation();
  const { company, owner } = useCompanyContext();
  const coordinates =
    company?.latitude && company?.longitude
      ? [company.latitude, company.longitude]
      : [0, 0];
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            title={<h1 className={"text-3xl font-bold"}>{t("coordinates")}</h1>}
          />
          <CardContent>
            <table className={"table-auto mt-5"}>
              <tbody>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("name")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_name}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("email")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{owner?.email}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("address")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.address}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("coordinates")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>
                    <p>{`(lat) ${company?.latitude}`}</p>
                    <p>{`(lng) ${company?.longitude}`}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Map center={coordinates} markers={[coordinates]} height={"350px"} />
      </Grid>
    </Grid>
  );
}
