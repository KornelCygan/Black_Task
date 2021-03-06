function Random(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.getRandomNumbers = function (){
    return new Promise(function(resolve, reject){
        axios.get('http://localhost:3000/random-numbers')
            .then((response) => {
                self.numbers = response.data.data.map((number) => {
                    return {
                        id: number
                    };
                });

                resolve(self.numbers);
            })
            .catch((error) => {
                console.error(error);
                reject(new Error('Something happened!'));
            });
    });
};

Random.prototype.render = function(numbers) {
    const container = this.getDOMElement();

    numbers.forEach((number) => {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;

        container.appendChild(listElement);
    });
};