'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var time = {
  getDaysInMonth: function getDaysInMonth(d) {
    var resultDate = this.getFirstDayOfMonth(d);
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
  },
  getFirstDayOfMonth: function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },
  getFirstWeekDay: function getFirstWeekDay(d) {
    return this.getFirstDayOfMonth(d).getDay();
  },
  getTimeMode: function getTimeMode(d) {
    return d.getHours() >= 12 ? 'pm' : 'am';
  },
  getFullMonth: function getFullMonth(d) {
    var month = d.getMonth();
    switch (month) {
      default:
        return 'Unknown';
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  },
  getShortMonth: function getShortMonth(d) {
    var month = d.getMonth();
    switch (month) {
      default:
        return 'Unknown';
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  },
  getFullDayOfWeek: function getFullDayOfWeek(day) {
    switch (day) {
      default:
        return 'Unknown';
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  },
  getShortDayOfWeek: function getShortDayOfWeek(day) {
    switch (day) {
      default:
        return 'Unknown';
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  },
  clone: function clone(d) {
    return new Date(d.getTime());
  },
  cloneAsDate: function cloneAsDate(d) {
    var clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },
  isDateObject: function isDateObject(d) {
    return d instanceof Date;
  },
  addDays: function addDays(d, days) {
    var newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },
  addMonths: function addMonths(d, months) {
    var newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },
  addYears: function addYears(d, years) {
    var newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },
  setDay: function setDay(d, day) {
    var newDate = this.clone(d);
    newDate.setDate(day);
    return newDate;
  },
  setMonth: function setMonth(d, month) {
    var newDate = this.clone(d);
    newDate.setMonth(month);
    return newDate;
  },
  setYear: function setYear(d, year) {
    var newDate = this.clone(d);
    newDate.setFullYear(year);
    return newDate;
  },
  setHours: function setHours(d, hours) {
    var newDate = this.clone(d);
    newDate.setHours(hours);
    return newDate;
  },
  setMinutes: function setMinutes(d, minutes) {
    var newDate = this.clone(d);
    newDate.setMinutes(minutes);
    return newDate;
  },
  toggleTimeMode: function toggleTimeMode(d) {
    var newDate = this.clone(d);
    var hours = newDate.getHours();

    newDate.setHours(hours - (hours > 12 ? -12 : 12));
    return newDate;
  },
  formatTime: function formatTime(date, format) {
    var hours = date.getHours();
    var mins = date.getMinutes().toString();

    if (format === 'ampm') {
      var isAM = hours < 12;
      var additional = isAM ? ' am' : ' pm';

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
  dateOutOfRange: function dateOutOfRange(date, minDate, maxDate) {
    return minDate && !(date >= minDate) || maxDate && !(date <= maxDate);
  },
  formatDate: function formatDate(date) {
    return date.getDate() + ' ' + time.getFullMonth(date) + ' ' + date.getFullYear();
  }
};

exports.default = time;