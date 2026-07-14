import Role from "./role.model.js";
import AppError from "../../core/errors/AppError.js";
import User from "../users/user.model.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";

class RoleService extends BaseCrudService {
  constructor() {
    super(Role);
  }

  // ASSIGN ROLES TO USER (NOT DECLARED IN BASE_CRUD_SERVICE)
  async assignRolesToUser(userId, roles) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (!Array.isArray(roles)) {
      throw new AppError("Roles must be an array.", 400);
    }

    user.roles = [...new Set([...user.roles, ...roles])];

    await user.save();

    return user;
  }

  // ASSIGN PERMISSIONS TO ROLES (NOR DECLARED IN BASE_CRUD_SERVICE)
  async assignPermissionsToRole(roleId, permissions) {
    const role = await this.getById(roleId);

    role.permissions = permissions;

    await role.save();

    return role;
  }
}

export default new RoleService();
