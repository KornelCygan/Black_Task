function Ranking(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
    const self = this;

    axios.get('http://localhost:3000/numbers')
        .then((response) => {
            self.numbers = response.data.data.map((number) => {
                return {
                    id: number,
                    count: 0
                }
            });

            self.render();
        })
        .catch(function(error) {
            console.error(error);
        });
};

Ranking.prototype.update = function(numbers) {
    numbers.forEach((number) => {const element = this.numbers.find((item) => item.id === number.id);
    element.count++;
});
    this.numbers.sort((a, b) => a.count < b.count);
    this.render();
};

Ranking.prototype.render = function() {
    const container = this.getDOMElement();
    container.innerHTML= '';

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;

        container.appendChild(listElement);
    });
};

