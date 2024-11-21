import sql, { ConnectionPool, config } from 'mssql';

// SQL Server connection configuration
const dbConfig: config = {
  user: 'kartik',            // Default to empty string if undefined
  password: 'kartik',    // Default to empty string if undefined
  server: 'DESKTOP-4B579BB\\SQLEXPRESS',          // Default to empty string if undefined
  database: 'Omech',        // Default to empty string if undefined
  // options: {
  //   // encrypt: true,                            // Use encryption for data in transit
  //   trustServerCertificate: true,             // Allow self-signed certificates
  // },
};


console.log(dbConfig);

// Function to get a shared database connection pool
export const getDbConnection = async (): Promise<ConnectionPool> => {
  if (!dbConfig.server || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
    throw new Error('Database configuration is incomplete. Please check your environment variables.');
  }

  // Initialize and return the connection pool
  return await sql.connect(dbConfig);
};
