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
  range: function (start, end) {
  return Array(end - start + 1).fill().map((_, i) => start + i)
  }
}