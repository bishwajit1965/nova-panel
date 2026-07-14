import Permission from "./permission.model.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";

class PermissionService extends BaseCrudService {
  constructor() {
    super(Permission);
  }
}
export default new PermissionService();
