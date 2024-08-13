const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    // Trả về giá trị mặc định hoặc thông báo lỗi nếu không phải số hợp lệ
    return 'Invalid amount';
  }
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export default formatCurrency;
