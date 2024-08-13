import "./Pizza.css";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import formatCurrency from "../js/formatcurrency.js";

const Pizza = () => {
  const { categoryId } = useParams();
  const [categories, setCate] = useState([]);
  const [products, setProd] = useState([]);
  const [sortOrder, setSortOrder] = useState([]);

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
        let url = "http://localhost:3000/products";
        if (sortOrder === "price_desc") {
          url = "http://localhost:3000/products/sort/price_desc";
        } else if (sortOrder === "price_asc") {
          url = "http://localhost:3000/products/sort/price_asc";
        }
        const res = await fetch(url);
        const data = await res.json();
        setProd(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCate();
    fetchProd();
  }, [sortOrder]);

  var title = "";
  var dsspFilter = [];
  if (categoryId) {
    const findCate = categories.find(
      (item) => item.id === parseInt(categoryId)
    );
    if (findCate) {
      const categoryName = findCate.name;
      title = categoryName;
    } else {
      title = "Tất Cả Sản Phẩm";
    }
    dsspFilter = products.filter(
      (item) => item.categoryId == parseInt(categoryId)
    );
  } else {
    title = "Tất Cả Sản Phẩm";
    dsspFilter = products;
  }

  const menuCate = categories.map((item, index) => {
    return (
      <>
        <Link to={`/Pizza/${item.id}`} className="category-btn" key={index}>
          {item.name}
        </Link>
      </>
    );
  });

  const renderPizza = dsspFilter.map((item, index) => {
    return (
      <>
        <div className="pizza-item" key={index}>
          <Link to={`/PizzaDetail/${item.id}`}>
            <img src={`/img/${item.imgSrc}`} />
          </Link>
          <Link to={`/PizzaDetail/${item.id}`}>
            <h4>{item.name}</h4>
          </Link>
          <p>{item.description}</p>
          <div className="price-and-button">
            <p className="price">
              Giá chỉ từ <span>{formatCurrency(item.price)}</span>
            </p>
            <Link to={`/PizzaDetail/${item.id}`}>
              <button className="buy-now-btn">Mua ngay</button>
            </Link>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="pizza-menu">
      <h1>{title}</h1>
      <h2>Pizza</h2>
      <div className="menu-categories">{menuCate}</div>
      <div className="sort-buttons-container">
        <div className="sort-buttons">
          <button onClick={() => setSortOrder("price_desc")}>
            <i className="fas fa-arrow-down"></i> Sắp xếp giá giảm dần
          </button>
          <button onClick={() => setSortOrder("price_asc")}>
            <i className="fas fa-arrow-up"></i> Sắp xếp giá tăng dần
          </button>
        </div>
      </div>
      <div className="pizza-list">{renderPizza}</div>
    </div>
  );
};

export default Pizza;
