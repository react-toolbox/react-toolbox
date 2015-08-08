module.exports =
  daysInMonth: (date) ->
    (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()

  firstWeekDay: (date) ->
    (new Date(date.getFullYear(), date.getMonth() + 1, 1)).getDay()

  monthInWords: (date) ->
    switch (date.getMonth())
      when 0  then 'January'
      when 1  then 'February'
      when 2  then 'March'
      when 3  then 'April'
      when 4  then 'May'
      when 5  then 'June'
      when 6  then 'July'
      when 7  then 'August'
      when 8  then 'September'
      when 9  then 'October'
      when 10 then 'November'
      when 11 then 'December'

  weekDayInWords: (day) ->
    switch (day)
      when 0 then 'Sunday'
      when 1 then 'Monday'
      when 2 then 'Tuesday'
      when 3 then 'Wednesday'
      when 4 then 'Thursday'
      when 5 then 'Friday'
      when 6 then 'Saturday'

  addDays: (date, days) ->
    newDate = @cloneDatetime(date)
    newDate.setDate(date.getDate() + days)
    newDate

  addMonths: (date, months) ->
    newDate = @cloneDatetime(date)
    newDate.setMonth(date.getMonth() + months)
    newDate

  addYears: (date, years) ->
    newDate = @cloneDatetime(date)
    newDate.setFullYear(date.getFullYear() + years)
    newDate

  cloneDatetime: (date) ->
    new Date(date.getTime())
