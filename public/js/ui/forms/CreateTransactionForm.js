/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    
    const newIncome = document.querySelector('#new-income-form');
    const newExpense = document.querySelector('#new-expense-form');
    const newIncomeList = document.querySelector('#income-accounts-list'); 
    const newExpenseList = document.querySelector('#expense-accounts-list');
    newIncomeList.innerHTML = '';
    newExpenseList.innerHTML = '';
    
    if (this.element === newIncome) {
      Account.list(User.current(), (err, response) => {
        const accountSelect = response.data;
        accountSelect.forEach(elem => {
          let div1 = document.createElement('div');
          div1.innerHTML = `<option value="${elem.id}">${elem.name}</option>`;
          newIncomeList.insertAdjacentElement("beforeend", div1.firstChild);
        })
      })
    }
     
    if (this.element === newExpense) {
      Account.list(User.current(), (err, response) => {
        const accountSelect = response.data;
        accountSelect.forEach(elem => {
          let div1 = document.createElement('div');
          div1.innerHTML = `<option value="${elem.id}">${elem.name}</option>`;
          newExpenseList.insertAdjacentElement("beforeend", div1.firstChild);
        })
    })
  }
}

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        (App.getModal('newIncome')).close();
        (App.getModal('newExpense')).close();
      } else {
        alert(response.error)
      }
    })
  }
}