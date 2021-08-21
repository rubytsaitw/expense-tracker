module.exports = {
  isEqual: function (a, b) {
    return a === b
  },
  dateToString: function (date) {
    const day = ('0' + String(date.getDate())).slice(-2)
    const month = ('0' + String(date.getMonth() + 1)).slice(-2)
    const year = String(date.getFullYear())
    const dateArray = [year, month, day]
    return dateArray.join('-')
  },

  getDaysInMonth: function (year, month) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  },
  range: function (start, end) {
  return Array(end - start + 1).fill().map((_, i) => start + i)
  }
}