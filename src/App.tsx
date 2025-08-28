import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Star, ArrowLeft, Plus, Minus, Home, User, Menu, X, Trash2, LogIn } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  fallbackImage: string; // Fallback image URL
  category: string;
  rating: number;
  reviews: number;
  description: string;
  sizes?: string[];
  featured?: boolean;
  subtitle?: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

// Helper function to get image with fallback
const getProductImage = (product: Product) => {
  // Try to load the real product image, fallback to placeholder if it fails
  return product.image || product.fallbackImage;
};

const products: Product[] = [
  {
    id: 1,
    name: "Signature Assortment",
    subtitle: "1 lb Box",
    price: 24.99,
    category: "Signature Assortments",
    rating: 4.8,
    reviews: 127,
    description: "Our most popular assortment featuring a carefully curated selection of our finest chocolates. Perfect for gifting or indulging yourself with a variety of flavors and textures.",
    sizes: ["1 lb"],
    image: "/images/products/1lbsignassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: 2,
    name: "Signature Assortment",
    subtitle: "1.5 lb Box",
    price: 34.99,
    category: "Signature Assortments",
    rating: 4.9,
    reviews: 89,
    description: "A generous selection of our signature chocolates in a larger box. Ideal for sharing with family and friends or for those who want more variety.",
    sizes: ["1.5 lb"],
    image: "/images/products/1andahalflbsignassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: 3,
    name: "Signature Assortment",
    subtitle: "0.5 lb Box",
    price: 14.99,
    category: "Signature Assortments",
    rating: 4.7,
    reviews: 156,
    description: "A perfect introduction to our signature assortment. Compact size makes it great for sampling or as a thoughtful gift.",
    sizes: ["0.5 lb"],
    image: "/images/products/halflbsignassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: 4,
    name: "2 lbs. Signature Assortment",
    subtitle: "Party size assortment",
    price: 65.99,
    image: "/images/products/2lbsigassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    category: "Signature Assortments",
    rating: 4.8,
    reviews: 423,
    description: "Our largest signature assortment perfect for parties, events, or serious chocolate lovers. Generous portions of all varieties.",
    sizes: ["1 1/2 lb", "2 lbs", "3 lbs"],
    featured: true
  },
  {
    id: 5,
    name: "3 lbs. Signature Assortment",
    subtitle: "Ultimate chocolate experience",
    price: 98.99,
    image: "/images/products/3lbsigassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "Signature Assortments",
    rating: 4.9,
    reviews: 298,
    description: "The ultimate chocolate experience with our largest signature assortment. Perfect for corporate gifts or chocolate enthusiasts.",
    sizes: ["2 lbs", "3 lbs"],
    featured: true
  },
  {
    id: 6,
    name: "12 Piece Truffle Assortment",
    subtitle: "Elegant truffle collection",
    price: 26.99,
    image: "/images/products/12pctruffleassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Truffles",
    rating: 4.8,
    reviews: 156,
    description: "A sophisticated collection of handcrafted chocolate truffles in various flavors. Perfect for elegant occasions.",
    sizes: ["12 pieces", "15 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 7,
    name: "15 Piece Truffle Assortment",
    subtitle: "Luxury chocolate truffles",
    price: 33.75,
    image: "/images/products/15pctruffleassortment.jpg",
    fallbackImage: "https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg",
    category: "Truffles",
    rating: 4.9,
    reviews: 892,
    description: "Handcrafted chocolate truffles in an assortment of flavors. Each piece is carefully crafted for the perfect chocolate experience.",
    sizes: ["12 pieces", "15 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 8,
    name: "24 Piece Truffle Assortment",
    subtitle: "Premium truffle selection",
    price: 54.00,
    image: "/images/products/truffle-assortment-24.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    category: "Truffles",
    rating: 4.9,
    reviews: 234,
    description: "Our largest truffle assortment featuring 24 handcrafted pieces in various flavors. Perfect for gifting or sharing.",
    sizes: ["15 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 9,
    name: "12 Piece Peanut Butter Kisses",
    subtitle: "Peanut butter delight",
    price: 17.99,
    image: "/images/products/peanut-butter-kisses-12.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "Nut & Chewy Assortments",
    rating: 4.6,
    reviews: 189,
    description: "Delicious chocolate-covered peanut butter kisses. A perfect blend of chocolate and peanut butter flavors.",
    sizes: ["12 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 10,
    name: "24 Piece Peanut Butter Kisses",
    subtitle: "Family size peanut butter treats",
    price: 32.99,
    image: "/images/products/peanut-butter-kisses-24.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Nut & Chewy Assortments",
    rating: 4.7,
    reviews: 145,
    description: "Double the peanut butter kisses for double the enjoyment. Perfect for peanut butter lovers.",
    sizes: ["12 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 11,
    name: "12 Piece Raspberry Jellies",
    subtitle: "Fruity chocolate treats",
    price: 17.99,
    image: "/images/products/raspberry-jellies-12.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg",
    category: "Fruits",
    rating: 4.5,
    reviews: 167,
    description: "Chocolate-covered raspberry jellies with a burst of fruity flavor. A delightful combination of chocolate and chocolate.",
    sizes: ["12 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 12,
    name: "24 Piece Raspberry Jelly",
    subtitle: "Large raspberry collection",
    price: 32.99,
    image: "/images/products/raspberry-jellies-24.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    category: "Fruits",
    rating: 4.6,
    reviews: 123,
    description: "A generous collection of chocolate-covered raspberry jellies. Perfect for sharing or indulging.",
    sizes: ["12 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 13,
    name: "12 Piece Orange Jelly",
    subtitle: "Citrus chocolate delight",
    price: 17.99,
    image: "/images/products/orange-jelly-12.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "Fruits",
    rating: 4.4,
    reviews: 98,
    description: "Chocolate-covered orange jellies with a refreshing citrus flavor. A unique and delicious treat.",
    sizes: ["12 pieces", "24 pieces"],
    featured: true
  },
  {
    id: 14,
    name: "Pectin Jelly Beans",
    subtitle: "Classic jelly bean treat",
    price: 4.99,
    image: "/images/products/pectin-jelly-beans.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Miscellaneous",
    rating: 4.3,
    reviews: 76,
    description: "Traditional pectin jelly beans in various flavors. A classic candy that's always a hit.",
    sizes: ["Small", "Medium", "Large"],
    featured: true
  },
  {
    id: 15,
    name: "Triple Dipped Malt Balls",
    subtitle: "Crunchy malt center",
    price: 9.99,
    image: "/images/products/triple-dipped-malt-balls.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg",
    category: "Miscellaneous",
    rating: 4.7,
    reviews: 567,
    description: "Delicious malt balls triple-dipped in premium chocolate for maximum flavor and crunch. A classic favorite.",
    sizes: ["Small", "Medium", "Large"],
    featured: true
  },
  {
    id: 16,
    name: "Chocolate Bars",
    subtitle: "Premium chocolate selection",
    price: 12.99,
    image: "/images/products/chocolate-bars.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    category: "Chocolate Bars",
    rating: 4.6,
    reviews: 423,
    description: "Handcrafted chocolate bars made with the finest cocoa beans. Available in dark, milk, and white chocolate varieties.",
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: 17,
    name: "Nut & Chewy Assortments",
    subtitle: "Nutty chocolate delights",
    price: 24.99,
    image: "/images/products/nut-chewy-assortments.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "Nut & Chewy Assortments",
    rating: 4.5,
    reviews: 298,
    description: "A delicious mix of chocolate-covered nuts and chewy candies. Perfect for those who love texture and variety.",
    sizes: ["1/2 lb", "1 lb", "1 1/2 lb"]
  },
  {
    id: 18,
    name: "Hand Pulled Brittle",
    subtitle: "Traditional candy making",
    price: 18.99,
    image: "/images/products/hand-pulled-brittle.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Hand Pulled Brittle",
    rating: 4.8,
    reviews: 156,
    description: "Handcrafted brittle made using traditional methods. Light, crispy, and perfectly sweetened with premium ingredients.",
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: 19,
    name: "Creams Assortment",
    subtitle: "Smooth cream centers",
    price: 28.99,
    image: "/images/products/creams-assortment.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg",
    category: "Creams",
    rating: 4.7,
    reviews: 234,
    description: "A selection of chocolate-covered creams with various flavored centers. Smooth, rich, and indulgent.",
    sizes: ["1/2 lb", "1 lb", "1 1/2 lb"]
  },
  {
    id: 20,
    name: "Caramels and Toffees",
    subtitle: "Buttery caramel treats",
    price: 22.99,
    image: "/images/products/caramels-toffees.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    category: "Caramels and Toffees",
    rating: 4.6,
    reviews: 189,
    description: "Handcrafted caramels and toffees covered in premium chocolate. Rich, buttery, and absolutely delicious.",
    sizes: ["1/2 lb", "1 lb", "1 1/2 lb"]
  },
  {
    id: 21,
    name: "Meltaways",
    subtitle: "Smooth chocolate melts",
    price: 26.99,
    image: "/images/products/meltaways.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "Meltaways",
    rating: 4.8,
    reviews: 167,
    description: "Smooth, melt-in-your-mouth chocolate treats that literally melt away. A luxurious chocolate experience.",
    sizes: ["1/2 lb", "1 lb", "1 1/2 lb"]
  },
  {
    id: 22,
    name: "Premium Nuts",
    subtitle: "Chocolate covered nuts",
    price: 19.99,
    image: "/images/products/premium-nuts.jpg", // TODO: Replace with real Van's product image
    fallbackImage: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Nuts",
    rating: 4.5,
    reviews: 145,
    description: "Premium nuts covered in rich chocolate. A perfect combination of crunch and chocolate indulgence.",
    sizes: ["1/2 lb", "1 lb", "1 1/2 lb"]
  }
];

// Real categories from Van's Chocolates website
const categories = ['Signature Assortments', 'Truffles', 'Chocolate Bars', 'Nut & Chewy Assortments', 'Creams', 'Caramels and Toffees', 'Fruits', 'Hand Pulled Brittle', 'Meltaways', 'Miscellaneous', 'Nuts'];

// Category images for the category cards screen
const categoryImages: { [key: string]: string } = {
  'Signature Assortments': '/images/products/1lbsignassortment.jpg',
  'Truffles': '/images/products/12pctruffleassortment.jpg',
  'Chocolate Bars': 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg',
  'Nut & Chewy Assortments': 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
  'Creams': 'https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg',
  'Caramels and Toffees': 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
  'Fruits': 'https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg',
  'Hand Pulled Brittle': 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg',
  'Meltaways': 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
  'Miscellaneous': 'https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg',
  'Nuts': 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'
};

function App() {
  // State variables
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'login' | 'rewards' | 'categories'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  // const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  // const [dragOffset, setDragOffset] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [userPoints] = useState(0);
  const [rewardsHistory] = useState<Array<{
    id: string;
    type: 'earned' | 'redeemed';
    amount: number;
    description: string;
    date: string;
  }>>([]);

  // Refs
  const productsContainerRef = useRef<HTMLDivElement>(null);
  // const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setSelectedSize(product.sizes ? product.sizes[0] : '1 lb');
  };

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity: quantity, selectedSize: size }];
    });
  };

  const updateCartItemQuantity = (itemId: number, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size);
      return;
    }
    
    setCart(prev => prev.map(item =>
      item.id === itemId && item.selectedSize === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (itemId: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === itemId && item.selectedSize === size)));
  };

  // const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle authentication click
  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setCurrentView('home');
    } else {
      setCurrentView('login');
    }
  };

  // Handle login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would call your auth API
    setIsAuthenticated(true);
    setCurrentView('home');
    setLoginForm({ email: '', password: '' });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle back to home
  const handleBackToHome = () => {
    setCurrentView('home');
    setLoginForm({ email: '', password: '' });
  };

  

  // Filter products by active category
  const filteredProducts = products.filter(product => 
    activeCategory === 'All' || product.category === activeCategory
  );

  // Filter products by selected category for category view
  const categoryProducts = selectedCategory ? products.filter(product => 
    product.category === selectedCategory
  ) : [];

  // Handle category card click
  const handleCategoryCardClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('product');
  };

  // Handle category change with sliding animation
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === activeCategory) return;
    setActiveCategory(newCategory);
  };

  // Handle mouse/touch drag events
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    
    if (productsContainerRef.current) {
      const newScrollPosition = scrollPosition - deltaX;
      productsContainerRef.current.scrollLeft = newScrollPosition;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (productsContainerRef.current) {
      setScrollPosition(productsContainerRef.current.scrollLeft);
    }
  };

  // Handle wheel scroll for smooth scrolling
  useEffect(() => {
    const container = productsContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling for product grid, not vertical
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollLeft += e.deltaX;
        setScrollPosition(container.scrollLeft);
      }
    };

    // Use non-passive event listener for better control
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Cart Modal Component
  const CartModal = () => (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ease-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Modal */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 z-50 transform transition-all duration-300 ease-out ${
          isCartOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm">Add some delicious chocolates!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${index}`} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={getProductImage(item)} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = item.fallbackImage;
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white truncate">{item.name}</h3>
                    <p className="text-gray-400 text-xs">{item.subtitle}</p>
                    {item.selectedSize && (
                      <p className="text-gray-500 text-xs">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-amber-600 font-bold text-sm">$ {item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize || '', item.quantity - 1)}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    >
                      <Minus size={16} className="text-white" />
                    </button>
                    <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize || '', item.quantity + 1)}
                      className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors"
                    >
                      <Plus size={16} className="text-white" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize || '')}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-800 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>$ {cartTotal.toFixed(2)}</span>
            </div>
            
            {/* Shipping */}
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span className={cartTotal >= 100 ? 'text-green-400' : 'text-gray-400'}>
                {cartTotal >= 100 ? 'FREE' : '$ 5.99'}
              </span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-4">
              <span>Total</span>
              <span>$ {(cartTotal >= 100 ? cartTotal : cartTotal + 5.99).toFixed(2)}</span>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full bg-amber-700 text-white py-4 rounded-full font-semibold hover:bg-amber-800 transition-colors">
              Proceed to Checkout
            </button>
            
            {/* Free Shipping Notice */}
            {cartTotal < 100 && (
              <p className="text-center text-sm text-gray-400">
                Add ${(100 - cartTotal).toFixed(2)} more for <span className="text-green-400">FREE SHIPPING</span>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );

  // Sliding Menu Component
  const SlidingMenu = () => (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ease-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Sliding Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-gray-900/95 backdrop-blur-sm z-50 transform transition-all duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <div className="flex-1 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Van's Chocolates" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Navigation Links */}
          <div className="space-y-2">
            <button className="w-full text-left p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-700">
              <span className="text-white font-medium text-lg">🏠 Home</span>
            </button>
            <button className="w-full text-left p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-700">
              <span className="text-white font-medium text-lg">🍫 Shop All Chocolates</span>
            </button>
            <button className="w-full text-left p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-700">
              <span className="text-white font-medium text-lg">ℹ️ About Us</span>
            </button>
            <button className="w-full text-left p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-700">
              <span className="text-white font-medium text-lg">📞 Contact</span>
            </button>
          </div>

          {/* Quick Info */}
          <div className="border-t border-gray-800/50 pt-6 space-y-4 mt-8">
            <div className="text-gray-300 text-sm">
              <p className="font-semibold text-white mb-2">📍 Location:</p>
              <p>202 Chadwick Ave.</p>
              <p className="text-sm">Hendersonville, NC 28792</p>
            </div>
            <div className="text-gray-300 text-sm">
              <p className="font-semibold text-white mb-2">📱 Phone:</p>
              <p className="text-sm">828-697-2120</p>
            </div>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="border-t border-gray-800/50 p-6 bg-gray-800/30">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              Handcrafted with ❤️
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 Van's Chocolates
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Login Page View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-1 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="Van's Chocolates" 
                  className="h-24 w-auto object-contain cursor-pointer"
                  onClick={() => setCurrentView('home')}
                />
              </div>
              
              {/* Left side - Menu Button */}
              <div className="flex-1 flex justify-start">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-3 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <Menu size={24} className="text-white" />
                </button>
              </div>
              
              {/* Right side - Login/Account Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  {isAuthenticated ? (
                    <>
                      <User size={20} className="text-white" />
                      <span className="text-white">Account</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} className="text-white" />
                      <span className="text-white">Login</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Welcome Back</h2>
            <p className="text-center text-gray-400 mb-8">
              Sign in to your Van's Chocolates account
            </p>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white pl-4 py-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white pl-4 py-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <span 
                  className="text-amber-400 cursor-pointer hover:text-amber-300 transition-colors font-medium"
                  onClick={() => setCurrentView('home')}
                >
                  Sign Up
                </span>
              </p>
              
              <button
                onClick={handleBackToHome}
                className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">📍 Location</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>202 Chadwick Ave.</p>
                  <p>Hendersonville, NC 28792</p>
                  <p>828-697-2120</p>
                  <p className="text-gray-400">Hours: Monday-Friday: 9am-5pm</p>
                  <p className="text-gray-400">Saturday: 10am-5pm</p>
                </div>
              </div>
              
              {/* Shipping & Returns */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">🚚 Shipping & Returns</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p className="font-medium text-white">Returns Policy</p>
                  <p>We are not able to accept returns or make exchanges. Please contact us if you have any questions or concerns.</p>
                  <p className="font-medium text-white mt-4">Shipping</p>
                  <p>We can ship to virtually any address in the US (no P.O. Boxes), even in the summer months. All of our products are shipped in a thermal cooler with reusable ice packs.</p>
                  <p className="text-amber-400">There is a $4.00 packaging fee charged to every order.</p>
                </div>
              </div>
              
              {/* Contact Us */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">📞 Contact Us</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>Have questions about our chocolates?</p>
                  <p>Need help with your order?</p>
                  <p className="text-amber-400 font-medium">Contact us today!</p>
                  <p className="mt-4">
                    <span className="text-white font-medium">Phone:</span> 828-697-2120
                  </p>
                  <p>
                    <span className="text-white font-medium">Hours:</span> Mon-Fri: 9am-5pm, Sat: 10am-5pm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <img src="/logo.png" alt="Van's Chocolates" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-gray-400 text-sm mb-2">Handcrafted with ❤️ in Hendersonville, NC</p>
              <p className="text-gray-500 text-xs">© 2024 Van's Chocolates. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-20">
          <div className="flex justify-around py-4">
            <button
              onClick={() => setCurrentView('home')}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
              <span className="text-xs">Menu</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={24} />
              <span className="text-xs">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={handleAuthClick}
              className="flex flex-col items-center space-y-1 text-amber-500"
            >
              <LogIn size={24} />
              <span className="text-xs">Login</span>
            </button>
          </div>
        </nav>

        {/* Cart Modal */}
        <CartModal />
        
        {/* Sliding Menu */}
        <SlidingMenu />
      </div>
    );
  }

  // Categories Page View
  if (currentView === 'categories') {
    if (selectedCategory && categoryProducts.length > 0) {
      // Show products in 2x2 grid layout
      return (
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {setCurrentView('categories'); setSelectedCategory('');}}
                  className="p-3 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} className="text-white" />
                </button>
                
                <div className="flex-1 flex justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Van's Chocolates" 
                    className="h-20 w-auto object-contain cursor-pointer"
                    onClick={() => setCurrentView('home')}
                  />
                </div>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-3 hover:bg-gray-800 rounded-full transition-colors relative"
                >
                  <ShoppingBag size={24} className="text-white" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Category Products - 2x2 Grid, No Scrolling */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">{selectedCategory}</h1>
            
            <div className="grid grid-cols-2 gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className="bg-gray-900 rounded-2xl p-4 cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                >
                  {/* Product Image */}
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = product.fallbackImage;
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-white line-clamp-2">{product.name}</h3>
                    {product.subtitle && (
                      <p className="text-gray-400 text-xs line-clamp-1">{product.subtitle}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-bold text-lg">$ {product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, product.sizes?.[0] || '1 lb', 1);
                        }}
                        className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* If no products in category */}
            {categoryProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍫</div>
                <p className="text-gray-400 text-xl">No products in this category yet</p>
                <p className="text-gray-500">Check back soon for new additions!</p>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-20">
            <div className="flex justify-around py-4">
              <button
                onClick={() => setCurrentView('home')}
                className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
              >
                <Home size={24} />
                <span className="text-xs">Home</span>
              </button>
              <button
                onClick={() => setCurrentView('categories')}
                className="flex flex-col items-center space-y-1 text-amber-500"
              >
                <Menu size={24} />
                <span className="text-xs">Menu</span>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors relative"
              >
                <ShoppingBag size={24} />
                <span className="text-xs">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                onClick={handleAuthClick}
                className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
              >
                {isAuthenticated ? (
                  <User size={24} />
                ) : (
                  <LogIn size={24} />
                )}
                <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
              </button>
            </div>
          </nav>

          {/* Cart Modal */}
          <CartModal />
        </div>
      );
    }

    // Show category cards with vertical scrolling
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('home')}
                className="p-3 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-white" />
              </button>
              
              <div className="flex-1 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="Van's Chocolates" 
                  className="h-20 w-auto object-contain cursor-pointer"
                  onClick={() => setCurrentView('home')}
                />
              </div>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-3 hover:bg-gray-800 rounded-full transition-colors relative"
              >
                <ShoppingBag size={24} className="text-white" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Categories Grid with Vertical Scrolling */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12">
            Choose a category to explore our handcrafted chocolates
          </p>
          
          <div className="space-y-6 pb-24">
            {categories.map((category) => {
              const productCount = products.filter(p => p.category === category).length;
              return (
                <div
                  key={category}
                  onClick={() => handleCategoryCardClick(category)}
                  className="bg-gray-900 rounded-2xl p-6 cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <div className="flex items-center space-x-6">
                    {/* Category Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={categoryImages[category]}
                        alt={category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Category Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {productCount} {productCount === 1 ? 'product' : 'products'} available
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-500 text-sm font-medium">Explore Collection</span>
                        <ArrowLeft size={16} className="text-amber-500 rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-20">
          <div className="flex justify-around py-4">
            <button
              onClick={() => setCurrentView('home')}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setCurrentView('categories')}
              className="flex flex-col items-center space-y-1 text-amber-500"
            >
              <Menu size={24} />
              <span className="text-xs">Menu</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={24} />
              <span className="text-xs">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={handleAuthClick}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              {isAuthenticated ? (
                <User size={24} />
              ) : (
                <LogIn size={24} />
              )}
              <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
            </button>
          </div>
        </nav>

        {/* Cart Modal */}
        <CartModal />
      </div>
    );
  }

  // Rewards Page View
  if (currentView === 'rewards') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Menu Button */}
              <div className="flex-1 flex justify-start">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-3 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <Menu size={24} className="text-white" />
                </button>
              </div>
              
              {/* Center - Logo */}
              <div className="flex-1 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="Van's Chocolates" 
                  className="h-24 w-auto object-contain cursor-pointer"
                  onClick={() => setCurrentView('home')}
                />
              </div>
              
              {/* Right side - Login/Account Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  {isAuthenticated ? (
                    <>
                      <User size={20} className="text-white" />
                      <span className="text-white">Account</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} className="text-white" />
                      <span className="text-white">Login</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Rewards Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Rewards Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
              Van's Rewards
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Earn points with every purchase and redeem them for delicious rewards
            </p>
          </div>

          {/* Points Display */}
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl p-8 mb-12 text-center">
            <div className="text-6xl md:text-8xl font-bold text-white mb-4">
              {userPoints}
            </div>
            <div className="text-2xl text-amber-100 mb-2">Total Points</div>
            <div className="text-amber-200 text-lg">
              {userPoints >= 100 ? '🎉 You can redeem rewards!' : `${100 - userPoints} more points until your first reward`}
            </div>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
              <p className="text-gray-400">Get 1 point for every $1 you spend on our delicious chocolates</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accumulate</h3>
              <p className="text-gray-400">Points never expire and accumulate with every purchase</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Redeem</h3>
              <p className="text-gray-400">Use your points to get free chocolates and exclusive rewards</p>
            </div>
          </div>

          {/* Rewards Tiers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Rewards Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 100 Points */}
              <div className={`bg-gray-900 p-6 rounded-2xl text-center border-2 ${userPoints >= 100 ? 'border-amber-500' : 'border-gray-700'}`}>
                <div className="text-4xl mb-4">🍫</div>
                <h3 className="text-xl font-semibold mb-2">100 Points</h3>
                <p className="text-gray-400 mb-4">Free 0.5 lb Signature Assortment</p>
                <div className="text-2xl font-bold text-amber-500">$14.99 Value</div>
                {userPoints >= 100 && (
                  <button className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors">
                    Redeem
                  </button>
                )}
              </div>

              {/* 200 Points */}
              <div className={`bg-gray-900 p-6 rounded-2xl text-center border-2 ${userPoints >= 200 ? 'border-amber-500' : 'border-gray-700'}`}>
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-semibold mb-2">200 Points</h3>
                <p className="text-gray-400 mb-4">Free 1 lb Signature Assortment</p>
                <div className="text-2xl font-bold text-amber-500">$24.99 Value</div>
                {userPoints >= 200 && (
                  <button className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors">
                    Redeem
                  </button>
                )}
              </div>

              {/* 300 Points */}
              <div className={`bg-gray-900 p-6 rounded-2xl text-center border-2 ${userPoints >= 300 ? 'border-amber-500' : 'border-gray-700'}`}>
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">300 Points</h3>
                <p className="text-gray-400 mb-4">Free 1.5 lb Signature Assortment</p>
                <div className="text-2xl font-bold text-amber-500">$34.99 Value</div>
                {userPoints >= 300 && (
                  <button className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors">
                    Redeem
                  </button>
                )}
              </div>

              {/* 500 Points */}
              <div className={`bg-gray-900 p-6 rounded-2xl text-center border-2 ${userPoints >= 500 ? 'border-amber-500' : 'border-gray-700'}`}>
                <div className="text-4xl mb-4">👑</div>
                <h3 className="text-xl font-semibold mb-2">500 Points</h3>
                <p className="text-gray-400 mb-4">Free 2 lb Premium Assortment</p>
                <div className="text-2xl font-bold text-amber-500">$49.99 Value</div>
                {userPoints >= 500 && (
                  <button className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors">
                    Redeem
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Points History */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Points History</h2>
            {rewardsHistory.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-2xl">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-400 text-lg">No points activity yet</p>
                <p className="text-gray-500">Start shopping to earn your first points!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rewardsHistory.map((transaction) => (
                  <div key={transaction.id} className="bg-gray-900 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' ? 'bg-green-600' : 'bg-amber-600'
                      }`}>
                        <span className="text-white font-bold">
                          {transaction.type === 'earned' ? '+' : '-'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      transaction.type === 'earned' ? 'text-green-400' : 'text-amber-400'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} pts
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView('home')}
              className="px-8 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 transition-all duration-300 transform hover:scale-105"
            >
              Back to Shop
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">📍 Location</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>202 Chadwick Ave.</p>
                  <p>Hendersonville, NC 28792</p>
                  <p>828-697-2120</p>
                  <p className="text-gray-400">Hours: Monday-Friday: 9am-5pm</p>
                  <p className="text-gray-400">Saturday: 10am-5pm</p>
                </div>
              </div>
              
              {/* Shipping & Returns */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">🚚 Shipping & Returns</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p className="font-medium text-white">Returns Policy</p>
                  <p>We are not able to accept returns or make exchanges. Please contact us if you have any questions or concerns.</p>
                  <p className="font-medium text-white mt-4">Shipping</p>
                  <p>We can ship to virtually any address in the US (no P.O. Boxes), even in the summer months. All of our products are shipped in a thermal cooler with reusable ice packs.</p>
                  <p className="text-amber-400">There is a $4.00 packaging fee charged to every order.</p>
                </div>
              </div>
              
              {/* Contact Us */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">📞 Contact Us</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>Have questions about our chocolates?</p>
                  <p>Need help with your order?</p>
                  <p className="text-amber-400 font-medium">Contact us today!</p>
                  <p className="mt-4">
                    <span className="text-white font-medium">Phone:</span> 828-697-2120
                  </p>
                  <p>
                    <span className="text-white font-medium">Hours:</span> Mon-Fri: 9am-5pm, Sat: 10am-5pm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <img src="/logo.png" alt="Van's Chocolates" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-gray-400 text-sm mb-2">Handcrafted with ❤️ in Hendersonville, NC</p>
              <p className="text-gray-500 text-xs">© 2024 Van's Chocolates. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-20">
          <div className="flex justify-around py-4">
            <button
              onClick={() => setCurrentView('home')}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
              <span className="text-xs">Menu</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={24} />
              <span className="text-xs">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={handleAuthClick}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
            >
              {isAuthenticated ? (
                <User size={24} />
              ) : (
                <LogIn size={24} />
              )}
              <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
            </button>
          </div>
        </nav>

        {/* Cart Modal */}
        <CartModal />
        
        {/* Sliding Menu */}
        <SlidingMenu />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Menu Button (Header Dropdown) */}
            <div className="flex-1 flex justify-start relative">
              <button
                onClick={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
                className="p-3 hover:bg-gray-800 rounded-full transition-colors"
              >
                <Menu size={24} className="text-white" />
              </button>
              
              {/* Header Dropdown Menu */}
              {isHeaderDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsHeaderDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Content */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50">
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            setCurrentView('home');
                            setIsHeaderDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          🏠 Home
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentView('categories');
                            setIsHeaderDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          🍫 Browse Categories
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentView('rewards');
                            setIsHeaderDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          ⭐ Rewards
                        </button>
                        <button 
                          onClick={() => {
                            setIsHeaderDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          ℹ️ About Us
                        </button>
                        <button 
                          onClick={() => {
                            setIsHeaderDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          📞 Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="/logo.png" 
                alt="Van's Chocolates" 
                className="h-24 w-auto object-contain cursor-pointer"
                onClick={() => setCurrentView('home')}
              />
            </div>
            
            {/* Right side - Login/Account Button */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                {isAuthenticated ? (
                  <>
                    <User size={20} className="text-white" />
                    <span className="text-white">Account</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} className="text-white" />
                    <span className="text-white">Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          {/* Hero Banner */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            {/* Hero Image */}
            <img 
              src="/images/hero.jpg" 
              alt="Van's Chocolates - Handcrafted Excellence" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                {/* Semi-transparent background behind text */}
                <div className="bg-black/80 backdrop-blur-sm rounded-3xl px-8 py-12 mx-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Van's Chocolates
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-2xl mx-auto">
                    Handcrafted with love in Hendersonville, NC
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                      onClick={() => setCurrentView('home')}
                      className="px-8 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                      Shop Now
                    </button>
                    <button 
                      onClick={() => setCurrentView('rewards')}
                      className="px-8 py-4 bg-black/80 text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-black/90 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 transform hover:scale-105"
                    >
                      Rewards
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center py-12 px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
              Find the best chocolate for you
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover handcrafted chocolates made with love and the finest ingredients
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Find shop near by you...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 text-white pl-12 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-amber-700 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="flex gap-4 overflow-x-auto pb-4" 
                 ref={productsContainerRef}
                 onMouseDown={handleDragStart}
                 onMouseMove={handleDragMove}
                 onMouseUp={handleDragEnd}
                 onMouseLeave={handleDragEnd}
                 onTouchStart={handleDragStart}
                 onTouchMove={handleDragMove}
                 onTouchEnd={handleDragEnd}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className="flex-shrink-0 w-48 bg-gray-900 rounded-2xl p-4 cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                >
                  {/* Product Image */}
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = product.fallbackImage;
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-white line-clamp-2">{product.name}</h3>
                    {product.subtitle && (
                      <p className="text-gray-400 text-xs line-clamp-1">{product.subtitle}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-bold text-lg">$ {product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, product.sizes?.[0] || '1 lb', 1);
                        }}
                        className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special for you section */}
          <div className="text-center py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Special for you
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Free Shipping on orders over $100! No code needed
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 p-6 rounded-2xl">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-gray-400">Handcrafted with the finest ingredients</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-2xl">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                  <p className="text-gray-400">Every piece crafted with passion</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-2xl">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                  <p className="text-gray-400">Delivered fresh to your door</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Detail View */}
      {currentView === 'product' && selectedProduct && (
        <div className="min-h-screen bg-black">
          {/* Product Info */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="w-full h-96 rounded-2xl overflow-hidden">
                  <img
                    src={getProductImage(selectedProduct)}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = selectedProduct.fallbackImage;
                    }}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                  {selectedProduct.subtitle && (
                    <p className="text-xl text-gray-400 mb-4">{selectedProduct.subtitle}</p>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star size={20} className="text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{selectedProduct.rating}</span>
                      <span className="text-gray-400">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-amber-600">$ {selectedProduct.price.toFixed(2)}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-400 leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                     {selectedProduct.sizes?.map((size) => (
                       <button
                         key={size}
                         onClick={() => setSelectedSize(size)}
                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                           selectedSize === size
                             ? 'bg-amber-700 text-white'
                             : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                         }`}
                       >
                         {size}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="flex items-center space-x-4">
                   <button
                     onClick={() => addToCart(selectedProduct, selectedSize || selectedProduct.sizes?.[0] || '1 lb', 1)}
                     className="flex-1 bg-amber-700 text-white py-4 rounded-full font-semibold hover:bg-amber-800 transition-colors"
                   >
                     Add to Cart
                   </button>
                 </div>

                {/* Product Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-400 text-sm font-semibold">✓</span>
                    </div>
                    <p className="text-sm text-gray-400">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 text-sm font-semibold">$</span>
                    </div>
                    <p className="text-sm text-gray-400">Over $100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-20">
        <div className="flex justify-around py-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <Home size={24} className={currentView === 'home' ? 'text-amber-500' : ''} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('categories')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} className={currentView === 'categories' ? 'text-amber-500' : ''} />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors relative"
          >
            <ShoppingBag size={24} />
            <span className="text-xs">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          <button
            onClick={handleAuthClick}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            {isAuthenticated ? (
              <User size={24} />
            ) : (
              <LogIn size={24} />
            )}
            <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
          </button>
        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal />

      {/* Sliding Menu */}
      <SlidingMenu />

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="px-6 py-12">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Location */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-4">Location</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-sm">202 Chadwick Ave.</p>
                <p className="text-sm">Hendersonville, NC 28792</p>
                <p className="text-sm">828-697-2120</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-white mb-2">Hours:</p>
                  <p className="text-sm">Monday-Friday: 9am-5pm</p>
                  <p className="text-sm">Saturday: 10am-5pm</p>
                </div>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-4">Shipping & Returns</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Returns Policy:</p>
                  <p className="text-sm">We are not able to accept returns or make exchanges. Please contact us if you have any questions or concerns.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Shipping:</p>
                  <p className="text-sm">We can ship to virtually any address in the US (no P.O. Boxes), even in the summer months. All of our products are shipped in a thermal cooler with reusable ice packs. There is a $4.00 packaging fee charged to every order to cover the cost of this protective packaging.</p>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-sm">Phone: 828-697-2120</p>
                <p className="text-sm">Customer Service</p>
                <p className="text-sm">Business Hours</p>
                <p className="text-sm">Get in Touch</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mb-8"></div>

          {/* Bottom Footer */}
          <div className="text-center">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Van's Chocolates" 
                className="h-16 w-auto object-contain mx-auto mb-4"
              />
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Handcrafted chocolates made with love and tradition
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 Van's Chocolates. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;