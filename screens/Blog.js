import React from 'react';

// Import the essential components from react-native
import {
	StyleSheet, Button, View, SafeAreaView,
	Text
} from 'react-native';

// Function for creating button
export default function Blog() {
	return (
		<View style={styles.container}>

			<Button
				// Some properties given to Button
				title="Add a Blog"
			/>
		</View>
	);
}

// Some styles given to button
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#71EC4C',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
