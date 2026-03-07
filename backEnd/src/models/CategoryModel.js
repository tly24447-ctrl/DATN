const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        image: { type: String }, // Optional: If you want to show category icons
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;