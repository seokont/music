import nodemailer from "nodemailer";

function cleanText(value, maxLength = 1200) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return cleanText(value, 5000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSmtpConfig() {
  const host = cleanText(process.env.SMTP_HOST, 160);
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = cleanText(process.env.SMTP_USER, 240);
  const pass = cleanText(process.env.SMTP_PASS, 300).replace(/\s+/g, "");
  const rawFrom = cleanText(process.env.EMAIL_FROM || user, 240);
  const from = rawFrom.endsWith("@example.com") ? user : rawFrom;

  if (!host || !port || !user || !pass || !from) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from,
  };
}

function buildOrderText(order) {
  return [
    "Новая заявка на песню",
    "",
    `Имя: ${order.name}`,
    `Контакт: ${order.contact}`,
    `Повод: ${order.event}`,
    `Стиль/настроение: ${order.style || "-"}`,
    `Дедлайн: ${order.deadline || "-"}`,
    `Язык страницы: ${order.locale || "-"}`,
    "",
    "Описание идеи:",
    order.description,
  ].join("\n");
}

function buildOrderHtml(order) {
  const rows = [
    ["Имя", order.name],
    ["Контакт", order.contact],
    ["Повод", order.event],
    ["Стиль/настроение", order.style || "-"],
    ["Дедлайн", order.deadline || "-"],
    ["Язык страницы", order.locale || "-"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#151423;line-height:1.5">
      <h1 style="margin:0 0 16px;font-size:24px">Новая заявка на песню</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 10px;border:1px solid #ececf2;font-weight:700;width:180px">${escapeHtml(label)}</td>
                <td style="padding:8px 10px;border:1px solid #ececf2">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <h2 style="margin:20px 0 8px;font-size:18px">Описание идеи</h2>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(order.description)}</p>
    </div>
  `;
}

function getReplyTo(contact) {
  const value = cleanText(contact, 240);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}

export async function sendOrderEmail({ order, to }) {
  const smtp = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  });

  await transporter.sendMail({
    from: smtp.from,
    to,
    replyTo: getReplyTo(order.contact),
    subject: `Новая заявка на песню: ${order.event}`,
    text: buildOrderText(order),
    html: buildOrderHtml(order),
  });
}
