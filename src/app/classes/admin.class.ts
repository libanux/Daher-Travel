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


interface Subtask {
    name: string;
    completed: boolean;
    color: string;
  }
  
  interface Permission {
    name: string;
    completed: boolean;
    color: string;
    subtasks: Subtask[];
  }

export const PERMISSIONS: Permission [] = [

    {
        name: 'packages',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },

    {
        name: 'visa',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },

    {
        name: 'recruitment',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },

    {
        name: 'accounting',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },
    {
        name: 'users',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },

    {
        name: 'notes',
        completed: false,
        color: 'accent',
        subtasks: [
            { name: 'Read', completed: false, color: 'primary' },
            { name: 'Write', completed: false, color: 'primary' },
        ],
    },
  
];





