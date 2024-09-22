export interface Notification {
  id: number;
  message: string;
  type: string;
  recipients: string[];
  deliveryMethod: string;
  status: string;
  timestamp: string;
}
