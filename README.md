# npm install
# create database from DATABASE_URL
# npm run start:dev

# WAT

Where Are They (WAT) is a social app that allows you locate your group of friends/family using your phone!


## Login/Registration(3rd Party): 
User has to login/register the app by using Google/Facebook for the authentication. WAP App will then need to authenticate requests to the backend API server

## Add friends:(including friends request)
1.	WAT users can add/remove friends by searching phone numbers/sending SMS/sending emails. (friends info can be retrieved from google/facebook Oauth response)

o	Open add friends-->add friends

o	Choose a friend from your Contacts or enter friends emails, then tap Send Request to your friend

2.	After your friends respond to your request, friends will share with his/her locations with you automatically


## Group Management
1.	Create/edit/remove groups with name, descriptions and photo
Tab Create Group to create a group and edit the descriptions. 
2.	Add/remove friends from groups
3.	When adding user to the group, app will trigger a request to the person 

## Location/Map Management:
1.	Identify friends location in real time (Possibly simulate fake locations, Evan has tons of phones)
Toggle UI maps, clocks
2.	Switch the compass to view a specific person
3.	User can label the locations such as HOME, WORK (friends/group should be able to view the label as well. 

Example: Evan has his location labeled home, and it will show as Evan’s Home in group, and it will display as ‘Evan’s home’ when Summer visits Evan’s home in her phone as well)

## Chat Management

## Backend:
•	Users API 
•	Location API
•	Groups API

