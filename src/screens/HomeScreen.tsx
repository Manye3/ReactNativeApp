import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchUsers, setSearchQuery } from '../store/usersSlice';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { users, loading, page, hasMore, searchQuery } = useAppSelector((state) => state.users);
  
  // Local state for debounced search to avoid lagging the UI
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    // Initial fetch if list is empty
    if (users.length === 0) {
      dispatch(fetchUsers(1));
    }
  }, [dispatch, users.length]);

  // Handle Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  const loadMore = () => {
    if (!loading && hasMore && !searchQuery) {
      // Only load more if not searching, as API doesn't support search natively with our current setup.
      // If we wanted real search, we'd pass query to API. Here we do local search.
      dispatch(fetchUsers(page + 1));
    }
  };

  const handlePress = useCallback((user: any) => {
    navigation.navigate('Details', { user });
  }, [navigation]);

  // Filter users locally based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(lowerQuery) || user.email.toLowerCase().includes(lowerQuery);
    });
  }, [users, searchQuery]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No users found.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar 
        value={localSearch} 
        onChangeText={setLocalSearch} 
        placeholder="Search by name or email..." 
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => `${item.login.uuid}-${index}`}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => handlePress(item)} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={filteredUsers.length === 0 ? styles.emptyListContent : styles.listContent}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
