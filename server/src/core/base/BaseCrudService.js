import AppError from "../../core/errors/AppError.js";

export default class BaseCrudService {
  constructor(model) {
    this.model = model;
  }

  // =========================
  // CREATE
  // =========================
  async create(data) {
    return await this.model.create(data);
  }

  async createMany(data) {
    return await this.model.insertMany(data);
  }

  // =========================
  // READ
  // =========================
  async getById(id, options = {}) {
    const query = this.model.findById(id);

    if (options.select) query.select(options.select);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();

    const result = await query;

    if (!result) {
      throw new AppError("Resource not found", 404);
    }

    return result;
  }

  async findByIds(ids = []) {
    return await this.model.find({
      _id: { $in: ids },
    });
  }

  async getOne(filter = {}, options = {}) {
    const query = this.model.findOne(filter);

    if (options.select) query.select(options.select);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();

    return await query;
  }

  async getAll(filter = {}, options = {}) {
    const query = this.model.find(filter);

    if (options.select) query.select(options.select);
    // if (options.populate) query.populate(options.populate);
    if (options.populate) {
      Array.isArray(options.populate)
        ? options.populate.forEach((p) => query.populate(p))
        : query.populate(options.populate);
    }
    if (options.sort) query.sort(options.sort);
    if (options.lean) query.lean();

    return await query;
  }

  // =========================
  // UPDATE
  // =========================
  async updateById(id, data, options = {}) {
    const result = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      ...options,
    });

    if (!result) {
      throw new AppError("Resource not found", 404);
    }

    return result;
  }

  async updateMany(filter, data, options = {}) {
    return await this.model.updateMany(filter, data, options);
  }

  // =========================
  // DELETE
  // =========================

  async deleteById(id) {
    const result = await this.model.findByIdAndDelete(id);

    if (!result) {
      throw new AppError("Resource not found", 404);
    }

    return result;
  }

  async deleteMany(filter, options = {}) {
    return await this.model.deleteMany(filter, options);
  }

  // =========================
  // UTILITIES
  // =========================

  async exists(filter) {
    return await this.model.exists(filter);
  }

  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }

  async aggregate(pipeline = []) {
    return await this.model.aggregate(pipeline);
  }

  async paginate({
    filter = {},
    page = 1,
    limit = 10,
    sort = "-createdAt",
    select = "",
    populate = null,
  } = {}) {
    const skip = (page - 1) * limit;

    const query = this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(select);

    if (populate) query.populate(populate);

    const [data, total] = await Promise.all([
      query,
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
