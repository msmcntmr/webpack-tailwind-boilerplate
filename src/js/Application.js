//ES6 Syntax

import "./../css/global.css";

class sample {
    constructor(helloworld) {
        this.hello = helloworld
    }
    printvar() {
      console.log(this.hello);
    }
  }
  
  var hello = "hello worlds";
  var s = new sample(hello);
  s.printvar();