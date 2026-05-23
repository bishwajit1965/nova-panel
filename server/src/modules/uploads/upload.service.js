import Upload from "./upload.model.js";
import cloudinary from "../../config/cloudinary.js";
import AppError from "../../core/errors/AppError.js";
import projectConfig from "../../config/project.config.js";

// SERVICE LAYER: Handles all business logic related to uploads, including saving to DB, updating, deleting, and fetching uploads. Also handles Cloudinary interactions for file management.
export const saveUpload = async (file, userId) => {
  return await Upload.create({
    user: userId,

    publicId: file.filename, // Cloudinary public_id from storage engine
    url: file.path, // Cloudinary secure_url

    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  });
};

// Helper for uploadMultipleFiles controller to save multiple uploads in DB at once using insertMany for efficiency
export const saveMultipleUploads = async (files, userId) => {
  const uploads = files.map((file) => ({
    user: userId,
    publicId: file.filename,
    url: file.path,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  }));

  return await Upload.insertMany(uploads);
};

// Get all uploads for a user, sorted by most recent first
export const getMyUploads = async (userId) => {
  const uploads = await Upload.find({ user: userId }).sort({ createdAt: -1 });
  return uploads;
};

// Update upload by ID with ownership/admin check and Cloudinary file replacement if new file provided
export const updateUploadById = async (id, newFile, user) => {
  const existing = await Upload.findById(id);

  if (!existing) {
    throw new AppError("File not found", 404);
  }

  // ownership / admin check
  const isOwner = existing.user.toString() === user._id.toString();
  const isAdmin = user.role === "admin" || user.role === "superAdmin";

  if (!isOwner && !isAdmin) {
    throw new AppError("Forbidden", 403);
  }

  // CASE 1: No new file → keep old
  if (!newFile) {
    return existing;
  }

  // CASE 2: New file exists → replace /delete old from Cloudinary and update DB with new file info
  await cloudinary.uploader.destroy(existing.publicId);

  // 2. update DB with new file
  existing.publicId = newFile.filename;
  existing.url = newFile.path;
  existing.originalName = newFile.originalname;
  existing.mimeType = newFile.mimetype;
  existing.size = newFile.size;

  await existing.save();

  return existing;
};

// Delete upload by ID with ownership/admin check and Cloudinary file deletion
export const deleteUploadById = async (id, user) => {
  const file = await Upload.findById(id);

  if (!file) {
    throw new AppError("File not found", 404);
  }
  const isOwner = file.user.toString() === user._id.toString();
  const isAdmin = user.role === "admin" || user.role === "superAdmin";

  if (!isOwner && !isAdmin) {
    throw new AppError("Forbidden", 403);
  }

  // 1. delete from Cloudinary
  await cloudinary.uploader.destroy(file.publicId, { resource_type: "image" });

  // 2. delete from DB
  await file.deleteOne();

  return true;
};
