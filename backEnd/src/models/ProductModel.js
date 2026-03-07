const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        category: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category', 
            required: false 
        },
        // --- Book Related Fields ---
        author: { type: String, required: true },
        publisher: { type: String },
        publicationDate: { type: Date },
        isbn: { type: String, unique: true, sparse: true }, // sparse allows multiple nulls if not a book
        pageCount: { type: Number },
        language: { type: String, default: 'English' },
        format: { type: String, enum: ['Hardcover', 'Paperback', 'E-book', 'Audiobook'] },
        // ---------------------------
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true, default: 0 },
        description: { type: String },
        discount: { type: Number, default: 0 },
        selled: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;