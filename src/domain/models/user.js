export class User {
    constructor(id, name, email, firstName, lastName, kitCode) {
        this.id = id;
        this.name = name || `${firstName || ''} ${lastName || ''}`.trim();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.kitCode = kitCode;
    }

    static fromApiResponse(data) {
        if (!data) return null;

        return new User(
            data.id,
            data.name,
            data.email,
            data.first_name || data.firstName,
            data.last_name || data.lastName,
            data.kit_code || data.kitCode
        );
    }
}