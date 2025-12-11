package models

type User struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Username string `json:"username" gorm:"not null;unique"`
	PinHash  string `json:"pin_hash" gorm:"not null"`
	Role     string `json:"role" gorm:"not null"`
}
