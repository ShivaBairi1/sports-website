const Achievement = require('../models/achievement');
const {  Player, User } = require('../models');
const createAchievement = async (req, res) => {
    const { playerId } = req.params;
    const { title, description } = req.body;
    const image_url = req.file ? req.file.path : null;
    try {
        const achievement = await Achievement.create({
            title,
            description,
            image_url,
            player_id: playerId,
        });
        res.status(201).send(achievement);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.findAll();
        res.send(achievements);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateAchievement = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const image_url = req.file ? req.file.path : null;
    try {
        const achievement = await Achievement.findByPk(id);
        if (!achievement || achievement.user_id !== req.user.user_id) {
            return res.status(404).send({ error: 'Achievement not found or not authorized' });
        }
        achievement.title = title;
        achievement.description = description;
        achievement.image_url = image_url;
        await achievement.save();
        res.send(achievement);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteAchievement = async (req, res) => {
    const { id } = req.params;
    try {
        const achievement = await Achievement.findByPk(id);
        if (!achievement || achievement.user_id !== req.user.user_id) {
            return res.status(404).send({ error: 'Achievement not found or not authorized' });
        }
        await achievement.destroy();
        res.send({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createAchievement, getAchievements, updateAchievement, deleteAchievement };
