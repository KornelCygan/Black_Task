const ranking = new Ranking('#numbers-ranking');
const random = new Random('#numbers-random');

ranking.init();

setInterval(function() {
    random.getRandomNumbers()
        .then(
            function(numbers) {
                random.render(numbers);
                ranking.update(numbers);
            }
    );
},  10000);