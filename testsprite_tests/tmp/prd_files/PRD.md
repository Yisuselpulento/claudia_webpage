# ClaudiaShop - Product Requirements Document (PRD)

## 1. Project Overview

**Project Name:** ClaudiaShop
**Type:** E-commerce Web Application (Image Packs Marketplace)
**Core Functionality:** Platform for selling digital image packs with secure downloads via MercadoPago and PayPal

---

## 2. Technology Stack

### Backend
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose 9.3
- **Authentication:** JWT
- **Payments:** MercadoPago SDK, PayPal Server SDK
- **Storage:** Cloudinary (image uploads)

### Frontend
- **Framework:** React 19.2.4
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.2.1
- **Routing:** React Router 7
- **Icons:** React Icons (Fa, etc.)

---

## 3. Core Features

### 3.1 Admin Management
- Admin login/authentication (`/api/admin`)
- Create packs with title, slug, description, price, tags
- Upload cover image and ZIP file via Cloudinary
- Admin dashboard with dark theme
- Sales analytics

### 3.2 Pack Management
- CRUD operations for packs (`/api/packs`)
- Active/inactive status
- Offer pricing system
- Tags support
- Search/filter functionality

### 3.3 Payment Integration
- **MercadoPago:**
  - Create payment preference (`/api/payment/create-preference`)
  - Verify payment (`/api/payment/verify/:paymentId`)
  - Currency: USD

- **PayPal:**
  - Create order (`/api/payment/paypal/create-order`)
  - Capture order (`/api/payment/paypal/capture`)
  - Verify payment (`/api/payment/paypal/verify`)
  - Currency: USD

### 3.4 Download Security
- Token-based download system
- 1-hour expiry tokens
- Secure URL generation
- Prevention of unauthorized sharing

### 3.5 Sales Tracking
- Automatic sale recording on payment completion
- Prevent duplicate sales
- Sales history with pagination
- Revenue statistics

---

## 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| | **Admin** | |
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/register` | Create admin |
| GET | `/api/admin/verify` | Verify JWT |
| | **Packs** | |
| GET | `/api/packs` | List all packs |
| GET | `/api/packs/:id` | Get single pack |
| POST | `/api/packs` | Create pack |
| DELETE | `/api/packs/:id` | Delete pack |
| | **Payment** | |
| POST | `/api/payment/create-preference` | MP create preference |
| GET | `/api/payment/verify/:paymentId` | MP verify payment |
| POST | `/api/payment/paypal/create-order` | PP create order |
| POST | `/api/payment/paypal/capture` | PP capture |
| GET | `/api/payment/paypal/verify` | PP verify |
| | **Download** | |
| GET | `/api/download/pack/:packId` | Legacy download |
| GET | `/api/download/:token` | Token-based download |
| | **Sales** | |
| GET | `/api/sales` | List sales (paginated) |
| GET | `/api/sales/stats` | Sales statistics |
| GET | `/api/sales/:id` | Get sale by ID |
| | **Health** | |
| GET | `/api/health` | Health check |

---

## 5. User Flows

### 5.1 Purchase Flow (MercadoPago)
```
1. User adds pack to cart
2. User clicks "Pagar con MercadoPago"
3. Backend creates MP preference
4. Redirect to MP checkout
5. User completes payment
6. Redirect to /success?payment_id=X
7. Backend verifies payment
8. Backend creates Sale + DownloadTokens
9. User sees download links
```

### 5.2 Purchase Flow (PayPal)
```
1. User adds pack to cart
2. User clicks "Pagar con PayPal"
3. Backend creates PP order
4. Redirect to PayPal approval
5. User approves payment
6. Redirect to /success?token=X
7. Backend verifies + captures order
8. Backend creates Sale + DownloadTokens
9. User sees download links
```

### 5.3 Download Flow
```
1. User clicks "Descargar"
2. Request to /api/download/:token
3. Backend verifies token + expiry
4. If valid: Redirect to ZIP URL
5. If expired: Error 410
```

---

## 6. Data Models

### Pack
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  price: Number,
  offer: { isActive: Boolean, price: Number },
  coverImage: { url: String, publicId: String },
  totalImages: Number,
  tags: [String],
  zipFile: { url: String, publicId: String },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Sale
```javascript
{
  packs: [{
    packId: ObjectId,
    downloadToken: String,
    downloadUrl: String
  }],
  payment: {
    provider: "mercadopago" | "paypal",
    paymentId: String,
    orderId: String,
    status: String,
    amount: Number,
    currency: String
  },
  total: Number,
  status: "pending" | "completed" | "failed" | "refunded",
  createdAt: Date,
  updatedAt: Date
}
```

### DownloadToken
```javascript
{
  packId: ObjectId,
  token: String (unique),
  saleId: ObjectId,
  expiresAt: Date,
  isUsed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 7. Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing with featured packs |
| `/packs` | PacksPage | All packs with filters |
| `/packs/:id` | PackIdPage | Pack detail |
| `/checkout` | Checkout | Cart + payment selection |
| `/success` | Success | Download links after purchase |
| `/admin` | AdminLogin | Admin login |
| `/admin/dashboard` | AdminDashboard | Dashboard with sidebar |
| `/admin/create-pack` | CreatePack | Create new pack form |
| `/admin/sales` | SalesAdmin | Sales history + stats |

---

## 8. Security Features

- JWT authentication for admin
- Download tokens with 1-hour expiry
- Duplicate payment prevention
- Secure Cloudinary uploads
- CORS configuration

---

## 9. Future Enhancements

- User authentication for buyers
- Review/rating system
- Email notifications
- Refund system
- Analytics dashboard
- Multiple payment methods
- Membership/subscriptions

---

## 10. Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
CLIENT_URL=http://localhost:5173
API_URL=http://localhost:5000
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
MP_ACCESS_TOKEN=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox
```

### Frontend (.env)
```
VITE_API_BACKEND_URL=http://localhost:5000
```

---

## 11. Project Structure

```
ClaudiaGomez/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── mercadopago.js
│   │   │   ├── paypal.js
│   │   │   └── cloudinary.js
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── pack.controller.js
│   │   │   ├── payment.controller.js
│   │   │   ├── paypal.controller.js
│   │   │   ├── sales.controller.js
│   │   │   ├── download.controller.js
│   │   │   └── downloadToken.controller.js
│   │   ├── models/
│   │   │   ├── admin.model.js
│   │   │   ├── pack.model.js
│   │   │   ├── sale.model.js
│   │   │   └── downloadToken.model.js
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── pack.routes.js
│   │   │   ├── payment.routes.js
│   │   │   ├── download.routes.js
│   │   │   └── sales.routes.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├─��� src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

*Last Updated: April 16, 2026*