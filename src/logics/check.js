import { action } from 'mobx';
import world from './world';
import game from './game';

export function checkRequirement({
  debug,
  map,
  role,
  career,
  level,
  atMostMaxLevel,
  atLeastMaxLevel,
  stories,
  beforeStories,
  $or,
  $and,
} = {}) {
  const { player } = world;
  const { storiesMap } = game;

  if (role && (!player || player.role !== role)) {
    return false;
  }
  if (career && (!player || player.currentCareer !== career)) {
    return false;
  }
  if (level && (!player || player.level < level)) {
    return false;
  }
  if (atMostMaxLevel && (!player || player.maxLevel > atMostMaxLevel)) {
    return false;
  }
  if (atLeastMaxLevel && (!player || player.maxLevel < atLeastMaxLevel)) {
    return false;
  }
  if (map && world.map !== map) {
    return false;
  }
  if (stories) {
    for (const story of stories) {
      if (storiesMap.get(story) !== 'done') {
        return false;
      }
    }
  }
  if (beforeStories) {
    for (const story of beforeStories) {
      if (storiesMap.get(story) === 'done') {
        return false;
      }
    }
  }
  if ($or) {
    if (!$or.some(checkRequirement)) {
      return false;
    }
  }
  if ($and) {
    if (!$and.every(checkRequirement)) {
      return false;
    }
  }
  return true;
}
function checkStory(v) {
  const { key, requirement } = v;
  const { storiesMap } = game;

  if (storiesMap.get(key) === 'done') {
    return false;
  }

  return checkRequirement(requirement);
}

export function onStoryDone(story) {
  const { player } = world;
  const { storiesMap } = game;
  if (storiesMap.get(story.key) === 'done') {
    return;
  }
  storiesMap.set(story.key, 'done');

  for (const key of Object.keys(story.awards || {})) {
    if (key === 'purchaseRate') {
      game.purchaseRate += story.awards[key];
    } else if (typeof story.awards[key] === 'number') {
      // 材料
      const slot = player.awardInventory.find((v) => v.key === key);
      if (slot) {
        slot.count += story.awards[key];
      } else {
        player.awardInventory.push(
          new InventorySlot('award').fromJS({
            key,
            count: story.awards[key],
          })
        );
      }
    } else {
      // 装备
      const { quality, affixes } = story.awards[key];
      player.awardInventory.push(
        new InventorySlot('award').fromJS({
          key,
          count: 1,
          quality,
          affixes,
        })
      );
    }
  }
  game.save();
  if (player) {
    player.save();
  }
}
