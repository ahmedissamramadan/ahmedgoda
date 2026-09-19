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
      title: "Request received! ✨",
      description: "We'll contact you within 24 hours to schedule your free site visit.",
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
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          className={fieldCls}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (WhatsApp)"
          value={formData.phone}
          onChange={handleChange}
          required
          className={fieldCls}
        />
      </div>

      <input
        name="area"
        placeholder="Area / District — e.g. New Cairo"
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
            <option value="">Project type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
            <option value="shop">Retail / Shop</option>
            <option value="renovation">Partial renovation</option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
        </div>
        <input
          name="size"
          placeholder="Approx. size (m²)"
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
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Book free site visit
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground font-medium pt-1">
        By submitting, you agree to be contacted to schedule the visit — no commitment
      </p>
    </form>
  );
};

export default ContactForm;
