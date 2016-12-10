angular.module('starter', ['ionic', 'btford.socket-io', 'nvd3', 'starter.controllers', 'app.routes', 'starter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {

		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {

			StatusBar.styleDefault();
		}
	});
})

.config(function($ionicConfigProvider) {
	// Remove back button text completely
	$ionicConfigProvider.backButton.previousTitleText(false).text('');
})