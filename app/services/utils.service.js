angular.module('ticketsystem.utilService', [])
    .service('util', function () {
            return {
                getBase64(file) {
                    return new Promise((resolve, reject) => {

                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            resolve(reader.result);
                        };
                        reader.onerror = function (error) {
                            console.log('Error: ', error);
                            reject('rejected',error)
                        };
                    })

                }
            }
        }
    )

