const express = require('express');
const FormModel = require('../mongo/mongoose'); 
const router = express.Router();

router.get('/', (req, res) => {
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
                  options: ['scene-defnition()', 'scenes-definition()', 'scenes-definited()', 'scenes-definiton()']
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
  
  router.post('/exp/submit-answer', async (req, res) => {
      const { name, answers } = req.body;
  
      // Perform validation on the data
    //   if (!name || !Array.isArray(answers) || answers.some(answer => answer === null)) {
    //       return res.status(400).send('Invalid data.');
    //   }
  
      try {
          // Find the user by their name
          const user = await FormModel.findOne({ fullName: name });
          if (!user) {
              return res.status(404).send('User not found.');
          }
  
          // Update the user with the new answers
          user.answers = answers;
          await user.save();
  
          res.json({ status: 'success', message: 'Quiz answers saved successfully.' });
      } catch (error) {
          console.error('Error saving quiz answers:', error);
          res.status(500).send('Error saving quiz answers.');
      }
  });
  
module.exports = router;