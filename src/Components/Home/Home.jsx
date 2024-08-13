import "./Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import formatCurrency from "../js/formatcurrency.js";

const Home = () => {
  const [categories, setCate] = useState([]);
  const [products, setProd] = useState([]);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCate(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProd = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/hot");
        const data = await res.json();
        setProd(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCate();
    fetchProd();
  }, []);

  const menuCate = categories.map((category) => (
    <Link
      to={`/Pizza/${category.id}`}
      className="category-btn"
      key={category.id}
    >
      {category.name}
    </Link>
  ));

  const pizzaList = products.map((product) => (
    <div className="pizza-item" key={product.id}>
      <Link to={`/PizzaDetail/${product.id}`}>
        <img src={`./img/${product.imgSrc}`} alt={product.name} />
      </Link>
      <Link to={`/PizzaDetail/${product.id}`}>
        <h4>{product.name}</h4>
      </Link>
      <p>{product.description}</p>
      <div className="price-and-button">
        <p className="price">
          Giá chỉ từ <span>{formatCurrency(product.price)}</span>
        </p>
        <Link to={`/PizzaDetail/${product.id}`}>
          <button className="buy-now-btn">Mua ngay</button>
        </Link>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="banner-slider">
        <div>
          <img src="./img/banner1.jpeg" alt="Banner 1" />
        </div>
        <div>
          <img src="./img/banner2.jpeg" alt="Banner 2" />
        </div>
        <div>
          <img src="./img/banner3.jpeg" alt="Banner 3" />
        </div>
        <div>
          <img src="./img/banner4.jpeg" alt="Banner 4" />
        </div>
        <div>
          <img src="./img/banner5.jpeg" alt="Banner 5" />
        </div>
      </div>
      <div className="pizza-menu">
        <h2>Thực đơn</h2>
        <div className="menu-categories">
          <h3>Pizza</h3>
          <Link to="/" className="category-btn active">
            Tất Cả
          </Link>
          {menuCate}
        </div>
        <div className="pizza-list">{pizzaList}</div>
      </div>
    </div>
  );
};

export default Home;
