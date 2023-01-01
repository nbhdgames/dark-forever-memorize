/**
 * Created by tdzl2003 on 4/8/17.
 */

const migrates = {
};

export default function doMigrates(data) {
  if (!data.migrateMap) {
    data.migrateMap = {};
  }
  for (const key in migrates) {
    if (!data.migrateMap[key]) {
      data.migrateMap[key] = 1;
      migrates[key](data);
    }
  }
}
