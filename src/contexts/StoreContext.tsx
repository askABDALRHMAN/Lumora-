
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  ingredients: string;
  ingredientsEn: string;
  badge?: 'new' | 'bestseller' | 'organic';
  inStock: boolean;
  messageCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  timestamp: Date;
  read: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  productId?: string;
  timestamp: Date;
}

export interface Comment {
  id: string;
  name: string;
  comment: string;
  productId: string;
  productImage: string;
  productName: string;
  isOfficial?: boolean;
  timestamp: Date;
}

export interface FAQ {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Favorites
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  markMessageAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  deleteReview: (reviewId: string) => void;
  
  // Comments
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  deleteComment: (commentId: string) => void;
  
  // FAQ
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  
  // Gallery
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Admin
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'صابون زيت الأرغان',
    nameEn: 'Argan Oil Soap',
    description: 'صابون طبيعي مصنوع من زيت الأرغان المغربي الأصلي، يرطب البشرة ويغذيها بعمق',
    descriptionEn: 'Natural soap made from authentic Moroccan argan oil, deeply moisturizes and nourishes the skin',
    price: 45,
    originalPrice: 60,
    image: '/api/placeholder/300/300',
    category: 'soap',
    ingredients: 'زيت الأرغان، زيت جوز الهند، زيت الزيتون، الصودا الكاوية',
    ingredientsEn: 'Argan oil, Coconut oil, Olive oil, Sodium hydroxide',
    badge: 'bestseller',
    inStock: true,
    messageCount: 3
  },
  {
    id: '2',
    name: 'كريم الورد البلغاري',
    nameEn: 'Bulgarian Rose Cream',
    description: 'كريم مرطب فاخر بماء الورد البلغاري الأصلي لنعومة ونضارة طبيعية',
    descriptionEn: 'Luxurious moisturizing cream with authentic Bulgarian rose water for natural softness and radiance',
    price: 85,
    image: '/api/placeholder/300/300',
    category: 'cream',
    ingredients: 'ماء الورد البلغاري، زبدة الشيا، زيت اللوز الحلو',
    ingredientsEn: 'Bulgarian rose water, Shea butter, Sweet almond oil',
    badge: 'organic',
    inStock: true,
    messageCount: 1
  },
  {
    id: '3',
    name: 'زيت اللافندر المهدئ',
    nameEn: 'Calming Lavender Oil',
    description: 'زيت اللافندر الطبيعي للاسترخاء وتهدئة البشرة والأعصاب',
    descriptionEn: 'Natural lavender oil for relaxation and soothing skin and nerves',
    price: 65,
    image: '/api/placeholder/300/300',
    category: 'oil',
    ingredients: 'زيت اللافندر الطبيعي 100%',
    ingredientsEn: '100% Natural lavender oil',
    badge: 'new',
    inStock: true,
    messageCount: 2
  }
];

const sampleReviews: Review[] = [
  {
    id: '1',
    name: 'فاطمة أحمد',
    rating: 5,
    comment: 'منتجات رائعة وطبيعية 100%. لاحظت فرق كبير في بشرتي بعد الاستخدام',
    avatar: '/api/placeholder/60/60',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'محمد علي',
    rating: 5,
    comment: 'صابون الأرغان ممتاز، رائحته جميلة ويرطب البشرة بشكل رائع',
    avatar: '/api/placeholder/60/60',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'نور محمد',
    rating: 4,
    comment: 'كريم الورد البلغاري له ملمس حريري ورائحة طبيعية جميلة',
    avatar: '/api/placeholder/60/60',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];
const sampleComments: Comment[] = [
  {
    id: '1',
    name: 'سارة محمد',
    comment: 'أفضل صابون طبيعي جربته! بشرتي أصبحت أنعم بكثير',
    productId: '1',
    productImage: '/api/placeholder/300/300',
    productName: 'صابون زيت الأرغان',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const sampleFAQs: FAQ[] = [
  {
    id: '1',
    question: 'هل منتجاتكم طبيعية 100%؟',
    questionEn: 'Are your products 100% natural?',
    answer: 'نعم، جميع منتجاتنا مصنوعة من مكونات طبيعية بالكامل دون إضافة أي مواد كيميائية ضارة',
    answerEn: 'Yes, all our products are made from completely natural ingredients without adding any harmful chemicals',
    order: 1
  },
  {
    id: '2',
    question: 'كم مدة صلاحية المنتجات؟',
    questionEn: 'What is the shelf life of the products?',
    answer: 'تتراوح مدة صلاحية منتجاتنا من 12 إلى 18 شهر من تاريخ الإنتاج عند الحفظ في مكان بارد وجاف',
    answerEn: 'Our products have a shelf life of 12 to 18 months from the production date when stored in a cool, dry place',
    order: 2
  }
];

const sampleGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'مجموعة الصابون الطبيعي',
    titleEn: 'Natural Soap Collection',
    description: 'تشكيلة متنوعة من الصابون الطبيعي المصنوع يدوياً',
    descriptionEn: 'A diverse collection of handmade natural soaps',
    image: '/api/placeholder/400/300',
    category: 'soap'
  },
  {
    id: '2',
    title: 'كريمات العناية الفاخرة',
    titleEn: 'Luxurious Skincare Creams',
    description: 'كريمات طبيعية للعناية بالبشرة وترطيبها',
    descriptionEn: 'Natural creams for skincare and moisturizing',
    image: '/api/placeholder/400/300',
    category: 'cream'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [faqs, setFaqs] = useState<FAQ[]>(sampleFAQs);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(sampleGalleryItems);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    const savedProducts = localStorage.getItem('products');
    const savedMessages = localStorage.getItem('messages');
    const savedReviews = localStorage.getItem('reviews');
    const savedComments = localStorage.getItem('comments');
    const savedFaqs = localStorage.getItem('faqs');
    const savedGalleryItems = localStorage.getItem('galleryItems');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedFaqs) setFaqs(JSON.parse(savedFaqs));
    if (savedGalleryItems) setGalleryItems(JSON.parse(savedGalleryItems));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // Product management
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString(), messageCount: 0 };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    setCart(prev => prev.filter(item => item.id !== id));
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  // Cart management
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites management
  const addToFavorites = (productId: string) => {
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  // Messages management
  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    
    // Update message count for product if productId exists
    if (messageData.productId) {
      setProducts(prev => prev.map(product => 
        product.id === messageData.productId 
          ? { ...product, messageCount: (product.messageCount || 0) + 1 }
          : product
      ));
    }
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => prev.map(message =>
      message.id === messageId ? { ...message, read: true } : message
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(message => message.id !== messageId));
  };

  // Reviews management
  const addReview = (reviewData: Omit<Review, 'id' | 'timestamp'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  // Comments management
  const addComment = (commentData: Omit<Comment, 'id' | 'timestamp'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setComments(prev => [newComment, ...prev]);
  };

  const deleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  // FAQ management
  const addFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFAQ: FAQ = {
      ...faqData,
      id: Date.now().toString()
    };
    setFaqs(prev => [...prev, newFAQ].sort((a, b) => a.order - b.order));
  };

  const updateFAQ = (id: string, updates: Partial<FAQ>) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === id ? { ...faq, ...updates } : faq
    ).sort((a, b) => a.order - b.order));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  // Gallery management
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: Date.now().toString()
    };
    setGalleryItems(prev => [...prev, newItem]);
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  // Admin authentication
  const login = (username: string, password: string): boolean => {
    // Get current admin settings
    const adminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{"username": "admin", "password": "admin1234"}');
    
    if (username === adminSettings.username && password === adminSettings.password) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Check admin status on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      favorites,
      addToFavorites,
      removeFromFavorites,
      messages,
      addMessage,
      markMessageAsRead,
      deleteMessage,
      reviews,
      addReview,
      deleteReview,
      comments,
      addComment,
      deleteComment,
      faqs,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      galleryItems,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
