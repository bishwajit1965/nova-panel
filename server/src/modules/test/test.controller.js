import { asyncHandler } from "../../core/async/asyncHandler.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";

import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";

import { buildRequestContext } from "../../utils/buildRequestContext.js";
import testService from "./test.service.js";

class TestController extends BaseCrudController {
  constructor() {
    super(testService);
  }

  // CREATE
  create = asyncHandler(async (req, res) => {
    const result = await super.create(req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.TEST_CREATED, {
      actor: context.actor?._id,
      action: EVENTS.TEST_CREATED,
      module: MODULES.TESTS,
      targetId: result._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: result.name,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Test created.", result, 201);
  });

  // GET ALL
  getAll = asyncHandler(async (req, res) => {
    const result = await super.getAll(req.query);

    return this.success(res, "Tests fetched.", result);
  });

  // UPDATE
  updateById = asyncHandler(async (req, res) => {
    const result = await super.updateById(req.params.id, req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.TEST_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.TEST_UPDATED,
      module: MODULES.TESTS,
      targetId: result._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: result.name,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Test updated.", result);
  });

  // DELETE
  deleteById = asyncHandler(async (req, res) => {
    const result = await super.deleteById(req.params.id);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.TEST_DELETED, {
      actor: context.actor?._id,
      action: EVENTS.TEST_DELETED,
      module: MODULES.TESTS,
      targetId: result._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: result.name,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Test deleted.", result);
  });
}

export default new TestController();
