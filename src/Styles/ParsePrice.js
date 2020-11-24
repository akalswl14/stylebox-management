export default (inputPrice) => {
  return inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
