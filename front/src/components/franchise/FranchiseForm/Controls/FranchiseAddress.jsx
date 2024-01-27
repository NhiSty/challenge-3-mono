import {Input} from "@components/form/Input";
import toTranslate from "@/utils/translate";
import {useController, useFormContext} from "react-hook-form";

export default function FranchiseAddress() {
    // todo : bien adapter, là c'est juste pour la démo
    const { formState: { errors } } = useFormContext();
    const name = 'franchise_address';
    const label = toTranslate('Adresse de la franchise');
    const error = errors[name];
    const requiredErrorMessage =
        error?.type === "required"
            ? `${label} ${toTranslate("est obligatoire")}`
            : "";

    const {
        field: { value, onChange },
    } = useController({
        name,
        rules: {
            required: true,
        },
    })

    return (
        <Input
            id={name}
            label={label}
            error={requiredErrorMessage}
            value={value}
            onChange={onChange}
        />
    )
}
