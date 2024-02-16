import { Button, Dialog } from "@mui/material";
import { apiClient } from "@/api";
import useTokens from "@/hooks/useTokens";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/**
 * @param {number} userId
 * @param {function} refresh
 * @param {PlanningColumn} timeSlot
 * @param {function} setTimeSlot
 * @param {ApiPerformance[]} performances
 * @returns {JSX.Element}
 */
export default function CreateBookingForm({
  userId,
  refresh,
  timeSlot,
  setTimeSlot,
  performances,
}) {
  const bookedByUserId = useTokens()?.payload.id;
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(
    performances[0]?.id ?? null,
  );

  useEffect(() => {
    if (selectedPerformanceId === null && performances.length > 0) {
      setSelectedPerformanceId(performances[0].id);
    }
    // eslint-disable-next-line
  }, [performances]);

  /**
   * @param {PlanningColumn} timeSlot
   */
  const bookTimeSlot = async (timeSlot) => {
    setTimeSlot(null);

    const data = {
      duration: timeSlot.duration.toString(),
      startDatetime: timeSlot.startDate.toISOString(),
      bookedByUserId: String(bookedByUserId),
      bookedToUserId: String(userId),
      performanceId: selectedPerformanceId,
    };

    await apiClient("/bookings", {
      method: "post",
      data,
    });

    refresh();
  };

  return (
    <Dialog
      open={timeSlot !== null}
      onClose={() => {
        setTimeSlot(null);
      }}
    >
      <div className="p-3 flex flex-col gap-3">
        <dl>
          <div className="flex gap-4 mb-2">
            <dt className="font-bold">Date de début :</dt>
            <dd>
              {timeSlot &&
                timeSlot.startDate.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}
            </dd>
          </div>

          <div className="flex gap-4 mb-2">
            <dt className="font-bold">Durée :</dt>
            <dd>{timeSlot && timeSlot.duration.toLocaleTimeString()}</dd>
          </div>

          <div className="flex gap-4 mb-2 items-center">
            <dt className="font-bold">Performance :</dt>
            <dd>
              <select
                value={selectedPerformanceId}
                className="p-3 rounded border"
                onChange={(event) =>
                  setSelectedPerformanceId(parseInt(event.currentTarget.value))
                }
              >
                {timeSlot &&
                  performances.map((performance) => (
                    <option key={performance.id} value={performance.id}>
                      {performance.name}
                    </option>
                  ))}
              </select>
            </dd>
          </div>
        </dl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => bookTimeSlot(timeSlot)}
        >
          Réserver ce créneau
        </Button>
      </div>
    </Dialog>
  );
}

CreateBookingForm.propTypes = {
  userId: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  timeSlot: PropTypes.object,
  setTimeSlot: PropTypes.func.isRequired,
  performances: PropTypes.array.isRequired,
};
