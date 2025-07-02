import ExcelJS from 'exceljs';

export async function generateExcel(bookings, filename = 'Bookings') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Bookings');

  worksheet.columns = [
    { header: 'Booking ID', key: '_id', width: 24 },
    { header: 'Type', key: 'type', width: 12 },
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Check In', key: 'checkIn', width: 20 },
    { header: 'Check Out', key: 'checkOut', width: 20 },
    { header: 'Amount', key: 'amount', width: 12 },
    { header: 'Created At', key: 'createdAt', width: 22 },
  ];

  bookings.forEach(booking => {
    worksheet.addRow(booking);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
