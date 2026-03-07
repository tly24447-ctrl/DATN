class CategoryModel {
    constructor(data = {}) {
        this._id = data._id || null;
        this.name = data.name || "";
        this.description = data.description || "";
        this.image = data.image || "";
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }
}

export default CategoryModel;