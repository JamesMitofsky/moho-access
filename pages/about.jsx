import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";

export default function AboutPage() {
  return (
    <MarginProvider>
      <h1>Hi there, my name is James!</h1>
      <h4>
        Programming is what I love, and I am looking for a full time job where I
        can contribute to something bigger.
      </h4>
      <p>
        This project is powered by React, Next.js, Firebase Auth, and and Cloud
        Firestore.
      </p>
      <MohoModel />
    </MarginProvider>
  );
}
