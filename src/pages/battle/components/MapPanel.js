/**
 * Created by tdzl2003 on 2/1/17.
 */

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity } from '../../../components';
import { action } from 'mobx';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import world from '../../../logics/world';
import { maps, stories } from '../../../../data';
import { InventorySlot } from '../../../logics/player';
import game from '../../../logics/game';

import styles from './MapPanel.less';
import { alert, prompt } from '../../../common/message';

const Map = observer(function Map({
  map,
  onChangeMap,
  children,
  noActive,
  getMaxCount,
}) {
  const active = !noActive && expr(() => world.map === map.key);
  const pending = expr(() => world.pendingMaps.indexOf(map.key) >= 0);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.option,
        pending && styles.optionPending,
        active && styles.optionActive,
      ]}
      onPress={() => onChangeMap && onChangeMap(map)}
      onLongPress={async () => {
        const maxCount = getMaxCount();
        console.log(maxCount);
        if (maxCount <= 1) {
          onChangeMap && onChangeMap(map);
          return;
        }
        const v = await prompt(`输入数量(1-${maxCount})`, '', `${maxCount}`);
        const tmp = Math.min(maxCount, Math.max(0, v | 0));
        for (let i = 0; i < tmp; i++) {
          onChangeMap && onChangeMap(map);
        }
      }}
    >
      <Text
        style={[
          styles.label,
          pending && styles.labelPending,
          active && styles.labelActive,
        ]}
      >
        {map.name}
        {children}
      </Text>
    </TouchableOpacity>
  );
});

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

// 在导航事件后再检查任务。
export function checkStoriesLater(navigator) {
  const listener = navigator.navigationContext.addListener('didfocus', () => {
    checkStories(navigator, checkStoriesLater);
    listener.remove();
  });
}

export function checkMapRequirement(key) {
  if (maps[key].requirement) {
    return checkRequirement(maps[key].requirement);
  }
  return true;
}

function diffTime(time) {
  if (time > 24 * 3600 * 1000) {
    return `${(time / 24 / 3600000).toFixed(1)}天`;
  } else if (time > 3600 * 1000) {
    return `${(time / 3600000).toFixed(1)}小时`;
  } else if (time > 60 * 1000) {
    return `${(time / 60000).toFixed(1)}分钟`;
  } else if (time > 1000) {
    return `${(time / 1000).toFixed(1)}秒`;
  }
  return '<1秒';
}

const Dungeon = observer(function Dungeon({ map, onChangeMap, showNoTicket }) {
  const count = world.player.countTicket(map.group || map.key);

  if (showNoTicket ? count > 0 : count <= 0) {
    return null;
  }

  return (
    <Map
      isDungeon
      map={map}
      onChangeMap={onChangeMap}
      getMaxCount={() => {
        const pendingCount =
          world.pendingMaps.filter((v) => (maps[v].group || v) === map.key)
            .length +
          ((maps[world.map].group || world.map) === map.key ? 1 : 0);
        return count - pendingCount;
      }}
    >
      {!showNoTicket && <Text style={styles.cooldownCount}>x{`${count}`}</Text>}
    </Map>
  );
});

@observer
export default class MapPanel extends Component {
  renderMap = (k) => {
    const map = maps[k];
    return <Map map={map} key={k} onChangeMap={this.onChangeMap} />;
  };

  renderMapName = (k, i) => {
    const map = maps[k];
    return (
      <Map
        map={map}
        key={'pending-' + i}
        onChangeMap={(map) => this.cancelPendingMap(map, i)}
        noActive
      />
    );
  };

  renderDungeon = (k) => {
    return (
      <Dungeon map={maps[k]} key={k} onChangeMap={this.onEnterDungeonCheck} />
    );
  };

  renderDungeonNoTicket = (k) => {
    return (
      <Dungeon
        map={maps[k]}
        key={k}
        onChangeMap={this.onEnterDungeonCheck}
        showNoTicket
      />
    );
  };

  @action
  cancelPendingMap = (map, idx) => {
    if (maps[map.key].isDungeon) {
      world.pendingMaps.splice(idx, 1);
    }
  };

  @action
  onChangeMap = (map) => {
    if (world.map !== map.key) {
      world.map = map.key;
      world.pendingMaps.splice(0); // 移除所有队列
      checkStories(this.context.navigator, checkStoriesLater);
    }
  };

  @action
  onEnterDungeon = (map) => {
    if (world.pendingMaps.length > 0) {
      // 进入队列
      world.pendingMaps.splice(world.pendingMaps.length - 1, 0, map.key);
      return;
    }
    // 进入地图，同时当前地图作为pending
    world.pendingMaps.push(world.map);
    world.map = map.key;
    checkStories(this.context.navigator, checkStoriesLater);
  };

  @action
  buyTicket(map) {
    const { player } = world;
    if (player.dungeonTickets.get(map.key) >= 10) {
      alert('提示', '该副本钥石数量已达上限，不能购买。');
      return;
    }
    if (game.diamonds < map.resetPrice) {
      alert('提示', '您的神力点数不足，是否召唤创世神的力量，大量获得神力？', [
        {
          text: '确认',
          onPress: () => {
            this.context.navigator.push({
              location: '/purchase',
            });
          },
        },
        { text: '取消' },
      ]);
      return;
    }
    game.diamonds -= map.resetPrice;
    player.dungeonTickets.set(
      map.group || map.key,
      player.dungeonTickets.get(map.group || map.key) + 1
    );
    this.onEnterDungeon(map);
  }

  onEnterDungeonCheck = (map) => {
    // if (world.map === map.key) {
    //   return;
    // }
    const currentKey = map.group || map.key;
    const count =
      world.pendingMaps.filter((v) => (maps[v].group || v) === currentKey)
        .length + ((maps[world.map].group || world.map) === currentKey ? 1 : 0);
    const { player } = world;
    const ticket = player.countTicket(currentKey);

    if (ticket <= count) {
      if (map.resetPrice > 0) {
        alert(
          '提示',
          `现在没有任何该副本的钥石，是否花费${map.resetPrice}神力兑换钥石？\n（在普通地图击杀怪物有几率获得钥石）`,
          [
            {
              text: '确认',
              onPress: () => {
                this.buyTicket(map);
                // this.onEnterDungeon(map);
              },
            },
            { text: '取消' },
          ]
        );
      } else {
        alert('提示', '您无法再次进入该副本。');
      }
    } else {
      this.onEnterDungeon(map);
    }
  };

  renderDungeonPhase() {
    const { enemyBorn, mapData } = world;
    if (!enemyBorn || enemyBorn.currentPhase == null) {
      return null;
    }
    const { currentPhase } = enemyBorn;
    return [
      <View style={styles.section} key="title">
        <Text style={styles.sectionTitle}>{mapData.name}</Text>
      </View>,
      ...mapData.phases.map((v, i) => (
        <View key={`phase_${i}`} style={styles.phase}>
          <Text style={styles.phaseState}>{currentPhase === i && '>'}</Text>
          <Text style={styles.phaseLabel}>
            {currentPhase >= i ? mapData.phases[i].description : '???'}
          </Text>
        </View>
      )),
    ];
  }

  render() {
    return (
      <ScrollView
        className={styles.panel}
        contentContainerClassName={styles.panelContent}
        bounces={false}
      >
        {this.renderDungeonPhase()}
        {world.pendingMaps.length > 0 && (
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>挑战队列</Text>
          </View>
        )}
        {world.pendingMaps.map(this.renderMapName)}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>地图</Text>
        </View>
        {Object.keys(maps)
          .filter((key) => !maps[key].isDungeon)
          .filter((key) => checkMapRequirement(key))
          .map(this.renderMap)}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>副本</Text>
        </View>
        {Object.keys(maps)
          .filter((key) => maps[key].isDungeon)
          .filter((key) => checkMapRequirement(key))
          .map(this.renderDungeon)}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>副本（无钥石）</Text>
        </View>
        {Object.keys(maps)
          .filter((key) => maps[key].isDungeon)
          .filter((key) => checkMapRequirement(key))
          .map(this.renderDungeonNoTicket)}
      </ScrollView>
    );
  }
}
