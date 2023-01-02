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

// 立即检查任务
export const checkStories = action(function doCheckStories(
  navigator,
  checkStoriesLater,
  searchType = 'full'
) {
  if (navigator.getCurrentRoutes().find((v) => v.location === '/story/play')) {
    return;
  }
  const storiesList = Object.keys(stories).map((k) => stories[k]);
  const { storiesMap } = game;
  let dirty = false;

  function checkKill() {
    for (const enemy of game.enemyTaskMap.keys()) {
      const m = game.enemyTaskMap.get(enemy);
      for (const task of m.keys()) {
        if (m.get(task) <= 0) {
          const story = stories[task];

          if (story.script) {
            // 有剧情需要进展
            navigator.push({
              location: '/story/play',
              passProps: {
                story: story.key,
                onClose: () => {
                  m.delete(task);
                  if (m.size === 0) {
                    game.enemyTaskMap.delete(enemy);
                  }
                  onStoryDone(story);
                  checkStoriesLater(navigator);
                },
              },
            });
            return;
          }

          m.delete(task);
          onStoryDone(story);
          dirty = true;
        }
      }
      if (m.size === 0) {
        game.enemyTaskMap.delete(enemy);
      }
    }
  }

  switch (searchType) {
    case 'kill':
      checkKill();
      break;
    default:
      dirty = true;
      break;
  }

  while (dirty) {
    dirty = false;
    // 检查是否有已经被完成了的任务
    checkKill();

    // 检查是否有可以开启进程的任务
    const readyStories = storiesList.filter(checkStory);

    for (const story of readyStories) {
      if (story) {
        if (story.taskType) {
          if (!storiesMap.has(story.key)) {
            // 有任务需要完成
            storiesMap.set(story.key, 'task');
            switch (story.taskType) {
              case 'kill':
                // 杀死怪物后解锁
                game.addKillTask(story.key, story.enemy, story.killCount);
                break;
              case 'purchase':
                // 在情报界面购买
                break;
              default:
                console.warn(`Unknown task type ${story.taskType}`);
                break;
            }
          }
        } else if (story.script) {
          // 有剧情需要进展
          navigator.push({
            location: '/story/play',
            passProps: {
              story: story.key,
              onClose: () => {
                onStoryDone(story);
                checkStoriesLater(navigator);
              },
            },
          });
          return;
        } else {
          onStoryDone(story);
          dirty = true;
        }
      }
    }
  }
});
