export type MenuItem = {
    id: string
    name: string
    slug: string
    description: string
    price: number
    category: string
    image: string
    rating: number
    reviews: number
    prepTime: string
    tags: string[]
    options?: {
        sides?: string[]
        spiceLevels?: string[]
    }
}

export const MENU_ITEMS: MenuItem[] = [
    // Breakfast Snacks
    {
        id: "b1",
        name: "Savan Chapati",
        slug: "chapati",
        description: "Soft, layered traditional flatbread. A Kenyan breakfast staple.",
        price: 50,
        category: "Breakfast Snacks",
        image: "/images/hero-breakfast.png",
        rating: 4.9,
        reviews: 320,
        prepTime: "5-10 min",
        tags: ["Staple", "Vegetarian"]
    },
    {
        id: "b2",
        name: "Beef Samosa",
        slug: "samosa",
        description: "Crispy pastry pockets filled with spiced minced beef and heritage herbs.",
        price: 50,
        category: "Breakfast Snacks",
        image: "/images/beef-samosa.png",
        rating: 4.8,
        reviews: 215,
        prepTime: "5 min",
        tags: ["Crunchy", "Bestseller"]
    },
    {
        id: "b3",
        name: "Savan Rollex",
        slug: "rollex",
        description: "Street-style egg and chapati wrap, loaded with onions and tomatoes.",
        price: 150,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.7,
        reviews: 85,
        prepTime: "10-15 min",
        tags: ["Filling", "Street Food"]
    },
    {
        id: "b4",
        name: "Nduma (Arrowroot)",
        slug: "nduma",
        description: "Earthy, nutrient-dense boiled arrowroot. A wholesome heritage choice.",
        price: 100,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
        rating: 4.6,
        reviews: 42,
        prepTime: "10 min",
        tags: ["Healthy", "Heritage"]
    },
    {
        id: "b5",
        name: "Savan Mandazi",
        slug: "mandazi",
        description: "Golden-brown, fluffy Swahili donuts with a hint of cardamom.",
        price: 30,
        category: "Breakfast Snacks",
        image: "/images/hero-breakfast.png",
        rating: 4.9,
        reviews: 432,
        prepTime: "2 min",
        tags: ["Sweet", "Classic"]
    },
    {
        id: "b6",
        name: "Beef Sausage",
        slug: "sausage",
        description: "Premium grilled beef sausages, perfectly seasoned.",
        price: 70,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1544681280-d25a07c9920f?w=800&q=80",
        rating: 4.7,
        reviews: 88,
        prepTime: "5 min",
        tags: ["Protein", "Quick"]
    },
    {
        id: "b7",
        name: "Chips Masala",
        slug: "chips-masala",
        description: "Golden fries tossed in a spicy, flavorful tomato and herb sauce.",
        price: 200,
        category: "Breakfast Snacks",
        image: "/images/chips-masala.png",
        rating: 4.8,
        reviews: 156,
        prepTime: "15 min",
        tags: ["Spicy", "Comfort"]
    },
    {
        id: "b8",
        name: "Classic Omelette",
        slug: "omelette",
        description: "Two-egg omelette with onions, tomatoes, and Kenyan herbs.",
        price: 180,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba6465d?w=800&q=80",
        rating: 4.7,
        reviews: 64,
        prepTime: "10 min",
        tags: ["Protein", "Breakfast"]
    },
    {
        id: "b9",
        name: "Quick Indomie",
        slug: "indomie",
        description: "Spiced instant noodles, sautéed with onions and fresh vegetables.",
        price: 150,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
        rating: 4.5,
        reviews: 32,
        prepTime: "5-8 min",
        tags: ["Quick", "Student Favorite"]
    },
    {
        id: "b10",
        name: "Savan Pancake",
        slug: "pancake",
        description: "Sweet, fluffy traditional crepes with a hint of vanilla.",
        price: 100,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
        rating: 4.8,
        reviews: 55,
        prepTime: "10 min",
        tags: ["Sweet", "Delicate"]
    },
    {
        id: "b11",
        name: "Vegetable Samosa",
        slug: "veg-samosa",
        description: "Crispy pastry pockets filled with spiced potato and green peas.",
        price: 40,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.6,
        reviews: 98,
        prepTime: "5 min",
        tags: ["Vegetarian", "Crunchy"]
    },

    // Main Dishes
    {
        id: "m1",
        name: "Fish Wet Fry",
        slug: "fish-wet-fry",
        description: "Fresh Tilapia stewed in a rich tomato, onion, and cilantro gravy.",
        price: 450,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
        rating: 4.9,
        reviews: 450,
        prepTime: "25-30 min",
        tags: ["Fresh Fish", "Chef Special"],
        options: {
            sides: ["Ugali", "Rice", "Chapati", "Mukimo"]
        }
    },
    {
        id: "m2",
        name: "Savan Mbuzi Fry",
        slug: "mbuzi-fry",
        description: "Tender goat meat sautéed with peppers, onions, and traditional spices.",
        price: 400,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        rating: 4.8,
        reviews: 312,
        prepTime: "20-25 min",
        tags: ["Signature", "Spicy"],
        options: {
            sides: ["Ugali", "Rice", "Mukimo"]
        }
    },
    {
        id: "m3",
        name: "Nyama Choma",
        slug: "nyama-choma",
        description: "Authentic Kenyan charcoal-grilled beef, seasoned with sea salt.",
        price: 400,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        rating: 4.9,
        reviews: 520,
        prepTime: "30-40 min",
        tags: ["Legendary", "Grilled"],
        options: {
            sides: ["Ugali", "Kachumbari"]
        }
    },
    {
        id: "m4",
        name: "Managu & Kienyeji",
        slug: "managu",
        description: "Traditional African nightshade and seasonal greens, cooked with cream for a velvety finish.",
        price: 200,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
        rating: 4.7,
        reviews: 128,
        prepTime: "15 min",
        tags: ["Organic", "Traditional"],
        options: {
            sides: ["Ugali"]
        }
    },
    {
        id: "m5",
        name: "Chicken Stew",
        slug: "chicken-stew",
        description: "Succulent chicken pieces simmered in a vibrant vegetable and coriander broth.",
        price: 400,
        category: "Main Dishes",
        image: "/images/chicken-stew.png",
        rating: 4.8,
        reviews: 245,
        prepTime: "25 min",
        tags: ["Comfort Food", "Chef Favorite"],
        options: {
            sides: ["Rice", "Chapati", "Ugali"]
        }
    },
    {
        id: "m6",
        name: "Matumbo Fry",
        slug: "matumbo-fry",
        description: "Cleansed tripe expertly sautéed with onions, peppers, and house seasoning.",
        price: 450,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        rating: 4.7,
        reviews: 156,
        prepTime: "20-25 min",
        tags: ["Heritage", "Flavorful"],
        options: {
            sides: ["Ugali", "Rice"]
        }
    },
    {
        id: "m7",
        name: "Smoked Beef (Aliya)",
        slug: "smoked-beef",
        description: "Traditional smoked beef strips cooked to tender perfection.",
        price: 400,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&q=80",
        rating: 4.8,
        reviews: 92,
        prepTime: "25 min",
        tags: ["Traditional", "Luo Heritage"],
        options: {
            sides: ["Ugali", "Managu"]
        }
    },
    {
        id: "m8",
        name: "Liver Curry",
        slug: "liver-curry",
        description: "Tender beef liver sautéed in a rich tomato and ginger curry sauce.",
        price: 450,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        rating: 4.7,
        reviews: 74,
        prepTime: "20 min",
        tags: ["Iron-Rich", "Flavorful"],
        options: {
            sides: ["Ugali", "Rice"]
        }
    },

    // Plain Dishes
    {
        id: "p1",
        name: "Swahili Pilau",
        slug: "swahili-pilau",
        description: "Fragrant rice cooked with beef cubes and a blend of heritage spices.",
        price: 250,
        category: "Plain Dishes",
        image: "/images/pilau.png",
        rating: 4.9,
        reviews: 412,
        prepTime: "15 min",
        tags: ["Spiced", "Bestseller"]
    },
    {
        id: "p2",
        name: "Matoke in Peanut Sauce",
        slug: "matoke-peanut",
        description: "Green bananas slow-cooked in a creamy peanut and tomato base.",
        price: 300,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
        rating: 4.7,
        reviews: 64,
        prepTime: "20 min",
        tags: ["Creamy", "Heritage"]
    },
    {
        id: "p3",
        name: "Authentic Githeri",
        slug: "githeri",
        description: "Hearty mix of maize and beans, slow-cooked with fresh vegetables.",
        price: 200,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
        rating: 4.6,
        reviews: 87,
        prepTime: "15 min",
        tags: ["Healthy", "Staple"]
    },
    {
        id: "p4",
        name: "White Ugali",
        slug: "ugali",
        description: "The quintessential Kenyan staple, made from premium maize flour.",
        price: 100,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
        rating: 4.9,
        reviews: 1200,
        prepTime: "10 min",
        tags: ["Staple", "Vegan"]
    },
    {
        id: "p5",
        name: "Steamed Rice",
        slug: "steamed-rice",
        description: "Fluffy, aromatic white rice. Perfect accompaniment for stews.",
        price: 150,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80",
        rating: 4.7,
        reviews: 85,
        prepTime: "15 min",
        tags: ["Sides", "Classic"]
    },
    {
        id: "p6",
        name: "Savan Mukimo",
        slug: "mukimo",
        description: "Creamy mash of maize, beans, potatoes, and pumpkin leaves.",
        price: 200,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
        rating: 4.8,
        reviews: 142,
        prepTime: "20 min",
        tags: ["Heritage", "Filling"]
    },
    {
        id: "p7",
        name: "Brown Ugali",
        slug: "brown-ugali",
        description: "Traditional millet or sorghum-based Ugali. High in fiber.",
        price: 150,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
        rating: 4.8,
        reviews: 85,
        prepTime: "12 min",
        tags: ["Whole Grain", "Traditional"]
    },

    // Special Dishes
    {
        id: "s1",
        name: "Special Mbuzi Fry",
        slug: "special-mbuzi",
        description: "Large portion of tender Mbuzi Fry served with Pilau or Matoke.",
        price: 600,
        category: "Special Dishes",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        rating: 4.9,
        reviews: 145,
        prepTime: "30-35 min",
        tags: ["Premium", "Feast"],
        options: {
            sides: ["Pilau", "Matoke in Peanut"]
        }
    },
    {
        id: "s2",
        name: "Special Chicken Stew",
        slug: "special-chicken",
        description: "Kienyeji-style chicken stew served with premium sides.",
        price: 600,
        category: "Special Dishes",
        image: "/images/chicken-stew.png",
        rating: 4.8,
        reviews: 67,
        prepTime: "30 min",
        tags: ["Luxury", "Traditional"],
        options: {
            sides: ["Pilau", "Mukimo"]
        }
    },

    // Hot Beverages
    {
        id: "h1",
        name: "Masala Ginger Tea",
        slug: "masala-tea",
        description: "Brewed Kenyan tea leaves with fresh ginger and aromatic spices.",
        price: 70,
        category: "Hot Beverages",
        image: "/images/masala-tea.png",
        rating: 4.9,
        reviews: 320,
        prepTime: "5 min",
        tags: ["Warming", "Must Try"]
    },
    {
        id: "h2",
        name: "Special Dawa",
        slug: "special-dawa",
        description: "Lemon, honey, and ginger medicinal tea. The ultimate wellness brew.",
        price: 100,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1544787210-2213d24265cc?w=800&q=80",
        rating: 4.8,
        reviews: 145,
        prepTime: "5-8 min",
        tags: ["Healthy", "Classic"]
    },
    {
        id: "h4",
        name: "Savan Lemon Tea",
        slug: "lemon-tea",
        description: "Refreshing black tea infused with fresh lemon zest and juice.",
        price: 80,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1544787210-2213d24265cc?w=800&q=80",
        rating: 4.7,
        reviews: 64,
        prepTime: "5 min",
        tags: ["Zesty", "Refreshing"]
    },
    {
        id: "h5",
        name: "Hot Savan Milk",
        slug: "hot-milk",
        description: "Pure, warm milk, perfectly frothed and comforting.",
        price: 70,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1517431525049-74e2a392095f?w=800&q=80",
        rating: 4.6,
        reviews: 42,
        prepTime: "3 min",
        tags: ["Pure", "Comfort"]
    },
    {
        id: "h3",
        name: "Heritage Porridge (Uji)",
        slug: "uji",
        description: "Fermented millet porridge, rich in nutrients and tradition.",
        price: 50,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
        rating: 4.7,
        reviews: 112,
        prepTime: "5 min",
        tags: ["Nutritious", "Traditional"]
    },

    // Cold Drinks
    {
        id: "c1",
        name: "Natural Spring Water",
        slug: "spring-water",
        description: "Pure, chilled water. Available in 500ml or 1L.",
        price: 70,
        category: "Cold Drinks",
        image: "https://images.unsplash.com/photo-1523362628742-0c297f112f1d?w=800&q=80",
        rating: 4.9,
        reviews: 320,
        prepTime: "1 min",
        tags: ["Hydration", "Pure"]
    },
    {
        id: "c2",
        name: "Exotic Hibiscus Juice",
        slug: "hibiscus-juice",
        description: "Chilled Zobo-style juice infused with mint and citrus.",
        price: 150,
        category: "Cold Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf76589fd8?w=800&q=80",
        rating: 4.8,
        reviews: 95,
        prepTime: "2 min",
        tags: ["Refreshing", "Artisanal"]
    },
    {
        id: "c3",
        name: "Kenyan Heritage Soda",
        slug: "heritage-soda",
        description: "Classic selection: Coca-Cola, Sprite, or Stoney Tangawizi.",
        price: 80,
        category: "Cold Drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
        rating: 4.7,
        reviews: 184,
        prepTime: "1 min",
        tags: ["Classic", "Chilled"]
    }
]

export const CATEGORIES = [
    "All",
    "Breakfast Snacks",
    "Main Dishes",
    "Plain Dishes",
    "Special Dishes",
    "Hot Beverages",
    "Cold Drinks"
]
