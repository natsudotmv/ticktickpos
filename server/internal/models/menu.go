package models

type MenuItem struct {
	ID          int     `json:"id" gorm:"primaryKey"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	IsAvailable bool    `json:"is_available"`
	CategoryId  int     `json:"category_id"`
}

type MenuCategory struct {
	ID    int        `json:"id" gorm:"primaryKey"`
	Name  string     `json:"name"`
	Items []MenuItem `json:"items" gorm:"foreignKey:CategoryID"`
}
