import type { H3Event } from 'h3'

export const cachedAuthToken = defineCachedFunction(async (event: H3Event, code: string, type: string) => {
  const config = useRuntimeConfig();

  const client_id = config.githubClientId;
  const client_secret = config.githubClientSecret;
    const tokenResponse:any = await $fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: {
      client_id,
      client_secret,
      code,
    },
  });
  return tokenResponse.access_token;
}, {
  maxAge: 60 * 60,
  name: 'accesstoken',
  getKey: (event: H3Event, code: string, type: string) => `${type}`
})