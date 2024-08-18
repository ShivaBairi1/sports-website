const News = require('../models/news');
const Sport = require('../models/sport');

const createNewsItem = async (req, res) => {
    const { title, content, sport_id } = req.body;
    const adminId = req.user.user_id; // Assuming you have authentication in place
    const bannerImage = req.file ? req.file.filename : null;

    try {
        // Check if the sport_id exists
        const sport = await Sport.findByPk(sport_id);
        if (!sport) {
            return res.status(400).json({ error: 'Sport category not found.' });
        }

        const newsItem = await News.create({
            title,
            content,
            sport_id, // Link news to the selected sport
            banner_image_url: bannerImage ? `/uploads/${bannerImage}` : null,
            admin_id: adminId,
            date: new Date() // Assuming you want to set the date to now
        });

        res.status(201).json(newsItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create news item.' });
    }
};

const getAllNewsPosts = async (req, res) => {
    try {
        // Include the sport model to show which sport each news item is associated with
        const newsPosts = await News.findAll({
            include: {
                model: Sport,
                attributes: ['name'], // Just include the sport's name
            }
        });

        res.status(200).json(newsPosts);
    } catch (error) {
        console.error('Error fetching news posts:', error);
        res.status(500).json({ error: 'Failed to fetch news posts' });
    }
};

const getNewsItemsBySport = async (req, res) => {
    const { sport_id } = req.params;

    if (!sport_id) {
        return res.status(400).json({ error: 'Sport ID is required.' });
    }

    const numericSportId = parseInt(sport_id, 10);

    if (isNaN(numericSportId)) {
        return res.status(400).json({ error: 'Invalid Sport ID.' });
    }

    try {
        const newsItems = await News.findAll({
            where: { sport_id: numericSportId },
            include: {
                model: Sport,
                attributes: ['name'],
            }
        });

        if (newsItems.length === 0) {
            return res.status(404).json({ message: 'No news found for this sport.' });
        }

        res.json(newsItems);
    } catch (error) {
        console.error('Error fetching news items by sport:', error);
        res.status(500).json({ error: 'Failed to fetch news items' });
    }
};


const getNewsItemById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: {
                model: Sport,
                attributes: ['name']
            }
        });
        if (!news) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error('Error fetching news item:', error);
        res.status(500).json({ error: 'Failed to fetch news item' });
    }
};

const updateNewsItem = async (req, res) => {
    const { id } = req.params;
    const { title, content, banner_image_url, sport_id } = req.body;
    try {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
            return res.status(404).send({ error: 'News item not found' });
        }
        newsItem.title = title;
        newsItem.content = content;
        newsItem.banner_image_url = banner_image_url;
        newsItem.sport_id = parseInt(sport_id, 10); // Ensure sport_id is treated as a number
        await newsItem.save();
        res.send(newsItem);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteNewsItem = async (req, res) => {
    const { id } = req.params;
    try {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
            return res.status(404).send({ error: 'News item not found' });
        }
        await newsItem.destroy();
        res.send({ message: 'News item deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createNewsItem,
    getAllNewsPosts,
    getNewsItemsBySport,
    getNewsItemById,
    updateNewsItem,
    deleteNewsItem
};
