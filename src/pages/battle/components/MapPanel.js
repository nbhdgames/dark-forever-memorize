/**
 * Created by tdzl2003 on 2/1/17.
 */

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity } from '../../../components';
import { action, runInAction } from 'mobx';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import world from '../../../logics/world';
import { maps, stories } from '../../../../data';
import { InventorySlot, romes } from '../../../logics/player';
import game from '../../../logics/game';

import styles from './MapPanel.less';
import { alert, prompt } from '../../../common/message';
import { getModalCount, onModalClear, showModal } from '../../../common/modal';
import { checkRequirement } from '../../../logics/check';
import Player from '../../stories/Play';

const Map = observer(function Map({
  map,
  endlessLevel = 0,
  onChangeMap,
  children,
  noActive,
  getMaxCount,
}) {
  let { name } = map;
  if (endlessLevel) {
    name = name.replace('噩梦', '噩梦' + (romes[endlessLevel] || endlessLevel));
  }
  const active =
    !noActive &&
    expr(() => {
      if (endlessLevel && endlessLevel != world._endlessLevel) {
        return false;
      }
      return world.map === map.key;
    });
  const pending = expr(
    () =>
      world.pendingMaps.findIndex((v) => {
        return v[0] == map.key && v[1] == endlessLevel;
      }) >= 0
  );
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={[
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
        className={[
          styles.label,
          pending && styles.labelPending,
          active && styles.labelActive,
        ]}
      >
        {name}
        {children}
      </Text>
    </TouchableOpacity>
  );
});

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
  searchType = 'full'
) {
  if (getModalCount() > 0) {
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
            showModal(
              <Player
                story={story.key}
                onDismiss={() => {
                  m.delete(task);
                  if (m.size === 0) {
                    game.enemyTaskMap.delete(enemy);
                  }
                  onStoryDone(story);
                  checkStoriesLater();
                }}
              />
            );
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
          showModal(
            <Player
              story={story.key}
              onDismiss={() => {
                onStoryDone(story);
                checkStoriesLater();
              }}
            />
          );
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
export function checkStoriesLater() {
  onModalClear(() => {
    checkStories();
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
  const count = world.player.countTicket(map.key);

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
          world.pendingMaps.filter(
            (v) => (maps[v[0]].group || v[0]) === map.key
          ).length + ((maps[world.map].group || world.map) === map.key ? 1 : 0);
        return count - pendingCount;
      }}
    >
      {!showNoTicket && (
        <Text className={styles.cooldownCount}>x{`${count}`}</Text>
      )}
    </Map>
  );
});

const groupMaps = [
  Object.keys(maps).filter((key) => maps[key].group === 'nightmare.1'),
  Object.keys(maps).filter((key) => maps[key].group === 'nightmare.2'),
];

function enterEndlessDungeon(key, level) {
  const count =
    world.pendingMaps.filter((v) => v[1] === level).length +
    (maps._endlessLevel === level ? 1 : 0);
  const { player } = world;
  const ticket = player.countTicket('nightmare.' + level);

  if (ticket <= count) {
    alert('提示', `现在没有任何该等级的无尽噩梦钥石`);
  } else {
    if (world.pendingMaps.length > 0) {
      // 进入队列
      world.pendingMaps.splice(world.pendingMaps.length - 1, 0, [key, level]);
      return;
    }
    // 进入地图，同时当前地图作为pending
    runInAction(() => {
      world.pendingMaps.push([world.map, 0]);
      world._map = key;
      world._endlessLevel = level;
      world.onMapChanged();
    });
  }
}

const EndlessMapLevel = observer(function EndlessMapLevel({ level }) {
  const count = world.player.countTicket('nightmare.' + level);
  if (!count) {
    return null;
  }
  const groupMap = groupMaps[(level - 1) % 2];
  return (
    <View className={styles.endlessGroup}>
      {groupMap.map((key) => (
        <Map
          key={key}
          isDungeon
          map={maps[key]}
          endlessLevel={level}
          onChangeMap={() => {
            enterEndlessDungeon(key, level);
          }}
          getMaxCount={() => {
            const pendingCount = 0;
            return count - pendingCount;
          }}
        >
          <Text className={styles.cooldownCount}>x{`${count}`}</Text>
        </Map>
      ))}
    </View>
  );
});

const EndlessMapGroup = observer(function EndlessMapGroup() {
  const maxLevel = game.highestEndlessLevel;
  const levels = [];
  for (let i = 1; i <= maxLevel; i++) {
    levels.push(<EndlessMapLevel level={i} key={i} />);
  }
  return <>{levels}</>;
});

@observer
export default class MapPanel extends Component {
  renderMap = (k) => {
    const map = maps[k];
    return <Map map={map} key={k} onChangeMap={this.onChangeMap} />;
  };

  renderMapName = (k, i) => {
    const map = maps[k[0]];
    return (
      <Map
        map={map}
        endlessLevel={k[1]}
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

  cancelPendingMap = action((map, idx) => {
    if (maps[map.key].isDungeon) {
      world.pendingMaps.splice(idx, 1);
    }
  });

  onChangeMap = action((map, confirmed) => {
    if (!confirmed && world.pendingMaps.length >= 1) {
      alert('提示', '是否确认离开进行中的地城？', [
        {
          text: '确认',
          onPress: () => {
            this.onChangeMap(map, true);
          },
        },
        { text: '取消' },
      ]);
      return;
    }
    if (world.map !== map.key) {
      world.map = map.key;
      world.pendingMaps.splice(0); // 移除所有队列
      checkStories();
    }
  });

  onEnterDungeon = action((map) => {
    if (world.pendingMaps.length > 0) {
      // 进入队列
      world.pendingMaps.splice(world.pendingMaps.length - 1, 0, [map.key, 0]);
      return;
    }
    // 进入地图，同时当前地图作为pending
    world.pendingMaps.push([world.map, 0]);
    world.map = map.key;
    checkStories();
  });

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
      world.pendingMaps.filter((v) => (maps[v[0]].group || v) === currentKey)
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
      <View className={styles.section} key="title">
        <Text className={styles.sectionTitle}>{mapData.name}</Text>
      </View>,
      ...mapData.phases.map((v, i) => (
        <View key={`phase_${i}`} className={styles.phase}>
          <Text className={styles.phaseState}>{currentPhase === i && '>'}</Text>
          <Text className={styles.phaseLabel}>
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
        {game.highestEndlessLevel > 0 && (
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>无尽副本</Text>
          </View>
        )}
        {<EndlessMapGroup />}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>副本</Text>
        </View>
        {Object.keys(maps)
          .filter((key) => maps[key].isDungeon && !maps[key].isEndless)
          .filter((key) => checkMapRequirement(key))
          .map(this.renderDungeon)}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>副本（无钥石）</Text>
        </View>
        {Object.keys(maps)
          .filter((key) => maps[key].isDungeon && !maps[key].isEndless)
          .filter((key) => checkMapRequirement(key))
          .map(this.renderDungeonNoTicket)}
      </ScrollView>
    );
  }
}
