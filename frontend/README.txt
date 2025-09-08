
│
├── public\
│   └── (images, favicon, etc.)
│
├── src\
│   ├── App.jsx
│   ├── index.js
│   ├── styles\
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   ├── HeroSection.css
│   │   ├── ChefOfTheDay.css
│   │   ├── BestSellingMeals.css
│   │   └── TodaysMeals.css
│   │
│   └── components\
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── HeroSection.jsx
│       ├── ChefOfTheDay.jsx
│       ├── BestSellingMeals.jsx
│       └── TodaysMeals.jsx




How to Run the Frontend
git clone <repo-url>
cd FoodDelivery

Install dependencies:
npm install

start server
npm run dev



 . Export Order History as PDF
 npm install html2pdf.js
 install this on frontend


 . Email Order Confirmation with Nodemailer
 npm install nodemailer
 

 Generate Invoice (PDF Download)
Use jsPDF or react-pdf in frontend.
npm install jspdf


perform CRUD opertion
{
  "title": "Paneer Butter Masala",
  "description": "Rich and creamy paneer dish",
  "price": 250,
  "type": "veg",
  "image": "https://example.com/paneer.jpg"
}
for post and get http://localhost:5000/api/meals
for put request , delete http://localhost:5000/api/meals/68834c71e6d538488d6bdfd8