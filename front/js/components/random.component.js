function Random(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.init = function() {
    const self = this;

    setInterval( function() {
        axios.get('http://localhost:3000/random-numbers')
            .then(function(response) {
                console.log(response);
                self.numbers = response.data.data.map(function(number) {
                    return {
                        id: number
                    }
                });

                self.render();
            })
            .catch(function(error) {
                console.error(error);
            });
    },10000)

};

Random.prototype.render = function() {
    const container = this.getDOMElement();

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;

        container.appendChild(listElement);
    });
};