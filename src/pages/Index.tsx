import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle,
  Shield,
  Award,
  Wrench,
  Zap,
  Palette,
  Layers,
  UtensilsCrossed,
  Eye,
  FileText,
  Hammer,
  PackageCheck,
  CreditCard,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import TrustBadge from "@/components/TrustBadge";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import ProcessStep from "@/components/ProcessStep";
import ContactForm from "@/components/ContactForm";

// Images
import heroBg from "@/assets/hero-bg.jpg";
import beforeLivingRoom from "@/assets/before-living-room.jpg";
import afterLivingRoom from "@/assets/after-living-room.jpg";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";

const Index = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("before-after")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-navy rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">تشطيبات محترفة</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/201234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب</span>
            </a>
            <Button onClick={scrollToContact} className="btn-gold text-sm px-4 py-2">
              اطلب معاينة
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="تشطيب شقة فاخرة في القاهرة"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/80 to-primary/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
              تشطيبات محترفة
              <br />
              <span className="text-gradient-gold">بتسليم على الوقت</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              بنحوّل الفراغات لمساحات جاهزة للسكن أو الشغل، بجودة مضمونة وعقود واضحة.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <TrustBadge icon={Award} text="أكثر من 150+ مشروع ناجح" variant="gold" />
              <TrustBadge icon={CheckCircle} text="التزام زمني وعقود موثقة" variant="gold" />
              <TrustBadge icon={Shield} text="ضمان حتى 12 شهر" variant="gold" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToContact} className="btn-gold text-lg px-8 py-6">
                اطلب معاينة مجانية
              </Button>
              <Button 
                onClick={scrollToProjects} 
                variant="outline" 
                className="btn-outline-gold text-lg px-8 py-6"
              >
                شوف أعمالنا قبل/بعد
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="bg-card py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="w-5 h-5 text-accent" />
              <span className="text-foreground">زيارة ميدانية مجانية — خلال 48 ساعة</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-foreground">ضمان تشطيبات حتى 12 شهر</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-5 h-5 text-accent" />
              <span className="text-foreground">دفع مرن — مقدم + دفعات حسب الإنجاز</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">من نحن</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              مهندسون متخصصون في تشطيبات الشقق والفيلات والمحال التجارية بأعلى معايير الجودة والسلامة. 
              خبرة تتجاوز 15 سنة في السوق المصري، نفذنا أكثر من 150 مشروع في القاهرة الجديدة، التجمع، 
              الشيخ زايد، والمعادي. نلتزم بالجداول الزمنية ونقدم عقود واضحة وشفافة مع ضمان مكتوب على جميع الأعمال.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">خدماتنا</h2>
            <p className="text-muted-foreground">حلول تشطيب متكاملة لكل احتياجاتك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Wrench}
              title="تشطيبات كاملة على المفتاح"
              description="من التصميم للتسليم — تنفيذ شامل يشمل كل التخصصات بإدارة موحدة وجودة مضمونة."
            />
            <ServiceCard
              icon={Zap}
              title="سباكة وكهرباء طبقًا للكود"
              description="تمديدات آمنة بمفاتيح MCB مطابقة IEC ومواسير PPR عالية الجودة."
            />
            <ServiceCard
              icon={Palette}
              title="جبس ودهانات ديكورية"
              description="أسقف معلقة، كرانيش، ودهانات فينيل قابلة للغسل بتشطيب مطفي أو لامع."
            />
            <ServiceCard
              icon={Layers}
              title="أرضيات متنوعة"
              description="بورسلين، باركيه، خشب هندسي — تركيب احترافي مع ضبط ميول ومعالجة رطوبة."
            />
            <ServiceCard
              icon={UtensilsCrossed}
              title="مطابخ ووحدات تخزين"
              description="مطابخ ألوميتال أو خشب MDF بتصميم مخصص يناسب مساحتك واحتياجاتك."
            />
            <ServiceCard
              icon={Hammer}
              title="أعمال النجارة والحدادة"
              description="أبواب، شبابيك ألوميوم، وحواجز حديد بتشطيب عالي الجودة ومتانة."
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">أبرز أعمالنا</h2>
            <p className="text-muted-foreground">مشاريع ناجحة تتكلم عن نفسها</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              image={afterLivingRoom}
              title="شقة فاخرة — التجمع الخامس"
              type="شقة"
              location="التجمع الخامس، القاهرة"
              area="145 م²"
              duration="45 يوم"
              scope="تنفيذ كامل على المفتاح يشمل تمديدات، جبس، أرضيات بورسلين، دهانات ديكورية."
              result="توفير 12% في التكلفة، تسليم قبل الموعد بأسبوع"
            />
            <ProjectCard
              image={afterKitchen}
              title="فيلا مودرن — الشيخ زايد"
              type="فيلا"
              location="الشيخ زايد، الجيزة"
              area="320 م²"
              duration="90 يوم"
              scope="تشطيب سوبر لوكس مع مطبخ مخصص، إضاءة ذكية، وحمامات فندقية."
              result="رضا العميل التام، توصية لـ 3 مشاريع جديدة"
            />
            <ProjectCard
              image={afterLivingRoom}
              title="مكتب إداري — المعادي"
              type="مكتب"
              location="المعادي، القاهرة"
              area="85 م²"
              duration="30 يوم"
              scope="تجهيز مكتب إداري كامل مع أرضيات فينيل وتكييف وإضاءة LED."
              result="بدء العمل في الموعد المحدد مع العميل"
            />
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section id="before-after" className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              قبل وبعد
            </h2>
            <p className="text-primary-foreground/80">اسحب لترى الفرق — تحويل حقيقي من خام لجاهز</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Living Room Comparison */}
            <div className="bg-card rounded-xl p-4 md:p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                غرفة المعيشة — من خام إلى جاهز
              </h3>
              <ImageComparisonSlider
                beforeImage={beforeLivingRoom}
                afterImage={afterLivingRoom}
                beforeAlt="غرفة معيشة قبل التشطيب - جدران خرسانية وأسلاك مكشوفة"
                afterAlt="غرفة معيشة بعد التشطيب - تصميم فاخر مع أرضيات رخام وإضاءة LED"
              />
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  تصحيح ميول الأرضية + عزل رطوبة
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  تمديدات كهرباء جديدة مع مسارات مخفية
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  دهانات صديقة للبيئة بتشطيب مطفي
                </p>
              </div>
            </div>

            {/* Kitchen Comparison */}
            <div className="bg-card rounded-xl p-4 md:p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                المطبخ — تحويل كامل
              </h3>
              <ImageComparisonSlider
                beforeImage={beforeKitchen}
                afterImage={afterKitchen}
                beforeAlt="مطبخ قبل التشطيب - طوب مكشوف ومواسير ظاهرة"
                afterAlt="مطبخ بعد التشطيب - مطبخ عصري مع رخام ووحدات تخزين"
              />
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  تمديدات سباكة PPR + غاز آمنة
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  رخام كوارتز مقاوم للحرارة والبقع
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  إضاءة LED مخفية تحت الوحدات
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">ماذا قال عملاؤنا</h2>
            <p className="text-muted-foreground">تقييمات حقيقية من مشاريع منفذة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="من أفضل الخبرات اللي مرت عليّا! التزام تام بالموعد والميزانية واضحة من البداية. نظافة الموقع أثناء التنفيذ كانت ممتازة."
              name="أحمد محمود"
              location="التجمع الخامس"
              projectType="تشطيب شقة"
            />
            <TestimonialCard
              quote="المهندس فاهم شغله وبيشرح كل خطوة قبل التنفيذ. الجودة عالية جداً والضمان طمّنا إننا اخترنا صح."
              name="سارة عبدالله"
              location="الشيخ زايد"
              projectType="تشطيب فيلا"
            />
            <TestimonialCard
              quote="سلموا المحل قبل الموعد بـ 5 أيام! خدمة ممتازة ومتابعة مستمرة. أنصح أي حد يدور على تشطيب محترف."
              name="محمد فاروق"
              location="مدينة نصر"
              projectType="تجهيز محل"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">خطوات العمل</h2>
            <p className="text-muted-foreground">عملية واضحة ومنظمة من البداية للنهاية</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <ProcessStep
                number={1}
                icon={Eye}
                title="معاينة مجانية + تقدير مبدئي"
                description="زيارة الموقع خلال 24-48 ساعة وتقديم تقدير مبدئي شامل للتكلفة والمدة."
              />
              <div className="border-r-2 border-dashed border-accent/30 h-8 mr-7" />
              <ProcessStep
                number={2}
                icon={FileText}
                title="تصميم + تعاقد شفاف"
                description="اختيار المواد والتصميمات، توقيع عقد واضح يحدد كل التفاصيل والضمانات."
              />
              <div className="border-r-2 border-dashed border-accent/30 h-8 mr-7" />
              <ProcessStep
                number={3}
                icon={Hammer}
                title="تنفيذ بجدول زمني"
                description="بدء العمل مع متابعة أسبوعية، تقارير صور وفيديو، وتواصل مستمر معاك."
              />
              <div className="border-r-2 border-dashed border-accent/30 h-8 mr-7" />
              <ProcessStep
                number={4}
                icon={PackageCheck}
                title="تسليم نهائي + ضمان مكتوب"
                description="تسليم المشروع جاهز للسكن أو الشغل مع ضمان مكتوب على جميع الأعمال."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Contact Section */}
      <section id="contact" className="py-20 gradient-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                جاهز نبدأ؟
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                احجز معاينة مجانية الآن وخلينا نساعدك تحقق تشطيب أحلامك. المعاينة مجانية بدون أي التزام.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">اتصل بنا</p>
                    <a href="tel:+201234567890" className="font-semibold hover:text-accent transition-colors">
                      0123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">واتساب</p>
                    <a 
                      href="https://wa.me/201234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      0123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">البريد الإلكتروني</p>
                    <a href="mailto:info@finishing-pro.com" className="font-semibold hover:text-accent transition-colors">
                      info@finishing-pro.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">ساعات العمل</p>
                    <p className="font-semibold">السبت - الخميس: 9 صباحاً - 6 مساءً</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-primary-foreground">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">نغطي مناطق</p>
                  <p className="font-semibold">القاهرة الجديدة، التجمع، الشيخ زايد، المعادي، مدينة نصر</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 md:p-8 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-6">احجز معاينة مجانية</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-navy rounded flex items-center justify-center">
                <Wrench className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">تشطيبات محترفة</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 تشطيبات محترفة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
