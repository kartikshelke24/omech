// import sql from 'mssql';

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   options: {
//     encrypt: true, // Use encryption if needed
//     trustServerCertificate: true, // Set to true for self-signed certificates
//   },
// };

// let poolPromise;

// export const getDBConnection = async () => {
//   if (!poolPromise) {
//     poolPromise = new sql.ConnectionPool(config)
//       .connect()
//       .then(pool => {
//         console.log('Connected to the database');
//         return pool;
//       })
//       .catch(err => {
//         console.error('Database connection failed', err);
//         throw err;
//       });
//   }
//   return poolPromise;
// };
