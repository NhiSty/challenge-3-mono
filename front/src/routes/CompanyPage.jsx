import Card from "@components/base/Card";
import { useEffect } from "react";
import { useTranslation } from "@/translation/useTranslation";
import useCompanyVC from "@/hooks/useCompanyVC";
import FranchiseTableCard from "@components/franchise/FranchiseTableCard";

export default function CompanyPage() {
  const { getCompany, company } = useCompanyVC();
  const { t } = useTranslation();

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <>
      <div className={"flex flex-row justify-between items-start"}>
        <Card classNames={"w-1/3 mr-4"}>
          <div className={"flex flex-col items-center"}>
            <h1 className={"text-3xl font-bold"}>{t("myCompany")}</h1>
            <table className={"table-auto mt-5"}>
              <tbody>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("name")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_name}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("email")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.owner.email}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("address")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.address}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("coordinates")}</strong>
                  </td>
                  <td
                    className={"px-4 py-2"}
                  >{`${company?.latitude} ${company?.longitude}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        <FranchiseTableCard franchises={company?.franchises} />
      </div>
    </>
  );
}
