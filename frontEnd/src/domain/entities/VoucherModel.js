class VoucherEntity {
    constructor(data = {}) {
        // Core Info
        this._id = data._id || null;
        this.code = (data.code || '').toUpperCase().trim();
        this.isActive = data.isActive !== undefined ? data.isActive : true;

        // Discount Logic
        this.discountType = data.discountType || 'percentage'; // 'percentage' or 'fixed'
        this.discountValue = data.discountValue || 0;
        this.minOrderValue = data.minOrderValue || 0;

        // Usage Limits
        this.maxUses = data.maxUses || 1;
        this.usedCount = data.usedCount || 0;

        // Dates
        this.startDate = data.startDate ? new Date(data.startDate) : new Date();
        this.expirationDate = data.expirationDate ? new Date(data.expirationDate) : null;

        // Metadata
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }

    /**
     * Checks if the voucher is currently valid based on date and usage
     */
    isValid() {
        const now = new Date();
        const hasUsesLeft = this.usedCount < this.maxUses;
        const isStarted = now >= this.startDate;
        const isNotExpired = this.expirationDate ? now <= this.expirationDate : true;

        return this.isActive && hasUsesLeft && isStarted && isNotExpired;
    }

    /**
     * Calculates the discount amount for a given order total
     */
    calculateDiscount(orderTotal) {
        if (!this.isValid() || orderTotal < this.minOrderValue) {
            return 0;
        }

        if (this.discountType === 'percentage') {
            return (orderTotal * this.discountValue) / 100;
        } else {
            // Ensure discount doesn't exceed order total
            return Math.min(this.discountValue, orderTotal);
        }
    }

    /**
     * Gets a human-readable description of the voucher
     */
    getDisplayLabel() {
        const typeLabel = this.discountType === 'percentage' ? '%' : ' OFF';
        return `${this.code}: ${this.discountValue}${typeLabel}`;
    }
}

export default VoucherEntity;