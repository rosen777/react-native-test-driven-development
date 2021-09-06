import React, {useCallback, useState} from 'react';
import LocationService from '../services/LocationService';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

function WeatherCurrent() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleFetchWeather = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const position = await LocationService.getCurrentPosition();
      navigation.navigate('Weather', position);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default WeatherCurrent;
