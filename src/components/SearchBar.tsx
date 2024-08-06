import { useCallback } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ItemCycler from './ItemCycler'

const SearchBar = () => {
	const renderItem = useCallback((item: string): JSX.Element => {
		return <Text>{item}</Text>
	}, [])

	return (
		<TouchableOpacity onPress={(): void => {}} style={styles.container}>
			<View style={styles.innerContainer}>
				<EvilIcons
					style={{ marginRight: 8 }}
					name="search"
					size={24}
					color="#81878C"
				/>
				<Text>Search for </Text>
				<ItemCycler
					items={['smallcase', 'mutual funds', 'stocks']}
					renderItem={renderItem}
				/>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 8,
		borderStyle: 'solid',
		backgroundColor: '#ffffff',
		borderColor: '#DDE0E4',
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		display: 'flex',
		padding: 12,
	},
})

export default SearchBar
