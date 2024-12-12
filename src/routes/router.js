const express = require('express');
const router = express.Router();
const FormModel = require('../mongo/mongoose'); // Ensure this is correctly set up to interact with your MongoDB

// Root route
router.get('/', (req, res) => {
    const data = {
        title: 'Home Page',
        heading: 'Welcome to the experiment',
        content: 'This is the page in which you can find all the information about the website'
    };
    res.render('home', data);
});

router.get('/form', (req, res) => {
    res.render('form');
});



router.get('/exp', (req, res) => {
    const name = req.query.name;
      res.render('exp', {
          title: 'Quiz Page',
          heading: 'Experimental Quiz',
          content: 'Please answer the following questions',
          questions: [
              {
                  text: 'find treasure',
                  options: ['findTreasure', "findTreasury", "findTrasure", 'fundTreasure']
              },
              {
                  text: 'start engine',
                  options: ['start-engines', 'start-egnine', 'start-Engine', 'start-engine']
              },
              {
                  text: 'break glass',
                  options: ['brake-Glass', 'break-class', 'break-glass', 'brek-glass']
              },
              {
                  text: 'paint wall',
                  options: ['pint-wall', 'paint-wall', 'paint-well', 'pant-wall']
              },
              {
                  text: 'fix computer',
                  options: ['fixComute', 'foxComputer', 'fixComputer', 'fixCompter']
              },
              {
                  text: 'open locked door',
                  options: ['open-lockd-door', 'open-locked-door', 'open-licked-door', 'open-locked-dooor']
              },
              {
                  text: 'read thick book',
                  options: ['read-thick-book', 'reed-thick-book', 'read-thick-brook', 'read-thick-boo']
              },
              {
                  text: 'drive small car',
                  options: ['driveSmallCat', 'driveSmallCar', 'droveSmallCar', 'driveSmellCar']
              },
              {
                  text: 'find treasure',
                  options: ['find-treasury', 'find-tresure', 'find-treasure', 'fund-treasure']
              },
              {
                  text: 'read thick book',
                  options: ['readThickBoo', 'reedThickBook', 'readThickBook', 'readThickBrook']
              },
              {
                  text: 'fix computer',
                  options: ['fix-comute', 'fox-computer', 'fix-compter', 'fix-computer']
              },
              {
                  text: 'start engine',
                  options: ['startEngines', 'startEngine', 'startEgnine', 'stratEngine']
              },
              {
                  text: 'drive small car',
                  options: ['drive-small-cat', 'drove-small-car', 'drive-small-car', 'drive-smell-car']
              },
              {
                  text: 'open locked door',
                  options: ['openLockdDoor', 'openLockedDoor', 'openLickedDoor', 'openLockedDooor']
              },
              {
                  text: 'break glass',
                  options: ['brakeGlass', 'breakClass', 'breakGlass', 'brekGlass']
              },
              {
                  text: 'paint wall',
                  options: ['pintWall', 'paintWell', 'pantWall', 'paintWall']
              },
              {
                  image: '/img/code1.png',
                  options: ['closesHit', 'closestHits', 'cosestHit', 'closestHit']
              },
              {
                  image: '/img/code2.png',
                  options: ['scene-defnition()', 'scenes-definition()', 'scenes-definited()', 'scene-definition()']
              },
              {
                  text: 'jump rope',
                  options: ['jumpRope', 'jumprope', 'JumpRope', 'jumpRopee']
              },
              {
                  text: 'lift box',
                  options: ['liftBox', 'Liftbox', 'liftbox', 'lifTBox']
              }
          ],
          correctAnswers: [0, 3, 2, 1, 2, 1, 0, 1, 2, 2, 3, 1, 2, 1, 2, 3, 3, 3, 0, 0],
          userName: name
      });
  });
  
  router.post('/exp/answer', async (req, res) => {
      const { name, answers, timeArray } = req.body;
      console.log('Received request body:', req.body);
      console.log('Received request headers:', req.headers);
      //Perform validation on the data
      if (!name || !Array.isArray(answers) || answers.some(answer => answer === null)) {
          return res.status(400).send('Invalid data.');
      }
  
      try {
          // Find the user by their name
          const user = await FormModel.findOne({ fullName: name });
          if (!user) {
              return res.status(404).send('User not found.');
          }
  
          // Update the user with the new answers
          user.answers = answers;
          user.time = timeArray;
          await user.save();
  
          res.json({ status: 'success', message: 'Quiz answers saved successfully.' });
      } catch (error) {
          console.error('Error saving quiz answers:', error);
          res.status(500).send('Error saving quiz answers.');
      }

  });


  router.get('/final', async (req, res) => {
    const { name } = req.query; // Get the user's name from the query parameters
  
    if (!name) {
      return res.status(400).send('User name is required.');
    }
  
    try {
      // Fetch the user's data from MongoDB
        const user = await FormModel.findOne({ fullName: name });
        console.log('Fetched User:', user);
  
      if (!user) {
        return res.status(404).send('User not found.');
      }
      const timeDurations = user.time.map((timestamp, index) => {
        if (index === 0) return 0; 
        const currentTime = new Date(timestamp).getTime();
        const previousTime = new Date(user.time[index - 1]).getTime();
        return Math.abs(currentTime - previousTime); 
      });
      // Render the final stats page with the retrieved data
      res.render('final', {
        title: 'Quiz Statistics',
        name: user.fullName,
        answers: user.answers,
        times: timeDurations ,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Error fetching user data.');
    }
  });
  
module.exports = router;
