import { readFileSync } from 'fs';
import nock from 'nock';

export const user = JSON.parse(
  readFileSync(new URL('./user.json', import.meta.url), 'utf8'),
);

export default function nockGetAprofiel(apiHost, status) {
  nock(apiHost)
    .get('/me')
    .reply(status || 200, user);
}
