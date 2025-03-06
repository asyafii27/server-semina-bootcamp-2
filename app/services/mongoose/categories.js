const Categories = require('../../api/v1/categories/model');
const mongoose = require('mongoose');

const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
}

const createCategories = async (req) => {
    const { name } = req.body;

    const check = await Categories.findOne({ name });

    if (check) throw new BadRequestError('Category name already exists');

    const result = await Categories.create({ name });

    return result;
}

const getOneCategories = async (req) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID format');

    const result = await Categories.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada data kategori dengan id: ${id}`);

    return result;
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // cari category denggan field name dan id selain dari yang dikirim dari params
    const check = await Categories.findOne({
        name,
        _id: { $ne: id }, //fungsi dari $ne adalah mencari semua id kecuali id dia sendiri
    });

    // apabila check = true atau data categories sudah ada, maka kita tampilkan error bad request 
    if (check) throw new BadRequestError('Category name already exists');

    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name: name },
        { new: true, runValidators: true }
    );

    //jika id result false atau null maka akan menampilkan error 'tidak ada kategori dengan id $variabele id'
    if (!result) throw new NotFoundError(`Tidak ada data kategori dengan id: ${id}`);

    return result;
}

const deleteCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError(`Tidak ada data kategori dengan id: ${id}`);

    await result.deleteOne();

    return result;
}

const checkingCategories = async (id) => {
    const result = await Categories.findOne({ _id: id });

    if (!result)  throw new NotFoundError(`Tidak ada data kategori dengan id: ${id}`);

    return result;
}

module.exports = { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories, checkingCategories };