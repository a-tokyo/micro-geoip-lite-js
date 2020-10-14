/* @flow */
const ky = require('ky-universal');

/**
 * Geoip online service url - eg: https://github.com/A-Tokyo/micro-geoip-lite
 */
const SERVICE_URL_GEOIP =
  process.env.REACT_APP_SERVICE_URL_GEOIP ||
  process.env.SERVICE_URL_GEOIP ||
  'https://geoip-lite.now.sh/';

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
  ky(
    `${serviceUrl || SERVICE_URL_GEOIP}${
      ip ? `?ip=${ip}${timeout ? `&timeout=${timeout}` : ''}` : ''
    }`,
  )
    .then((res) => res.json())
    .catch((error) => ({
      error: error && error.message,
    }));

module.exports = geodecodeIp;
