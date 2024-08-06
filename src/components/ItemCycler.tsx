import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	View,
	Easing,
	Animated,
	StyleSheet,
	LayoutChangeEvent,
} from 'react-native'

const ANIMATION_DELAY = 800

type Props = {
	items: Array<React.ReactNode>
	cycleDuration?: number
	renderItem: (item: React.ReactNode) => React.ReactNode
}

const ItemCycler = (props: Props): JSX.Element | null => {
	const [height, setHeight] = useState(0)
	const [currentItemIndex, setCurrentItemIndex] = useState(() =>
		height === 0 ? -1 : 0
	)
	const nextItemIndex = (currentItemIndex + 1) % props.items.length
	const currentItemY = useRef(new Animated.Value(0))
	const nextItemY = useRef(new Animated.Value(height))

	useEffect(() => {
		const animationSequence = Animated.sequence([
			Animated.delay(props.cycleDuration ?? ANIMATION_DELAY),
			Animated.parallel([
				Animated.timing(currentItemY.current, {
					toValue: height * -1,
					duration: 500,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.cubic),
				}),
				Animated.timing(nextItemY.current, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.cubic),
				}),
			]),
		])

		if (height > 0) {
			animationSequence.start(() => {
				currentItemY.current.setValue(0)
				nextItemY.current.setValue(height)
				setCurrentItemIndex(nextItemIndex)
			})
		}
	}, [height, nextItemIndex, props.cycleDuration])

	const onLayoutHandler = useCallback(
		(e: LayoutChangeEvent): void => {
			if (height === 0) {
				setHeight(e.nativeEvent.layout.height)
			}
		},
		[height]
	)

	if (props.items.length === 0) {
		console.warn('ItemCycler expected non-zero number of items. Found 0.')
		return null
	}

	console.log(height)

	return (
		<View style={styles.mainContainer}>
			<View style={[styles.innerContainer]}>
				<View style={[styles.container, { height }]}>
					<Animated.View
						style={[
							styles.itemContainer,
							{ transform: [{ translateY: currentItemY.current }] },
						]}
					>
						{props.renderItem(props.items[currentItemIndex])}
					</Animated.View>
					<Animated.View
						style={[
							styles.itemContainer,
							{ transform: [{ translateY: nextItemY.current }] },
						]}
					>
						{props.renderItem(props.items[nextItemIndex])}
					</Animated.View>
				</View>
			</View>

			<View onLayout={onLayoutHandler} style={styles.measureContainer}>
				{props.renderItem(props.items[0])}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	container: {
		overflow: 'hidden',
		justifyContent: 'center',
	},
	innerContainer: {
		overflow: 'hidden',
		flexGrow: 1,
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'baseline',
		position: 'absolute',
	},
	measureContainer: {
		opacity: 0,
		position: 'absolute',
	},
})

export default React.memo(ItemCycler)
