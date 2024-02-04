import { FormProvider, useForm } from "react-hook-form";
import FranchiseName from "@components/franchise/FranchiseForm/Controls/FranchiseName";
import FranchiseManager from "@components/franchise/FranchiseForm/Controls/FranchiseManager";
import FranchisePhone from "@components/franchise/FranchiseForm/Controls/FranchisePhone";
import FranchiseAddress from "@components/franchise/FranchiseForm/Controls/FranchiseAddress";

export default function FranchiseForm() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FranchiseName />
        <FranchiseManager />
        <FranchisePhone />
        <FranchiseAddress />
      </form>
    </FormProvider>
  );
}
