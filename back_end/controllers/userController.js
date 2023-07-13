const User = require("../models/user");
const mongoose = require("mongoose");

function createUser(req, res) {
  console.log("Request body:", req.body);
  const { id, name, email, phone } = req.body;
  const newUser = new User({ id, name, email, phone });
  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: savedUser,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: "Failed to create user" });
    });
}

function getAllUsers(req, res) {
  User.find()
    .then((users) => {
      res.json({
        success: true,
        message: "Users retrieved successfully",
        users,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: "Failed to get users" });
    });
}

function getUser(req, res) {
  const id = req.params.id;
  //   console.log("Request received with ID:", id);

  User.findOne({ id: id })
    .then((user) => {
      //   console.log("User found:", user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      res.json({ success: true, message: "User retrieved successfully", user });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: "Failed to get user" });
    });
}

function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  User.findOne({ id: userId })
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
      } else {
        // Update the user details
        user.name = name;
        user.email = email;
        user.phone = phone;

        // Save the updated user data to MongoDB
        user
          .save()
          .then(() => {
            res.json({ success: true, message: "User updated successfully" });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ success: false, error: "Failed to update user" });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: "Failed to fetch user" });
    });
}

function deleteUser(req, res) {
  const userId = req.params.id;

  console.log("Deleting user with ID:", userId);

  User.findOneAndDelete({ id: userId })
    .then((deletedUser) => {
      if (!deletedUser) {
        console.log("User not found");
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      console.log("User deleted successfully");
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    })
    .catch((error) => {
      console.error("Failed to delete user:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete user",
      });
    });
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
