const express = require("express");
const authenticator = require("../middlewares/authenticator");
const cloudinary = require("../cloudinary-config");
const multer = require("multer");
const fs = require("fs");
const User = require("../modals/user");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.patch(
  "/update",
  authenticator,
  upload.single("image"),
  async (req, res) => {
    const user = req.user;
    try {
      let imageUrl = user.img;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "your-folder-name", //
        });
        imageUrl = result.secure_url;

        fs.unlinkSync(req.file.path);
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        name: req.body.name || user.name,
        img: imageUrl,
      },
    {new:true});

      const { password: _, ...userObject } = updatedUser.toObject();

      res.json({ message: "User updated successfully", user: userObject });
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ error: "Upload to Cloudinary or user update failed" });
    }
  }
);

module.exports = router;
