/**
 *  The module manages the sidebar menu.
 */
angular.module('ticketsystem.menuservice', [])
    .service('menuService', ['$rootScope', '$http', function ($rootScope, $http) {
        return {

            /**
             *  Function returns the list of tabs of the menu.
             *  @param type         Logged user type
             *  @returns {Promise}  List of tabs
             */
            // TODO manca la reject
            getMenuByType: function (type) {
                return new Promise(function (resolve, reject) {
                    $http.get('../mocks/menuMock.json').then(
                        function (menuList) {
                            //console.log("List of tabs: ");
                            //console.log(menuList.data)
                            let menu = createMenu(menuList.data, type);
                            resolve(menu);
                        }
                    )
                })
            }
        }
    }
    ])

/**
 *  Function returns the list of tabs who are visible to the logged user.
 *  @param menuList     List of tabs
 *  @param type         User type
 *  @returns {Array}    List of tabs for the logged user
 */
function createMenu(menuList, type) {

    let menuFiltered = [];
    angular.forEach(menuList, function (value) {
        //console.log(value)
        if (value.visibility.indexOf(type) > -1 || value.visibility.indexOf('ALL') > -1) {
            menuFiltered.push(value)
        }
    })
    return menuFiltered;
}