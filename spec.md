# The Antiquarian Bookshop - Book E-Commerce Platform

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full e-commerce storefront for books with autumn/vintage/cozy theme
- Book catalog with rich author collections:
  - Ashwin Sanghi (pen name Shawn Haigins): The Rozabal Line, Chanakya's Chant, The Krishna Key, The Sialkot Saga, Keepers of the Kalachakra, The Vault of Vishnu
  - Dan Brown: The Da Vinci Code, Angels & Demons, Inferno, The Lost Symbol, Origin, Digital Fortress, Deception Point
  - James Patterson: Along Came a Spider, Kiss the Girls, Jack & Jill, Cat & Mouse, Roses are Red, 1st to Die, 2nd Chance, Maximum Ride
  - Mary Shelley: Frankenstein, The Last Man, Mathilda, Valperga, The Fortunes of Perkin Warbeck
  - J.K. Rowling: Full Harry Potter series (7 books), Fantastic Beasts series (3 books)
  - C.S. Lewis: The Chronicles of Narnia (7 books)
  - Rina Kent: Vicious, Devious, Wicked, Ruthless, Twisted, Ashes of Power, Steel Princess, Cruel King, Bitter King, Empire of Desire
- Shopping cart functionality (add/remove/update quantities)
- Book detail pages with description, author bio snippet, price, genre, rating
- Genre/author filter and search
- User authentication for checkout
- Stripe checkout integration
- Featured books section on homepage
- Bestsellers and New Arrivals sections
- Wishlist feature for logged-in users

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Book catalog actor with CRUD for books, cart management, orders, wishlist
2. Backend: Authorization for user-specific cart/wishlist/orders
3. Backend: Stripe integration for checkout
4. Frontend: Autumn/vintage/cozy design system - warm earth tones (burnt orange, deep amber, dark brown, cream, forest green)
5. Frontend: Homepage with hero banner, featured books, bestsellers, new arrivals
6. Frontend: Book catalog page with filtering by author/genre, search
7. Frontend: Book detail page
8. Frontend: Cart drawer/sidebar
9. Frontend: Checkout flow with Stripe
10. Frontend: User profile with order history and wishlist
11. Generate book cover images for all books using AI
