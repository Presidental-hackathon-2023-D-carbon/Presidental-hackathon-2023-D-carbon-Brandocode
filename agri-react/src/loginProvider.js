import { AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('http://52.90.64.113:8000/verifyuser', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        // if (username == 'admin') {
        //   return localStorage.setItem('token', 'admin')
        // }
        // else {
        //   return localStorage.setItem('token', 'user')
        // }
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(( res ) => {
                localStorage.setItem('token', res);
            });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'))
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        // var identity = localStorage.getItem('token')
				// return (identity === "user")
        //    ? Promise.resolve()
        //    : ()Promise.reject();
         // console.log(identity)
				return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

		if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('token');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    //}
    return Promise.reject('Unknown method');
};
