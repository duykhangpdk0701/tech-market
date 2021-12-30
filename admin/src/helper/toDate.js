const toDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getHours()}:${newDate.getMinutes()} - ${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export default toDate;
