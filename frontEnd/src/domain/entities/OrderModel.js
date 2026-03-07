class OrderModel {
    constructor(data = {}) {
        // Main Order Info
        this._id = data._id || null;
        this.user = data.user || null; // Usually an ID or populated User object
        this.paymentMethod = data.paymentMethod || 'COD';
        
        // Prices
        this.itemsPrice = data.itemsPrice || 0;
        this.shippingPrice = data.shippingPrice || 0;
        this.totalPrice = data.totalPrice || 0;

        // Status
        this.isPaid = data.isPaid || false;
        this.paidAt = data.paidAt || null;
        this.isDelivered = data.isDelivered || false;
        this.deliveredAt = data.deliveredAt || null;

        // Nested Objects
        this.shippingAddress = {
            fullName: data.shippingAddress?.fullName || '',
            address: data.shippingAddress?.address || '',
            city: data.shippingAddress?.city || '',
            phone: data.shippingAddress?.phone || ''
        };

        // Arrays (Order Items)
        this.orderItems = Array.isArray(data.orderItems) 
            ? data.orderItems.map(item => ({
                product: item.product || '',
                name: item.name || '',
                amount: item.amount || 1,
                image: item.image || '',
                price: item.price || 0,
                discount: item.discount || 0
            })) 
            : [];

        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }

    /**
     * Helper to check if the order is completed
     */
    isCompleted() {
        return this.isPaid && this.isDelivered;
    }
}

export default OrderModel;