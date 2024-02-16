import Planning from "@components/shared/Planning";
import useTokens from "@/hooks/useTokens";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function PlanningPage() {
  const tokens = useTokens();
  const { user, refresh } = useCurrentUser();

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
