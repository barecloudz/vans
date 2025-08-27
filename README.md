# Van's Chocolates Mobile App

A beautiful, modern mobile app showcasing Van's Chocolates products with a dark theme and orange accents.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🖼️ Adding Real Product Images

Your app is currently using placeholder images, but it's set up to easily use real product images from your Van's Chocolates website!

### Step 1: Get Product Images from Your Site

1. **Go to your website**: [vanschocolates.com](https://vanschocolates.com/)
2. **Open Developer Tools**: Press F12 or right-click → Inspect
3. **Find product images**: Look for product images in the HTML or Network tab
4. **Download images**: Right-click on product images → "Save image as..."

### Step 2: Organize Your Images

Place the downloaded images in the `public/images/products/` folder with these exact names:

```
public/images/products/
├── signature-assortment-1lb.jpg
├── signature-assortment-half-lb.jpg
├── signature-assortment-1-5lb.jpg
├── signature-assortment-2lb.jpg
├── signature-assortment-3lb.jpg
├── truffle-assortment-12.jpg
├── truffle-assortment-15.jpg
├── truffle-assortment-24.jpg
├── peanut-butter-kisses-12.jpg
├── peanut-butter-kisses-24.jpg
├── raspberry-jellies-12.jpg
├── raspberry-jellies-24.jpg
├── orange-jelly-12.jpg
├── pectin-jelly-beans.jpg
├── triple-dipped-malt-balls.jpg
├── chocolate-bars.jpg
├── nut-chewy-assortments.jpg
├── hand-pulled-brittle.jpg
├── creams-assortment.jpg
├── caramels-toffees.jpg
├── meltaways.jpg
└── premium-nuts.jpg
```

### Step 3: Update Image Paths (Optional)

If you want to use different image names, update the `image` property in `src/App.tsx` for each product:

```typescript
{
  id: 1,
  name: "1 lb. Signature Assortment",
  image: "/images/products/your-actual-image-name.jpg", // Update this
  fallbackImage: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
  // ... rest of product data
}
```

## ✨ Features

- **Dark Theme**: Beautiful black background with orange accents
- **Real Product Data**: 22 products from Van's Chocolates website
- **Category Filtering**: Browse by product categories
- **Product Details**: Full product information and size selection
- **Responsive Design**: Mobile-first design that works on all devices
- **Fallback Images**: App works immediately with placeholder images

## 🍫 Products Included

- **Signature Assortments**: 5 sizes (1/2 lb to 3 lbs)
- **Truffles**: 12, 15, and 24 piece assortments
- **Nut & Chewy**: Peanut butter kisses in various sizes
- **Fruits**: Raspberry and orange jellies
- **Miscellaneous**: Jelly beans, malt balls
- **Other Categories**: Chocolate bars, creams, caramels, toffees, meltaways, nuts, brittle

## 🎨 Design Features

- Modern mobile app interface
- Smooth animations and transitions
- Orange accent colors matching chocolate theme
- Clean typography and spacing
- Bottom navigation bar
- Search functionality
- Category filters with active states

## 🔧 Technical Details

- Built with React + TypeScript
- Styled with Tailwind CSS
- Uses Lucide React icons
- Responsive grid layout
- Image fallback system
- State management with React hooks

## 📱 Mobile Optimized

- Touch-friendly interface
- Proper spacing for mobile devices
- Optimized image loading
- Smooth scrolling and navigation

Your app is ready to go! Just add the real product images and you'll have a professional chocolate shopping app that perfectly represents Van's Chocolates.

