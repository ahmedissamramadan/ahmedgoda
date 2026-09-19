import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    projectType: "",
    size: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast({
      title: "تم استلام طلبك بنجاح! ✨",
      description: "هنتواصل معاك خلال 24 ساعة لتحديد موعد المعاينة المجانية.",
    });
    setFormData({ name: "", phone: "", area: "", projectType: "", size: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldCls =
    "w-full h-[48px] px-4 rounded-full border border-border bg-white/80 backdrop-blur text-[14px] font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          className={fieldCls}
        />
        <input
          name="phone"
          type="tel"
          placeholder="رقم الهاتف (واتساب)"
          value={formData.phone}
          onChange={handleChange}
          required
          className={fieldCls}
          dir="ltr"
        />
      </div>

      <input
        name="area"
        placeholder="المنطقة / الحي — مثال: التجمع الخامس"
        value={formData.area}
        onChange={handleChange}
        required
        className={fieldCls}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="relative">
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className={`${fieldCls} appearance-none cursor-pointer`}
          >
            <option value="">نوع المشروع</option>
            <option value="apartment">شقة سكنية</option>
            <option value="villa">فيلا</option>
            <option value="office">مكتب / شركة</option>
            <option value="shop">محل تجاري</option>
            <option value="renovation">تجديد جزئي</option>
          </select>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
        </div>
        <input
          name="size"
          placeholder="المساحة (م²)"
          value={formData.size}
          onChange={handleChange}
          className={fieldCls}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[52px] btn-gold text-[15px] font-bold mt-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> جاري الإرسال...
          </>
        ) : (
          <>
            احجز معاينة مجانية
            <Send className="w-4 h-4 -scale-x-100" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground font-medium pt-1">
        بالضغط، أنت توافق على التواصل لتحديد موعد المعاينة — بدون أي التزام
      </p>
    </form>
  );
};

export default ContactForm;
