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
            notes: string
        } = {
            packages: '',
            visa: '',
            recruitment: '',
            accounting: '',
            users: '',
            notes: ''
        };
        token: string = '';
    }
    