/**
 * Created by user on 27.05.2016.
 */
export let appState = (function(){
	let appStateObj = null;

	class AppState {
		constructor(formPopup, loginPopup) {
			this.formPopup = formPopup;
			this.loginPopup = loginPopup;
		}
		get token (){
			return this._token;
		}
		set token (tokenValue){
			this._token = tokenValue;
		}
	}
	return {
		get: function (){
			console.log(appStateObj);
			if (!appStateObj) {
				appStateObj = new AppState({},{});
			}
			return appStateObj;
		}
	}
})();




//function appState(){
//	let storeStateObj = null;
//
//	function
//	return {
//		get: function(){
//			if (!storeStateObj) {
//				storeStateObj = {};
//				storeStateObj.formPopup = {};
//				storeStateObj.loginPopup = {};
//			}
//			return storeStateObj;
//		}
//	}
//}