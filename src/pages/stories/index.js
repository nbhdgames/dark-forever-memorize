/**
 * Created by tdzl2003 on 12/18/16.
 */

export default {
  path: 'story',
  childRoutes: [
    require('./Play').default,
    require('./Purchase').default,
    require('./GM').default,
    require('./Possess').default,
    require('./Annoucement').default,
  ].map(v => v.routeConfig || v),
};
