/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';
  static setCurrent(user) {

    let data = JSON.stringify(user);
    localStorage.setItem('user', data) 
    console.log(user, JSON.parse(data))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    console.log('user')
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    
    if (localStorage.user) {
      const current = localStorage.user;
      return JSON.parse(current);
  } else {
      return null;
  }
      //return JSON.parse(localStorage.getItem('user'));
    
  }  

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      callback: (err, response) => {
          if (response && response.success) {
            this.current();
            callback(err, response);
          }
          else {
            this.unsetCurrent();
        }

      }
    }
    )
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          console.log(response)
        }
       callback(err, response);
      } 
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/register',
      data,
      callback: (err, response) => {
          if (response && response.success) {
            this.setCurrent(response.user);
            callback(err, response);
            console.log(response)
        } else {
          console.log(response)
        }
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/logout',
      callback: (err, response) => {
          if (response && response.success) {
            this.unsetCurrent();
        }
        callback;
      }
    })
  }
}
