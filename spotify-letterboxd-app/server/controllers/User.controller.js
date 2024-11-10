// controllers/userController.js
import { User } from '../models/User.model.js'

// Controller function to get user profile
export const getUserData = async (req, res) => {
  try {
   
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back the user data as a response
    console.log("User from the controller", user)
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};
