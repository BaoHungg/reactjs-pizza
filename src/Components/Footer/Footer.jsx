import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section footer-logo-section">
                    <img src="./img/logo-footer.png" alt="The Pizza Company Logo" className="footer-logo" />
                    <div className="footer-phone">
                        <span>1900 6066</span>
                        <p>Giao hàng nhanh</p>
                    </div>
                </div>
                <div className="footer-section footer-links-section">
                    <h3>Giới Thiệu</h3>
                    <ul>
                        <li>Hệ thống nhà hàng</li>
                        <li>Câu chuyện thương hiệu</li>
                        <li>Ưu đãi thành viên</li>
                        <li>Tin tức & sự kiện</li>
                        <li>Tuyển dụng</li>
                    </ul>
                </div>
                <div className="footer-section footer-links-section">
                    <h3>Liên Hệ</h3>
                    <ul>
                        <li>Liên hệ</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản và Điều kiện</li>
                    </ul>
                </div>
                <div className="footer-section footer-address-section">
                    <h3>Văn Phòng Đại Diện</h3>
                    <p>Công ty Cổ phần Pizza Ngon</p>
                    <p>77 Trần Nhân Tôn, Phường 9, Quận 5, Thành phố Hồ Chí Minh</p>
                    <p>SDT: +84 (028) 7308 3377</p>
                    <p>MST: 0104115527</p>
                    <p>Cấp lần đầu ngày 17 tháng 08 năm 2009 và có thể được sửa đổi vào từng thời điểm</p>
                </div>
                <div className="footer-section footer-support-section">
                    <h3>Tổng Đài Hỗ Trợ</h3>
                    <p>Đặt hàng: 1900 6066 (9:30 – 21:30)</p>
                    <p>Tổng đài CSKH: 1900 633 606 (9:30 - 21:30)</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Bản quyền © 2024 The Pizza Company. Đã đăng ký bản quyền.</p>
            </div>
        </footer>
    );
}

export default Footer;
