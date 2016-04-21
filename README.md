# Website Performance Optimization


## Getting Started

This project uses gulp to build the website, host it and provided an external link so you can run it through Google PageSpeed Insights.

1. [Install Node.js] (https://nodejs.org/en/download/)
2. Clone the repository
      
    `$ git clone https://github.com/slkcoin/FEND-optimization`

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
