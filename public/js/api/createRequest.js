/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest;

    let url = options.url;
    formData = new FormData;
    //let formData = '';
    let datadata = options.data
    //console.log(options)
    if (options.method === 'GET') {
      for (let key in datadata) {
        url = url + '?' + `${key}` + '=' + `${datadata[key]}` + '&';
          //url = url
            }
    } else {
      //formData = new FormData;
      //formData.append( 'mail', `${options.mail}`);
      //formData.append( 'password', `${options.password}`);
      for (let key in datadata) {
        formData.append(`${key}`, `${datadata[key]}`)
      }
    }
    //console.log(url, datadata)
    try {
      
      //if (options.method === 'GET') {
        //xhr.open('GET', `${options.url}?mail=${options.mail}?&password=${options.password}`);
        //xhr.send();
      //}
      xhr.open(options.method, url);
      xhr.send(formData);

      //else {
        //formData = new FormData;
        //formData.append( 'mail', `${options.mail}`);
        //formData.append( 'password', `${options.password}`);
       // xhr.open(`${options.method}`, `${options.url}`);
        //xhr.send(formData);
     // }
      
      xhr.responseType = 'json';
      xhr.onload = function() {
        options.callback(null, xhr.response);
      };
    }
    catch (e) {
      options.callback (e, xhr.response);
    }
};

