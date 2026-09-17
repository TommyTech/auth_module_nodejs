import * as uuid from 'uuid';
import nock from 'nock';
import config from './correctConfig';

function nockTokenEndpoint(host) {
  nock(host)
    .persist()
    .post('/oauth2/token')
    .reply(200, () => {
      const token = uuid.v4();
      const refresh = uuid.v4();
      return {
        access_token: token,
        refresh_token: refresh,
        expires_in: 2 * 60 * 60,
      };
    });
}

nockTokenEndpoint(config.url);
nockTokenEndpoint(config.consentUrl);
