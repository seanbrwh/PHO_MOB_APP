# Sequelize Cheatsheet

## 1. Project Initialization

```bash
# Initialize a new Sequelize project
npx sequelize-cli init
```

This creates:

- `/config` - Database configuration
- `/models` - Model definitions
- `/migrations` - Database migrations
- `/seeders` - Data seeders

## 2. Model & Migration Generation

```bash
# Generate model and migration
npx sequelize-cli model:generate --name User --attributes name:string,email:string
```

## 3. Migration Commands

```bash
# Run pending migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all
```

## 4. Creating Tables Programmatically

### Model Definition

```javascript
// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  })
  return Product
}
```

### Sync Model

```javascript
const { sequelize, Product } = require('./models')

sequelize
  .sync({ force: true }) // force: true drops existing tables
  .then(() => console.log('Tables created'))
  .catch((error) => console.log('Error:', error))
```

## 5. Adding Columns

### Via Migration (CLI)

```bash
# Generate migration
npx sequelize-cli migration:generate --name add-column-to-users
```

```javascript
// migrations/XXXXXX-add-column-to-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'newColumn', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'newColumn')
  }
}
```

### Programmatically

```javascript
const { sequelize } = require('./models')

async function addColumn() {
  await sequelize.getQueryInterface().addColumn('Users', 'age', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
}
```

## 6. Manual Migration Creation

```bash
# Generate empty migration
npx sequelize-cli migration:generate --name migration-name
```

```javascript
// migrations/XXXXXX-migration-name.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NewTable', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NewTable')
  }
}
```

## 7. Dropping Tables

```javascript
// migrations/XXXXXX-drop-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TableName')
  },
  down: async (queryInterface, Sequelize) => {
    // Define table recreation for rollback if needed
  }
}
```

## 8. Model Sync Options

```javascript
// Basic sync
sequelize.sync()

// Force sync (drops and recreates tables)
sequelize.sync({ force: true })

// Alter sync (modifies existing tables)
sequelize.sync({ alter: true })
```

## Common Data Types

```javascript
const { DataTypes } = require('sequelize');

// Common data types
{
  string: DataTypes.STRING,           // VARCHAR(255)
  text: DataTypes.TEXT,              // TEXT
  integer: DataTypes.INTEGER,        // INTEGER
  float: DataTypes.FLOAT,            // FLOAT
  decimal: DataTypes.DECIMAL(10,2),  // DECIMAL
  date: DataTypes.DATE,              // DATETIME
  boolean: DataTypes.BOOLEAN,        // BOOLEAN
  json: DataTypes.JSON,              // JSON
  uuid: DataTypes.UUID               // UUID
}
```
