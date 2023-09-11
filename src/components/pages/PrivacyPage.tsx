import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="grid center-items mx-auto px-6 py-4 lg:px-8 max-w-6xl">
      <h1 className="font-bold text-4xl">Privacy Policy</h1>
      <br />
      <h2 className="font-bold text-xl py-2 dark:border-slate-600 border-t">
        1. Introduction
      </h2>
      <p>
        Musicprofile is committed to protecting your personal information and
        your right to privacy. If you have any questions or concerns about our
        policy or our practices with regards to your personal information,
        please contact us at{" "}
        <a className="underline text-orange-500" href="#">
          contact@musicprofile.io.
        </a>
      </p>
      <br />
      <h2 className="font-bold text-xl">2. What Information We Collect</h2>

      <p>
        We collect information so that we can provide the best possible
        experience when you use our service. Here's a breakdown of the
        information we collect
        <br />
        Personal Information:
        <ul className="list-disc list-inside">
          <li>Email Address</li>
        </ul>
        Non-Personal Information:
        <ul className="list-disc list-inside">
          <li>Log and Usage Data (e.g., IP address, browser type, location)</li>
          <li>Device Information</li>
        </ul>
      </p>
      <br />
      <h2 className="font-bold text-xl">3. How We Use Your Information</h2>
      <p>
        We use your information to:
        <ul className="list-disc list-inside">
          <li>Provide a functional website</li>
          <li>Respond to user inquiries and offer support</li>
        </ul>
      </p>
      <br />
      <h2 className="font-bold text-xl">4. Your Rights</h2>
      <p>
        Depending on where you reside, you have rights related to your personal
        information, such as:
        <ul className="list-disc list-inside">
          <li>The right to access, correct, or delete your personal data</li>
          <li>The right to object to our use of your data</li>
          <li>
            The right to withdraw consent if you've previously given us
            permission to use your data
          </li>
        </ul>
      </p>
      <br />
      <h2 className="font-bold text-xl">5. Third Party Streaming platforms</h2>
      <p>
        When you connect your Spotify or Last.fm account we only read and store
        the top tracks, artists, genres associated with your account to provide
        the leaderboard feature. If you want to entirely remove Musicprofile's
        access to your Spotify account, you may do so by navigating to the apps
        page in your account settings.
      </p>
      <br />
    </div>
  );
};

export default PrivacyPage;
