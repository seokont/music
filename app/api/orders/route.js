import { NextResponse } from "next/server";
import { readSiteSettings } from "../../lib/site-settings";
import { sendOrderEmail } from "../../lib/order-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanText(value, maxLength = 1200) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function sanitizeOrder(body) {
  const order = {
    name: cleanText(body?.name, 160),
    contact: cleanText(body?.contact, 240),
    event: cleanText(body?.event, 160),
    style: cleanText(body?.style, 240),
    deadline: cleanText(body?.deadline, 160),
    description: cleanText(body?.description, 3000),
    locale: cleanText(body?.locale, 16),
  };

  if (!order.name || !order.contact || !order.event || !order.description) {
    throw new Error("INVALID_ORDER");
  }

  return order;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const order = sanitizeOrder(body);
    const settings = await readSiteSettings();

    await sendOrderEmail({ order, to: settings.orderEmail });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_ORDER") {
      return NextResponse.json({ error: "Заполните обязательные поля." }, { status: 400 });
    }

    console.error("Could not send order email", error);

    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 },
    );
  }
}
