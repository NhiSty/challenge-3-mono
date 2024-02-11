import Table from "@components/base/Table";
import useCompanyDemands from "@/hooks/useCompanyDemands";
import {useEffect} from "react";
import {useTranslation} from "@/translation/useTranslation";
import TableLineSkeleton from "@components/base/TableLineSkeleton";
import {IconButton} from "@mui/material";
import { ArrowUpRightSquareIcon } from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function CompanyDemandsTable() {
    const { t } = useTranslation();
    const { getPendingDemands, loading, demands } = useCompanyDemands();
    const navigate = useNavigate();

    useEffect(() => {
        getPendingDemands();
    }, []);


    return (
        <Table thead={[t("companyName"), t("firstname"), t("lastname"), t("address"), '']}>
            {loading ? (
                <TableLineSkeleton nbLines={3} nbColumns={4} />
            ) : (
                demands?.map((demand) => (
                    <tr key={demand.id}>
                        <td>{demand.companyName}</td>
                        <td>{demand.author.firstName}</td>
                        <td>{demand.author.lastName}</td>
                        <td>{demand.address}</td>
                        <td>
                            <IconButton onClick={() => navigate(`/manager/demands/${demand.id}`)} >
                                <ArrowUpRightSquareIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))
            )}
        </Table>
    )
}
