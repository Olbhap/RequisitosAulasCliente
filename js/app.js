var requisitos_aulas = angular.module("requisitos_aulas", ['ui.bootstrap','dndLists','sticky']);

requisitos_aulas.filter('capitalize', function() {
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});

requisitos_aulas.controller("controllerTitulaciones",function ($scope, $http) {
    var titu = this
    var urlAPI = 'http://donpisoalicante.com/TFGUA/';

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
                                    actividad.lista=[]
                                    asignatura.actividades.push(actividad);
                                });
                            });
                        });

                        value.cursos.push(curso1);
                        value.cursos.push(curso2);
                        value.cursos.push(curso3);
                        value.cursos.push(curso4);
                    });


            });


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
    };


    titu.lista = [{nombre:"Grado Ingeniería Informática", acro:"GII", cursos: titu.CursosGII},{nombre:"Grado Ingeniería Multimedia", acro:"GIM"}];
    titu.recursosAula = [{descripcion:"Mesa de dibujo avatible"},{descripcion:"Mesa de dibujo plana"},{descripcion:"Pizarra doble"}];
    titu.recursosHardware = [{descripcion:"Proyector"},{descripcion:"Ordenadores 4GB RAM"}];
    titu.listaRecursos = [{tipo: "Aula", recursos: titu.recursosAula},
        {tipo:"Hardware", recursos: titu.recursosHardware},
        {tipo:"Software"}];



    titu.showTitu = function (titulacion) {
        console.log(titulacion);
    };
    titu.showListaRecursos = function (recurso) {
        console.log(recurso);
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {

        console.log(item);
       /* $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;*/
    };


});

requisitos_aulas.controller('TabsDemoCtrl', function ($scope, $window) {

});



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

