import useCurrentUser from "@/hooks/useCurrentUser";
import { useTranslation } from "@/translation/useTranslation";
import { Fragment, useMemo, useState } from "react";
import Duration from "@/domain/planning/Duration";
import { Button } from "@mui/material";
import CreateReviewForm from "@components/partials/CreateReviewForm";

export default function BookingPage() {
  const { user, isLoading, refresh } = useCurrentUser();
  const { t } = useTranslation();
  const [booking, setBooking] = useState(null);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    [],
  );

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{t("loading")}</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {user?.bookingsMade?.length === 0 ? (
            <h1>{t("noBookingsMade")}</h1>
          ) : (
            <div className="flex flex-col gap-3 w-full p-3">
              <h1 className="text-xl font-bold">{t("bookingsMade")}</h1>

              {user?.bookingsMade?.map((booking) => {
                const start = formatter.format(
                  new Date(booking.start_datetime),
                );
                const duration = Duration.fromDuration(booking.duration);

                return (
                  <Fragment key={booking.id}>
                    <div>
                      <h2>
                        <span className="font-bold">
                          {t("performanceName")}
                        </span>{" "}
                        : {booking.performance.name}
                      </h2>

                      <div>
                        {start} ⋅ {duration.toLocaleTimeString()}
                      </div>

                      {booking.reviews.length > 0 ? (
                        <div>
                          <h3 className="font-bold">{t("review")} :</h3>
                          <p>{booking.reviews[0].review_content}</p>
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ marginTop: "15px" }}
                          onClick={() => {
                            setBooking(booking);
                          }}
                        >
                          {t("writeReview")}
                        </Button>
                      )}
                    </div>

                    <hr />
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      )}

      <CreateReviewForm
        booking={booking}
        setBooking={setBooking}
        refresh={refresh}
      />
    </div>
  );
}
