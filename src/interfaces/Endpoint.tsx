import { HeaderProps } from "./Headers";

export interface EndpointParameter {
  name: string;
  type: string;
  // required: boolean;
}

// export interface Endpoints {
//   id: number;
//   /**
//    * The name of the endpoint
//    */
//   name: string;

//   /**
//    * The path of the endpoint
//    */
//   baseUrl?: string;
//   endpoint: string;
//   responseTime: number;
//   status: string;
//   timeStamp: string;

//   /**
//    * The method of the endpoint
//    */
//   method: string;

//   /**
//    * The description of the endpoint
//    */
//   description: string;

//   /**
//    * The queries of the endpoint
// //    */
//   //   queries?: EndpointParameter[];

//   header: HeaderProps[];
//   enabled: boolean;
//   payload?: string[];
// }

export interface Endpoints {
  id: number;
  baseUrl?: string;
  endpoint: string;
  responseTime: string;
  status: string;
  timeStamp: string;
  method: string;
  description: string;
  headers: HeaderProps[];
  queries?: { [key: string]: string } | Array<[string, string]>; //get requests queries
  enabled: boolean;
  payload?: Record<string, any>; //post requests payload
  parameters?: { limit?: number; offset?: number }; //get requests parameters
  fullUrls: string;
}
