const { User } = require('../models/user');

const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({
            message: 'The user was give ID was not found',
        });
    }

    res.status(200).send(user);
});

router.post('/', async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
            phone: req.body.phone,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            isAdmin: req.body.isAdmin,
            country: req.body.country,
        });

        if (!user) {
            return res.status(400).send('The user cannot be created');
        }

        await user.save();
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    const secret = process.env.secret;

    if (!user) return res.status(404).send('This user not found');

    if (user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            { expiresIn: '1d' }
        );
        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send('Password is wrong');
    }
});

module.exports = router;
