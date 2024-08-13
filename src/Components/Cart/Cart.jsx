import { useSelector, useDispatch } from "react-redux";
import formatCurrency from "../js/formatcurrency.js";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../js/addToCart.js";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?");
    if (confirmDelete) {
      dispatch(removeFromCart(id));
    }
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <div className="cart-none">
          <h3>Không có sản phẩm trong giỏ hàng</h3>
          <img src="./img/pizzacart.png" alt="" />
          <p>
            Hiện Tại Bạn Chưa Có Sản Phẩm Nào Trong Giỏ Hàng. Hãy Dạo Một Vòng
            Thực Đơn Để Chọn Sản Phẩm Yêu Thích Nhé !
          </p>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Hình Ảnh</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`/img/${item.imgSrc}`}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </td>
                  <td>
                    <div className="quantity-controls">
                      <button className="btn-quantity" onClick={() => handleDecrease(item.id)}>-</button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button className="btn-quantity" onClick={() => handleIncrease(item.id)}>+</button>
                    </div>
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleRemove(item.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Tổng tiền : {formatCurrency(totalAmount)}</h3>
            <Link to={`/checkout`}>
              <button className="btn-checkout">Thanh Toán</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
