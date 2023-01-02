/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView,
  Alert,
  Slider,
  TextInput,
} from 'react-native';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';
import route from '../../utils/routerDecorator';
import game from '../../logics/game';
import world from '../../logics/world';
import { InventorySlot } from '../../logics/player';
import SelectBox from './SelectBox';
import { goods } from '../../../data';
import {qualityNames, qualityStyles} from './Inventory';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex1: {
    flexGrow: 1,
  },
  flex2: {
    flexGrow: 2,
  },
  header:{
    paddingVertical:5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical:5,
  },
  headerFont:{
    // color: 'white',
    fontSize:16,
  },
  title:{
    marginBottom:5,
    color:'black',
    height:20,
    width:40,
    paddingTop:2,
    textAlign:'center',
  },
  row:{
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection: 'row',
  },
  sliderTitle: {
    width: 180,
  },
});

const ds = {};

for (const key in goods) {
  const good = goods[key];
  if (good.class) {
    ds[good.class] = ds[good.class] || [0, 0, 0, 0, 0];
  }
}

const CLASS_NAMES = {
  sword: '剑',
  dagger: '匕首',
  wand: '杖',
  cloth: '布甲',
  lightArmor: '轻甲',
  armor: '重甲',
  ornament: '饰品',
};

const Setting = observer(function Settings({clazz, quality}){
  const { player } = world;

  const rule = player.lootRule.get(clazz);
  const value = rule ? rule[quality]: 0;


  return (
    <SelectBox
      values={quality ? ['拾取', '出售', '分解'] : ['拾取', '出售'] }
      selectedIndex={value}
      onChange={action((index) => {
        let rule = player.lootRule.get(clazz);
        if (!rule) {
          player.lootRule.set(clazz, [0, 0, 0, 0, 0]);
          rule = player.lootRule.get(clazz);
        }
        rule[quality] = index;
      })}
    />
  )
});

export class InputNumber extends Component{
  focused = false;
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0,
      strValue: `${props.value || 0}`,
    };
  }
  onChangeText = (text) => {
    const value = Math.max(0, text | 0);
    this.setState({
      value: value,
      strValue: text,
    });
    const { onChangeText } = this.props;
    onChangeText && onChangeText(value);
  };
  componentWillReceiveProps(props) {
    if (!this.focused) {
      this.setState({
        value: props.value || 0,
        strValue: `${props.value || 0}`,
      });
    }
  }
  onFocus = () => {
    this.focused = true;
  };
  onBlur = () => {
    this.focused = false;

    if (this.props.value !== this.state.value) {
      this.setState({
        value: this.props.value || 0,
        strValue: `${
          this.props.fixNumber != undefined
            ? (this.props.value &&
                this.props.value.toFixed(this.props.fixNumber)) ||
              0
            : this.props.value || 0
        }`,
      });
    } else {
      const strValue = `${this.props.value || 0}`;
      if (strValue !== this.state.strValue) {
        this.setState({
          strValue: `${
            this.props.fixNumber != undefined
              ? (this.props.value &&
                  this.props.value.toFixed(this.props.fixNumber)) ||
                0
              : this.props.value || 0
          }`,
        });
      }
    }
  };
  render() {
    const { strValue } = this.state;
    return (
      <TextInput
        {...this.props}
        value={strValue}
        onChange={undefined}
        onChangeText={this.onChangeText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        keyboardType="number-pad"
      />
    );
  }
}

const Header = observer(function() {
  const { player } = world;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerFont}>装等筛选</Text>
      </View>
      <View style={[styles.row,styles.titleView]}>
        <Text style={styles.sliderTitle}>自动分解低于{player.minLootLevel}装等：</Text>
        <InputNumber style={styles.flex1} value={player.minLootLevel} onChangeText={(value => player.minLootLevel = value) }/>
      </View>
    </View>
  );
});

@route('lootRule')
@observer
export default class LootRule extends Component {
  static title = '拾取规则';
  static contextTypes = {
    navigator: PropTypes.object,
  };

  dataSource = new ListView.DataSource({
    rowHasChanged: (v1,v2)=>v1!==v2,
    sectionHeaderHasChanged: (v1, v2) => v1 !== v2,
  }).cloneWithRowsAndSections(ds);

  renderSectionHeader = (data, id) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerFont}>{CLASS_NAMES[id] || id} </Text>
      </View>
    );
  };
  qualityColor(v){
    if(v==='普通'){
      return 'black'
    }
    if(v==='优秀'){
      return '#aaf'
    }
    if(v==='精良'){
      return '#ffa'
    }
    if(v==='史诗'){
      return '#fda'
    }
    if(v==='传说'){
      return '#afd'
    }
  };
  renderRow = (data, sectionId, rowId) => {
    return (
      <View style={[styles.row,styles.titleView]}>
        <Text style={[styles.title, qualityStyles[rowId]]}>{qualityNames[rowId]}</Text>
        <Setting clazz={sectionId} quality={rowId | 0}/>
      </View>
    );
  };

  renderHeader = () => {
    return <Header />
  };

  render() {
    const { navigator } = this.context;
    const { player } = world;

    return (
      <View style={styles.container}>
        <ListView
          style={styles.flex1}
          dataSource={this.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}
