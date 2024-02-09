import {FormProvider, useForm} from "react-hook-form";
import useCompanyFormVC from "@/hooks/useCompanyFormVC";
import toTranslate from "@/utils/translate";
import TextFieldControl from "@components/form/Controls/TextFieldControl";
import EmailControl from "@components/form/Controls/EmailControl";
import InputFileControl from "@components/form/Controls/InputFileControl";
import {Button, Card, CardActions, CardContent, Stack} from "@mui/material";

export default function NewCompanyForm() {
    const methods = useForm();
    const { submitForm } = useCompanyFormVC();

    return (
        <Stack width={500}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitForm)}>
                    <Card>
                        <CardContent>
                            <TextFieldControl name={"firstname"} label={toTranslate('Firstname')} required={true}/>
                            <TextFieldControl name={"lastname"} label={toTranslate('Lastname')} required={true}/>
                            <EmailControl/>
                            <TextFieldControl name={"companyName"} label={toTranslate('Company name')} required={true}/>
                            <TextFieldControl name={"siret"} label={toTranslate('Siret')} required={true}/>
                            <InputFileControl name={"kbis"} label={toTranslate('Kbis')} required={true}/>
                        </CardContent>
                        <CardActions sx={{ justifyContent:'end' }}>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>{toTranslate('Submit')}</Button>
                        </CardActions>
                    </Card>
                </form>
            </FormProvider>
        </Stack>
    )
}
