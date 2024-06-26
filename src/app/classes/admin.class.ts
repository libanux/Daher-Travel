export class Admin {
    _id: string = '';
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    permissions: {
        packages: string,
        visa: string,
        recruitment: string,
        accounting: string,
        users: string,
        notes: string,
        allreports: string,
        customers: string,
        laborReports: string,
        ticketing: string,
        wholesalers: string
    } = {
            packages: '',
            visa: '',
            recruitment: '',
            accounting: '',
            users: '',
            notes: '',
            allreports: '',
            customers: '',
            laborReports: '',
            ticketing: '',
            wholesalers: ''
        };
    token: string = '';
}

export const Permissions_Array: any [] = [
    { name: 'None', value: 'none' },
    { name: 'Read', value: 'read' },
    { name: 'Write', value: 'write' },
    { name: 'Read & Write', value: 'readwrite' },
];



