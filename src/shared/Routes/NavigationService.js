import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
function reset(route, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: route,
        params: params,
      }),
    ],
  });
  _navigator.dispatch(resetAction);
}
function crossnavigate(nested, route, params) {
  // this.props.navigation.navigate('NestedNavigator1', {}, NavigationActions.navigate({ routeName: 'screenB' })) //navigate between stacks rather than adding duplicate screens

  _navigator.dispatch(
    NavigationActions.navigate(
      nested,
      {},
      NavigationActions.navigate({routeName: route}),
    ),
  );
}
// add other navigation functions that you need and export them

export default {
  navigate,
  reset,
  crossnavigate,
  setTopLevelNavigator,
};
//NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
