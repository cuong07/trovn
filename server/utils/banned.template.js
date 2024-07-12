import dayjs from "dayjs";

export const bannedTemplate = (to) => {
    const date = dayjs().format("HH:mm:ss DD:MM:YYYY");
    return `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Cảnh Báo: Việc Đăng Hình Ảnh Nhạy Cảm</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 94%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #d9534f;
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }
            .content {
                margin: 20px 0;
            }
            .content p {
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888888;
            }
            .button {
                background-color: #d9534f;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
            .button:hover {
                background-color: #c9302c;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Cảnh Báo: Việc Đăng Hình Ảnh Nhạy Cảm</h1>
            </div>
            <div class="content">
                <p>Kính gửi <strong>${to} ,</strong></p>
                <p>
                    Chúng tôi viết thư này để cảnh báo và nhắc nhở bạn về việc
                    đăng hình ảnh nhạy cảm trên nền tảng của chúng tôi.
                </p>
                <p>
                   Vào ngày ${date}, chúng tôi phát hiện rằng tài khoản của
                    bạn đã đăng tải một hình ảnh có nội dung nhạy cảm. Hành động
                    này vi phạm các điều khoản và quy định sử dụng dịch vụ của
                    chúng tôi. Nội dung nhạy cảm bao gồm, nhưng không giới hạn
                    ở, hình ảnh có nội dung người lớn, bạo lực, hoặc những nội
                    dung không phù hợp với chính sách của chúng tôi.
                </p>
                <p>
                    Chúng tôi yêu cầu bạn ngay lập tức gỡ bỏ hình ảnh vi phạm
                    này và kiểm tra lại tất cả các nội dung đã đăng tải để đảm
                    bảo không có vi phạm tương tự xảy ra trong tương lai. Nếu
                    bạn không tuân thủ yêu cầu này, tài khoản của bạn có thể bị
                    tạm ngừng hoặc vô hiệu hóa.
                </p>
                <p>
                    Chúng tôi luôn mong muốn tạo ra một môi trường trực tuyến an
                    toàn và thân thiện cho tất cả người dùng. Vì vậy, chúng tôi
                    rất mong nhận được sự hợp tác của bạn trong việc tuân thủ
                    các quy định và chính sách của chúng tôi.
                </p>
                <p>
                    Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, vui lòng
                    liên hệ với chúng tôi qua địa chỉ email trovn.sender@gmail.com hoặc
                    số điện thoại 0327427732.
                </p>
                <p>
                    Chúng tôi rất cảm ơn sự hợp tác của bạn và hy vọng bạn sẽ
                    tiếp tục sử dụng dịch vụ của chúng tôi một cách hợp lý và an
                    toàn.
                </p>
                <p>Trân trọng,</p>
                <p>
                    Cường <br />Quản trị viên<br />trovn.sender@gmail.com<br />TROVN
                </p>
            </div>
            <div class="footer">
                <p>© 2024 TROVN. All rights reserved.</p>
            </div>
        </div>
    </body>
</html>

    `;
};
