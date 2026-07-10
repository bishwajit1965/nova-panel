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
  // READ METHODS DEFINED
  // =========================

  async getById(id, options = {}) {
    const query = this.model.findById(id);

    if (options.select) query.select(options.select);

    if (options.populate) {
      const populates = Array.isArray(options.populate)
        ? options.populate
        : [options.populate];

      populates.forEach((p) => query.populate(p));
    }

    const result = await query;

    if (!result) throw new AppError("Resource not found", 404);

    return result;
  }

  // GET BY IDS
  async findByIds(ids = []) {
    return await this.model.find({
      _id: { $in: ids },
    });
  }

  // GET ONE
  async getOne(filter = {}, options = {}) {
    const query = this.model.findOne(filter);

    if (options.select) query.select(options.select);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();

    return await query;
  }

  // GET ALL
  async getAll(filter = {}, options = {}) {
    const query = this.model.find(filter);

    // SELECT FIELDS
    if (options.select) query.select(options.select);

    // POPULATE (safe + scalable)
    if (options.populate) {
      const populates = Array.isArray(options.populate)
        ? options.populate
        : [options.populate];

      populates.forEach((p) => query.populate(p));
    }

    // SORTING
    if (options.sort) query.sort(options.sort);

    // LEAN MODE
    if (options.lean) query.lean();

    return await query;
  }

  // =========================
  // UPDATE METHODS DEFINED
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
  // DELETE METHODS DEFINED
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
  // UTILITIES METHODS DEFINED
  // =========================

  // EXISTS
  async exists(filter) {
    return await this.model.exists(filter);
  }

  // COUNT
  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }

  // AGGREGATE
  async aggregate(pipeline = []) {
    return await this.model.aggregate(pipeline);
  }

  // PAGINATE
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
