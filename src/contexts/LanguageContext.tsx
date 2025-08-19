import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',
    'nav.FAQ': 'الاساله الشائعه',
    'nav.reviews': 'التقيمات',
    
    // Hero Section
    'hero.title': 'Lumora',
    'hero.subtitle': 'جمالك الطبيعي بلمسة يدوية من أنقى المكونات.',
    'hero.cta.shop': 'تسوق الآن',
    'hero.cta.discover': 'اكتشف المنتجات',
    'hero.features.organic': 'عضوي 100%',
    'hero.features.natural': 'طبيعي',
    'hero.features.eco': 'صديق للبيئة',
    'hero.features.handmade': 'صنع يدوي',
    'hero.description':"اكتشف منتجات طبيعية يدوية تعكس نقاء الطبيعة، تعتني بجمالك وصحتك بأسلوب مستدام ورفاهية أصيلة.",

    //Floating
    'Floating.natural':'طبيعي',
    'Floating.Organic ':'مكونات طبيعيه',
    'Floating.Handmade ':'صنع يدوي',
    'Floating.extreme  ':'بعنياه فائقه ',

    
    // Products
    'products.title': 'منتجاتنا المميزة',
    'products.subtitle': 'مجموعة متنوعة من منتجات العناية الطبيعية المصنوعة بعناية فائقة',
    'products.quickView': 'عرض سريع',
    'products.addToCart': 'طلب',
    'products.addToFavorites': 'أضف للمفضلة',
    'products.contactWhatsApp': 'واتساب',
    'products.sendMessage': 'أرسل رسالة',
    'products.viewDetails': 'عرض التفاصيل',
    'products.closeModal': 'إغلاق',
    'products.price': 'السعر',
    'products.originalPrice': 'السعر الأصلي',
    'products.discount': 'خصم',
    'products.new': 'جديد',
    'products.bestSeller': 'الأكثر مبيعاً',
    'products.organic': 'عضوي',
    
    // Features
    'features.title': 'لماذا تختارنا؟',
    'features.subtitle': 'نحن ملتزمون بتقديم أفضل منتجات العناية الطبيعية',
    'features.natural.title': 'طبيعي 100%',
    'features.natural.desc': 'جميع منتجاتنا مصنوعة من مكونات طبيعية خالصة',
    'features.handmade.title': 'صناعة يدوية',
    'features.handmade.desc': 'كل منتج مصنوع بعناية يدوية وحب',
    'features.crueltyFree.title': 'خالي من التجارب',
    'features.crueltyFree.desc': 'لا نقوم بإجراء أي تجارب على الحيوانات',
    'features.eco.title': 'تغليف صديق للبيئة',
    'features.eco.desc': 'نستخدم مواد تغليف قابلة للتدوير وصديقة للبيئة',
    'features.custom.title': 'منتجات مخصصة',
    'features.custom.desc': 'يمكننا تخصيص المنتجات حسب احتياجاتك',
    
    // About
    'about.title': 'قصتنا',
    'about.subtitle': 'رحلة نحو الجمال الطبيعي',
    'about.content': 'نحن علامة تجارية متخصصة في منتجات العناية الطبيعية المصنوعة يدوياً. بدأت رحلتنا من إيماننا العميق بقوة الطبيعة وجمالها. نسعى لتقديم منتجات عالية الجودة تحافظ على جمالك الطبيعي دون التأثير على البيئة.',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا للإجابة على جميع استفساراتك',
    'contact.whatsapp': 'تواصل عبر واتساب',
    'contact.whatsapp.desc': 'تواصل معنا مباشرة عبر الواتساب للحصول على رد سريع',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'رقم الهاتف للتواص والرساله ',
    'contact.form.send': ' إرسال الرسالة ',
    'contact.form.success': 'تم إرسال رسالتك بنجاح',
    
    // Footer
    'footer.privacy': 'سياسة الخصوصية',
    'footer.Quick': 'روابط سريعة',
    'footer.service': 'خدمت العملاء ',
    'footer.terms': 'الشروط والأحكام',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.social': 'تابعنا على وسائل التواصل',
    'footer.policy': 'سياسة الشحن والإرجاع',
    'footer.desc': 'منتجات العناية الطبيعية المصنوعة يدوياً بأجود المواد الطبيعية للحصول على جمال طبيعي مستدام',

    
    // Theme
    'theme.toggle': 'تبديل الوضع',
    'theme.light': 'الوضع النهاري',
    'theme.dark': 'الوضع الليلي',
    
    // Language
    'language.toggle': 'تغيير اللغة',
    'language.arabic': 'العربية',
    'language.english': 'English',
    
    // Admin
    'admin.login': 'تسجيل دخول المدير',
    'admin.username': 'اسم المستخدم',
    'admin.password': 'كلمة المرور',
    'admin.login.button': 'دخول',
    'admin.dashboard': 'لوحة التحكم',
    'admin.logout': 'تسجيل خروج',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.FAQ': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Lumora',
    'hero.subtitle': "Your natural beauty with a handmade touch from the purest ingredients.",
    'hero.cta.shop': 'Shop Now',
    'hero.cta.discover': 'Discover Products',
    'hero.features.organic': '100% Organic',
    'hero.features.natural': 'Natural',
    'hero.features.eco': 'Eco-Friendly',
    'hero.features.handmade': 'Handmade',
    'hero.description':"Discover handmade natural products that reflect purity, care for beauty and health with sustainable authentic luxury.",
    
    //Floating
    'Floating.natural':'Natural',
    'Floating.Organic':'Organic ingredients',
    'Floating.Handmade':'Handmade',
    'Floating.extreme':'With his extreme care',
    


    // Products
    'products.title': 'Our Featured Products',
    'products.subtitle': 'A diverse collection of natural care products crafted with exceptional care',
    'products.quickView': 'Quick View',
    'products.addToCart': 'request',
    'products.addToFavorites': 'Add to Favorites',
    'products.contactWhatsApp': 'WhatsApp',
    'products.sendMessage': 'Send Message',
    'products.viewDetails': 'View Details',
    'products.closeModal': 'Close',
    'products.price': 'Price',
    'products.originalPrice': 'Original Price',
    'products.discount': 'Discount',
    'products.new': 'New',
    'products.bestSeller': 'Best Seller',
    'products.organic': 'Organic',
    
    // Features
    'features.title': 'Why Choose Us?',
    'features.subtitle': 'We are committed to providing the best natural care products',
    'features.natural.title': '100% Natural',
    'features.natural.desc': 'All our products are made from pure natural ingredients',
    'features.handmade.title': 'Handmade',
    'features.handmade.desc': 'Each product is carefully handcrafted with love',
    'features.crueltyFree.title': 'Cruelty-Free',
    'features.crueltyFree.desc': 'We do not conduct any animal testing',
    'features.eco.title': 'Eco-Friendly Packaging',
    'features.eco.desc': 'We use recyclable and environmentally friendly packaging materials',
    'features.custom.title': 'Custom Products',
    'features.custom.desc': 'We can customize products according to your needs',
    
    // About
    'about.title': 'Our Story',
    'about.subtitle': 'A journey towards natural beauty',
    'about.content': 'We are a brand specialized in handmade natural care products. Our journey began from our deep belief in the power and beauty of nature. We strive to provide high-quality products that maintain your natural beauty without affecting the environment.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer all your inquiries',
    'contact.whatsapp': 'Contact via WhatsApp',
    'contact.whatsapp.desc': 'Contact us directly via WhatsApp for a quick response.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Phone number for communication and your message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Your message has been sent successfully',
    
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.Quick': 'Quick links',
    'footer.service': 'Customer service',
    'footer.terms': 'Terms & Conditions',
    'footer.rights': 'All rights reserved',
    'footer.social': 'Follow us on social media',
    'footer.policy': 'Shipping and returns policy',
    'footer.desc': 'Natural skincare products handcrafted with the finest natural ingredients for sustainable natural beauty.',

    
    // Theme
    'theme.toggle': 'Toggle Theme',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    
    // Language
    'language.toggle': 'Change Language',
    'language.arabic': 'العربية',
    'language.english': 'English',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.login.button': 'Login',
    'admin.dashboard': 'Dashboard',
    'admin.logout': 'Logout',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and class
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('ar'); // Default to Arabic
    }
  }, []);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};