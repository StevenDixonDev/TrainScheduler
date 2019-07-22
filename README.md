# Train Scheduler (日本 Edition)

:bullettrain_side: A scheduler app for Japan's Bullet Train Line - Shinkansen(新幹線). 

specifically the Tokaido Shinkansen.

The train schedules are not calculated as they would be in real life. To keep the scope of the project smaller, the trains turn around at the end
of the tokaido line and start traveling in the oppisite direction. The frequency of each train is the average speed*distance this calculates out to be around 3.15 hours for the trains to reach their starting station again.

## Libraries

- JQuery
- Moment JS
- FireBase, App, DataBase, Auth

## Goals

Normal: 

- When adding trains (Train Name, Destination, First Train Time, Frequency in minutes)
- App should calculate when the next train will arrive, relative to current time.
- Styling and theme are completely up to you. 

Bonus:

- Update Minutes to arrival and next train time every minute.
- Add Update and Remove Buttons for each train. 
- Make it to where only users who log into the site with google or github can edit.

## Things I want to do

- [x] Multi Langauge support (switch between ENG/JAP) 
- [x] Video Banner 

## Things I learned

- I had to do a ton of research on the Shinkansen
- Firebase makes auth easy if you set it up right
- Video editing is not my strong suite
- Code splitting is interesting
- Math is hard sometimes

## Things to note

- In no way am I an expert on the Japanese Langauge or culture.
- All language that appears on this site has not been checked over by anyone.
- Don't mean to offend, send me a email and I will make sure to fix anything incorrectly represented.


## Compatible Browsers

Tested on: 
- Google Chrome - Version 75
- Fire Fox - Version 68.0 
- Edge - Version 42.^