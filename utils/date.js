function fillzero (num) {
  return num / 10 < 1 ? '0' + num : num 
}
export default function datetransfer(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + fillzero(date.getHours()) + ':' + fillzero(date.getMinutes()) + ':' + fillzero(date.getSeconds())
}