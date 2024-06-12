export class Permission {
    name: string = '';

    constructor(name: string) {
        this.name = name;
    }
}

export const Permissions = {
    Package: { 'Read': null, 'Write': null },
    Visa: { 'Read': null, 'Write': null },
};
