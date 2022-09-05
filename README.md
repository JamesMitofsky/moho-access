# Moho Auth

Making authenticating into the Moho resident space simple, scalable, & secure. 👍

<img height="26" src="https://img.shields.io/github/deployments/jamesmitofsky/moho-authentification/production"/>
<table>
	<tr>
	  <td><img width="400" src="https://user-images.githubusercontent.com/12516538/187898620-2e9d7d2f-53d8-4797-9fac-95f300b9b10d.jpg"/></td>
	  <td><img width="250" src="https://user-images.githubusercontent.com/12516538/187910135-ecf15635-da18-4650-80cc-cc46df382a8f.png"/></td>
	  <td><img width="400" src="https://user-images.githubusercontent.com/12516538/187898609-4bcfa4e4-8021-4c66-a2eb-75259ccdf6a4.jpg"/></td>      
	</tr>
</table>

## Getting Started

Install all dependencies & begin running the development server:

```
npm i && npm run dev
```

<a href="#database-structure">See database setup section.</a>

## Purpose of Application

### Context

The Moho coworking space has two authentication solutions to their private resident space:

1. An individual badge with assignable authorities for accessing certain parts of the building.
   - This works perfectly for people actually holding the resident status, as they're the principal occupants of the space.
2. A QR code which opens turnstile gates into the resident space.
   - This is much more suited to the enterprises which rent out various rooms contained within the resident space. Because this groups are often large, their presence brief, and the scope of their access limited to getting past the turnstile, their needs can be met with a simpler solution.

### The Problem

Working with the QR codes is a manual and finicky process.

If it's in paper form, this becomes an easily lost access token. If it's a photo of the paper, users are left trying to align the picture just right underneath the scanner's view.

In my experience, I've been using the Moho QR codes to access the resident space for months, and getting the photo of the correct day's code on my phone to line up with the code scanner was a hassel.

### The Opportunity

Improve convenience and security by moving the QR code to a web-app.

#### Convenience

- Code access: The transition from walking toward the get to having a code ready should be as easy as possible, avoiding user frustration or congestion at the turnstile. A link on the user's phone or — better still — a PWA on their homescreen meets this need of immediate access.

- Code scanning: The app format means the position of the code can be controlled to fit in the exact placement best for the scanner, removing guesswork for how to line up the phone beneath it. Instead, users can slide the phone into the scanner on the bottom panel.

#### Security

- Code updates: Because the QR code scanners are not easy to update, they are not frequently attended to. This is not a user failure, but shortcoming in the design of the system to find a practical solution to best security practices. Resultantly, this work can be exported to automation.

- Code distribution: Contrary to losing control over a paper or photo copy of a QR code, in a digital system, access can be assigned and revoked from an admin panel. Even without integration into the turnstile hardware, dynamically closing access is an easy first step to begin tying up loose ends.

## Technical Information

### Database Structure

Connect to Firebase's [Authentication](https://firebase.google.com/docs/auth) and [Firestore](https://firebase.google.com/docs/firestore). In this use case, the following collection structure is being used:

```js
// qr code information for scanner login at Moho
loginCodes {
    code: QR_CODE_VALUE, // number
    weekday: DAY_OF_WEEK // string
}

// any users who successfully registered through Firebase Auth
// each user document in this collection should have a document ID which is identical to the user's UID
users {
	authProvider: CREATION_POINT,	 // string
	created: FIREBASE_TIMESTAMP_OBJ, // obj
	email: EMAIL,                    // string
	name: NAME, 			 // string
	uid: UNIQUE_ID 			 // string
}

// any user which has been given access to the system
userRoles {
	email: EMAIL,                    // string
	uid: UNIQUE_ID, 		 // string
	roles: {			 // obj
	    resident: BOOL,		 // bool
	    admin: BOOL			 // bool
	}
}
```

## Notes

- Env file _must_ be outside of the src directory; [source](https://stackoverflow.com/a/72453980/5395435).
- How to get started with Firebase in a React app; [source](https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/).
- Adding auth into React with Firebast; [source](https://enlear.academy/how-to-implement-firebase-authentication-with-react-ff6f75746399).
- For the useEffect hook to track route changes, it must be added to the dependencies array; [source](https://stackoverflow.com/a/70700558/5395435).

## To Do

- [ ] Local storage the QR code by day with an expiration timer to (1) 24 cycles or (2) a midnight reset.
- [ ] Update global entry object. Ask for name of enterprise, disallow other types of characters, and then replace spaces with dashes
- [ ] Greet enterprise with their name. Maybe also allow the upload of an enterprise logo?? That could be cool.
- [ ] Feat: add deletion of existing users or keys
