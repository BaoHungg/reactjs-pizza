import "./PizzaDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import formatCurrency from "../js/formatcurrency.js";
import { addToCart } from "../js/addToCart.js";

const PizzaDetail = () => {
  const [product, setDetail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // Thêm trạng thái cho số lượng
  const { pizzaId } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resDetail = await fetch(
          `http://localhost:3000/products/${pizzaId}`
        );
        const data = await resDetail.json();
        setDetail(data);

        // Fetch sản phẩm liên quan
        const resRelated = await fetch(
          `http://localhost:3000/products/category/${data.categoryId}`
        );
        const relatedData = await resRelated.json();
        setRelatedProducts(relatedData.filter((item) => item.id != pizzaId)); // Bỏ sản phẩm hiện tại
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetail();
  }, [pizzaId]);

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm để giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Giỏ hàng
  const dispatch = useDispatch();
  const AddToCart = (product) => {
    const productCart = { ...product, quantity };
    dispatch(addToCart(productCart));
    alert("Thêm thành công sản phẩm vào giỏ hàng")
  };

  return (
    <div className="container-detail">
      <div className="pizza-detail">
        <div className="pizza-image">
          <img src={`/img/${product.imgSrc}`} alt={product.name} />
        </div>
        <div className="pizza-info">
          <h1>{product.name}</h1>
          <div className="price">{formatCurrency(product.price)}</div>
          <p className="description">{product.description}</p>
          <div className="options">
            <div className="quantity">
              <h3>Số lượng</h3>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity} className="quantity-btn">
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={increaseQuantity} className="quantity-btn">
                  +
                </button>
              </div>
            </div>
            <div className="notes" >
              <h3>Ghi Chú</h3>
              <textarea placeholder="Nhập ghi chú của bạn tại đây" />
            </div>
          </div>
          <button className="add-to-cart"onClick={() => {AddToCart(product)}}>
            Thêm Vào Giỏ Hàng
          </button>
        </div>
      </div>
      <div className="relate">
        <h3>Sản phẩm liên quan</h3>
        <div className="related-products">
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product">
              <Link to={`/PizzaDetail/${product.id}`}>
                <img src={`/img/${product.imgSrc}`} alt={product.name} />
              </Link>
              <Link to={`/PizzaDetail/${product.id}`}>
                <h4>{product.name}</h4>
              </Link>
              <div className="price">{formatCurrency(product.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
