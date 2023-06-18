export const convertTimeStampToDate = (timestamp) => {
  const date = new Date(parseInt(timestamp * 1000));

  return date.getMonth() + 1 + "/" + date.getDay() + "/" + date.getFullYear();
};
