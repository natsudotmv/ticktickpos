package database

import (
	"log"

	"github.com/natsudotmv/ticktickpos/internal/models"
	"golang.org/x/crypto/bcrypt"
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
		{Name: "Coca Cola", Price: 1.99, CategoryId: categories[0].ID, IsAvailable: true},
		{Name: "Fanta", Price: 1.89, CategoryId: categories[0].ID, IsAvailable: false},
		{Name: "Sprite", Price: 1.79, CategoryId: categories[0].ID, IsAvailable: true},
		{Name: "Chiken Musroom Pizza", Price: 8.99, CategoryId: categories[1].ID, IsAvailable: true},
		{Name: "Tandoori Pizza", Price: 9.99, CategoryId: categories[1].ID, IsAvailable: true},
		{Name: "Chili Chicken Pizza", Price: 10.49, CategoryId: categories[1].ID, IsAvailable: true},
		{Name: "Chicken Burger", Price: 7.99, CategoryId: categories[2].ID, IsAvailable: true},
		{Name: "Beef Burger", Price: 6.99, CategoryId: categories[2].ID, IsAvailable: true},
	}

	for i := range items {
		DB.Create(&items[i])
	}

	password := "000000"
	hashedPin, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("failed to hash pin:", err)
	}

	user := models.User{
		Username: "admin",
		PinHash:  string(hashedPin),
		Role:     "admin",
	}
	result := DB.Where("username = ?", user.Username).FirstOrCreate(&user)
	if result.Error != nil {
		log.Fatal("failed to seed user:", result.Error)
	}

	log.Println("Database seeding completed")
}
