import Link from "next/link";

const companyName = "playsonline";
const websiteUrl = "https://playsonline.live";
const contactEmail = "info@playsonline.live";

const cookieTypes = [
  {
    title: "Strictly Necessary Cookies",
    intro:
      "These cookies are required for the website to function. They enable basic features such as page navigation, security, form submission, and cookie preference management. These cookies cannot usually be disabled because the website may not work properly without them.",
    rows: [
      ["Session cookies", "Keep the website working during your visit", "Session"],
      ["Security cookies", "Help protect forms and prevent spam", "Session or limited period"],
      ["Cookie preference cookies", "Remember your cookie choices", "Up to 12 months"],
    ],
  },
  {
    title: "Analytics Cookies",
    intro:
      "Analytics cookies help us understand how visitors use our website. They may show us which pages are visited most often, how long users stay on the site, and how visitors find us. Analytics cookies are only used if you give your consent.",
    rows: [
      ["Google Analytics or similar tools", "Website traffic analysis", "Up to 24 months"],
      ["Performance tracking cookies", "Measure page performance and user behavior", "Up to 24 months"],
    ],
  },
  {
    title: "Functional Cookies",
    intro:
      "Functional cookies help improve your experience on our website. For example, they may remember your language preferences, form inputs, or selected settings.",
    rows: [
      ["Language preference cookies", "Remember selected language", "Up to 12 months"],
      ["Form preference cookies", "Improve form usability", "Session or limited period"],
    ],
  },
  {
    title: "Marketing Cookies",
    intro:
      "Marketing cookies may be used to show relevant ads, measure advertising performance, and understand how users interact with our campaigns. Marketing cookies are only used if you give your consent.",
    rows: [
      ["Advertising cookies", "Show relevant ads", "Up to 24 months"],
      ["Retargeting cookies", "Help display offers to previous visitors", "Up to 24 months"],
      ["Campaign tracking cookies", "Measure marketing performance", "Up to 24 months"],
    ],
  },
];

export const metadata = {
  title: "Cookie Policy | playsonline",
  description: "Cookie Policy for playsonline.live.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

function CookieTable({ rows }) {
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead>
          <tr>
            <th>Cookie Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([type, purpose, duration]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{purpose}</td>
              <td>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="legal-page">
      <header className="legal-topbar">
        <Link className="legal-brand" href="/">
          playsonline
        </Link>
        <Link className="legal-back" href="/">
          Back to site
        </Link>
      </header>

      <article className="legal-shell">
        <section className="legal-hero">
          <p className="eyebrow dark">Legal</p>
          <h1>Cookie Policy</h1>
          <p>Last updated: May 5, 2026</p>
        </section>

        <section className="legal-section">
          <p>
            This Cookie Policy explains how {companyName} ("we", "our", "us") uses cookies and
            similar technologies on our website{" "}
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              {websiteUrl}
            </a>
            .
          </p>
          <p>
            By using our website, you can choose whether to accept or reject certain types of
            cookies. Some cookies are necessary for the website to function properly, while others
            help us improve our services, understand visitor behavior, and provide a better user
            experience.
          </p>
        </section>

        <section className="legal-section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website.
            They help websites remember your preferences, improve performance, and understand how
            visitors interact with the site.
          </p>
          <p>
            Cookies may be set by us directly, known as first-party cookies, or by third-party
            services we use, known as third-party cookies.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>make our website work correctly;</li>
            <li>remember your cookie preferences;</li>
            <li>improve website speed and performance;</li>
            <li>understand how visitors use our website;</li>
            <li>improve our content, offers, and user experience;</li>
            <li>support contact forms, order forms, and website functionality;</li>
            <li>measure the effectiveness of our marketing campaigns.</li>
          </ul>
          <p>We do not use cookies to collect sensitive personal information without your consent.</p>
        </section>

        <section className="legal-section">
          <h2>3. Types of Cookies We Use</h2>
          {cookieTypes.map((type) => (
            <div className="legal-cookie-type" key={type.title}>
              <h3>{type.title}</h3>
              <p>{type.intro}</p>
              <CookieTable rows={type.rows} />
            </div>
          ))}
        </section>

        <section className="legal-section">
          <h2>4. Third-Party Cookies</h2>
          <p>We may use third-party services that place cookies on your device. These services may include:</p>
          <ul>
            <li>Google Analytics;</li>
            <li>Google Ads;</li>
            <li>Meta/Facebook Pixel;</li>
            <li>YouTube or video embeds;</li>
            <li>payment or order form providers;</li>
            <li>chat widgets;</li>
            <li>website security tools.</li>
          </ul>
          <p>
            Third-party providers may process data according to their own privacy and cookie
            policies. We recommend reviewing their policies to understand how they use your
            information.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Managing Cookie Preferences</h2>
          <p>
            When you first visit our website, you may see a cookie banner that allows you to accept,
            reject, or customize cookie settings.
          </p>
          <p>
            You can change your cookie preferences at any time by clicking "Cookie Settings" or
            "Manage Cookie Preferences" where available. You can also manage or delete cookies
            through your browser settings.
          </p>
          <p>Please note that disabling certain cookies may affect how the website works.</p>
        </section>

        <section className="legal-section">
          <h2>6. Cookies and Personal Data</h2>
          <p>Some cookies may collect information that can be considered personal data, such as:</p>
          <ul>
            <li>IP address;</li>
            <li>browser type;</li>
            <li>device information;</li>
            <li>pages visited;</li>
            <li>approximate location;</li>
            <li>interaction with website elements.</li>
          </ul>
          <p>
            When cookies collect personal data, we process it in accordance with our Privacy Policy.
          </p>
          <p>
            Privacy Policy: <a href="/privacy-policy">/privacy-policy</a>
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our website,
            services, technologies, or legal requirements. The updated version will be published on
            this page with a new "Last updated" date.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Cookie Policy or how we use cookies, please contact us:</p>
          <p>
            {companyName}
            <br />
            Website:{" "}
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              {websiteUrl}
            </a>
            <br />
            Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>
      </article>
    </main>
  );
}
