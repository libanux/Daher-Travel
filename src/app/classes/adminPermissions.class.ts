export class Permission {
    name: string = '';
  subtasks: any;
  completed: boolean;

    constructor(name: string) {
        this.name = name;
    }
}

export const Permissions = {
    Package: { 'Read': null, 'Write': null },
    Visa: { 'Read': null, 'Write': null },
};
