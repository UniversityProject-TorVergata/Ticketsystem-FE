angular.module('ticketsystem.menuservice', [])
    .service('menuService', ['$rootScope', '$http', function ($rootScope, $http) {
        return {
            getMenuByType: function (type) {
                return new Promise(function (resolve, rejext) {
                    $http.get('../mocks/menuMock.json').then(
                        function (menuList) {
                            console.log("List of tabs: ");
                            console.log(menuList.data)
                            let menu = createMenu(menuList.data, type);
                            resolve(menu);

                        }
                    )
                })
            }
        }
    }
    ])

function createMenu(menuList, type) {

    let menuFiltered = [];
    angular.forEach(menuList, function (value) {
        console.log(value)
        if (value.visibility.indexOf(type) > -1 || value.visibility.indexOf('ALL') > -1) {
            menuFiltered.push(value)
        }
    })
    return menuFiltered;
}