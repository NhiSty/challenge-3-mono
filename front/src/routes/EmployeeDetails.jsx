import useUser from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import { useTranslation } from "@/translation/useTranslation";
import { Fragment, useMemo, useState } from "react";
import Duration from "@/domain/planning/Duration";
import { Button } from "@mui/material";
import CreateReviewForm from "@components/shared/CreateReviewForm";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";
import Planning from "@components/shared/Planning";
import useTokens from "@/hooks/useTokens";

export default function EmployeeDetails() {
  const { id } = useParams();
  const { user, isLoading, refresh } = useUser(id);
  const tokens = useTokens();

  const performances = user?.companies.flatMap(
    (company) => company.performances,
  );

  return (
    <div className="flex justify-center flex-col p-3 gap-3">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-bold text-xl">Votre planning</h1>
        {tokens && (
          <CreateAvailabilityForm
            userId={tokens.payload.id}
            refreshAvailabilities={refresh}
          />
        )}
      </div>

      {user && (
        <Planning
          availabilities={user.availabilities}
          bookings={user.bookings}
          userId={user.id}
          refresh={refresh}
          performances={performances}
          readOnly
        />
      )}
    </div>
  );
}
