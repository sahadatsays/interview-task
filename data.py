import json
import random

# Define the base data to randomize
sizes = ["small", "medium", "large", "extra-large"]
materials = ["cotton", "polyester", "wool", "silk"]
colors = ["red", "blue", "green", "yellow", "purple", "black"]
prices = [19.99, 25.99, 29.99, 39.99, 49.99]
stocks = [25, 50, 75, 100, 150]
variant_images = ""
product_images = ""

# Generate the data
data = []

for i in range(1, 10000):
    size = random.choice(sizes)
    material = random.choice(materials)
    variant_color = random.choice(colors)
    variant_size = random.choice(sizes)
    price = random.choice(prices)
    stock = random.choice(stocks)

    attributes = {"size": size, "material": material}
    choice_options = {"color": colors[:random.randint(2, 6)], "size": sizes[:random.randint(2, 4)]}
    variant = f"{variant_color.capitalize()} {variant_size.capitalize()}"

    entry = {
        "attributes": json.dumps(attributes),
        "choice_options": json.dumps(choice_options),
        "colors": json.dumps(colors[:random.randint(2, 6)]),
        "variant": variant,
        "price": price,
        "stock": stock,
        "product_images": product_images,
        "variant_images": variant_images,
    }
    data.append(entry)

# Write data to CSV file
import csv

with open("products.csv", "w", newline='') as csvfile:
    fieldnames = ["attributes", "choice_options", "colors", "variant", "price", "stock", "variant_images", "product_images"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for entry in data:
        writer.writerow(entry)
