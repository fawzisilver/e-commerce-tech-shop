import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
// import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'


/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) //has User mongoose db information if email matches

    if (user && (await user.matchPassword(password))) {
        //.sign(payload, signed, expiration)
        generateToken(res, user._id)
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: '30d',
        // })
    
        // // Set JWT as HTTP-Only cookie
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'Strict',
        //     maxAge: 30 * 24 * 60 * 60 * 1000, 
        // })

        // based on mongoDB document for user
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

/**
 * @desc Register user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400); //client error (400)
            throw new Error('User already exists');
        } else {
            const user = await User.create({
                name,
                email,
                password
            });

            // automatic log in after creating account
            if (user) {
                // creates token & saves it to cookie for future uses
                generateToken(res, user._id)

                // is OK and something is created
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            } else {
                res.status(400);
                throw new Error('Invalid user data')
            }
        }
    res.send('register user')
})

/**
 * @desc Logout user / clear cookie / JWT cookie
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "Logged out successfully "});
})

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is the the custom property from authMiddleware
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        // new value || original value
        user.name = req.body.name || user.name; //if left value is falsy then takes value on the right (original value)
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        // saves to mongoDB database and save to variable
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    
})



/**
 * @desc Delete users
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

/**
 * @desc Get Users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users)
});

/**
 * @desc Get User by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

/**
 * @desc Update User
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}