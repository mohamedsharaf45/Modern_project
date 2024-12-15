export default {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-authenticated-user',
            value: '(false|undefined)',
          },
        ],
        destination: '/signin',
        permanent: false,
      },
    ];
  },
};
