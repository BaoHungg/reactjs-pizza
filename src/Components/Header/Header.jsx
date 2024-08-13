import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../js/addToCart";
import formatCurrency from "../js/formatcurrency.js";
import "./Header.css";
export const Header = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const [categories, setCate] = useState([]);
  const [user, setUsers] = useState([null]);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUsers(JSON.parse(localUser));
    }

    const fetchCate = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCate(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCate();
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    setUsers(null);
    navigate("/");
  };

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    if (searchQuery) {
      try {
        const res = await fetch(
          `http://localhost:3000/products/search/${searchQuery}`
        );
        const data = await res.json();
        setSearchResults(data);
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  };

  const menuCate = categories.map((category) => (
    <li key={category.id}>
      <Link to={`/Pizza/${category.id}`}>
        <span>{category.name}</span>
      </Link>
    </li>
  ));

  return (
    <header>
      <div className="header-container">
        <div className="header-contai">
          <div className="top-header">
            <div className="top-left">
              <div className="logo">
                <Link to="/" className="logo">
                  <img src="/img/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="top-mid">
              <div className="form-group">
                <div className="form-radio">
                  <input
                    type="radio"
                    id="order-delivery"
                    name="order"
                    defaultChecked
                  />
                  <label htmlFor="order-delivery">
                    <i className="fas fa-truck"></i>
                    <span>Đặt giao hàng</span>
                  </label>
                </div>
                <div className="form-radio">
                  <input type="radio" id="put-to-get" name="order" />
                  <label htmlFor="put-to-get">
                    <i className="fas fa-store"></i>
                    <span>Đặt đến lấy</span>
                  </label>
                </div>
              </div>
              <div className="form-search">
                <input
                  type="search"
                  placeholder="Tìm..."
                  onChange={handleSearch}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </div>

            <div className="top-right">
              <div className="account">
                {user ? (
                  <div className="login-register">
                    <div className="user-info">
                      <span className="user-greeting">
                        <i className="fas fa-user"></i> Xin chào,{" "}
                        <span>{user.fullname}</span>
                      </span>
                      <div className="dropdown-menu">
                        <button>
                          <Link to="/UserInfo">
                            <i className="fas fa-info-circle"></i> Thông Tin Tài
                            Khoản
                          </Link>
                        </button>
                        <button>
                          <Link to="/OrderDetail">
                            <i className="fas fa-box"></i> Thông Tin Đơn Hàng
                          </Link>
                        </button>
                        <button onClick={Logout}>
                          <Link to="">
                            <i className="fas fa-sign-out-alt"></i> Đăng Xuất
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="icon">
                      <i
                        className="fa-solid fa-user"
                        style={{ color: "#000000" }}
                      ></i>
                    </div>
                    <div className="login-register">
                      <Link to="/Login">Đăng nhập</Link>
                      <span>/</span>
                      <Link to="/Register">Tạo tài khoản</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-header">
            <div className="bottom-left">
              <ul className="main-menu">
                <li>
                  <Link to="/">
                    <span>Trang Chủ</span>
                  </Link>
                </li>
                <li className="sub-list">
                  <Link to="/Pizza">
                    <span>Pizza</span>
                  </Link>
                  <div className="sublist-wrap">
                    <ul className="sublist">{menuCate}</ul>
                  </div>
                </li>
                <li>
                  <Link to="/MyY">
                    <span>Mỳ Ý</span>
                  </Link>
                </li>
                <li>
                  <a href="">
                    <span>Khai vị</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Salad</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Thức uống</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Chất Vĩbe</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="bottom-right">
              <div className="cart">
                <div className="icon">
                  <Link to="/cart">
                    <em>
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: "#63e6be" }}
                      ></i>
                      {cartItemsCount > 0 && cartItemsCount}
                    </em>
                  </Link>
                </div>
                <p>
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    Giỏ hàng
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="search-modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="modal-title">Kết quả tìm kiếm</h2>{" "}
            {/* Thêm tiêu đề */}
            {searchResults.length > 0 ? (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li key={product.id} className="search-result-item">
                    <Link
                      to={`/PizzaDetail/${product.id}`}
                      onClick={() => setIsModalOpen(false)}
                    >
                      <div className="product-info">
                        <Link to={`/PizzaDetail/${product.id}`}>
                          <img src={`/img/${product.imgSrc}`} />
                        </Link>
                        <div className="product-details">
                          <h4 className="product-name">{product.name}</h4>
                          <p className="product-price">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không tìm thấy sản phẩm nào.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
