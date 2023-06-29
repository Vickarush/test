import React, { Component } from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
} from "@react-navigation/compat";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store/configureStore";

import TopBar from "../src/components/TopBar/TopBar";
import Loading from "../src/screens/Loading/Loading";
import SignIn from "../src/screens/Login/SignIn";

/**
 * Our LoginStack which contains only the Login screen
 */
const LoginStack = createStackNavigator({
	Login: {
		screen: SignIn,
		navigationOptions: {
			header: null,
		},
	},
});

/**
 * Our main AppStack with every app screens, accessible once user is logged in
 */
const AppStack = createStackNavigator({
	BeersList: {
		screen: BeersList,
		navigationOptions: ({ navigation }) => ({
			header: (
				<TopBar
					navigation={navigation}
					title="My beers"
					leftActionIcon="searchBeers"
					rightActionIcon="seeProfile"
				/>
			),
		}),
	},
	BeerDetails: {
		screen: BeerDetails,
		navigationOptions: ({ navigation }) => ({
			header: (
				<TopBar
					navigation={navigation}
					title="Single beer"
					leftActionIcon="goBack"
				/>
			),
		}),
	},
	BeerAdd: {
		screen: BeerAdd,
		navigationOptions: ({ navigation }) => ({
			header: (
				<TopBar
					navigation={navigation}
					title="Add a new beer"
					leftActionIcon="goBack"
				/>
			),
		}),
	},
	Profile: {
		screen: Profile,
		navigationOptions: ({ navigation }) => ({
			header: (
				<TopBar
					navigation={navigation}
					title="User profile"
					leftActionIcon="goBack"
					rightActionIcon="logout"
				/>
			),
		}),
	},
});

/**
 * Our AppContainer that will load a quick Loading screen in charge of choosing if we display the Login or App stack
 */
const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			Loading: Loading,
			Login: LoginStack,
			App: AppStack,
		},
		{
			initialRouteName: "Loading",
		}
	)
);

/**
 * Our main App parent component
 */
class Login extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Root>
						<AppContainer />
					</Root>
				</PersistGate>
			</Provider>
		);
	}
}

export default Login;
