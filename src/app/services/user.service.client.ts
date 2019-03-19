import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model.client';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) {}
    baseUrl = environment.baseUrl;
    createUser(user: User) {
        return this._http.post(this.baseUrl + '/api/user/', user);
    }
    findUserById(userId: String) {
        return this._http.get<User>(this.baseUrl + '/api/user/' + userId);
    }
    updateUser(user: User) {
        return this._http.put<User>(this.baseUrl + '/api/user/' + user._id, user);
    }
    findUserByCredential(username: String, password: String) {
        console.log(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
        return this._http.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
    }

    deleteUserById(userId: String) {
        return this._http.delete(this.baseUrl + '/api/user/' + userId);
    }
}
