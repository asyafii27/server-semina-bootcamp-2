// import model Events
const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalents } = require("./talents");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async (req) => {
    const { keyword, category, talent, keypoint, ticketType } = req.query;
    let condition = {};

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: "i" } };
    }

    if (category) {
        condition = { ...condition, category: category };
    }

    if (talent) {
        condition = { ...condition, talent: talent };
    }

    if (keypoint) {
        condition = { ...condition, keyPoint: { $in: [keypoint] } };
    }

    if (ticketType) {
        condition = { ...condition, tickets: { $elemMatch: { type: ticketType } } };
    }

        const result = await Events.find(condition)
            .populate({ path: "image", select: "_id name" })
            .populate({
                path: "category",
                select: "_id name",
            })
            .populate({
                path: "talent",
                select: "_id name role image",
                populate: { path: "image", select: "_id  name" },
            });

        return result;
    };

    const createEvents = async (req) => {
        const {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
        } = req.body;

        // cari image, category dan talent dengan field id
        await checkingImage(image);
        await checkingCategories(category);
        await checkingTalents(talent);

        // cari Events dengan field name
        const check = await Events.findOne({ title });

        // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
        if (check) throw new BadRequestError("judul event duplikat");

        const result = await Events.create({
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
        });

        return result;
    };

    const getOneEvents = async (req) => {
        const { id } = req.params;

        const result = await Events.findOne({ _id: id })
            .populate({ path: "image", select: "_id name" })
            .populate({
                path: "category",
                select: "_id name",
            })
            .populate({
                path: "talent",
                select: "_id name role image",
                populate: { path: "image", select: "_id  name" },
            });

        if (!result)
            throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

        return result;
    };

    const updateEvents = async (req) => {
        const { id } = req.params;
        const {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
        } = req.body;

        // cari image, category dan talent dengan field id
        await checkingImage(image);
        await checkingCategories(category);
        await checkingTalents(talent);

        // cari Events dengan field name dan id selain dari yang dikirim dari params
        const check = await Events.findOne({
            title,
            _id: { $ne: id },
        });

        // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
        if (check) throw new BadRequestError("judul event duplikat");

        const result = await Events.findOneAndUpdate(
            { _id: id },
            {
                title,
                date,
                about,
                tagline,
                venueName,
                keyPoint,
                statusEvent,
                tickets,
                image,
                category,
                talent,
            },
            { new: true, runValidators: true }
        );

        // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
        if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

        return result;
    };

    const deleteEvents = async (req) => {
        const { id } = req.params;

        const result = await Events.findOne({
            _id: id,
        });

        if (!result)
            throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

        await result.deleteOne();

        return result;
    };

    module.exports = {
        getAllEvents,
        createEvents,
        getOneEvents,
        updateEvents,
        deleteEvents,
    };
