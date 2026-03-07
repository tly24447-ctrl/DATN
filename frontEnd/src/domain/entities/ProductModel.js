class ProductEntity {
    constructor(data = {}) {
        // Core Product Info
        this._id = data._id || null;
        this.name = data.name || '';
        this.image = data.image || '';
        this.description = data.description || '';
        
        // Relationship (can be an ID string or a populated Category object)
        this.category = data.category || null;

        // Book-Specific Fields
        this.author = data.author || '';
        this.publisher = data.publisher || '';
        this.publicationDate = data.publicationDate ? new Date(data.publicationDate) : null;
        this.isbn = data.isbn || '';
        this.pageCount = data.pageCount || 0;
        this.language = data.language || 'English';
        this.format = data.format || 'Paperback';

        // Inventory and Pricing
        this.price = data.price || 0;
        this.countInStock = data.countInStock || 0;
        this.discount = data.discount || 0;
        this.rating = data.rating || 0;
        this.selled = data.selled || 0;

        // Metadata
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }

    /**
     * Helper to calculate price after discount
     */
    getFinalPrice() {
        if (this.discount > 0) {
            return this.price - (this.price * this.discount) / 100;
        }
        return this.price;
    }

    /**
     * Formats the publication date for display
     */
    getDisplayDate() {
        return this.publicationDate 
            ? this.publicationDate.toLocaleDateString() 
            : 'N/A';
    }
}

export default ProductEntity;