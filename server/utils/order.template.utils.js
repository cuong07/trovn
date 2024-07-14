import { formatCurrency } from "./format.currency.utils.js";

export const orderTemplate = (to, data) => {
    const content = data
        .map(({ name, value }) => {
            return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; gap: 20px;">
          <strong>${name}:</strong>
          <span>${decodeURIComponent(value)}</span>
        </div>
      `;
        })
        .join("");

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email order Template</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 20px;
          }
          h1 {
            color: #FFA900;
            font-size: 32px;
            font-weight: 600;
          }
          hr {
            height: 8px;
            background-color: #ccc;
            border: none;
          }
          #content {
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>PHÒNG TRỌ VN</h1>
        <hr>
        <p>Xin chào <strong>${to},</strong></p>
        <div id="content">
          ${content}
        </div>
        <p>Mạnh Cường,</p>
        <p>Nhóm <strong>TROVN</strong></p>
      </body>
    </html>
  `;
};
