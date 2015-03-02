var requisitos_aulas = angular.module("requisitos_aulas", ['ui.bootstrap','ngDraggable']);

requisitos_aulas.controller("controllerTitulaciones",function () {
    var titu = this

    titu.Asignaturas1GII = [{nombre: "Programación 1"},{nombre: "Programación 2"}, {nombre: "Informática Básica"}]
    titu.Asignaturas2GII = [{nombre: "Programación y Estructuras de Datos"},{nombre: "Diseño de Bases de Datos"}, {nombre: "Lenguajes y Paradigmas de Programación"}]
    titu.CursosGII = [{nombre: "Primer Curso", asignaturas: titu.Asignaturas1GII}, {nombre: "Segundo Curso", asignaturas: titu.Asignaturas2GII}]
    

    titu.lista = [{nombre:"Grado Ingeniería Informática", acro:"GII", cursos: titu.CursosGII},{nombre:"Grado Ingeniería Multimedia", acro:"GIM"}]
    titu.recursosAula = [{descripcion:"Mesa de dibujo avatible"},{descripcion:"Mesa de dibujo plana"},{descripcion:"Pizarra doble"}]
    titu.recursosHardware = [{descripcion:"Proyector"},{descripcion:"Ordenadores 4GB RAM"}]
    titu.listaRecursos = [{tipo: "Aula", recursos: titu.recursosAula},
        {tipo:"Hardware", recursos: titu.recursosHardware},
        {tipo:"Software"}]

    titu.showTitu = function (titulacion) {
        console.log(titulacion);
    }
    titu.showListaRecursos = function (recurso) {
        console.log(recurso);
    }



    titu.onDropComplete=function(data,evt){
            console.log("onDropComplete"+data);
        }


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

