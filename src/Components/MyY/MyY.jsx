import { Link } from "react-router-dom";
const MyY = () => {
  return (
    <div className="pizza-menu">
      <div className="pizza-list">
        <h3>Mỳ Ý</h3>
        <div className="pizza-item">
          <Link to="">
            <img src="./img/myy1.png" />
          </Link>
          <h4>Mì Ý Pesto</h4>
          <p>
             Tôm, mực hoà quyện trên nền sốt Pesto xanh đậm vị.
          </p>
          <div className="price-and-button">
            <p className="price">
              Giá chỉ từ <span>149.000đ</span>
            </p>
            <button className="buy-now-btn">Mua ngay</button>
          </div>
        </div>
        <div className="pizza-item">
          <Link to="">
            <img src="./img/myy2.png" />
          </Link>
          <h4>Mỳ Ý Cay Hải Sản</h4>
          <p>
          Mỳ Ý rán với các loại hải sản tươi ngon cùng ớt và tỏi
          </p>
          <div className="price-and-button">
            <p className="price">
              Giá chỉ từ <span>139.000đ</span>
            </p>
            <button className="buy-now-btn">Mua ngay</button>
          </div>
        </div>
        <div className="pizza-item">
          <Link to="">
            <img src="./img/myy3.png" />
          </Link>
          <h4>Mỳ Ý Chay Sốt Marinara</h4>
          <p>
          Mỳ Ý áp chảo với sốt Marinara, nấm và cà chua đỏ
          </p>
          <div className="price-and-button">
            <p className="price">
              Giá chỉ từ <span>109.000đ</span>
            </p>
            <button className="buy-now-btn">Mua ngay</button>
          </div>
        </div>
        <div className="pizza-item">
          <Link to="">
            <img src="./img/myy4.png" />
          </Link>
          <h4>Mỳ Ý Tôm Sốt Kem Cà Chua</h4>
          <p>
          Sự tươi ngon của tôm kết hợp với sốt kem cà chua
          </p>
          <div className="price-and-button">
            <p className="price">
              Giá chỉ từ <span>139.000đ</span>
            </p>
            <button className="buy-now-btn">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyY;
