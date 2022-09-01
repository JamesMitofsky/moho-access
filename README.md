# Moho Auth
<table>
	<tr>
		<td><img height="400px" src="https://user-images.githubusercontent.com/12516538/187898620-2e9d7d2f-53d8-4797-9fac-95f300b9b10d.jpg"/></td>
      <td><img height="400px" src="https://user-images.githubusercontent.com/12516538/187910135-ecf15635-da18-4650-80cc-cc46df382a8f.png"/></td>
		<td><img height="400px" src="https://user-images.githubusercontent.com/12516538/187898609-4bcfa4e4-8021-4c66-a2eb-75259ccdf6a4.jpg"/></td>      
	</tr>
</table>

## Getting Started

Install all dependencies & begin running the development server:

```
npm i && npm run dev
```

Connect to Firebase's Authentication and Firestore

```

```

## The Problem & its Solution

### Context

The Moho coworking space currently has authentication solutions to their private resident space:

1. An individual badge with assignable authorities for accessing certain parts of the building.
   - This works perfectly for people actually holding the resident status, as they're the principal occupants of the space.
2. A QR code which opens turnstile gates into the resident space.
   - This is much more suited to the enterprises which rent out various rooms contained within the resident space. Because this groups are often large, their presence brief, and the scope of their access limited to getting past the turnstile, their needs can be met with a simpler solution.
   
In my experience, I've been using the Moho QR codes to access the resident space for months, and getting the photo of the correct day's code on my phone to line up with the code scanner was a hassel.

### The Opportunity

Improve convenience and security by moving the QR code to a web-app.

#### Convenience

Code access: The transition from walking toward the get to having a code ready should be as easy as possible, avoiding user frustration or congestion at the turnstile. A link on the user's phone or — better still — a PWA on their homescreen meets this need of immediate access.

Code scanning: The app format means the position of the code can be controlled to fit in the exact placement best for the scanner, removing guesswork for how to line up the phone beneath it. Instead, users can slide the phone into the scanner on the bottom panel.

#### Security

Code updates: Because the QR code scanners are not easy to update, they are not frequently attended to. This is not a user failure, but shortcoming in the design of the system to find a practical solution to best security practices. Resultantly, this work can be exported to automation.

Code distribution: Contrary to losing control over a paper or photo copy of a QR code, in a digital system, access can be assigned and revoked from an admin panel. Even without integration into the turnstile hardware, dynamically closing access is an easy first step to begin tying up loose ends.

## Notes

- Env file _must_ be outside of the src directory; [source](https://stackoverflow.com/a/72453980/5395435).
- How to get started with Firebase in a React app; [source](https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/).
- Adding auth into React with Firebast; [source](https://enlear.academy/how-to-implement-firebase-authentication-with-react-ff6f75746399).

## To Do

[] Local storage the QR code by day with an expiration timer to (1) 24 cycles or (2) a midnight reset.
[] Add url based entry for enterprise names that can be submitted to the database
