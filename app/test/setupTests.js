Object.defineProperty(global, 'import.meta', {
    writable: true,
    value: {
      env: {
        VITE_API_URL: 'https://your-api-url.com',
      },
    },
  });