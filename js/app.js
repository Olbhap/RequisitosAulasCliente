var requisitos_aulas = angular.module("requisitos_aulas", ['ui.bootstrap','dndLists','sticky', 'angularSpinner']);

requisitos_aulas.filter('capitalize', function() {
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});

requisitos_aulas.controller("controllerTitulaciones",['$scope','$http','usSpinnerService','$q',function ($scope, $http,usSpinnerService, $q) {
    var titu = this;
    var urlAPI = 'http://donpisoalicante.com/TFGUA/';
    //var urlAPI = 'http://localhost/RequisitosAPI/';
    titu.tiposAulaCentralizadas=[];
    titu.tiposAulaNoCentralizadas=[];
    $scope.tipoRecursoNombre="Recurso";
    $scope.tipoAulaNombre="Aula";

    $scope.allowedTypes1=["Recurso"];
    $scope.allowedTypes2=["Aula"];

    $http.get(urlAPI+'tiposAulaCentralizadas').
        success(function(data) {
            angular.forEach(data, function(tipoAula, key) {
                    titu.tiposAulaCentralizadas.push(tipoAula);
            });
        });

    $http.get(urlAPI+'tiposAulaNoCentralizadas').
    success(function(data) {
        angular.forEach(data, function(tipoAula, key) {
                titu.tiposAulaNoCentralizadas.push(tipoAula);
        });
    });

    $http.get(urlAPI+'titulaciones').
        success(function(data, status, headers, config) {
            $scope.titulaciones=data;
            angular.forEach(data,function(value, key) {

                $http.get(urlAPI+'titulaciones/'+value.CODPLA+'/curso/2014/asignaturas').
                    success(function(data, status, headers, config) {
                        value.cursos=[];
                        curso1={nombre:"Primer Curso",asignaturas:[]};
                        curso2={nombre:"Segundo Curso",asignaturas:[]};
                        curso3={nombre:"Tercer Curso",asignaturas:[]};
                        curso4={nombre:"Cuarto Curso",asignaturas:[]};

                        angular.forEach(data,function(asignatura,key) {
                            switch(asignatura.CURSO) {
                                case "1":     curso1.asignaturas.push(asignatura);
                                            break;
                                case "2":     curso2.asignaturas.push(asignatura);
                                            break;
                                case "3":     curso3.asignaturas.push(asignatura);
                                            break;
                                case "4":     curso4.asignaturas.push(asignatura);
                                            break;
                                default:    curso4.asignaturas.push(asignatura);
                                            break;
                            }
                            asignatura.recursosTeoria = [];//fuera
                            asignatura.recursosPract = [];//fuera
                            asignatura.actividades = [];



                            $http.get(urlAPI+'asignaturas/'+asignatura.CODASI+'/actividades').
                            success(function(data) {
                                angular.forEach(data, function(actividad, key) {

                                    actividad.listaRecursos=[];
                                    actividad.listaAulas=[];
                                    asignatura.actividades.push(actividad);
                                    $http.get(urlAPI+'asignaturas/'+asignatura.CODASI+'/actividad/'+actividad.CODACT+'/curso/2014-2015'+'/aulasCentralizadas').
                                        success(function(data) {
                                            angular.forEach(data, function(aulaCentralizada, key) {
                                                actividad.listaAulas.push(aulaCentralizada);

                                            });
                                        });
                                    $http.get(urlAPI+'asignaturas/'+asignatura.CODASI+'/actividad/'+actividad.CODACT+'/curso/2014-2015'+'/aulasNoCentralizadas').
                                        success(function(data) {
                                            angular.forEach(data, function(aulaNoCentralizada, key) {
                                                actividad.listaAulas.push(aulaNoCentralizada);
                                            });
                                        });
                                });
                                    $q.all(data).then(function () {
                                        console.log("wtf?");
                                    })
                            });
                        });

                        value.cursos.push(curso1);
                        value.cursos.push(curso2);
                        value.cursos.push(curso3);
                        value.cursos.push(curso4);
                    });

            });

            console.log(data);


        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });

    titu.Asignaturas1GII = [{id: "p1",nombre: "Programación 1",recursosTeoria: [],recursosPract: []},{id: "p2",nombre: "Programación 2",recursosTeoria: [],recursosPract: []}, {id: "p3",nombre: "Informática Básica",recursosTeoria: [],recursosPract: []}];
    titu.Asignaturas2GII = [{nombre: "Programación y Estructuras de Datos",listMaana: [],recursosPract: []},{nombre: "Diseño de Bases de Datos",recursosTeoria: [],recursosPract: []}, {nombre: "Lenguajes y Paradigmas de Programación",recursosTeoria: [],recursosPract: []}];
    titu.CursosGII = [{nombre: "Primer Curso", asignaturas: titu.Asignaturas1GII}, {nombre: "Segundo Curso", asignaturas: titu.Asignaturas2GII}];

    $scope.models = {
        selected: null,
        "B": []
    };$scope.models2 = {
        selected: null,
        "B": []
    };$scope.models3 = {
        selected: null,
        "B": []
    };


    titu.lista = [{nombre:"Grado Ingeniería Informática", acro:"GII", cursos: titu.CursosGII},{nombre:"Grado Ingeniería Multimedia", acro:"GIM"}];

    /*titu.recursosAula = [{descripcion:"Mesa de dibujo avatible"},{descripcion:"Mesa de dibujo plana"},{descripcion:"Pizarra doble"}];
    titu.recursosHardware = [{descripcion:"Proyector"},{descripcion:"Ordenadores 4GB RAM"}];
    titu.listaRecursos = [{tipo: "Aula", recursos: titu.recursosAula},
        {tipo:"Hardware", recursos: titu.recursosHardware},
        {tipo:"Software"}];*/
    titu.listaRecursos=[]; //Inicializamos la lista de recursos

    $http.get(urlAPI+'tiposrecursosdocentes').
        success(function(data) {
            angular.forEach(data, function(tipoRecurso, key) {
                posLista = titu.indiceDeCategoriaRecurso(titu.listaRecursos,tipoRecurso.CATDESCRIP);
                if(posLista==-1) {
                    listaRecurso = {tipo: tipoRecurso.CATDESCRIP, recursos: []};
                    listaRecurso.recursos.push(tipoRecurso);
                    titu.listaRecursos.push(listaRecurso);
                }
                else {
                    titu.listaRecursos[posLista].recursos.push(tipoRecurso);
                }
            });
        });

    titu.showTitu = function (titulacion) {
        console.log(titulacion);
    };
    titu.showListaRecursos = function (recurso) {
        console.log(recurso);
    };

    titu.indiceDeCategoriaRecurso = function(listaRecursos, recurso) {
        if(listaRecursos.length == 0)
            return -1;

        for(var i = 0; i < listaRecursos.length; i++) {
            if(listaRecursos[i]["tipo"] == recurso)
                return i;
        }
        return -1;

    };


    $scope.$on('$viewContentLoaded', function(){
        console.log("WEB LOADED");
    });

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {

        console.log(item);
       /* $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;*/
    };
    $scope.dropRecurso = function(codtit, curso, codasi, codact, item, type) {
        if(type=="Recurso")
            console.log("Recurso: "+item.descripcion+", "+codtit+", "+codasi+", "+codact+", "+type);
        else {
            item.codtit=codtit;
            item.curso="2014-2015";
            item.codasi=codasi;
            item.codact = codact;
            jObject = JSON.stringify(item);
            console.log(jObject);
            $http.post(urlAPI+'asignarTipoAulaAsignatura',jObject).
                then(function(response) {


                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("SUCCESS   ->" + response.data);
                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("ERROR")
                });
            console.log(item.TIPOAULA + ", " + codtit + ", " + codasi + ", " + codact + ", " + type + ",CURSO: " + curso);
        }

        return item;

    };

    $scope.removeByCurso = function(codTit, nombreCurso){
        console.log("Eliminados todos los recursos del curso: "+nombreCurso+ " de la titulación: "+codTit);
        angular.forEach($scope.titulaciones,function(titulacion,key) {
            if(titulacion.CODTIT == codTit)
            {
                angular.forEach(titulacion.cursos,function(curso,key)
                {
                    if(curso.nombre==nombreCurso)
                    {
                        angular.forEach(curso.asignaturas, function(asignatura,key)
                        {
                            angular.forEach(asignatura.actividades, function(actividad,key)
                            {
                                    actividad.listaRecursos.length=0;
                                    actividad.listaAulas.length=0;
                                //borrar en DB, llamada al APIRest
                            });

                        });
                    }
                });
            }
        });
    };

    $scope.removeByAsignatura = function(codTit, nombreCurso, codAsi, isRecurso){
        console.log("Eliminados todos los recursos del curso: "+nombreCurso+ " de la titulación: "+codTit+" de la asignatura: "+codAsi);
        angular.forEach($scope.titulaciones,function(titulacion,key) {
            if(titulacion.CODTIT == codTit)
            {
                angular.forEach(titulacion.cursos,function(curso,key)
                {
                    if(curso.nombre==nombreCurso)
                    {
                        angular.forEach(curso.asignaturas, function(asignatura,key)
                        {
                            if(asignatura.CODASI==codAsi) {
                                angular.forEach(asignatura.actividades, function (actividad, key) {
                                    if(isRecurso)
                                        actividad.listaRecursos.length=0;
                                    else {
                                        actividad.listaAulas.length = 0;
                                        console.log("DELETE: " + urlAPI + 'asignaturas/' + codAsi + '/curso/2014-2015' + '/tipoAula/');
                                        $http.delete(urlAPI + 'asignaturas/' + codAsi + '/curso/2014-2015' + '/tipoAula/').
                                            then(function (response) {
                                                console.log('DELETE: \n' + response.data)
                                            }, function (response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                            });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    $scope.removeByActividad = function(codTit, nombreCurso, codAsi, codAct, isRecurso){
        console.log("Eliminados todos los recursos del curso: "+nombreCurso+ " de la titulación: "+codTit+" de la asignatura: "+codAsi);
        angular.forEach($scope.titulaciones,function(titulacion,key) {
            if(titulacion.CODTIT == codTit)
            {
                angular.forEach(titulacion.cursos,function(curso,key)
                {
                    if(curso.nombre==nombreCurso)
                    {
                        angular.forEach(curso.asignaturas, function(asignatura,key)
                        {
                            if(asignatura.CODASI==codAsi) {
                                angular.forEach(asignatura.actividades, function (actividad, key) {
                                    if(actividad.CODACT==codAct) {
                                        if(isRecurso)
                                            actividad.listaRecursos.length=0;
                                        else {
                                           // /asignaturas/(\d+)/curso/(.+)/tipoAula/
                                            actividad.listaAulas.length=0;

                                        }

                                        //borrar en DB, llamada al APIRest
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    $scope.removeByRecurso = function(codTit, nombreCurso, codAsi, codAct, isRecurso,recurso){
        console.log("Eliminados todos los recursos del curso: "+nombreCurso+ " de la titulación: "+codTit+" de la asignatura: "+codAsi);
        angular.forEach($scope.titulaciones,function(titulacion,key) {
            if(titulacion.CODTIT == codTit)
            {
                angular.forEach(titulacion.cursos,function(curso,key)
                {
                    if(curso.nombre==nombreCurso)
                    {
                        angular.forEach(curso.asignaturas, function(asignatura,key)
                        {
                            if(asignatura.CODASI==codAsi) {
                                angular.forEach(asignatura.actividades, function (actividad, key) {
                                    if(actividad.CODACT==codAct) {
                                        if(isRecurso) {
                                            actividad.listaRecursos.splice( actividad.listaRecursos.indexOf(recurso), 1 );
                                        }
                                        else {
                                            actividad.listaAulas.splice( actividad.listaAulas.indexOf(recurso), 1 );
                                            console.log("DELETE: "+urlAPI+'asignaturas/'+codAsi+'/actividad/'+codAct+'/curso/2014-2015'+'/tipoAula/'+recurso.CODTIPOAULA);
                                            $http.delete(urlAPI+'asignaturas/'+codAsi+'/actividad/'+codAct+'/curso/2014-2015'+'/tipoAula/'+recurso.CODTIPOAULA).
                                                then(function(response) {
                                                    console.log('DELETE: \n'+response.data)
                                                }, function(response) {
                                                    // called asynchronously if an error occurs
                                                    // or server returns response with an error status.
                                                });
                                        }

                                    }
                                }

                                );
                            } console.log("terminamos");
                        });
                    }
                });
            }
        });
    };

}]);

requisitos_aulas.controller('TabsDemoCtrl', function ($scope, $window) {

});


requisitos_aulas.factory('spinnerInterceptor', ['usSpinnerService', function(usSpinnerService) {
    return  {
        request: function(config) {
            return config;
        },
        response:function(config){
            return config;
        },
        responseError:function(config){
            return config;
        }
    };
}]);

requisitos_aulas.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('spinnerInterceptor');
}]);
//spinner configuration END




    requisitos_aulas.controller('AlertDemoCtrl', function ($scope) {
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

/**
 * @ngdoc directive
 * @name customAttribute
 * @param {expression} customAttribute
 */
requisitos_aulas.directive("customAttribute", function () {
    return {
        restrict: "A"
    }
})
requisitos_aulas.directive("customElement", function () {
    return {
        restrict: "E"
    }
})

