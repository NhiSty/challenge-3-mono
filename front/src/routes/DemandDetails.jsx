import useCompanyDemandsVC from "@/hooks/useCompanyDemandsVC";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import DemandCard from "@components/companyDemands/DemandCard";
import {Grid, Stack} from "@mui/material";
import Map from "@components/base/Map";

export default function DemandDetails() {
    const { id } = useParams();
    const { getDemandById, demand, loading } = useCompanyDemandsVC();

    useEffect(() => {
        getDemandById(id);
    }, [id]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (!demand) {
        return <p>Demand not found</p>
    }

    const companyLocation = [48.950001,1.91667];

    return (
        <>

            <Grid container spacing={2} height={'100%'}>
                <Grid item xs={6}>
                    <DemandCard demand={demand} />

                    <Stack mt={2}>
                        <Map
                            width={'100%'}
                            height={'450px'}
                            center={companyLocation}
                            markers={[companyLocation]}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <h2 style={{ textAlign: 'center' }}>Kbis</h2>
                    <iframe
                        width={'100%'}
                        height={'600'}
                        src={'https://www.ecam.fr/wp-content/uploads/2016/06/Exemple-fichier-PDF-1.pdf'}
                    />
                </Grid>
            </Grid>
        </>
    )
}
