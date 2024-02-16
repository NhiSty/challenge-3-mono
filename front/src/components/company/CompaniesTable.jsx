import useCompany from "@/hooks/useCompany";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import Table from "@components/shared/Table";
import { Pencil, Trash2, ArrowUpRightSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  const navigate = useNavigate();
  const { companies } = useCompany();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={
          <Stack>
            <h1>{t("companies")}</h1>
          </Stack>
        }
      />
      <CardContent>
        <Table
          thead={[
            t("id"),
            t("companyName"),
            t("owner"),
            t("email"),
            t("address"),
            "",
          ]}
        >
          {companies.map((company) => (
            <tr key={`company-${company.id}`}>
              <td>{company.id}</td>
              <td>{company?.company_name}</td>
              <td>{`${company?.owner?.firstName} ${company?.owner?.lastName}`}</td>
              <td>{company?.owner?.email}</td>
              <td>{company?.address}</td>
              <td>
                <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                  <IconButton color={"primary"}>
                    <Pencil />
                  </IconButton>
                  <IconButton color={"error"}>
                    <Trash2 />
                  </IconButton>
                  <IconButton
                    color={"info"}
                    onClick={() => navigate(`${company.id}`)}
                  >
                    <ArrowUpRightSquareIcon />
                  </IconButton>
                </Stack>
              </td>
            </tr>
          ))}
        </Table>
      </CardContent>
    </Card>
  );
}
