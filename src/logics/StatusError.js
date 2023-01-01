/**
 * Created by tdzl2003 on 2/1/17.
 */

export default class StatusError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  code = 500;

  static forbidden() {
    throw new StatusError('Forbidden', 403);
  }
}
