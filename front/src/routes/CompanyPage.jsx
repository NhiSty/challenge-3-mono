import Card from "@components/base/Card";
import toTranslate from "@/utils/translate";
import Table from "@components/base/Table";
import { useEffect, useState } from "react";
import Modal from "@components/base/Modal";
import PropTypes from "prop-types";
import FranchiseForm from "@components/franchise/FranchiseForm";

export default function CompanyPage() {
  const [company, setCompany] = useState();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/companies/1", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCompany(data);
      });
  }, []);

  return (
    <>
      <div className={"flex flex-row justify-between items-start"}>
        <Card classNames={"w-1/3 mr-4"}>
          <div className={"flex flex-col items-center"}>
            <h1 className={"text-3xl font-bold"}>
              {toTranslate("My company")}
            </h1>
            <table className={"table-auto mt-5"}>
              <tbody>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{toTranslate("Name")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_name}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{toTranslate("Address")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_address}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{toTranslate("Phone")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_phone}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{toTranslate("Email")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{company?.company_email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        <Card classNames={"w-2/3"}>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "flex flex-row items-center justify-between w-full mb-5"
              }
            >
              <h1 className={"text-xl font-bold"}>
                {toTranslate("My franchises")}
              </h1>
              <button
                onClick={() => setModalOpened(true)}
                className={
                  "btn btn-sm bg-gray-800 hover:bg-gray-300 text-white hover:text-black"
                }
              >
                {toTranslate("Add franchise")}
              </button>
            </div>
            <Table
              classNames={"mt-5"}
              thead={[
                toTranslate("Name"),
                toTranslate("Manager"),
                toTranslate("Phone"),
                toTranslate("Address"),
              ]}
            >
              {company?.franchises.map((franchise) => (
                <tr key={franchise.id}>
                  <td>{franchise.franchise_name}</td>
                  <td>{franchise.franchise_manager}</td>
                  <td>{franchise.franchise_phone}</td>
                  <td>{franchise.franchise_address}</td>
                </tr>
              ))}
            </Table>
          </div>
        </Card>
      </div>
      <CreateFranchiseFormModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
}

function CreateFranchiseFormModal({ opened, onClose }) {
  return (
    <Modal
      title={"Ajouter une franchise"}
      open={opened}
      onClose={onClose}
      withSaveButton={true}
      className={"bg-white"}
    >
      <FranchiseForm />
    </Modal>
  );
}

CreateFranchiseFormModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
