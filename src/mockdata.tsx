export const dashboardData = [
  {
    dashboard: {
      apiUsage: [
        {
          date: "2024-09-10",
          totalCalls: 250,
          successfulCalls: 240,
          failedCalls: 10,
          avgResponseTime: "120ms",
        },
        {
          date: "2024-09-11",
          totalCalls: 300,
          successfulCalls: 290,
          failedCalls: 10,
          avgResponseTime: "110ms",
        },
        {
          date: "2024-09-12",
          totalCalls: 220,
          successfulCalls: 215,
          failedCalls: 5,
          avgResponseTime: "130ms",
        },
      ],
      topEndpoints: [
        {
          endpoint: "/v1/authenticate",
          totalCalls: 180,
          avgResponseTime: "100ms",
          errorRate: "1%",
        },
        {
          endpoint: "/v1/user/create",
          totalCalls: 120,
          avgResponseTime: "150ms",
          errorRate: "2%",
        },
        {
          endpoint: "/v1/payment",
          totalCalls: 90,
          avgResponseTime: "90ms",
          errorRate: "0.5%",
        },
      ],
    },
  },
];

export const apiCallLogsData = {
  apiCallLogs: [
    {
      id: 1,
      endpoint: "/v1/authenticate",
      method: "POST",
      statusCode: 200,
      responseTime: "95ms",
      timestamp: "2024-09-10T08:23:45Z",
      clientIP: "192.168.1.10",
    },
    {
      id: 2,
      endpoint: "/v1/user/create",
      method: "POST",
      statusCode: 201,
      responseTime: "120ms",
      timestamp: "2024-09-11T10:15:32Z",
      clientIP: "192.168.1.11",
    },
    {
      id: 3,
      endpoint: "/v1/payment",
      method: "GET",
      statusCode: 500,
      responseTime: "300ms",
      timestamp: "2024-09-12T12:45:22Z",
      clientIP: "192.168.1.12",
    },
  ],
};

export const apiManagementData = [
  {
    id: 1,
    endpoint: "/users",
    method: "GET",
    description: "Retrieve user list",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      limit: 10,
      offset: 0,
    },
    enabled: true,
  },
  {
    id: 2,
    endpoint: "/users",
    method: "POST",
    description: "Create a new user",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {
      name: "John Doe",
      email: "john@example.com",
    },
    parameters: {},
    enabled: true,
  },
  {
    id: 3,
    endpoint: "/users/{id}",
    method: "PUT",
    description: "Update user information",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {
      name: "Jane Doe",
    },
    parameters: {
      id: 1,
    },
    enabled: false,
  },
  {
    id: 4,
    endpoint: "/users/{id}",
    method: "DELETE",
    description: "Delete a user",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      id: 1,
    },
    enabled: true,
  },
  {
    id: 5,
    endpoint: "/products",
    method: "GET",
    description: "Retrieve product list",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      limit: 20,
      offset: 0,
    },
    enabled: true,
  },
  {
    id: 6,
    endpoint: "/products",
    method: "POST",
    description: "Add a new product",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {
      name: "Product 1",
      price: 50,
    },
    parameters: {},
    enabled: true,
  },
  {
    id: 7,
    endpoint: "/orders",
    method: "GET",
    description: "Retrieve order list",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      limit: 15,
      offset: 0,
    },
    enabled: true,
  },
  {
    id: 8,
    endpoint: "/orders/{id}",
    method: "PATCH",
    description: "Update order status",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {
      status: "shipped",
    },
    parameters: {
      id: 101,
    },
    enabled: true,
  },
  {
    id: 9,
    endpoint: "/orders/{id}",
    method: "DELETE",
    description: "Delete an order",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      id: 101,
    },
    enabled: false,
  },
  {
    id: 10,
    endpoint: "/categories",
    method: "GET",
    description: "Retrieve category list",
    headers: {
      "Content-Type": "application/json",
    },
    payload: {},
    parameters: {
      limit: 5,
    },
    enabled: true,
  },
];
