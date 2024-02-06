import {useTranslation} from 'react-i18next';
import {useEffect, useState} from "react";
import {apiPublicClient} from "@/api";
import PropTypes from "prop-types";


export default function TranslationLoader({ children }) {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    useEffect(() => {
        setLoading(true);
        apiPublicClient.get('/translations')
            .then(response => {
                const translations = response.data;
                i18n.addResources('fr', 'translation', translations.fr);
                i18n.addResources('en', 'translation', translations.en);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    );
}

TranslationLoader.propTypes = {
    children: PropTypes.node.isRequired
};
