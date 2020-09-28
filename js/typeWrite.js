
// typeWriter script
const TypeWriter = function (txtElement, words, wait = 750) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method

//Init On Dom Load
document.addEventListener('DOMContentLoaded', init);

//init  app

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init type writer
    new TypeWriter(txtElement, words, wait);
}

//type Method

TypeWriter.prototype.type = function () {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // initial type speed
    let typeSpeed = 80;

    if (this.isDeleting){
        typeSpeed /=2;
    }

    //if word is complete

    if(!this.isDeleting && this.txt === fullTxt){
        //make pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex ++;
        // pause before typing
        typeSpeed = 50;
    }

    setTimeout(() => this.type(), typeSpeed);
}