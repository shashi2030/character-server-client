var express = require('express');
var router = express.Router();
var UserService = require('../services/userService');
var CharacterService = require('../services/characterService');
var Character = require('../models/Character');
var constants = require('../constants');

// User REgistration
router.post('/register', function (req, res) {
    try {
        var userQuery = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        };

        return new UserService().registerUser(userQuery).then((result) => {
            if (result === null) {
                res.status(401).json({ error: constants.USER_ALREADY_EXISTS });
            } else {
                res.status(200).json(result);
            }
        }).catch((err) => {
            res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
        });
    } catch (error) {
        res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
    }

});

// get all character
router.get('/character', function (req, res) {
    try {

        return new CharacterService().findCharacters().then((result) => {
            if (result === null) {
                res.status(401).json({ error: constants.DATA_NOT_FOUND});
            } else {
                res.status(200).json(result);
            }
        }).catch((err) => {
            res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
        });
    } catch (error) {
        res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
    }
});

// Character Filter
router.post('/filters', function (req, res) {
    try {
        const data = {
            sortOption: req.body.sorting,
            searchName: req.body.searchName,
            filters: {
                species: req.body.filters.species,
                gender: req.body.filters.gender,
                origin: req.body.filters.origin
            }
        };
        const filter = {};
        let aggregatePipeline = [];

        // name search
        if (data.searchName) {
            filter.name = new RegExp(`^.*${data.searchName.trim()}.*$`, 'i');
        }

        // gender filter
        if (data.filters.gender.length) {
            filter.gender = { $in: data.filters.gender };
        }

        // species filter
        if (data.filters.species.length) {
            filter.species = { $in: data.filters.species };
        }

        // origin filter
        if (data.filters.origin.length) {
            filter['origin.name'] = { $in: data.filters.origin };
        }

        // filter added to pipeline
        aggregatePipeline.push({ $match: filter });

        // sorting
        if (data.sortOption) {
            aggregatePipeline.push({ $sort: { id: (data.sortOption.trim().toLowerCase() === 'asc') ? 1 : -1 } });
        }

        const aggregation = Character.aggregate(aggregatePipeline);
        aggregation.options = { collation: { locale: 'en' } };
        var searchResults = aggregation.exec();
        return searchResults.then((data) => {
            return res.status(200).json(data);

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
    }
});

// user login
router.post('/login', function (req, res) {
    try {
        var userQuery = {
            username: req.body.username,
            password: req.body.password
        };

        return new UserService().findUser(userQuery).then((result) => {
            if (result === null) {
                res.status(401).json({ error: constants.UNAUTHORIZED_USER });
            } else {
                res.status(200).json(result);
            }
        }).catch((err) => {
            res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR });
        });

    } catch (error) {
        res.status(500).json({ error: constants.INTERNAL_SERVER_ERROR});
    }
})

module.exports = router;