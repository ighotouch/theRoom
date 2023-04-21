export class UserDTO {
    constructor(data: IUserAuthentication) {
        this.email = data.email;
        this.password = data.password;
    }
    readonly email!: string;
    readonly password!: string;
}
