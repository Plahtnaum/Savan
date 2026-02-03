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
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.9,
        reviews: 320,
        prepTime: "5-10 min",
        tags: ["Staple", "Vegetarian"]
    },
    {
        id: "b2",
        name: "Beef Samosa",
        slug: "samosa",
        description: "Crispy pastry pockets filled with spiced minced beef and herbs.",
        price: 50,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
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
        description: "Boiled arrowroot, served warm and earthy. A healthy heritage choice.",
        price: 100,
        category: "Breakfast Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.6,
        reviews: 42,
        prepTime: "10 min",
        tags: ["Healthy", "Heritage"]
    },

    // Main Dishes
    {
        id: "m1",
        name: "Fish Wet Fry",
        slug: "fish-wet-fry",
        description: "Fresh Tilapia pan-seared then stewed in a rich tomato, onion, and cilantro gravy.",
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
        description: "Traditional African nightshade and seasonal greens, cooked with cream.",
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

    // Plain Dishes
    {
        id: "p1",
        name: "Swahili Pilau",
        slug: "swahili-pilau",
        description: "Fragrant rice cooked with beef cubes and a blend of heritage spices.",
        price: 250,
        category: "Plain Dishes",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
        rating: 4.8,
        reviews: 185,
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

    // Hot Beverages
    {
        id: "h1",
        name: "Masala Ginger Tea",
        slug: "masala-tea",
        description: "Brewed Kenyan tea leaves with fresh ginger and aromatic spices.",
        price: 70,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1544787210-2213d24265cc?w=800&q=80",
        rating: 4.9,
        reviews: 210,
        prepTime: "5 min",
        tags: ["Warming", "Must Try"]
    },
    {
        id: "h2",
        name: "Special Dawa",
        slug: "special-dawa",
        description: "Lemon, honey, and ginger medicinal tea. Perfect for any weather.",
        price: 100,
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1544787210-2213d24265cc?w=800&q=80",
        rating: 4.8,
        reviews: 145,
        prepTime: "5-8 min",
        tags: ["Healthy", "Classic"]
    }
]

export const CATEGORIES = [
    "All",
    "Breakfast Snacks",
    "Main Dishes",
    "Plain Dishes",
    "Hot Beverages",
    "Cold Drinks"
]
