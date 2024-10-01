export interface Audit {
  id: number;
  actionType: string;
  user: string;
  targetResource: string;
  dateTime: string;
  ipAddress: string;
  status: string;
  details: string;
}
