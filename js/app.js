var requisitos_aulas = angular.module("requisitos_aulas", ['ui.bootstrap']);

requisitos_aulas.controller("controllerTitulaciones",function () {
    var titu = this

    titu.lista = [{nombre:"Grado Ingeniería Informática", acro:"GII"},{nombre:"Grado Ingeniería Multimedia", acro:"GIM"}]
    titu.recursosAula = [{descripcion:"Mesa de dibujo avatible"},{descripcion:"Mesa de dibujo plana"}]
    titu.listaRecursos = [{tipo: "Aula", recursos: titu.recursosAula},
        {tipo:"Hardware"},
        {tipo:"Software"}]

    titu.showTitu = function (titulacion) {
        console.log(titulacion);
    }
    titu.showListaRecursos = function (recurso) {
        console.log(recurso);
    }
})
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

