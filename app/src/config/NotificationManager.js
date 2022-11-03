import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export function InfoNotification(title, message) {
  return NotificationManager.info(message, title);
}

export function SuccesNotification(title, message) {
  return NotificationManager.success(message, title);
}

export function WarningNotification(title, message) {
  return NotificationManager.warning(message, title);
}

export function ErrorNotification(title, message) {
  return NotificationManager.error(message, title);
}
