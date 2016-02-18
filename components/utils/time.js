export default {
  getDaysInMonth (d) {
    const resultDate = this.getFirstDayOfMonth(d);
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
  },

  getFirstDayOfMonth (d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },

  getFirstWeekDay (d) {
    return this.getFirstDayOfMonth(d).getDay();
  },

  getTimeMode (d) {
    return d.getHours() >= 12 ? 'pm' : 'am';
  },

  getFullMonth (d) {
    const month = d.getMonth();
    switch (month) {
      default: return 'Неизвестный';
      case 0: return 'Январь';
      case 1: return 'Февраль';
      case 2: return 'Март';
      case 3: return 'Апрель';
      case 4: return 'Май';
      case 5: return 'Июнь';
      case 6: return 'Июль';
      case 7: return 'Август';
      case 8: return 'Сентябрь';
      case 9: return 'Октябрь';
      case 10: return 'Ноябрь';
      case 11: return 'Декабрь';
    }
  },

  getShortMonth (d) {
    const month = d.getMonth();
    switch (month) {
      default: return 'Неизвестный';
      case 0: return 'Янв';
      case 1: return 'Фев';
      case 2: return 'Мар';
      case 3: return 'Апр';
      case 4: return 'Май';
      case 5: return 'Июн';
      case 6: return 'Июл';
      case 7: return 'Авг';
      case 8: return 'Сен';
      case 9: return 'Окт';
      case 10: return 'Ноя';
      case 11: return 'Дек';
    }
  },

  getFullDayOfWeek (day) {
    switch (day) {
      default: return 'Неизвестный';
      case 0: return 'Воскресенье';
      case 1: return 'Понедельник';
      case 2: return 'Вторник';
      case 3: return 'Среда';
      case 4: return 'Четверг';
      case 5: return 'Пятница';
      case 6: return 'Суббота';
    }
  },

  getShortDayOfWeek (day) {
    switch (day) {
      default: return 'Неизвестный';
      case 0: return 'Вс';
      case 1: return 'Пн';
      case 2: return 'Вт';
      case 3: return 'Ср';
      case 4: return 'Чт';
      case 5: return 'Пт';
      case 6: return 'Сб';
    }
  },

  clone (d) {
    return new Date(d.getTime());
  },

  cloneAsDate (d) {
    const clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },

  isDateObject (d) {
    return d instanceof Date;
  },

  addDays (d, days) {
    const newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },

  addMonths (d, months) {
    const newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },

  addYears (d, years) {
    const newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },

  setDay (d, day) {
    const newDate = this.clone(d);
    newDate.setDate(day);
    return newDate;
  },

  setMonth (d, month) {
    const newDate = this.clone(d);
    newDate.setMonth(month);
    return newDate;
  },

  setYear (d, year) {
    const newDate = this.clone(d);
    newDate.setFullYear(year);
    return newDate;
  },

  setHours (d, hours) {
    const newDate = this.clone(d);
    newDate.setHours(hours);
    return newDate;
  },

  setMinutes (d, minutes) {
    const newDate = this.clone(d);
    newDate.setMinutes(minutes);
    return newDate;
  },

  toggleTimeMode (d) {
    const newDate = this.clone(d);
    const hours = newDate.getHours();

    newDate.setHours(hours - (hours > 12 ? -12 : 12));
    return newDate;
  },

  formatTime (date, format) {
    let hours = date.getHours();
    let mins = date.getMinutes().toString();

    if (format === 'ampm') {
      const isAM = hours < 12;
      const additional = isAM ? ' am' : ' pm';

      hours = hours % 12;
      hours = (hours || 12).toString();
      if (mins.length < 2) mins = '0' + mins;

      return hours + (mins === '00' ? '' : ':' + mins) + additional;
    }

    hours = hours.toString();
    if (hours.length < 2) hours = '0' + hours;
    if (mins.length < 2) mins = '0' + mins;
    return hours + ':' + mins;
  },

  dateOutOfRange (date, minDate, maxDate) {
    return ((minDate && !(date >= minDate)) || (maxDate && !(date <= maxDate)));
  }
};
