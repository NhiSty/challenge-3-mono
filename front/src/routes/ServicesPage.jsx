import { Grid } from "@mui/material";
import { ServiceContextProvider } from "@components/service/ServiceContext";
import ServiceList from "@components/service/ServiceList";
import ServiceForm from "@components/service/ServiceForm";

export default function ServicesPage() {
  return (
    <ServiceContextProvider>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <ServiceList />
        </Grid>
        <Grid item xs={4}>
          <ServiceForm />
        </Grid>
      </Grid>
    </ServiceContextProvider>
  );
}
