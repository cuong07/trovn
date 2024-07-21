export const warningTemplate = (to, content, time) => {
    return ` 
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cảnh báo Vi phạm</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #ff4d4d;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    font-size: 24px;
                    font-weight: bold;
                }
                .content {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    padding: 20px;
                    margin-top: 20px;
                }
                .warning {
                    color: #ff4d4d;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                Cảnh báo Vi phạm
            </div>
            <div class="content">
                <p>Kính gửi ${to},</p>
                
                <p>Chúng tôi viết thư này để thông báo rằng chúng tôi đã phát hiện một vi phạm đối với chính sách của chúng tôi từ tài khoản của bạn.</p>
                
                <p class="warning">Chi tiết vi phạm:</p>
                <ul>
                    <li>Loại vi phạm: ${content}</li>
                    <li>Thời gian xảy ra: ${time}</li>
                </ul>
                
                <p>Chúng tôi yêu cầu bạn xem xét lại các hành động của mình và đảm bảo tuân thủ các điều khoản sử dụng của chúng tôi. Việc tiếp tục vi phạm có thể dẫn đến việc tạm ngưng hoặc chấm dứt tài khoản của bạn.</p>
                
                <p>Nếu bạn tin rằng đây là một sự nhầm lẫn hoặc cần thêm thông tin, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
                
                <p>Trân trọng,<br>Mạnh Cường, <br>TROVN</p>
            </div>
            <div class="footer">
                Đây là email tự động. Vui lòng không trả lời email này.
            </div>
        </body>
        </html>
`;
};
