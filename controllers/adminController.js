const User = require('../models/User');
const UserCourse = require('../models/UserCourse');
const Course = require('../models/Course');
const Blog = require('../models/Blog');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Find the user and the course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: 'User or Course not found' });
    }

    // Add the course to the user's courses array
    user.courses.push(courseId);
    await user.save();

    res.status(201).json({ message: 'Course assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    // This is a placeholder for analytics logic
    // You'll need to implement actual analytics based on your requirements
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    res.json({
      totalUsers,
      totalCourses,
      totalBlogs,
      // Add more analytics data here
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};