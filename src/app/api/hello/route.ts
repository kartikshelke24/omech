/**
 * app/api/v1/users/route.ts
 * Handles user-related API requests (GET and POST).
 */
import { getDbConnection } from '@/lib/db';
import { apiHandler } from '@/lib/apiHandler';
import sql from 'mssql';

// Fetch all users
export async function GET(request: Request) {
  try {
    const pool = await getDbConnection();
    console.log(pool,"hff");
    
    const result = await pool.request().execute('GetUsers');
    return apiHandler.success(result.recordset, 'Fetched users successfully');
  } catch (error: any) {
    return apiHandler.error(error.message);
  }
}

// Add a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const pool = await getDbConnection();
    await pool
      .request()
      .input('Name', sql.NVarChar, name)       // Input parameter: Name
      .input('Email', sql.NVarChar, email)    // Input parameter: Email
      .execute('AddUser');                    // Execute the SP

    return apiHandler.success(null, 'User added successfully', 201);
  } catch (error: any) {
    return apiHandler.error(error.message);
  }
}
