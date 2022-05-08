import { parse } from "path";

export default class User {
    constructor(email, password, valor, msg) {
        this.email = email;
        this.password = password;
        this.valor = valor;
        this.msg = msg;
    }
}

export function dataUser(user) {
    return parse.toString(new User(user));
}