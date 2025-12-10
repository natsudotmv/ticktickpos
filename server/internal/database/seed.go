package database

import (
	"log"

	"github.com/natsudotmv/ticktickpos/internal/models"
)

func SeedDatabase() {
	var count int64
	DB.Model(&models.MenuCategory{}).Count(&count)

	if count > 0 {
		log.Println("Database already seeded. Skipping seeding process.")
		return
	}

	log.Println("Seeding database")

	categories := []models.MenuCategory{
		{Name: "Drinks"},
		{Name: "Pizza"},
		{Name: "Burger"},
	}

	for i := range categories {
		DB.Create(&categories[i])
	}

	items := []models.MenuItem{
		{Name: "Coca Cola", Price: 1.99, CategoryId: categories[0].ID},
		{Name: "Fanta", Price: 1.89, CategoryId: categories[0].ID},
		{Name: "Sprite", Price: 1.79, CategoryId: categories[0].ID},
		{Name: "Chiken Musroom Pizza", Price: 8.99, CategoryId: categories[1].ID},
		{Name: "Tandoori Pizza", Price: 9.99, CategoryId: categories[1].ID},
		{Name: "Chili Chicken Pizza", Price: 10.49, CategoryId: categories[1].ID},
		{Name: "Chicken Burger", Price: 7.99, CategoryId: categories[2].ID},
		{Name: "Beef Burger", Price: 6.99, CategoryId: categories[2].ID},
	}

	for i := range items {
		DB.Create(&items[i])
	}

	log.Println("Database seeding completed")
}
