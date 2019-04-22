/**
 * Model to hold user details like username and password
 *
 * @export
 * @class User
 */
export class User {

  username = '';
  password = '';

  constructor(uname, pword) {
    this.username = uname;
    this.password = pword;
  }
}
