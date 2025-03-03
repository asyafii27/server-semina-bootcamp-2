const Categories = require('../../models/categories');
const getAllCategories = async (req, res, next) => {
    const result = await Categories.find();
}