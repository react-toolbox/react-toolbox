module.exports =
  daysInMonth: (date) ->
    (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()

  firstWeekDay: (date) ->
    (new Date(date.getFullYear(), date.getMonth(), 1)).getDay()

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

  monthInShortWords: (date) ->
    switch (date.getMonth())
      when 0  then 'Jan'
      when 1  then 'Feb'
      when 2  then 'Mar'
      when 3  then 'Apr'
      when 4  then 'May'
      when 5  then 'Jun'
      when 6  then 'Jul'
      when 7  then 'Aug'
      when 8  then 'Sep'
      when 9  then 'Oct'
      when 10 then 'Nov'
      when 11 then 'Dec'

  weekDayInWords: (day) ->
    switch (day)
      when 0 then 'Sunday'
      when 1 then 'Monday'
      when 2 then 'Tuesday'
      when 3 then 'Wednesday'
      when 4 then 'Thursday'
      when 5 then 'Friday'
      when 6 then 'Saturday'

  weekDayInShortWords: (day) ->
    switch (day)
      when 0 then 'Sun'
      when 1 then 'Mon'
      when 2 then 'Tue'
      when 3 then 'Wed'
      when 4 then 'Thu'
      when 5 then 'Fri'
      when 6 then 'Sat'

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

  setDay: (date, day) ->
    newDate = @cloneDatetime(date)
    newDate.setDate(day)
    newDate

  setYear: (date, year) ->
    newDate = @cloneDatetime(date)
    newDate.setFullYear(year)
    newDate

  cloneDatetime: (date) ->
    new Date(date.getTime())

  timeMode: (datetime) ->
    if datetime.getHours() >= 12 then 'pm' else 'am'

  toggleTimeMode: (datetime) ->
    newDatetime = @cloneDatetime(datetime)
    hours = datetime.getHours()
    if hours > 12 then newDatetime.setHours(hours - 12) else newDatetime.setHours(hours + 12)
    newDatetime

  setHours: (datetime, hours) ->
    newDatetime = @cloneDatetime(datetime)
    newDatetime.setHours(hours)
    newDatetime

  setMinutes: (datetime, minutes) ->
    newDatetime = @cloneDatetime(datetime)
    newDatetime.setMinutes(minutes)
    newDatetime
