import { mockedBookings } from "@/mocks/bookings";
import Planning from "@components/partials/Planning";
import { useEffect, useState } from "react";
import useTokens from "@/hooks/useTokens";
import CreateAvailabilityForm from "@components/CreateAvailabilityForm";

/**
 * @param {number} userId
 * @returns {ApiAvailability[]}
 */
function useAvailabilities(userId) {
  const tokens = useTokens();
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    if (!tokens || !userId) return;

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/availabilities`,
      {
        headers: {
          authorization: `Bearer ${tokens.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(setAvailabilities);
  }, [userId, tokens]);

  return availabilities;
}

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
