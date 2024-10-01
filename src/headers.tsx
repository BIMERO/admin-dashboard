import { HeaderProps } from "./interfaces/Headers";

export const HeadersData: HeaderProps[] = [
  {
    name: "Accept",
    samples: ["text/html", "application/json", "image/jpeg", "application/xml"],
  },
  {
    name: "Accept-Charset",

    samples: ["utf-8", "iso-8859-1", "windows-1252"],
  },
  {
    name: "Accept-Encoding",

    samples: ["gzip", "deflate", "br", "identity"],
  },
  {
    name: "Accept-Language",

    samples: ["en-US", "fr-FR", "es-ES", "zh-CN"],
  },
  {
    name: "Authorization",

    samples: [
      "Bearer 1234567890",
      "Basic QWxhZGpr",
      'Digest username="admin", realm="example", nonce="", response="", uri="", algorithm=MD5',
    ],
  },
  {
    name: "Cache-Control",

    samples: ["max-age=3600", "no-cache", "no-store", "must-revalidate"],
  },
  {
    name: "Connection",

    samples: ["keep-alive", "close"],
  },
  {
    name: "Content-Type",

    samples: ["application/json", "text/html", "image/jpeg", "application/xml"],
  },
  {
    name: "Cookie",

    samples: ["session_id=123456", "username=admin", "lang=en-US"],
  },
  {
    name: "Date",

    samples: ["Wed, 21 Jan 2020 07:28:00 GMT", "Tue, 20 Jan 2020 14:30:00 PST"],
  },
  {
    name: "Expect",

    samples: ["100-continue"],
  },
  {
    name: "From",

    samples: ["user@(link unavailable)"],
  },
  {
    name: "Host",

    samples: ["(link unavailable)", "(link unavailable)", "192.0.2.1"],
  },
  {
    name: "If-Match",

    samples: ['"1234567890"'],
  },
  {
    name: "If-Modified-Since",

    samples: ["Wed, 21 Jan 2020 07:28:00 GMT", "Tue, 20 Jan 2020 14:30:00 PST"],
  },
  {
    name: "If-None-Match",

    samples: ['"1234567890"'],
  },
  {
    name: "If-Range",

    samples: ['"1234567890"'],
  },
  {
    name: "If-Unmodified-Since",

    samples: ["Wed, 21 Jan 2020 07:28:00 GMT", "Tue, 20 Jan 2020 14:30:00 PST"],
  },
  {
    name: "Max-Forwards",

    samples: ["10"],
  },
  {
    name: "Origin",

    samples: ["(link unavailable)", "http://(link unavailable)", "null"],
  },
  {
    name: "Pragma",

    samples: ["no-cache"],
  },
  {
    name: "Proxy-Authorization",

    samples: ["Basic QWxhZGpr"],
  },
  {
    name: "Range",

    samples: ["bytes=0-1023"],
  },
  {
    name: "Referer",

    samples: ["(link unavailable)"],
  },
  {
    name: "TE",

    samples: ["trailers, chunked"],
  },
  {
    name: "Trailer",

    samples: ["Foo"],
  },
  {
    name: "Transfer-Encoding",

    samples: ["chunked"],
  },
  {
    name: "Upgrade",

    samples: ["websocket"],
  },
  {
    name: "User-Agent",

    samples: ["Mozilla/5.0", "Chrome/74.0.3729.169"],
  },
  {
    name: "Via",

    samples: ["1.1 (link unavailable)"],
  },
  {
    name: "Warning",

    samples: ["199 - Miscellaneous warning"],
  },
  {
    name: "WWW-Authenticate",

    samples: ['Basic realm="example"'],
  },
  {
    name: "X-Frame-Options",

    samples: ["DENY", "SAMEORIGIN"],
  },
  {
    name: "X-Content-Type-Options",

    samples: ["nosniff"],
  },
  {
    name: "X-XSS-Protection",

    samples: ["1; mode=block"],
  },
];
