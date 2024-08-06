import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import SearchBar from './src/components/SearchBar'

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<SearchBar />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
})
