import { useState, useEffect } from "react";
import axios from "axios";
import formatCurrency from "../js/formatcurrency.js";
import "./OderDetail.css";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userData = localStorage.getItem("user");

        if (!userData) {
          throw new Error(
            "Không tìm thấy dữ liệu người dùng trong localStorage"
          );
        }

        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.userId;

        if (!userId) {
          throw new Error("Không tìm thấy userId trong dữ liệu người dùng");
        }

        const response = await axios.get(
          `http://localhost:3000/orders/order-detail/${userId}`
        );
        setOrders(response.data.orders);
      } catch (err) {
        err.message;
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="order-detail">
      <div className="title">
        <h1>Thông Tin Đơn Hàng</h1>
      </div>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="order-container">
            <div className="order-title">
              <div>
                <h2>
                    
                  <strong>Đơn hàng {index + 1}</strong>
                </h2>
              </div>
              <div>
                <p>
                  <strong> <i className="fas fa-calendar-day"></i> Ngày đặt hàng:</strong>
                  {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <strong> <i className="fas fa-tag"></i> Mã đơn hàng:</strong>
                <em>{order._id}</em> |{" "}
                <strong>{order.status}</strong>
              </div>
            </div>

            <table className="order-products">
              <thead>
                <tr>
                  <th>Tên gọi</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, i) => (
                  <tr key={i}>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{formatCurrency(product.productPrice)}</td>
                    <td>
                      {formatCurrency(product.productPrice * product.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="order-summary">
              <div>
                <h5>
                  <Link to="">
                    <i className="fas fa-star"></i> Đánh giá
                  </Link>
                </h5>
              </div>
              <div>
                <h5>
                  <Link to="">
                    <i className="fas fa-envelope"></i> Liên hệ người bán
                  </Link>
                </h5>
              </div>
              <div>
                <p>
                  <strong>Tổng tiền :</strong>{" "}
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-orders">
          <i className="fas fa-box-open"></i>
          <p>Hiện tại bạn không có đơn hàng nào.</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
