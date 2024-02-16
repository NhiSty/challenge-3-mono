import Table from "@components/shared/Table";
import { useState } from "react";
import FranchiseFormDialog from "@components/franchise/FranchiseFormDialog";
import { useTranslation } from "@/translation/useTranslation";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { useCompanyContext } from "@components/company/useCompanyContext";
import { Pencil, Trash2 } from "lucide-react";

export default function FranchiseTableCard() {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);
  const [franchiseToEdit, setFranchiseToEdit] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const { franchises, removeFranchise } = useCompanyContext();

  const openEditModal = (franchise) => {
    setFormMode("edit");
    setFranchiseToEdit(franchise);
    setModalOpened(true);
  };

  const onClose = () => {
    setModalOpened(false);
    setFranchiseToEdit(null);
  };

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          title={
            <Stack direction={"row"} justifyContent={"space-between"}>
              <h1 className={"text-xl font-bold"}>{t("franchises")}</h1>
              <Button variant={"outlined"} onClick={() => setModalOpened(true)}>
                {t("addFranchise")}
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <Table classNames={"mt-5"} thead={[t("name"), t("address"), ""]}>
            {franchises?.map((franchise) => (
              <tr key={franchise.id}>
                <td>{franchise.franchise_name}</td>
                <td>{franchise.address}</td>
                <td>
                  <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                    <IconButton
                      color={"primary"}
                      onClick={() => openEditModal(franchise)}
                    >
                      <Pencil />
                    </IconButton>
                    <IconButton
                      color={"error"}
                      onClick={() => removeFranchise(franchise.id)}
                    >
                      <Trash2 />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </Table>
        </CardContent>
      </Card>
      {modalOpened && (
        <FranchiseFormDialog
          opened={modalOpened}
          onClose={onClose}
          franchise={franchiseToEdit}
          mode={formMode}
        />
      )}
    </>
  );
}
