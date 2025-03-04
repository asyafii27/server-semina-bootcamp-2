const Categories = require('../../api/v1/categories/model');
const getAllCategories = async (req, res, next) => {
    const result = await Categories.find();

    return result;
}

const createCategories = async (req, res, next) => {
    
}

module.exports = { getAllCategories };