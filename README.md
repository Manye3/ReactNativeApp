# React Native Intern Assignment

A production-ready React Native application displaying a large list of users fetched from the RandomUser API. It features search functionality, infinite scrolling, robust state management with Redux Toolkit, and local data persistence.

## 🚀 App Functionality

- **User Directory**: Browse a paginated list of users fetched from a public API.
- **Search**: Locally filter users by name or email instantly (with debouncing).
- **Infinite Scrolling**: Automatically fetches the next page of users when scrolling to the bottom.
- **User Details**: View comprehensive contact and address details of selected users on a separate screen.
- **Data Persistence**: Uses `redux-persist` and `AsyncStorage` to ensure the user list is restored when the app is restarted.
- **Lifecycle Management**: Tracks when the app goes into the background or comes to the foreground.

## 🛠️ Key Technical Decisions

1. **React Native CLI**: Bootstrapped without Expo to fulfill the assignment requirement and allow for full native control.
2. **TypeScript**: Strongly typed for better developer experience and preventing runtime errors.
3. **Redux Toolkit**: Centralized state management for the user list, loading status, pagination, and error handling. It avoids prop-drilling and enables easy caching.
4. **Local Data Persistence**: We cache only the `users` array so that on app restart, the user instantly sees previously loaded data while the app fetches new ones in the background if needed.
5. **Debounced Search**: Instead of immediately filtering on every keystroke, a `300ms` debounce is implemented to ensure UI performance is smooth.
6. **Memoization**: Used `React.memo` for `UserCard` and `useMemo`/`useCallback` in `HomeScreen` to optimize FlatList rendering performance.
7. **No Third-Party UI Libs**: Kept the UI lightweight by strictly using core components (`View`, `Text`, `FlatList`, `TextInput`, `StyleSheet`).

## 🔮 Improvements (With More Time)

- **Network Resilience**: Add NetInfo to handle offline scenarios gracefully and display a "No Internet Connection" banner.
- **Unit Testing**: Add Jest and React Native Testing Library to write tests for Redux thunks, reducers, and core UI components.
- **Advanced Caching**: Implement `RTK Query` instead of raw thunks for out-of-the-box caching, deduplication, and polling.
- **Skeleton Loaders**: Replace the basic `ActivityIndicator` with skeleton placeholders for a more modern loading experience.
- **Pull-to-Refresh**: Implement `RefreshControl` in the FlatList to allow users to manually reload the list from page 1.
- **E2E Testing**: Add Detox or Maestro for end-to-end testing of user flows.

## 🏃 How to Run the Project

### Prerequisites
- Node.js (v18+)
- Java Development Kit (JDK 17)
- Android Studio / Xcode

### Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd RNInternAssignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   - **Android**:
     ```bash
     npm run android
     ```
   - **iOS**:
     ```bash
     cd ios && pod install && cd ..
     npm run ios
     ```
