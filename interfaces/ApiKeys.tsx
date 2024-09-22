export interface ApiKeys {
  id: number;
  keyName: string;
  apiKey: string;
  createdAt: string;
  expiryDate: string | null;
  status: string;
  permissions: string[];
  ipWhitelist: string[];
}
