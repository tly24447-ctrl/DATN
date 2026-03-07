class UserEntity {
    constructor(data = {}) {
        // Identity & Security
        this._id = data._id || null;
        this.name = data.name || '';
        this.email = data.email || '';
        // Note: We typically don't store the password in the frontend entity 
        // for security, but we keep the field if needed for registration forms.
        this.password = data.password || ''; 
        
        // Permissions
        this.isAdmin = data.isAdmin || false;

        // Contact & Location
        this.phone = data.phone || '';
        this.address = data.address || '';
        this.city = data.city || '';
        this.avatar = data.avatar || '';

        // Metadata
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }

    /**
     * Returns a fallback image if the user hasn't set an avatar
     */
    getAvatar() {
        return this.avatar || 'https://via.placeholder.com/150?text=User';
    }

    /**
     * Formats the display name, falling back to email if name is empty
     */
    getDisplayName() {
        return this.name || this.email.split('@')[0];
    }
}

export default UserEntity;