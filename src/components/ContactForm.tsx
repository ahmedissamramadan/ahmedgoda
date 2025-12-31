import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

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
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "تم استلام طلبك بنجاح!",
      description: "هنتواصل معاك خلال 24 ساعة لتحديد موعد المعاينة.",
    });
    
    setFormData({
      name: "",
      phone: "",
      area: "",
      projectType: "",
      size: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      
      <div>
        <Input
          name="phone"
          type="tel"
          placeholder="رقم الهاتف (واتساب)"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      
      <div>
        <Input
          name="area"
          placeholder="المنطقة / الحي"
          value={formData.area}
          onChange={handleChange}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      
      <div>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full h-10 px-3 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">نوع المشروع</option>
          <option value="apartment">شقة</option>
          <option value="villa">فيلا</option>
          <option value="office">مكتب</option>
          <option value="shop">محل تجاري</option>
        </select>
      </div>
      
      <div>
        <Input
          name="size"
          placeholder="المساحة التقريبية (م²)"
          value={formData.size}
          onChange={handleChange}
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full btn-gold text-base"
      >
        {isSubmitting ? (
          "جاري الإرسال..."
        ) : (
          <>
            <Send className="w-4 h-4 ml-2" />
            احجز معاينة مجانية
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
