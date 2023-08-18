// Inventory Model
const InventoryItemSchema = {
    name: String,
    description: String,
    category: String,
    barcode: String,
    quantity: Number,
    price: Number,
    supplier: {
      name: String,
      email: String,
      phone: String
    },
    location: {
      aisle: String,
      shelf: String
    },
    notes: String,
    createdAt: Date,
    updatedAt: Date
  };
  
  // Store Model
  const StoreSchema = {
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    inventory: [InventoryItemSchema]
  };
  