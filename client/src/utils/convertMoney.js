const toVND = (sum) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(sum);
};

export default toVND;
