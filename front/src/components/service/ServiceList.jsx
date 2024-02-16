import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import { Trash2 } from "lucide-react";
import { Currency } from "@components/shared/Currency";
import { useServiceContext } from "@components/service/useServiceContext";

export default function ServiceList() {
  const { t } = useTranslation();
  const { services, deleteService } = useServiceContext();

  return (
    <Card>
      <CardHeader title={t("services")} />
      <CardContent>
        <List>
          {services.length > 0 ? (
            services.map((service) => (
              <ListItem key={service.id}>
                <ListItemText
                  primary={service.name}
                  secondary={<Currency amount={service.price} />}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color={"error"}
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem>{t("noServices")}</ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}
