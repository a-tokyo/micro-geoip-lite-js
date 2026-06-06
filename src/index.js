/* @flow */
const ky = require('ky-universal');

/**
 * Geoip online service url - eg: https://github.com/A-Tokyo/micro-geoip-lite
 */
const SERVICE_URL_GEOIP =
  process.env.REACT_APP_SERVICE_URL_GEOIP ||
  process.env.NEXT_PUBLIC_SERVICE_URL_GEOIP ||
  process.env.SERVICE_URL_GEOIP ||
  'https://geoip-lite.vercel.app/';

/**
 * Gets the client's information via the IP address
 */
const geodecodeIp = (
  ip?: ?string,
  { serviceUrl, timeout }: { serviceUrl?: string, timeout?: number } = {},
): Promise<{
  ip: ?string,
  range?: [number, number],
  country: ?string,
  region: ?string,
  eu: ?string,
  timezone: ?string,
  city: ?string,
  ll?: [number, number],
  metro?: number,
  area?: number,
  error?: string,
}> =>
  // Wrap in Promise.resolve so that synchronous throws (eg: an invalid
  // serviceUrl rejected by the native Request/URL constructor on Node >=18)
  // are normalized into the promise chain and handled by .catch below.
  Promise.resolve()
    .then(() =>
      ky(
        `${serviceUrl || SERVICE_URL_GEOIP}${ip ? `?ip=${ip}` : ''}${
          timeout ? `${ip ? '&' : '?'}timeout=${timeout}` : ''
        }`,
      ).then((res) => res.json()),
    )
    .catch((error) => ({
      error: error && error.message,
    }));

module.exports = geodecodeIp;
