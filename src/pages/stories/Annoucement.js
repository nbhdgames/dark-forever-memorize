/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from '../../components';
import NavBar from '../NavBar';
import { observer } from 'mobx-react';
import annoucement from '../../../data/annoucement';
import styles from './Announcement.less';

@observer
export default class Annoucement extends Component {
  static title = '公告';

  render() {
    return (
      <NavBar title="公告" back>
        <ScrollView className={styles.container}>
          <Text className={styles.content}>{annoucement.description}</Text>
        </ScrollView>
      </NavBar>
    );
  }
}
