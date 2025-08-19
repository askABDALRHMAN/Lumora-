import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import ProductCard from './ProductCard';
import { ProductsSearch } from './ProductsSearch';
import arganSoap from '../assets/argan-soap.jpg';
import roseCream from '../assets/rose-cream.jpg';
import lavenderOil from '../assets/lavender-oil.jpg';

const ProductsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { products, updateProduct, reviews } = useStore();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(product => {
      const name = language === 'ar' ? product.name : product.nameEn;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  // Sort products by highest rating and most requested (messageCount)
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      // Get average rating for each product
      const aReviews = reviews.filter(r => r.productId === a.id);
      const bReviews = reviews.filter(r => r.productId === b.id);
      const aRating = aReviews.length > 0 ? aReviews.reduce((sum, r) => sum + r.rating, 0) / aReviews.length : 0;
      const bRating = bReviews.length > 0 ? bReviews.reduce((sum, r) => sum + r.rating, 0) / bReviews.length : 0;
      
      // Sort by rating first, then by message count (demand)
      if (bRating !== aRating) {
        return bRating - aRating;
      }
      return (b.messageCount || 0) - (a.messageCount || 0);
    });
  }, [filteredProducts, reviews]);

  // Update product images if they're still using placeholder URLs
  React.useEffect(() => {
    const imageMap = {
      '1': arganSoap,
      '2': roseCream,
      '3': lavenderOil
    };

    products.forEach(product => {
      if (product.image.includes('placeholder') && imageMap[product.id as keyof typeof imageMap]) {
        updateProduct(product.id, { 
          image: imageMap[product.id as keyof typeof imageMap] 
        });
      }
    });
  }, [products, updateProduct]);

  // Update filtered products when products change
  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {t('products.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t('products.subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-32"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px bg-gradient-to-r from-primary via-transparent to-transparent w-32"></div>
          </div>
        </div>

        <ProductsSearch onSearch={handleSearch} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
              لا توجد منتجات متاحة حالياً
            </h3>
            <p className="text-muted-foreground">
              سيتم إضافة منتجات جديدة قريباً
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;