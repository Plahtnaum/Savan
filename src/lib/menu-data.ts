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
    {
        id: "m1",
        name: "Beef Fry",
        slug: "beef-fry",
        description: "Tender beef chunks fried with onions, tomatoes, and Dania. Served with your choice of side.",
        price: 400,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        rating: 4.8,
        reviews: 124,
        prepTime: "20-25 min",
        tags: ["Bestseller", "Local Favorite"],
        options: {
            sides: ["Ugali", "Rice", "Chapati", "Mukimo"],
            spiceLevels: ["Mild", "Medium", "Hot"]
        }
    },
    {
        id: "m2",
        name: "Chicken Wet Fry",
        slug: "chicken-wet-fry",
        description: "Kienyeji chicken slow-cooked in a rich tomato and onion gravy.",
        price: 500,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
        rating: 4.7,
        reviews: 89,
        prepTime: "30-40 min",
        tags: ["Organic"],
        options: {
            sides: ["Ugali", "Rice", "Chapati"],
            spiceLevels: ["Mild", "Medium", "Hot"]
        }
    },
    {
        id: "m3",
        name: "Tilapia Wet Fry",
        slug: "tilapia-wet",
        description: "Fresh Lake Victoria Tilapia fried then stewed in traditional sauce.",
        price: 600,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
        rating: 4.9,
        reviews: 210,
        prepTime: "25-30 min",
        tags: ["Fresh Fish"],
        options: {
            sides: ["Ugali", "Greens"]
        }
    },
    {
        id: "m4",
        name: "Pilau na Nyama",
        slug: "pilau-beef",
        description: "Spiced rice cooked with beef cubes, served with Kachumbari.",
        price: 350,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
        rating: 4.6,
        reviews: 75,
        prepTime: "15 min",
        tags: ["Spicy"]
    },
    {
        id: "m5",
        name: "Matumbo Stew",
        slug: "matumbo",
        description: "Tripe stew cooked to perfection with soft peppers.",
        price: 300,
        category: "Main Dishes",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
        rating: 4.5,
        reviews: 45,
        prepTime: "20 min",
        tags: [],
        options: {
            sides: ["Ugali", "Rice", "Chapati"]
        }
    },
    {
        id: "m6",
        name: "Chapati",
        slug: "chapati",
        description: "Soft layered flatbread.",
        price: 50,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.9,
        reviews: 300,
        prepTime: "5 min",
        tags: []
    },
    {
        id: "m7",
        name: "Samosa (Beef)",
        slug: "samosa-beef",
        description: "Crispy pastry filled with minced spiced beef.",
        price: 50,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        rating: 4.8,
        reviews: 150,
        prepTime: "5 min",
        tags: []
    }
]

export const CATEGORIES = [
    "All",
    "Main Dishes",
    "Breakfast",
    "Sides",
    "Snacks",
    "Beverages"
]
