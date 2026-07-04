import BaseCrudService from "../../core/base/BaseCrudService.js";
import Test from "./test.model.js";

class TestService extends BaseCrudService {
  constructor() {
    super(Test);
  }

  // All methods are inherited from BaseCrudService, so no need to redefine them here unless you want to add custom logic specific to the Test model.
}

export default new TestService();
