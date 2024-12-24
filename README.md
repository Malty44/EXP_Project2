# Experiment to see if a typing case (e.g. camel case) is better than others (on average)

## This is a website that is designed so that you can easily add more cases and questions to the experiment if needed.

### Below are some instructions on how to navigate the code and how everithing works.

1. Firstly, as mentioned above, this is a website, so in order to use this to get data from multiple people on different parts of the globe, you <strong>must</strong> have it
either hosted somewhere (e.g. render.com I can guarantee that it works well) or have them download and run the `npm run dev` command and open a localhost tab to complete the questionnaire.

2. The data is stored in a database, which can be and should be created and renamed to your own liking, but a default database is provided and ready to run. We recommend that
you change the database to your own if you know and/or have knowledge of database integration using `mongoose` and `mongodb` in `NodeJS`.

3. All the data stored in the database is stored under <strong?>JSON</strong> format, which is then converted into CSV using the python code found in the only python file in the root of the directory.


