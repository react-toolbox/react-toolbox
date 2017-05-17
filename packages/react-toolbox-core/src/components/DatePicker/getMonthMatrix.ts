import {
  addDays,
  differenceInCalendarDays,
  lastDayOfMonth,
  lastDayOfWeek,
  startOfWeek,
  subDays,
} from 'date-fns';

export default function getMonthMatrix(time: number, sundayFirstDayOfWeek: boolean): Date[][] {
  const monthMatrix: Date[][] = [];
  const viewDate = new Date(time);

  const firstDay = sundayFirstDayOfWeek
    ? subDays(startOfWeek(viewDate), 1)
    : startOfWeek(viewDate);

  const lastDay = sundayFirstDayOfWeek
    ? subDays(lastDayOfWeek(lastDayOfMonth(viewDate)), 1)
    : lastDayOfWeek(lastDayOfMonth(viewDate));

  const nweeks = Math.ceil(differenceInCalendarDays(lastDay, firstDay) / 7);

  for (let i = 0; i < nweeks; i++) {
    monthMatrix[i] = [];

    for (let j = 0; j < 7; j++) {
      const monthDay = addDays(firstDay, j + i * 7);
      monthMatrix[i][j] = monthDay;
    }
  }

  return monthMatrix;
}
