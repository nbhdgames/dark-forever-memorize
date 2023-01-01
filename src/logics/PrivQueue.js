/**
 * Created by tdzl2003 on 2/24/17.
 */

export default class PrivQueue {
  items = [];

  constructor(compare) {
    this.compare = compare;
  }

  add(item) {
    return this.bubbleUp(this.items.length, item);
  }

  minimum() {
    return this.items[0];
  }

  removeMin() {
    if (this.items.length === 1) {
      this.items.pop();
      return;
    }
    this.bubbleDown(0, this.items.pop());
  }

  bubbleUp(pos, item) {
    let parent;
    while (pos > 0) {
      parent = (pos - 1) >> 1;
      if (this.compare(item, this.items[parent])) {
        this.items[pos] = this.items[parent];
        pos = parent;
      } else {
        break;
      }
    }
    this.items[pos] = item;
    return pos;
  }

  bubbleDown(pos, item) {
    for (;;) {
      let left = (pos << 1) + 1;
      if (left >= this.items.length) {
        break;
      }
      if (left + 1 < this.items.length && this.compare(this.items[left + 1], this.items[left])) {
        left += 1;
      }
      if (this.compare(this.items[left], item)) {
        this.items[pos] = this.items[left];
        pos = left;
      } else {
        break;
      }
    }
    this.items[pos] = item;
    return pos;
  }
}
