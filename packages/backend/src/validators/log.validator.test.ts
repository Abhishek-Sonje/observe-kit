import test from "node:test";
import assert from "node:assert/strict";
import { LogBatchSchema, LogSchema } from "./log.validator";

test("LogSchema applies default timestamp when missing", () => {
  const result = LogSchema.safeParse({
    message: "hello",
    level: "info",
    service_name: "api",
    version: "1.0.0",
  });

  assert.equal(result.success, true);
  if (!result.success) {
    throw new Error("Expected schema parse to succeed");
  }

  assert.equal(typeof result.data.timestamp, "number");
  assert.ok(result.data.timestamp > 0);
});

test("LogSchema rejects unsupported log level", () => {
  const result = LogSchema.safeParse({
    message: "hello",
    level: "fatal",
    service_name: "api",
    version: "1.0.0",
  });

  assert.equal(result.success, false);
});

test("LogBatchSchema validates arrays of logs", () => {
  const result = LogBatchSchema.safeParse([
    {
      message: "first",
      timestamp: Date.now(),
      level: "debug",
      service_name: "worker",
      version: "1.1.0",
    },
    {
      message: "second",
      timestamp: Date.now(),
      level: "error",
      trace_id: "trace_1",
      service_name: "worker",
      version: "1.1.0",
    },
  ]);

  assert.equal(result.success, true);
});
