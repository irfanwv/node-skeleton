var config = {
  development: {
    server: {
      port: 3000,
    },
    database: {
      url: 'mongodb://localhost/siplDirectory',
       database_name: 'siplDirectory'
    }
  },
  testing: {
    server: {
      port: 3001
    },
    database: {
      url: 'mongodb://localhost/siplDirectory'
    }
  },
  production: {
    server: {
      port: 8080
    },
    database: {
      url: 'mongodb://localhost/siplDirectory'
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config.development;
