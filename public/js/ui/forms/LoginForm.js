//const { append } = require("express/lib/response")

/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if(response.success) {
        App.setState('user-logged');
        (App.getModal('login')).close();

        this.element.reset();

      } else {
        this.element.reset();
        alert(response.error);
      }
      console.log(response)
    })
  }
}