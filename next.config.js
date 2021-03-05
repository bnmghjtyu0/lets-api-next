module.exports = {
  public:'src/pages',
  env: {
    MYSQL_HOST: "localhost",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "richard",
    MYSQL_USER: "richard",
    MYSQL_PASSWORD: "root",
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://localhost:3001/api/:slug*`,
      },
    ];
  },
};
