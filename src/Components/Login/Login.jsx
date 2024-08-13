import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
      const data = response.data;
      if (response.status === 200) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Đăng nhập thành công!");
          navigate("/");
          window.location.reload();
        } else {
          setError("Dữ liệu người dùng không có!");
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/img/logo.png" className="logoLogin" alt="Logo" />
        <img src="/img/backgr2.jpeg" className="illustration" alt="Illustration" />
      </div>
      <div className="login-right">
        <h2>Chào mừng</h2>
        <p>Đăng nhập vào tài khoản của bạn</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Số điện thoại*</label>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone..." value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Mật khẩu*</label>
            <input type="password" id="password" name="password" placeholder="Mật khẩu..." value={formData.password} onChange={handleChange} required />
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" /> Ghi nhớ đăng nhập
            </label>
            <Link to="" className="recover-password">Khôi phục mật khẩu</Link>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Đăng nhập</button>
          <div className="register-prompt">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
