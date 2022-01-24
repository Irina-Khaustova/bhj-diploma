/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest;
    

    try {
      
      if (options.method === 'GET') {
        xhr.open('GET', `${options.url}?mail=${options.mail}?&password=${options.password}`);
        xhr.send();
      }
      else {
        formData = new FormData;
        formData.append( 'mail', `${options.mail}`);
        formData.append( 'password', `${options.password}`);
        xhr.open(`${options.method}`, `${options.url}`);
        xhr.send(formData);
      }
      
      xhr.responseType = 'json';
      xhr.onload = function() {
        options.callback(null, xhr.response);
      };
    }
    catch (e) {
      options.callback (e, xhr.response);
    }
};

