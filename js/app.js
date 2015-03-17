var requisitos_aulas = angular.module("requisitos_aulas", ['ui.bootstrap','dndLists']);

requisitos_aulas.controller("controllerTitulaciones",function ($scope) {
    var titu = this

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

    $scope.onDragSuccess1=function(data,evt){
        console.log("133","$scope","onDragSuccess1", "", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
    }

    $scope.onDropComplete1=function(data,evt){

        console.log("entramos en drop complete"+data);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
            $scope.droppedObjects1.push(data);
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

