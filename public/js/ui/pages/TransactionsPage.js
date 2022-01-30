//const { response } = require("express");
//const { options } = require("nodemon/lib/config");

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
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
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    
   this.render(this.lastOptions);

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    
    const removeAccountButton = document.querySelector('.remove-account');
    const transactions = Array.from(document.querySelectorAll('.transaction__remove'));

    removeAccountButton.addEventListener('click', () => {
      this.removeAccount();
    })
    
      transactions.forEach(elem => {
        elem.addEventListener('click', () => {
          this.removeTransaction(removeTransactionButton.getAttribute('data-id'));
      })
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove(options.Account.id, () => {
        App.updateWidgets();
      });
      this.clear();
  }
    } else {
      return;
    }
}

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
    Transaction.remove(id, () => {
      App.update();
    })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
   
    if (!options) {
      return;
    }
    else {
      this.lastOptions = options;
      Account.get(options.account_id, () => {
        if (response.success) {
          this.renderTitle(options.account_id);
        }
      })
    }

    Transaction.List(options, (err, response) => {
      this.renderTransactions(response);
      console.log(response)
    })
  }


  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    
    this.renderTransactions([]);
    this.renderTitle('название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
  
    return document.querySelector('.content-title').textContent = name;

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    
    const localDate = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };
        return localDate.toLocaleString("ru", options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    
    let html = `<div class="transaction transaction_${item.type} row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
                <div class="transaction__date">${this.formatDate(item.created_at)}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
              ${item.sum}<span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>`
        return html;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    
    const content = document.querySelector('.content');
    const contentArray = [];
    for (let i = 0; i < data.length; i++) {
      contentArray.push(this.getTransactionHTML(data[i]));
    }
    content.innerHTML = contentArray.join('');

  }
}