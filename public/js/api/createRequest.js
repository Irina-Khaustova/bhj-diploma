/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest;
    let url = options.url;
    formData = new FormData;
    let datadata = options.data
    if (options.method === 'GET') {
      for (let key in datadata) {
        url = `${url}?${key}=${datadata[key]}&`;
            }
    } else {
     
      for (let key in datadata) {
        formData.append(key, datadata[key]);
      }
    }

    xhr.responseType = 'json';
    xhr.onload = function() {
      options.callback(null, xhr.response);
    };
  
    try {
      xhr.open(options.method, url);
      xhr.send(formData);
    }
    catch (e) {
      options.callback (e, xhr.response);
    }
}

