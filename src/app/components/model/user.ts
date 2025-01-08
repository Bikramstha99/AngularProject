
export class LoggedInUser {
    uniqueName: string;
    userType: number;
    identifier: string;
    authdata: string;
    permissions: Array<string>;
    fullName: string;

    constructor() {
        this.uniqueName = '';
        this.userType = 0;
        this.identifier = '';
        this.authdata = '';
        this.permissions = [];
        this.fullName = '';
    }
}
