import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import { UserList } from './users';
import { PostList, PostEdit, PostShow, PostCreate} from './posts';
import { bcList, bcShow, bcCreate } from './blockchain/bcpost';
import { photoList, photoShow, photoCreate } from './blockchain/uploadfile';
import { adminPostShow, adminPostList, adminPostEdit, adminPostCreate } from './admin/posts';
import loginProvider from './loginProvider';
import jsonServerProvider from 'ra-data-json-server';
import addUploadFeature from './addUploadFeature';


const userResources = [
		<Resource name="post" options={{ label: "案件清單" }} list={PostList} edit={PostEdit} show={PostShow} create={PostCreate}/>,
		// <Resource name="bcpost" options={{ label: "區塊鏈資料" }} list={bcList} show={bcShow} />,
];

const adminResources = [
		<Resource name="user" options={{ label: "權限管理" }} list={adminPostList} edit={adminPostEdit} show={adminPostShow}/>,
];

const selectResources = () => {
		if (localStorage.getItem('token') === 'admin') {
        console.log(localStorage.getItem('token'))
				return adminResources
		}
		else {
        console.log(localStorage.getItem('token'))
				return userResources
		}
}

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json', credentials: 'include', 'content-type': 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const dataProvider = jsonServerProvider('http://52.90.64.113:8000');
const uploadCapableDataProvider = addUploadFeature(dataProvider);

const App = () => (
  <Admin dataProvider={uploadCapableDataProvider} authProvider={loginProvider}>
  {permissions => [
        // Restrict access to the edit and remove views to admin only
       permissions === 'admin' || permissions === 'user' ?
		[<Resource name="post" options={{ label: "案件清單" }} list={PostList} edit={PostEdit} show={PostShow} create={PostCreate}/>,]
		// <Resource name="bcpost" options={{ label: "區塊鏈資料" }} list={bcList} show={bcShow} />]
    : <Resource name="uploadfile" options={{ label: "用戶上傳區" }} list={photoList} show={photoShow} create={photoCreate}/>,
        // Only include the categories resource for admin users
        permissions === 'admin'
		? <Resource name="user" options={{ label: "權限管理" }} list={adminPostList} edit={adminPostEdit} show={adminPostShow} create={adminPostCreate}/>
            : null,
    ]}
	</Admin>
);

export default App;
