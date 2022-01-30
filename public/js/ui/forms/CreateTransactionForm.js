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
    const newIncomeList = document.querySelector('#expense-accounts-list');
    const newExpenseList = document.querySelector('#income-accounts-list');
    
    if (this.element === newIncome) {
    Account.list(User.current(), (err, response) => {
      //newIncomeList.innerHTML = '';
      let newList = [];
      for (let i = 0; i < response.length; i++) {
        newList.push(`<option value="${response[i].id}">${response[i].name}</option>`);
      }
      newIncomeList.insertAdjacentHTML('beforeend', newList.join(''));
    })
    }
    
    if (this.element === newExpense) {
      Account.list(User.current(), (err, response) => {
        //newExpense.innerHTML = '';
        let newList = [];
        for (let i = 0; i < response.length; i++) {
          newList.push(`<option value="${response[i].id}">${response[i].name}</option>`);
        }
        newExpenseList.insertAdjacentHTML('beforeend', newList.join(''));
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
        (App.getModal('newIncome')).close;
        (App.getModal('newExpense')).close;
      }
    })
  }
}