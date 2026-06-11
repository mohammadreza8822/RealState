import { createContactMessage } from "@/lib/repository";

export async function POST(req) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !phone || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "لطفا همه فیلدها را پر کنید" }),
        { status: 400 }
      );
    }

    await createContactMessage({ name, email, phone, subject, message });

    return new Response(
      JSON.stringify({ message: "پیام شما با موفقیت ارسال شد" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در ثبت اطلاعات تماس:", error);
    return new Response(JSON.stringify({ error: "خطایی در سرور رخ داد" }), {
      status: 500,
    });
  }
}
