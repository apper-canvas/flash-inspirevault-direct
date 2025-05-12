import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p>
          At InspireVault, we respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit 
          our website and tell you about your privacy rights and how the law protects you.
        </p>
        <p>
          This privacy policy aims to give you information on how InspireVault collects and processes 
          your personal data through your use of this website, including any data you may provide when 
          you sign up for an account, save bookmarks, or contact us.
        </p>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, including bookmarks and categories you create.</li>
        </ul>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
        <p>We use your data to provide and improve the InspireVault service. By using InspireVault, you agree to the collection and use of information in accordance with this policy.</p>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our service and 
          hold certain information. Cookies are files with a small amount of data which may include 
          an anonymous unique identifier.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
          However, if you do not accept cookies, you may not be able to use some portions of our service.
        </p>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being 
          accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, 
          we limit access to your personal data to those employees, agents, contractors and other third 
          parties who have a business need to know.
        </p>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Right to withdraw consent</li>
        </ul>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "last updated" date at the top 
          of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this 
          Privacy Policy are effective when they are posted on this page.
        </p>
      </div>

      <div className="card mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@inspirevault.com</p>
      </div>
    </motion.div>
  );
};

export default Privacy;