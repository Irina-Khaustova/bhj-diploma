/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

//const { append } = require("express/lib/response");

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {

    if (element) {
      this.element = element;
    }
    else {
      throw new Error('ошибка');
    }

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {

    const createIncome = document.querySelector('.create-income-button');
    const createExpense = document.querySelector('.create-expense-button');

    createIncome.addEventListener('click', (e) => {
      (App.getModal('newIncome')).open();
      e.preventDefault();
    });

    createExpense.addEventListener('click', (e) => {
      (App.getModal('newExpense')).open();
      e.preventDefault();
    })
  }
}
