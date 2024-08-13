import { useState, useEffect } from "react";
import axios from "axios";
import "./UserInfo.css";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState(""); // Thêm trạng thái cho mật khẩu mới

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:3000/users/update', {
        ...formData,
        password: newPassword || undefined, // Gửi mật khẩu mới chỉ khi có
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditable(false);
        setNewPassword(""); // Xóa mật khẩu mới sau khi lưu
        window.location.reload();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="user-info-container">
      <div className="user-info-left">
        <img src="/img/user-illustration.png" alt="User Illustration" className="user-illustration" />
      </div>
      <div className="user-info-right">
        {user ? (
          <div className="user-details">
            <div className="user-details-header">
              <h1>Thông Tin Tài Khoản</h1>
            </div>
            <form className="user-details-form">
              <label>
                <span><i className="fas fa-user"></i> Họ Tên:</span>
                <input type="text" name="fullname" value={formData.fullname || ""} onChange={handleChange} readOnly={!editable} />
              </label>
              <label>
                <span><i className="fas fa-envelope"></i> Email:</span>
                <input type="email" name="email" value={formData.email || ""} onChange={handleChange} readOnly={!editable} />
              </label>
              <label>
                <span><i className="fas fa-phone"></i> Số Điện Thoại:</span>
                <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} readOnly={!editable} />
              </label>
              <label>
                <span><i className="fas fa-home"></i> Địa Chỉ:</span>
                <input type="text" name="address" value={formData.address || ""} onChange={handleChange} readOnly={!editable} />
              </label>
              {editable && (
                <>
                  <label>
                    <span><i className="fas fa-key"></i> Mật khẩu mới:</span>
                    <input type="password" value={newPassword} onChange={handlePasswordChange} />
                  </label>
                </>
              )}
              {editable ? (
                <div className="form-actions">
                  <button type="button" className="save-btn" onClick={handleSave}>
                    <i className="fas fa-save"></i> Lưu
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setEditable(false)}>
                    <i className="fas fa-times"></i> Hủy
                  </button>
                </div>
              ) : (
                <button type="button" className="edit-btn" onClick={() => setEditable(true)}>
                  <i className="fas fa-edit"></i> Thay đổi thông tin tài khoản
                </button>
              )}
            </form>
          </div>
        ) : (
          <p className="no-info">Không có thông tin người dùng...</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
