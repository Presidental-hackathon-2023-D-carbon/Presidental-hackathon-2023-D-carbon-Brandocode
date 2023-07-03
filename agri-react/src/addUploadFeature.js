import { Admin, Resource, fetchUtils } from 'react-admin';
import axios from 'axios'
import jsonServerProvider from 'ra-data-json-server';
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    if ((type === 'CREATE' && resource === 'uploadfile') || (type === 'CREATE' && resource === 'post')) {
        // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.pictures is not an array, but single object
				console.log(params)
        console.log("hiiiiiiiiiiiiiiiiiiiiii")
        // if (params.data.image) {
            // only freshly dropped pictures are instance of File
            // const formerPictures = params.data.pictures.filter(p => !(p.rawFile instanceof File));
            // const newPictures = params.data.pictures.filter(p => p.rawFile instanceof File);
            const httpClient = (url, options = {}) => {
						// if (!options.headers) {
						// 		options.headers = new Headers({ Accept: 'application/json', credentials: 'include', 'content-type': 'application/json' });
						// }
								// add your own headers here
								options.headers = new Headers()
								options.headers.set('Content-Type', 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL');
								return fetchUtils.fetchJson(url, options);
						}
						const dataProvider = jsonServerProvider('http://52.90.64.113:8000', httpClient);

						const data = new FormData();
            data.append('commodity', params.data.commodity);
            data.append('bidname', params.data.bidname);
	    data.append('bidamount', params.data.bidamount);
            data.append('bidprice', params.data.bidprice);
            data.append('bidspecified', params.data.bidspecified);
            data.append('a_commodity', params.data.a_commodity);
            data.append('askname', params.data.askname);
            data.append('askamount', params.data.askamount);
            data.append('askprice', params.data.askprice);
            data.append('askspecified', params.data.askspecified);

            // fetch('http://localhost:8000/uploadfile', {
            //         method: 'POST',
            //         body: data,
            //       }).then((response) => {
            //               response.json().then((body) => {
            //                         this.setState({ imageURL: `http://localhost:8000/${body.file}` });
            //                       });
            //             });
						// return (type, resource, params) =>
						return axios.post('http://52.90.64.113:8000/'+resource, data)
					// 		axios({
					// 		url: 'https://localhost:8000'+source,
					// 		method: 'post',
					// 		data: {
					// 			file,
					// 			name: meta.name,      
					// 		},
					// 	})
            // return dataProvider(type, resource, {
            //         ...params,
            //         data: {
						// 						...data,
            //             ...params.data,
            //         },
            //     });
        // }
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
