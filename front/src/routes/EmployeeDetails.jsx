import useUser from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";
import Planning from "@components/shared/Planning";
import useTokens from "@/hooks/useTokens";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import ProfilePicture from "@components/shared/ProfilePicture";

export default function EmployeeDetails() {
  const { id } = useParams();
  const { user, refresh } = useUser(id);
  const tokens = useTokens();
  const { t } = useTranslation();

  return (
    <Stack direction={"column"} spacing={3}>
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          title={<h1 className="font-bold text-xl">{t("employeeInfo")}</h1>}
        />
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={5}
          >
            <ProfilePicture base64={user?.pictures[0]?.path} />
            <table className={"table-auto mt-5"}>
              <tbody>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("id")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{`${user?.id}`}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("name")}</strong>
                  </td>
                  <td
                    className={"px-4 py-2"}
                  >{`${user?.firstName} ${user?.lastName}`}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("username")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{user?.username}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("email")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{user?.email}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("age")}</strong>
                  </td>
                  <td className={"px-4 py-2"}>{`${user?.age || "N/A"}`}</td>
                </tr>
                <tr>
                  <td className={"px-4 py-2"}>
                    <strong>{t("biography")}</strong>
                  </td>
                  <td
                    className={"px-4 py-2"}
                  >{`${user?.biography || "N/A"}`}</td>
                </tr>
              </tbody>
            </table>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title={
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h1 className="font-bold text-xl">{t("planning")}</h1>
              <div className="flex items-center justify-between gap-3">
                {tokens && (
                  <CreateAvailabilityForm
                    userId={id}
                    refreshAvailabilities={refresh}
                  />
                )}
              </div>
            </Stack>
          }
        />
        <CardContent>
          <div className="flex justify-center flex-col p-3 gap-3">
            {user && (
              <Planning
                availabilities={user.availabilities}
                bookings={user.bookingsReceived}
                userId={user.id}
                refresh={refresh}
                performances={[]}
                readOnly
              />
            )}
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
}
