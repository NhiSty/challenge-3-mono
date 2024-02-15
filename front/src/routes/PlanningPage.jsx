import Planning from "@components/shared/Planning";
import useTokens from "@/hooks/useTokens";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";
import { useAvailabilities } from "@/hooks/useAvailabilities";
import { useBookings } from "@/hooks/useBookings";

export default function PlanningPage() {
  const tokens = useTokens();
  const { availabilities, refresh } = useAvailabilities(tokens?.payload.id);
  const { bookings, refreshBookings } = useBookings(tokens?.payload.id);

  return (
    <div>
      {tokens && (
        <CreateAvailabilityForm
          userId={tokens.payload.id}
          refreshAvailabilities={refresh}
        />
      )}

      {availabilities && (
        <Planning
          availabilities={availabilities}
          bookings={bookings}
          userId={tokens?.payload.id}
          refreshBookings={refreshBookings}
        />
      )}
    </div>
  );
}
