import Table from "@components/shared/Table";
import Card from "@components/shared/Card";
import PropTypes from "prop-types";
import { useState } from "react";
import FranchiseFormDialog from "@components/franchise/FranchiseFormDialog";
import { useTranslation } from "@/translation/useTranslation";

export default function FranchiseTableCard({ franchises }) {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Card classNames={"w-2/3"}>
        <div className={"flex flex-col items-center"}>
          <div
            className={"flex flex-row items-center justify-between w-full mb-5"}
          >
            <h1 className={"text-xl font-bold"}>{t("myFranchises")}</h1>
            <button
              onClick={() => setModalOpened(true)}
              className={
                "btn btn-sm bg-gray-800 hover:bg-gray-300 text-white hover:text-black"
              }
            >
              {t("addFranchise")}
            </button>
          </div>
          <Table classNames={"mt-5"} thead={[t("name"), t("address")]}>
            {franchises?.map((franchise) => (
              <tr key={franchise.id}>
                <td>{franchise.franchise_name}</td>
                <td>{franchise.franchise_address}</td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>
      <FranchiseFormDialog
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
}

FranchiseTableCard.propTypes = {
  franchises: PropTypes.array,
};
