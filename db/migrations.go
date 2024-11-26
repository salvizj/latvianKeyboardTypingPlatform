package db

import (
	"fmt"
	"os"
)

type Table struct {
	name  string
	query string
}

var tables = []Table{
	{
		name: "Lessons",
		query: `
			CREATE TABLE Lessons (
				lessonId INTEGER PRIMARY KEY,
				lessonText TEXT NOT NULL
			);
		`,
	},
	{
		name: "LessonProgress",
		query: `
			CREATE TABLE LessonProgress (
				lessonProgressId INTEGER PRIMARY KEY,
				userId TEXT NOT NULL,
				lessonId INTEGER NOT NULL,
				isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
				FOREIGN KEY (lessonId) REFERENCES Lessons(lessonId)
			);
		`,
	},
	{
		name: "PoetTexts",
		query: `
			CREATE TABLE PoetTexts (
				poetTextid INTEGER PRIMARY KEY,
				poetAuthor TEXT NOT NULL,
				poetFragmentName TEXT NOT NULL,
				poetTextContent TEXT NOT NULL
			);
		`,
	},
	{
		name: "TypingTest",
		query: `
			CREATE TABLE TypingTest (
				typingTestId INTEGER PRIMARY KEY,          
				userId TEXT NOT NULL,                           
				typingTestSettingsId INTEGER NOT NULL,         
				wpm INTEGER NOT NULL,   
				mistakeCount INTEGER NOT NULL,      
				timestamp INTEGER NOT NULL,                  
				FOREIGN KEY (typingTestSettingsId) REFERENCES TypingTestSettings(typingTestSettingsId)
			);
		`,
	},
	{
		name: "TypingRace",
		query: `
			CREATE TABLE TypingRace (
				typingRaceId TEXT NOT NULL,   
				typingRaceSettingsId INTEGER NOT NULL,      
				timestamp INTEGER NOT NULL,                
				FOREIGN KEY (typingRaceSettingsId) REFERENCES TypingRaceSettings(typingRaceSettingsId)
			);
		`,
	},
	{
		name: "TypingTestSettings",
		query: `
			CREATE TABLE TypingTestSettings (
				typingTestSettingsId INTEGER PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES PoetTexts(poetTextId)
);
		`,
	},
	{
		name: "TypingRaceSettings",
		query: `
			CREATE TABLE TypingRaceSettings (
				typingRaceSettingsId INTEGER PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				maxPlayerCount INTEGER NOT NULL,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES PoetTexts(poetTextId)
			);
		`,
	},
	{
		name: "TypingRacePlayer",
		query: `
			CREATE TABLE TypingRacePlayer (
				typingRacePlayerid TEXT PRIMARY KEY,
				typingRaceId TEXT NOT NULL,
				username TEXT NOT NULL,
				userId TEXT NOT NULL,
				role TEXT NOT NULL,
				place INTEGER NOT NULL,
				mistakeCount INTEGER NOT NULL,
				wpm INTEGER NOT NULL,
				typingRaceSettingsId INTEGER NOT NULL,
				FOREIGN KEY (typingRaceId) REFERENCES TypingRace(typingRaceId)
			);
		`,
	},
}

func tableExists(tableName string) bool {
	var exists bool
	query := fmt.Sprintf("SELECT COUNT(*) > 0 FROM sqlite_master WHERE type='table' AND name='%s';", tableName)
	err := DB.QueryRow(query).Scan(&exists)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error checking if table %s exists: %v\n", tableName, err)
		return false
	}
	return exists
}

func createTable(tableName, tableQuery string) {
	// check if the table exists
	if tableExists(tableName) {
		fmt.Printf("Table %s already exists. Skipping creation.\n", tableName)
		return
	}

	// create the table if it doesn't exist
	if result, err := DB.Exec(tableQuery); err != nil {
		fmt.Fprintf(os.Stderr, "Error creating %s table: %v\n", tableName, err)
	} else {
		rowsAffected, _ := result.RowsAffected()
		lastInsertID, _ := result.LastInsertId()

		fmt.Printf("Table %s created successfully. Rows affected: %d, Last Insert ID: %d\n",
			tableName, rowsAffected, lastInsertID)
	}
}

func CreateTables() {
	for _, table := range tables {
		createTable(table.name, table.query)
	}
}
