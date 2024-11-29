import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';
import { apiHandler } from '../../../lib/apiHandler';



// Define a method for loading required dropdown data (like products, machines, etc.)
export async function GET() {
    const pool = await getConnection();
    try {
      const products = await pool.request().query('SELECT ProductID, Grade FROM Products WHERE DEL_FLAG = 0');
      const machines = await pool.request().query('SELECT MachineID, MachineName FROM Machines WHERE DEL_FLAG = 0');
      const staff = await pool.request().query('SELECT StaffID, StaffName FROM Staff WHERE DEL_FLAG = 0');
      const shifts = await pool.request().query('SELECT ShiftID, ShiftName FROM Shifts WHERE DEL_FLAG = 0');
  
      return NextResponse.json({
        success: true,
        data: { products: products.recordset, machines: machines.recordset, staff: staff.recordset, shifts: shifts.recordset },
      }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: 'Error loading data' }, { status: 500 });
    }
  }