export default {
  async fetch(request, env, ctx) {
    const TARGET_HOST = 'https://perchance.org';
    
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, TARGET_HOST);

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    modifiedRequest.headers.set('Host', new URL(TARGET_HOST).host);
    modifiedRequest.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    modifiedRequest.headers.set('Referer', TARGET_HOST);
    modifiedRequest.headers.set('Origin', TARGET_HOST);

    const response = await fetch(modifiedRequest);

    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', '*');

    return modifiedResponse;
  },
};
