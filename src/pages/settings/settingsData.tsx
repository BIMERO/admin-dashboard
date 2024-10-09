export interface SettingsProps {
  name: string;
  description: string;
  baseUrl: string;
  customKey: string;
  customValue: string;
  baseUrlType: string;
  timeOut: string;
  maxCalls: number;
  rateLimit: number;
}

export const settingsData: SettingsProps[] = [
  {
    name: "Weather API",
    description: "Provides real-time weather information.",
    baseUrl: "https://api.weatherpro.com",
    customKey: "weather_key",
    customValue: "abc123xyz",
    baseUrlType: "live",
    timeOut: "4000",
    maxCalls: 500,
    rateLimit: 20,
  },
  {
    name: "Payment Gateway",
    description: "Handles all payment processing and transactions.",
    baseUrl: "https://api.paynow.com",
    customKey: "payment_auth",
    customValue: "pay_987654321",
    baseUrlType: "live",
    timeOut: "6000",
    maxCalls: 1000,
    rateLimit: 50,
  },
  {
    name: "E-commerce Product API",
    description: "Fetches product details for an e-commerce platform.",
    baseUrl: "https://api.shop.com/test",
    customKey: "shop_key",
    customValue: "shop_test_12345",
    baseUrlType: "test",
    timeOut: "3000",
    maxCalls: 300,
    rateLimit: 15,
  },
  {
    name: "Currency Exchange API",
    description: "Provides real-time foreign exchange rates.",
    baseUrl: "https://api.exchangerates.com",
    customKey: "exchange_token",
    customValue: "rate456token",
    baseUrlType: "live",
    timeOut: "5000",
    maxCalls: 200,
    rateLimit: 25,
  },
  {
    name: "SMS Notification Service",
    description: "Sends SMS notifications to users.",
    baseUrl: "https://api.smsalerts.com",
    customKey: "sms_api_key",
    customValue: "sms_key_765432",
    baseUrlType: "live",
    timeOut: "3500",
    maxCalls: 800,
    rateLimit: 30,
  },
  {
    name: "Authentication Service",
    description: "Manages user authentication and session handling.",
    baseUrl: "https://api.authservice.com/test",
    customKey: "auth_token",
    customValue: "auth_test_123",
    baseUrlType: "test",
    timeOut: "4500",
    maxCalls: 150,
    rateLimit: 10,
  },
  {
    name: "Map Geolocation API",
    description: "Provides geolocation data for mapping applications.",
    baseUrl: "https://api.geolocate.com",
    customKey: "geo_key",
    customValue: "geo5678key",
    baseUrlType: "live",
    timeOut: "3000",
    maxCalls: 1000,
    rateLimit: 40,
  },
  {
    name: "Social Media Analytics",
    description: "Fetches social media engagement metrics.",
    baseUrl: "https://api.socialtrack.com",
    customKey: "social_token",
    customValue: "soc567track",
    baseUrlType: "live",
    timeOut: "4000",
    maxCalls: 700,
    rateLimit: 35,
  },
];
