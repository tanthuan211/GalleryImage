import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import img from '../../assets/images';
import {
  color27A600,
  colorEE8F00,
  colorA31F1F,
  colorFFFFFF,
} from '../constants/colors';
import {customTxt} from '../constants/css';

export const STATUS_NOTIFY = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

export default function NotificationView({
  imgLeft,
  imgRight,
  styleImgLeft,
  title,
  content,
  styleTitle,
  styleContent,
  style,
  styleContainer,
  status,
  isShow,
  setShow,
}) {
  const _onPressClose = () => {
    setShow(false);
  };

  const statusStyle = () => {
    switch (status) {
      case STATUS_NOTIFY.SUCCESS:
        return {
          icon: imgRight || img.ic_success,
          title: title || 'Success',
          colorTitle: styleTitle?.color || color27A600,
        };
      case STATUS_NOTIFY.WARNING:
        return {
          icon: imgRight || img.ic_warning,
          title: title || 'Warning',
          colorTitle: styleTitle?.color || colorEE8F00,
        };
      case STATUS_NOTIFY.ERROR:
        return {
          icon: imgRight || img.ic_error,
          title: title || 'Failure',
          colorTitle: styleTitle?.color || colorA31F1F,
        };
      default:
        return {
          icon: '',
          title: '',
          colorTitle: '',
        };
    }
  };

  const renderView = () => {
    if (isShow) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
      return (
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.bgView} />
            <TouchableOpacity
              style={[styles.containerView, style]}
              onPress={_onPressClose}>
              <TouchableOpacity
                onPress={_onPressClose}
                style={styles.imgCloseContainer}>
                <Image
                  style={[styles.imgClose]}
                  source={imgLeft || img.ic_close}
                />
              </TouchableOpacity>
              <View style={[styles.contentContainer, styleContainer]}>
                <Image
                  style={[styles.img, styles.marginL18, styleImgLeft]}
                  source={statusStyle().icon}
                />
                <View style={[styles.marginL18, styles.fleX1]}>
                  <Text
                    style={[
                      customTxt(16, statusStyle().colorTitle).txt,
                      styleTitle,
                    ]}>
                    {statusStyle().title}
                  </Text>
                  <Text
                    style={[
                      styles.marginT8,
                      customTxt(14, 'black').txt,
                      styleContent,
                    ]}>
                    {content}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    }
    return null;
  };

  return <>{renderView()}</>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bgView: {
    position: 'absolute',
    opacity: 0.95,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerView: {
    paddingBottom: 20,
    marginHorizontal: 15,
    borderRadius: 16,
    backgroundColor: colorFFFFFF,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  marginL18: {
    marginLeft: 18,
  },
  marginT8: {
    marginTop: 8,
    marginRight: 20,
  },
  img: {
    width: 23,
    height: 23,
  },
  imgCloseContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  imgClose: {
    margin: 15,
    width: 12,
    height: 12,
  },
  fleX1: {
    flex: 1,
  },
});
