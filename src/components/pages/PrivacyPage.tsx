import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="grid center-items gap-y-3 mx-auto px-6 py-4 lg:px-8 max-w-6xl">
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
        experience when you use our service, as well as for analytical purposes.
        Here's a breakdown of the information we collect:
        <br />
        <br />
        <span className="font-bold">Personal Information</span>:
        <ul className="list-disc list-inside">
          <li>Email Address</li>
        </ul>
        <br />
        <span className="font-bold">Non-Personal Information</span>:
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
          <li>Gain insights and optimize our service</li>
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
          The right to withdraw consent if given previously
          </li>
        </ul>
      </p>
      <br />
      <h2 className="font-bold text-xl">5. Third Party Streaming platforms</h2>
      <p>
        When you connect your Spotify or Last.fm account we only read and store
        the top tracks, artists, genres associated with your account to provide
        the leaderboard feature. To remove Musicprofile's access to your Spotify
        account, visit your account settings.
      </p>
      <br />
      <h2 className="font-bold text-xl">
        6. Analytical Data Processing with Cloudflare
      </h2>
      <p>
        We use Cloudflare, a third-party service provider, to process analytical
        data. Cloudflare helps us analyze user interactions and behaviors to
        improve our service. This data may include website traffic, user
        demographics, and preferences. For more details, please refer to{" "}
        <a
          className="underline text-orange-500"
          href="https://www.cloudflare.com/privacypolicy/"
        >
          Cloudflare's privacy policy
        </a>
        .
      </p>
      <br />
    </div>
  );
};

export default PrivacyPage;
