from django.core.management.base import BaseCommand
import random
from apps.product.models import Category, Brand, Product

class Command(BaseCommand):
    help = 'Seed the database with categories, brands, and products'

    def handle(self, *args, **kwargs):
        # Categories and sample data
        categories = [
            ("Electronics", "electronics"),
            ("Fashion", "fashion"),
            ("Home Appliances", "home-appliances"),
            ("Books", "books"),
            ("Groceries", "groceries"),
            ("Toys", "toys"),
            ("Sports & Fitness", "sports-fitness"),
            ("Beauty & Personal Care", "beauty-personal-care"),
            ("Automotive", "automotive"),
            ("Office Supplies", "office-supplies"),
        ]

        products_per_category = {
            "Electronics": ["iPhone 14", "Samsung Galaxy S23", "MacBook Air M2", "Sony WH-1000XM5", "Kindle Paperwhite", "iPad Pro", "GoPro Hero 11", "DJI Mini 3", "Google Pixel 7", "Dell XPS 13"],
            "Fashion": ["Levi's Jeans", "Nike Air Max", "Adidas Hoodie", "Zara Dress", "Puma Sneakers", "H&M T-Shirt", "Ray-Ban Sunglasses", "Guess Wallet", "Fossil Watch", "Allen Solly Shirt"],
            "Home Appliances": ["LG Refrigerator", "Samsung Washing Machine", "Dyson Vacuum Cleaner", "IFB Microwave", "Philips Air Fryer", "Prestige Induction Cooktop", "Bajaj Mixer Grinder", "Eureka Forbes Water Purifier", "Voltas AC", "Havells Ceiling Fan"],
            "Books": ["Atomic Habits", "The Alchemist", "Rich Dad Poor Dad", "1984", "Sapiens", "To Kill a Mockingbird", "The Power of Now", "Ikigai", "The Subtle Art of Not Giving a F*ck", "Harry Potter"],
            "Groceries": ["Fortune Rice Bran Oil", "Aashirvaad Atta", "Tata Salt", "Nestle Everyday", "Amul Butter", "MDH Masala", "Kissan Jam", "Red Label Tea", "Maggi Noodles", "Bru Coffee"],
            "Toys": ["Lego Classic Set", "Hot Wheels Cars", "Barbie Doll", "Play-Doh Pack", "Nerf Gun", "Rubik's Cube", "Remote Control Car", "Uno Cards", "Jenga Game", "Fidget Spinner"],
            "Sports & Fitness": ["Yonex Badminton Racket", "Nivia Football", "Cosco Basketball", "Head Tennis Racket", "SG Cricket Bat", "Adidas Yoga Mat", "Decathlon Dumbbells", "HRX Gym Bag", "Speedo Swim Goggles", "Fitbit Tracker"],
            "Beauty & Personal Care": ["Lakme Lipstick", "Maybelline Foundation", "Nivea Body Lotion", "Dove Shampoo", "L'Oreal Conditioner", "Beardo Beard Oil", "Mamaearth Face Wash", "Plum Night Cream", "The Body Shop Scrub", "Garnier Sheet Mask"],
            "Automotive": ["Bosch Wipers", "Castrol Engine Oil", "Philips Headlights", "Amaron Car Battery", "Michelin Tyres", "Hero Helmet", "3M Car Care Kit", "Autofy Seat Cover", "Turtle Wax Polish", "CEAT Tubeless Tyre"],
            "Office Supplies": ["Classmate Notebook", "Parker Pen", "Canon Printer", "HP Ink Cartridge", "Kangaro Stapler", "Post-it Notes", "JK A4 Paper", "Casio Calculator", "Zebra Highlighter", "Wipro Desk Lamp"],
        }

        brand_names = [
            "Apple", "Samsung", "Sony", "Nike", "Adidas",
            "LG", "Philips", "AmazonBasics", "Dell", "HP"
        ]

        brands = {}
        for brand in brand_names:
            brands[brand] = Brand.objects.get_or_create(name=brand)[0]

        for cat_name, slug in categories:
            category, _ = Category.objects.get_or_create(name=cat_name, slug=slug)

            product_names = products_per_category[cat_name]
            for pname in product_names:
                brand = random.choice(list(brands.values()))
                price = round(random.uniform(10.0, 1500.0), 2)
                stock = random.randint(10, 100)
                Product.objects.get_or_create(
                    name=pname,
                    slug=pname.lower().replace(" ", "-"),
                    category=category,
                    brand=brand,
                    defaults={
                        "description": f"This is a sample product: {pname}.",
                        "price": price,
                        "stock": stock,
                        "is_available": True
                    }
                )

        self.stdout.write(self.style.SUCCESS("✔ Seeded 10 categories, 10 brands, and 100 products successfully."))
