/* @flow */

// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import geodecodeIp from '../src';

describe('index Test', () => {
  it('Returns proper schema with no inputs', async () => {
    const result = await geodecodeIp();
    expect(result).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        range: [expect.any(Number), expect.any(Number)],
        country: expect.any(String),
        region: expect.any(String),
        eu: expect.any(String),
        timezone: expect.any(String),
        city: expect.any(String),
        ll: [expect.any(Number), expect.any(Number)],
        metro: expect.any(Number),
        area: expect.any(Number),
      }),
    );
    expect(result.error).toEqual(undefined);
  });

  it('Returns proper schema with ip input', async () => {
    const result = await geodecodeIp('207.97.227.239');
    expect(result).toEqual(
      expect.objectContaining({
        ip: '207.97.227.239',
        range: [3479298048, 3479302143],
        country: 'US',
        region: 'TX',
        eu: '0',
        timezone: 'America/Chicago',
        city: 'San Antonio',
        ll: [29.4963, -98.4004],
        metro: 641,
        area: 1000,
      }),
    );
    expect(result.error).toEqual(undefined);
  });

  it('Calls provided service url and returns proper schema.', async () => {
    const result = await geodecodeIp('207.97.227.239', {
      serviceUrl: 'https://micro-geoip-lite.now.sh',
    });
    expect(result).toEqual(
      expect.objectContaining({
        ip: '207.97.227.239',
        range: [3479298048, 3479302143],
        country: 'US',
        region: 'TX',
        eu: '0',
        timezone: 'America/Chicago',
        city: 'San Antonio',
        ll: [29.4963, -98.4004],
        metro: 641,
        area: 1000,
      }),
    );
    expect(result.error).toEqual(undefined);
  });

  it('Returns proper schema with timeout', async () => {
    const result = await geodecodeIp('207.97.227.239', { timeout: 1000 * 3 });
    expect(result).toEqual(
      expect.objectContaining({
        ip: '207.97.227.239',
        range: [3479298048, 3479302143],
        country: 'US',
        region: 'TX',
        eu: '0',
        timezone: 'America/Chicago',
        city: 'San Antonio',
        ll: [29.4963, -98.4004],
        metro: 641,
        area: 1000,
      }),
    );
    expect(result.error).toEqual(undefined);
  });

  it('Returns proper schema with timeout AND NO IP', async () => {
    const result = await geodecodeIp(undefined, { timeout: 1000 * 3 });
    expect(result).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        range: [expect.any(Number), expect.any(Number)],
        country: expect.any(String),
        region: expect.any(String),
        eu: expect.any(String),
        timezone: expect.any(String),
        city: expect.any(String),
        ll: [expect.any(Number), expect.any(Number)],
        metro: expect.any(Number),
        area: expect.any(Number),
      }),
    );
    expect(result.error).toEqual(undefined);
  });

  it('Returns proper error if serviceUrl invalid', async () => {
    const result = await geodecodeIp('207.97.227.239', { serviceUrl: 'xxx' });
    expect(result.error).toEqual(expect.any(String));
  });
});
