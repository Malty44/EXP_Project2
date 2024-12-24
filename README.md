# Experiment to see if a typing case (e.g. camel case) is better than others (on average)

## This is a website that is designed so that you can easily add more cases and questions to the experiment if needed.

### Below are some instructions on how to navigate the code and how everithing works.

1. Firstly, as mentioned above, this is a website, so in order to use this to get data from multiple people on different parts of the globe, you <strong>must</strong> have it
either hosted somewhere (e.g. render.com I can guarantee that it works well) or have them download and run the `npm run dev` command and open a localhost tab to complete the questionnaire.

2. The data is stored in a database, which can be and should be created and renamed to your own liking, but a default database is provided and ready to run. We recommend that
you change the database to your own if you know and/or have knowledge of database integration using `mongoose` and `mongodb` in `NodeJS`.

3. All the data stored in the database is stored under <strong>JSON</strong> format, which is then converted into CSV using the python code found in the only python file in the root of the directory.


### Here are some key ideas for the safe navigation of the code

1. All the static and dynamic files are within the source directory called <strong>src</strong> found at `EXP_PROJECT2>src`. Within this src foulder, multiple foulders can be found that have names to easily identify what each folder contains (e.g. views for what is displayed on the page done using ejs, js for javascript etc...).

2. The main file which runs and organizes everything is the app.js file found outside src at `EXP_PROJECT2>app.js`. In here you can find the database integration and a basic setup for routers and the server.

3. All the necessary packets and commands have been setup already in the package.json file. <h4> To run the site you must use `npm run dev`. </h4>

4. If you want to add more questions, you can find the whole question section in `EXP_PROJECT2>src>routes>router.js` at the router for the `/exp` page. 

5. Both `style.css` and `form.css` work together to bring the page to life, so if you decide to add more pages, include the css files found at `EXP_PROJECT2>src>styles`.


## IMPORTANT NOTE:

<h3> This git repo is public so if you want to use this code for your own personal projects, please fork and don't commit to the main branch. Thank you in advance! </h3>

<h3> Everything has been set up to work by just deploying the website and running the python script manually when enough data has been collected. At the moment of the last commit everything is working, thus if anything breaks it is due to some modification you have implemented.</h3>