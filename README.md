# micro-geoip-lite

🌍 An extremely lite geoip decoder utilizing the [micro-geoip-lite microservice](https://github.com/A-Tokyo/micro-geoip-lite) to geo decode the IP info via an https request - the microservice utilizes MaxMind's IP info dataset.

[![npm version](https://badge.fury.io/js/micro-geoip-lite.svg)](https://badge.fury.io/js/micro-geoip-lite)

# Installation
- Run `yarn add micro-geoip-light`, `npm i micro-geoip-light`

# Usage
- params:
  - ip?: string - optional, defaults to client's IP
  - options?: `{ serviceUrl: string }` - optional, called instead of the default provider URL.

- returns:
  ```js
  {
    ip: string, // if ip param was not provided, this defaults to request.ip
    range: [ number, number ],
    country: string,
    region: string,
    eu: string, // '0' or '1'
    timezone: string,
    city: string,
    ll: [ number, number ],
    metro: number,
    area: number,
    // error: 'Error text', // only exists if an error happened
  }
  ```

- example - fetch own ip info:
  ```js
  import geodecodeIp from 'micro-geoip-light';
  
  const result = await geodecodeIp();

  {
    ip: '207.97.227.239', // if ip param was not provided, this defaults to request.ip
    range: [ 3479298048, 3479300095 ],
    country: 'US',
    region: 'TX',
    eu: '0',
    timezone: 'America/Chicago',
    city: 'San Antonio',
    ll: [ 29.4969, -98.4032 ],
    metro: 641,
    area: 1000,
    // error: 'Error text', // only exists if an error happened
  }
  ```

- example - fetch specific ip info:
  ```js
  import geodecodeIp from 'micro-geoip-light';
  
  const result = await geodecodeIp('207.97.227.239');
  ```

- [Live DEMO](https://geoip-lite.now.sh/?ip=207.97.227.239)
