import ContactUs from "@/models/ContactUs";
import connectDB from "@/utils/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    // اعتبارسنجی داده‌ها
    if (!name || !phone || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "لطفا همه فیلدها را پر کنید" }),
        { status: 400 }
      );
    }

    // ذخیره‌سازی در پایگاه داده
    const newContact = new ContactUs({ name, email, phone, subject, message });
    await newContact.save();

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
