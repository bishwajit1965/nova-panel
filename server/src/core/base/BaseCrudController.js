import { sendResponse } from "../../utils/sendResponse.js";

export default class BaseCrudController {
  constructor(service) {
    this.service = service;
  }

  // ==========================================
  // RESPONSE HELPER
  // ==========================================

  success(res, message, data = null, status = 200) {
    return sendResponse(res, status, message, data);
  }

  // ==========================================
  // CREATE
  // ==========================================

  async create(data) {
    return await this.service.create(data);
  }

  async createMany(data) {
    return await this.service.createMany(data);
  }

  // ==========================================
  // READ
  // ==========================================

  async getById(id) {
    return await this.service.getById(id);
  }

  async getOne(query) {
    return await this.service.getOne(query);
  }

  async getAll(query) {
    return await this.service.getAll(query);
  }

  // ==========================================
  // UPDATE
  // ==========================================

  async updateById(id, data) {
    return await this.service.updateById(id, data);
  }

  async updateMany(filter, data) {
    return await this.service.updateMany(filter, data);
  }

  // ==========================================
  // DELETE
  // ==========================================

  async deleteById(id) {
    return await this.service.deleteById(id);
  }

  async deleteMany(filter) {
    return await this.service.deleteMany(filter);
  }

  // ==========================================
  // PAGINATION
  // ==========================================

  async paginate(query) {
    return await this.service.paginate(query);
  }
}
