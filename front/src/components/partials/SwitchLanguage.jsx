import {Switch} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";


export default function SwitchLanguage() {
    const { i18n, t } = useTranslation('translation');

    const onChange = () => {
        return i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    }

    console.log(i18n.language)

    useEffect(() => {
        console.log(t('test'))
    }, [i18n.language]);

    return (
        <div className="flex items-center">
            <span>EN</span>
            <Switch
                defaultChecked={i18n.language === "fr"}
                onClick={onChange}
            />
            <span>FR</span>
        </div>
    )
}
