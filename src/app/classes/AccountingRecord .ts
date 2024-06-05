export class AccountingRecord {
    record_id: number = 0;
    description: string = '';
    amount: number = 0;
    date: string = ''; // You can use Date type if you prefer
    account_type: string = '';
    status: string = '';
    note: string = '';
}

export const accountingRecords: AccountingRecord[] = [
    {
        record_id: 1,
        description: "Office Supplies",
        amount: 150.75,
        date: "2024-01-05",
        account_type: "Expense",
        status: "Approved",
        note: "Purchased from XYZ Store"
    },
    {
        record_id: 2,
        description: "Client Invoice",
        amount: 2500.00,
        date: "2024-01-10",
        account_type: "Revenue",
        status: "Pending",
        note: "Invoice sent to ABC Corp"
    },
    {
        record_id: 3,
        description: "Rent Payment",
        amount: 1200.00,
        date: "2024-01-15",
        account_type: "Expense",
        status: "Approved",
        note: "Monthly office rent"
    },
    {
        record_id: 4,
        description: "Consulting Income",
        amount: 3200.00,
        date: "2024-01-20",
        account_type: "Revenue",
        status: "Confirmed",
        note: "Consulting services for DEF Ltd"
    },
    {
        record_id: 5,
        description: "Utilities",
        amount: 300.00,
        date: "2024-01-25",
        account_type: "Expense",
        status: "Approved",
        note: "Electricity and water bills"
    },
    {
        record_id: 6,
        description: "Salary Payment",
        amount: 5000.00,
        date: "2024-01-30",
        account_type: "Expense",
        status: "Pending",
        note: "Monthly salaries for staff"
    },
    {
        record_id: 7,
        description: "Equipment Purchase",
        amount: 2200.00,
        date: "2024-02-05",
        account_type: "Expense",
        status: "Approved",
        note: "New computers and printers"
    },
    {
        record_id: 8,
        description: "Client Invoice",
        amount: 1500.00,
        date: "2024-02-10",
        account_type: "Revenue",
        status: "Pending",
        note: "Invoice sent to GHI Inc"
    },
    {
        record_id: 9,
        description: "Insurance Premium",
        amount: 800.00,
        date: "2024-02-15",
        account_type: "Expense",
        status: "Approved",
        note: "Annual insurance payment"
    },
    {
        record_id: 10,
        description: "Training Income",
        amount: 1800.00,
        date: "2024-02-20",
        account_type: "Revenue",
        status: "Confirmed",
        note: "Training sessions for JKL Ltd"
    },
    {
        record_id: 11,
        description: "Office Supplies",
        amount: 120.00,
        date: "2024-02-25",
        account_type: "Expense",
        status: "Approved",
        note: "Stationery from XYZ Store"
    },
    {
        record_id: 12,
        description: "Client Invoice",
        amount: 2750.00,
        date: "2024-03-05",
        account_type: "Revenue",
        status: "Pending",
        note: "Invoice sent to MNO Corp"
    },
    {
        record_id: 13,
        description: "Marketing Expense",
        amount: 950.00,
        date: "2024-03-10",
        account_type: "Expense",
        status: "Approved",
        note: "Online advertising costs"
    },
    {
        record_id: 14,
        description: "Consulting Income",
        amount: 3000.00,
        date: "2024-03-15",
        account_type: "Revenue",
        status: "Confirmed",
        note: "Consulting services for PQR Ltd"
    },
    {
        record_id: 15,
        description: "Rent Payment",
        amount: 1200.00,
        date: "2024-03-20",
        account_type: "Expense",
        status: "Approved",
        note: "Monthly office rent"
    },
    {
        record_id: 16,
        description: "Client Invoice",
        amount: 2400.00,
        date: "2024-03-25",
        account_type: "Revenue",
        status: "Pending",
        note: "Invoice sent to STU Inc"
    },
    {
        record_id: 17,
        description: "Utilities",
        amount: 310.00,
        date: "2024-03-30",
        account_type: "Expense",
        status: "Approved",
        note: "Electricity and water bills"
    },
    {
        record_id: 18,
        description: "Salary Payment",
        amount: 5200.00,
        date: "2024-04-05",
        account_type: "Expense",
        status: "Pending",
        note: "Monthly salaries for staff"
    },
    {
        record_id: 19,
        description: "Equipment Maintenance",
        amount: 450.00,
        date: "2024-04-10",
        account_type: "Expense",
        status: "Approved",
        note: "Servicing of office equipment"
    },
    {
        record_id: 20,
        description: "Client Invoice",
        amount: 2900.00,
        date: "2024-04-15",
        account_type: "Revenue",
        status: "Pending",
        note: "Invoice sent to VWX Ltd"
    }
];
