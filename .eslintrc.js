module.exports = {
  root: true,
  extends: ['incomer-web', 'incomer-api'],
  settings: {
    next: {
      rootDir: ['apps/web/'],
    },
    express: {
      rootDir: ['apps/api/'],
    },
  },
};
