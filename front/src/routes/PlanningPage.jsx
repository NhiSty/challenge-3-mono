import { mockedAvailabilities } from "@/mocks/availabilities";
import { mockedBookings } from "@/mocks/bookings";
import Planning from "@components/partials/Planning";

export default function PlanningPage() {
  return (
    <Planning availabilities={mockedAvailabilities} bookings={mockedBookings} />
  );
}
