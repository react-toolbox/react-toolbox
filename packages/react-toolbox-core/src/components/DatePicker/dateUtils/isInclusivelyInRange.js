export default function isInclusivelyInRange(date, from, to) {
  return (from.getTime() <= date.getTime())
    && (to.getTime() >= date.getTime());
}
