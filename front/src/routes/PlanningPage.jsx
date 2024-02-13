import { mockedBookings } from "@/mocks/bookings";
import Planning from "@components/shared/Planning";
import useTokens from "@/hooks/useTokens";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";
import { useAvailabilities } from "@/hooks/useAvailabilities";

export default function PlanningPage() {
  const tokens = useTokens();
  const availabilities = useAvailabilities(tokens?.payload.id);

  return (
    <div>
      {tokens && <CreateAvailabilityForm userId={tokens.payload.id} />}
      {availabilities && (
        <Planning availabilities={availabilities} bookings={mockedBookings} />
      )}
    </div>
  );
}
