import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import formatCurrency from "../js/formatcurrency";
import "./Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
  });
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const finalAmount = totalAmount - discountAmount; 

  const handleApplyVoucher = () => {
    if (voucherCode === "HUNGDEPTRAI") {
      const discount = totalAmount * 0.20;
      setDiscountAmount(discount);
      alert("Áp dụng voucher thành công bạn được giảm " + formatCurrency(discount));
    } else {
      alert("Mã voucher không hợp lệ.");
    }
  };

  const handleCompleteOrder = async () => {
    try {
        const orderData = {
            userId: userInfo.userId,
            products: cartItems.map(item => ({
                productName: item.name,
                productPrice: item.price,
                productId: item.id,
                quantity: item.quantity
            })),
            totalPrice: finalAmount
        };

        console.log("Order Data:", orderData); 

        const response = await axios.post('http://localhost:3000/orders/create-order', orderData,);
        if (response.status === 201) {
            alert("Thanh toán thành công");
            window.location.href = "/";
        } else {
            alert("Có lỗi xảy ra: " + (response.data.message || "Không có thông tin chi tiết."));
        }
    } catch (error) {
        console.error("Lỗi khi hoàn thành đơn hàng:", error.response ? error.response.data : error.message);
        alert("Có lỗi xảy ra trong quá trình thanh toán: " + (error.response ? error.response.data.message : error.message));
  }
  
};

  

  return (
    <div className="checkout-container">
      <h2>Thông Tin Nhận Hàng</h2>
      <div className="user-info">
        <p>Tên: {userInfo.fullname}</p>
        <p>Địa chỉ: {userInfo.address}</p>
        <p>Số điện thoại: {userInfo.phoneNumber}</p>
      </div>
      <h2>Thông Tin Đơn Hàng</h2>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Hình Ảnh</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <img
                  src={`/img/${item.imgSrc}`}
                  alt={item.name}
                  className="checkout-item-img"
                />
              </td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment-voucher-container">
        <div className="payment-methods">
          <h2>Chọn Phương Thức Thanh Toán</h2>
          <label className="payment-option">
            <input type="radio" name="payment-method" value="cash" defaultChecked />
            <span className="payment-label">
              <i className="fa fa-cash-register"></i> Tiền Mặt
            </span>
          </label>
          <label className="payment-option">
            <input type="radio" name="payment-method" value="momo" />
            <span className="payment-label">
              <i className="fa fa-mobile-alt"></i> Momo
            </span>
          </label>
        </div>
        <div className="voucher-section">
          <h3>Sử Dụng Voucher</h3>
          <input type="text"placeholder="Nhập mã voucher"className="voucher-input"value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}/>
          <button className="btn-apply-voucher" onClick={handleApplyVoucher}>
            Áp Dụng
          </button>
        </div>
      </div>
      <div className="checkout-summary">
        <h3>Tổng tiền: {formatCurrency(finalAmount)}</h3> 
        <button className="btn-complete-order" onClick={handleCompleteOrder}>
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default Checkout;
