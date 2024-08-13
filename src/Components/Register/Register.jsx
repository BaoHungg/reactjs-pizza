import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.passwordConfirm) {
      setError("Mật khẩu không khớp.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      });
      if (response.status === 201) {
        alert("Đăng ký thành công!");
        setFormData({ fullname: "", phone: "", email: "", password: "", passwordConfirm: "" });
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Lỗi khi đăng ký người dùng. Vui lòng thử lại.");
      } else {
        setError("Lỗi khi đăng ký người dùng. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src="/img/logo.png" className="logoRegister" alt="Logo" />
        <img src="/img/backgr4.jpg" className="illustration-regis" alt="Illustration" />
      </div>
      <div className="register-right">
        <h2>Xin chào</h2>
        <p>Vui lòng điền thông tin để đăng ký</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="fullname">Họ và tên*</label>
            <input type="text" id="fullname" name="fullname" placeholder="Họ và tên..." value={formData.fullname} onChange={handleChange} required />
          </div>
          <div className="register-form-group">
            <label htmlFor="phone">Số điện thoại*</label>
            <input type="tel" id="phone" name="phone" placeholder="Số điện thoại..." value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" placeholder="Email..." value={formData.email} onChange={handleChange} required />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Mật khẩu*</label>
            <input type="password" id="password" name="password" placeholder="Mật khẩu..." value={formData.password} onChange={handleChange} required />
          </div>
          <div className="register-form-group">
            <label htmlFor="passwordConfirm">Nhập lại mật khẩu*</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Nhập lại mật khẩu..." value={formData.passwordConfirm} onChange={handleChange} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-btn">Đăng ký</button>
          <div className="login-prompt">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
