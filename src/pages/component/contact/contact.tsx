import React from 'react'
import { Button } from "bootstrap"
import "./contact.scss"
export default function contact() {
    const redirectToForm = () => {
        // Đường dẫn của biểu mẫu
        const formUrl = "https://docs.google.com/forms/d/1h7LgmVaxabT1FjW7b_KEzQf9aTuQ4wm4m3PvJWypWw4/viewform?pli=1&pli=1&edit_requested=true";
        // Mở biểu mẫu trong cửa sổ mới
        window.open(formUrl, '_blank');
        // Hoặc chuyển hướng trang hiện tại đến biểu mẫu
        // window.location.href = formUrl;
    };
    return (
        <div>
            <div className='box-contact'>
                <div className='box-contact-nav'>
                    <div className='box-contact-item'>
                        <h3>BK.Com</h3>
                    </div>
                    <div className='box-contact-item'>
                        <div>
                            {/* <p>icon langue</p> */}
                        </div>
                        <div className='box-contact-item'>
                            <p></p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='box-contact-content'>
                <div className='box-contact-content-left'>
                    <div className='content-up'>
                        <h3> Liệt kê nhà nghỉ của bạn trên BK.com</h3>
                    </div>
                    <div className='content-down'>
                        <h3>
                            Dù tổ chức tiệc là niềm đam mê phụ hay công việc toàn thời gian của bạn, hãy đăng ký nhà nghỉ cho thuê trên BK.com để tiếp cận khách du lịch trên toàn thế giới
                        </h3>
                    </div>

                </div>
                <div className='box-contact-content-right'>
                    <div className='box-title'>
                        <h3>Kiếm được nhiều tiền hơn với các lượt đặt phòng nhất quán</h3>
                        <ul>
                            <li><i className="fa-solid fa-check" style={{ color: '#14ee11' }}></i> 45% đối tác nhận được lượt đặt phòng đầu tiên trong vòng một tuần</li>
                            <li><i className="fa-solid fa-check" style={{ color: '#14ee11' }}></i> Hơn 1,1 tỷ khách thuê nhà nghỉ kể từ năm 2010</li>
                            <li><i className="fa-solid fa-check" style={{ color: '#14ee11' }}></i> Kiểm soát hoàn toàn tài sản và tài chính của bạn</li>
                            <li><i className="fa-solid fa-check" style={{ color: '#14ee11' }}></i> Đăng ký là miễn phí và mất 15 phút</li>
                        </ul>
                    </div>
                    <div className='box-title-description'>

                        <h3> <i className="fa-regular fa-circle-question"></i> Bạn muốn biết thêm chi tiết </h3>
                        <span>Để tuân thủ các yêu cầu và quy định pháp lý , chúng tôi mong muốn các đối tác-muốn hợp tác liên hệ với chúng tôi ,cần cung cấp 1 số thông tin nhất định</span>
                        <button className='btn btn-primary' onClick={() => {
                            redirectToForm()
                        }}>Biểu mẫu chi tiết</button>
                    </div>
                </div>



            </div>

        </div >
    )
}
