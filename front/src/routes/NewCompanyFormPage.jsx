import NewCompanyForm from "@components/company/NewCompanyForm";
import {Stack} from "@mui/material";

export default function NewCompanyFormPage() {

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Demande de création de compagnie</h1>

            <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <NewCompanyForm />
            </Stack>
        </>
    )
}
