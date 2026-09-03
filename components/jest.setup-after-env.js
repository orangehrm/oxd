/* eslint-env jest */
/**
 * `nanoid` backs the `uuid` mixin, which InputField uses to generate the id
 * that binds a <label> to its control. Real nanoid output is random, so any
 * snapshot containing a rendered input field would pass once and then fail on
 * the next run. Hand out a deterministic sequence instead.
 *
 * The counter deliberately does NOT reset between tests. Callers such as
 * ListTable use nanoid for its uniqueness, not just its opacity — tableId
 * namespaces events on a module-level emitter singleton, so handing two tests
 * the same value lets a previous test's listeners fire on the next one's
 * events. Monotonic within a file keeps ids unique; jest gives each test file
 * a fresh module registry, so the sequence restarts per file and full runs
 * stay reproducible.
 *
 * Caveat: running a subset of a file (jest -t '...') shifts the numbering, so
 * snapshots should be regenerated from a full-file run.
 *
 * Lives here rather than in jest.init.js because setupFiles run before the
 * test framework is installed.
 */
let mockNanoidSequence = 0;

jest.mock('nanoid', () => ({
  nanoid: () => `test-${++mockNanoidSequence}`,
}));
