export const otpTemplate = (to, otp) => {
    return ` 
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email OTP Template</title>
      </head>
      <body style="font-family: sans-serif;">
        <h1 style="color: #FFA900; font-size: 32px' font-weight: 600;">PHÒNG TRỌ VN</h1>
        <hr style="height: 8px; background-color: #ccc;  border: none" />
        <p>Xin chào <strong>${to},</strong></p>
        <p>Xin vui lòng nhập mã này để xác minh địa chỉ email của bạn.</p>
        <p>Lưu ý, không được chia sẻ OTP với bất kì ai</p>
        <div style="display: flex; justify-content: center;">
          <div style="border-radius: 8px; padding: 8px 18px; font-size: 32px; font-weight: 600; color: #fff; background-color: #00466A">${otp}</div>
        </div>
        <p>Mạnh Cường,</p>
        <p>Nhóm <strong>TROVN</strong></p>
        <hr style="height: 8px; background-color: #ccc;  border: none""/>
      </body>
    </html>`;
};
