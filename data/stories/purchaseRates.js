/**
 * Created by tdzl2003 on 06/08/2017.
 */

module.exports = [
  {
    key: 'purchase-rates-lvl-60',
    script: `
SAY 系统 恭喜您达到60级。从现在开始，所有的神力购买和兑换都将提升50%收益。
SAY 系统 现在您可以继续挑战副本，提升装备，然后进行试炼挑战，就可以继续提升到70级了。
`,
    requirement: {
      level: 60,
    },
    awards: {
      purchaseRate: 0.5,
    },
  },
  {
    key: 'purchase-rates-lvl-70',
    script: `
SAY 系统 恭喜您达到70级。从现在开始，所有的神力购买和兑换都将提升100%收益。
SAY 系统 现在您可以继续挑战副本，在亚莲娜的噩梦中挽救木灵一族！
`,
    requirement: {
      level: 70,
    },
    awards: {
      purchaseRate: 0.5,
    },
  },
];