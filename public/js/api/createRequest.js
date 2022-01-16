/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest;
    

    try {
      
      if (this.options.method === 'GET') {
        xhr.open('GET', `${this.options.url}?mail=${this.options.mail}?&password=${this.options.password}`);
        xhr.send();
      }
      else {
        formData = new FormData;
        formData.append( 'mail', `${this.options.mail}`);
        formData.append( 'password', `${this.options.password}`);
        xhr.open(`${this.options.method}`, `${this.options.url}`);
        xhr.send(formData);
      }
      
      xhr.responseType = 'json';
      xhr.onload = function() {
        this.options.callback(null, xhr.response);
    };
    }
    catch (e) {
      this.options.callback (e, xhr.response);
    }
};

