# micro-geoip-lite

🌍 An extremely lite geoip decoder utilizing the [micro-geoip-lite microservice](https://github.com/A-Tokyo/micro-geoip-lite) to geo decode the IP info via an https request - the microservice utilizes MaxMind's IP info dataset.

<a href="https://npmjs.com/package/micro-geoip-lite">
  <img src="https://img.shields.io/npm/v/micro-geoip-lite.svg"></img>
  <img src="https://img.shields.io/npm/dt/micro-geoip-lite.svg"></img>
</a>
<a href="https://codecov.io/gh/A-Tokyo/micro-geoip-lite-js">
  <img src="https://img.shields.io/codecov/c/github/a-tokyo/micro-geoip-lite-js.svg"></img>
</a>
<a href="https://twitter.com/intent/follow?screen_name=ahmad_tokyo"><img src="https://img.shields.io/twitter/follow/ahmad_tokyo.svg?label=Follow%20@ahmad_tokyo" alt="Follow @ahmad_tokyo"></img></a>

# Installation
- Run `yarn add micro-geoip-lite`, `npm i micro-geoip-lite`

# Usage
- params:
  - ip?: string - optional, defaults to client's IP
  - options?: 
    ```js
    {
      serviceUrl?: string, // called instead of the default provider URL. You can also provide this via an env var `REACT_APP_SERVICE_URL_GEOIP` or `SERVICE_URL_GEOIP`
      timeout?: string, // timeout in ms
    }
    ```
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
  import geodecodeIp from 'micro-geoip-lite';
  
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
  import geodecodeIp from 'micro-geoip-lite';
  
  const result = await geodecodeIp('207.97.227.239');
  ```

- [Live DEMO](https://geoiplite.ahmedtokyo.com/?ip=207.97.227.239)
