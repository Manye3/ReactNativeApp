import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onPress: () => void;
}

const UserCard = ({ user, onPress }: UserCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {`${user.name.title} ${user.name.first} ${user.name.last}`}
        </Text>
        <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
        <Text style={styles.location} numberOfLines={1}>
          {`${user.location.city}, ${user.location.country}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Use memo to prevent re-rendering cards that haven't changed
export default memo(UserCard, (prevProps, nextProps) => {
  return prevProps.user.login.uuid === nextProps.user.login.uuid;
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e1e4e8',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#999',
  },
});
