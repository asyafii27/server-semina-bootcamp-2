const Categories = require('./model');
const mongoose = require('mongoose');

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Categories.create({ name });
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await Categories.find();

        res.status(200).json({
            status: 'OK',
            message: 'SUkses',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const result = await Categories.findOne({ _id: id });

        if (!result) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({
            status: 'OK',
            message: 'Success',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await Categories.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Data not found' });
        }

        const response = await Categories.findOneAndUpdate(
            { _id: id },
            { name: name },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            data: response,
        });

    } catch (err) {
        next(err);
    }
}

const deestroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Categories.findByIdAndDelete(id);

        res.status(204).json({
            data: []
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    find,
    create,
    update,
    deestroy
}