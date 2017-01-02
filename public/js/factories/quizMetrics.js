(function () {

    angular
        .module("demoQuiz")
        .factory("quizMetrics", QuizMetrics);

        QuizMetrics.$inject = ['DataService'];
    
        function QuizMetrics(DataService) {
            var quizObj = {
                quizActivo: false,
                resultadosActivos: false,
                changeState: changeState,
                respuestasCorrectas: [],
                respOpcionUno: [],
                markQuiz: markQuiz,
                numCorrect: 0,
                opcionUno: opcionUno
            };

            return quizObj;

            function changeState(metric, state) {
                if(metric === "quiz") {
                    quizObj.quizActivo = state;
                }else if(metric === "results") {
                    quizObj.resultadosActivos = state;
                }else {
                    return false;
                }
            }
            
            function markQuiz() {
               quizObj.respuestasCorrectas = DataService.respuestasCorrectas;
               for(var i = 0; i < DataService.preguntasQuiz.length; i ++) {
                   if(DataService.preguntasQuiz[i].selected === DataService.respuestasCorrectas[i]){
                       DataService.preguntasQuiz[i].correct = true;
                       quizObj.numCorrect++;
                   }else {
                       DataService.preguntasQuiz[i].correct = false;
                   }
                }
            }

            function opcionUno(onSuccess) {

                if (quizObj.numCorrect >= 5) {
                    onSuccess("7 personas comparten los mismos gustos.");
                }
                else if (quizObj.numCorrect >= 4) {
                    onSuccess("Solo 8 personas piensan como tú.");
                }
                else if (quizObj.numCorrect >= 3) {
                    onSuccess("Existen 12 personas muy parecidas a ti.");
                }
                else if (quizObj.numCorrect >= 2) {
                    onSuccess("17 personas piensan muy similar a ti.");
                }
                else if (quizObj.numCorrect >= 1) {
                    onSuccess("Más de 20 personas piensan como tú.");
                }
                else {
                    onSuccess("Más de 54 personas piensan como tú.");
                }

            }

        }

        /*
         quizObj.respOpcionUno = DataService.respOpcionUno;
         */

})();