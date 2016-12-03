# Website Performance Optimization


### Getting Started

This project uses gulp to build the website, host it and provided an external link so you can run it through Google PageSpeed Insights.

1. [Install Node.js] (https://nodejs.org/en/download/)
2. Clone the repository
      
    `$ git clone https://github.com/grahamjx/fend-optimization`

3. Navigate to the project folder and run npm install
  
  ```bash
  $> cd /path/to/your-project-folder
  $> npm install
  ```
4. This will install everything necessary to evaluate the project. If you're curious about what gets installed, check out the package.json file.

####Part 1: Optimize PageSpeed Insights Score for index.html

The goal for this part of the project is to optimize the provided index.html so that it receives a score of 90 or higher using PageSpeed Insights

1. Run gulp from project directory
   
    `$ gulp serve`
  
2. Open a browser and visit localhost:8000

3. Copy the public URL ngrok gives you in the console and try running it through [PageSpeed Insights!](https://developers.google.com/speed/pagespeed/insights/)

####Part 2: Optimize Frames per Second in pizza.html

The pizzeria site should be optimized to run at 60FPS while scrolling. In addition, changing the pizza size should not cause the browser to freeze and produce any noticeable 'jank'.

* __Problem 1: updatePositions__

      The first major problem was that the browser was taking way to long to animate the frames
      when scrolling with the app. As you scroll, the small pizzas move in a sudo-random pattern.
      I changed the total number of pizzas (TOTAL_PIZZA) to render on load.
      
      After examining the for loop using console.log, you can see a pattern in the output.
      Specifically in the original modulus operation (i % 5). So I pulled the Math.sin
      call out of the original loop and pushed the new values into an array to hold each
      of these five values.

      ```
      var items = document.getElementsByClassName('mover'); //grabs all the small pizza elements
            var phase = [];

      for (var i = 0; i < 5; i++) {
            phase.push(Math.sin((scrollLocation / 1250)+i)); //stores the new values in the array
      }
      ```
      
      Finally, I iterate though all the pizzas stored in items and update their style accordingly.

      ```
      for (var i = 0; i < TOTAL_PIZZA; i++) {
            items[i].style.left = items[i].basicLeft + 100 * phase[i%5] + 'px'; //adjust styles
      }
      ```
* __Problem 2: resizePizzas__

      Through a series of tests using console.log and trial and error, I was able to
      identify more patterns in the way the elements were being modified. oldSize
      was originally being calculated using calls to an elements offsetWidth property.
      This causes re-flow issues and various perfomance problems. Eventually, it can be
      simplified that the PIZZA_WIDTH (offsetWidth value) doesn't actually change
      once the elements are added to the DOM on page load. Since the size starts
      at set point, you can log that value and use it as a constant.
      
      ```
      function determineDx (size) {
        var newSize = 0;
          switch (size) {
            case "1":
              return newSize = ((0.25 - OLD_SIZE) * PIZZA_WIDTH) + PIZZA_WIDTH + 'px';
            case "2":
              return newSize = ((0.3333 - OLD_SIZE) * PIZZA_WIDTH) + PIZZA_WIDTH + 'px';
            case "3":
              return newSize = ((0.5 - OLD_SIZE) * PIZZA_WIDTH) + PIZZA_WIDTH + 'px';
            default:
              console.log("bug in sizeSwitcher");
            }
      }
      ```
     Since most of the "heavily lifting" is done by determineDx, this
     function simply grabs the newWidth and the iterates through the pizzaBox array
     adjusting the style accordingly.
     
     ```
     function changePizzaSizes(size) {
         var newWidth = determineDx(size);
         for (var i = 0; i < PIZZA_BOX_SIZE; i++) {
            pizzaBox[i].style.width = newWidth;
         }
      }
      ```
All of the times(ms) can be seen in the console using dev-tools

      
      
      

