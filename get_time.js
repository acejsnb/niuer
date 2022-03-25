const dateFn = () => {
  const D = new Date();
  const year = D.getFullYear(),
      mouth = D.getMonth() + 1,
      day = D.getDate(),
      hour=D.getHours(),
      minutes=D.getMinutes(),
      seconds=D.getSeconds();
  return `${year}-${mouth < 10 ? `0${mouth}` : mouth}-${day < 10 ? `0${day}` : day} ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
module.exports = dateFn;
