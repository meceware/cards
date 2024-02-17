const nextConfig = {
  serverRuntimeConfig: {
    name: process.env.APP_NAME || 'Cards - Vocabulary Learning',
    description: process.env.APP_DESCRIPTION || 'A vocabulary learning platform',
    keywords: process.env.APP_KEYWORDS ? process.env.APP_KEYWORDS.split( ',' ).map( s => s.trim() ) : '',
    url: process.env.APP_URL || 'http://localhost:3000',
    ogImage: `${ process.env.APP_URL }/og.png`,
    links: {
      github: 'https://github.com/meceware/cards',
    },
    author: {
      name: 'meceware',
      url: 'https://www.meceware.com',
    },
    api: process.env.STRAPI_API_URL,
    token: process.env.STRAPI_API_TOKEN,
  },
  async redirects() {
    return [
      {
        source: '/list',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cards',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
