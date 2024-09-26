import React from "react";

// CSS module or any other styling method can be applied here
import "./support.css";
const Support = () => {
  return (
    <div className="support-container">
      {/* Header Section */}
      <header className="support-header">
        <h1>Documentation & Support</h1>
      </header>

      {/* Main Section */}
      <main className="support-main">
        {/* Documentation Section */}
        <section className="documentation-section">
          <h2>Documentation</h2>

          {/* Overview Section */}
          <div className="overview-section">
            <h3>Overview</h3>
            <p>
              Welcome to the platform! Here you can find an introduction about
              the system, key functionalities, and quick links to the most used
              features.
            </p>
          </div>

          {/* API Documentation */}
          <div className="api-documentation">
            <h3>API Documentation</h3>
            <div>
              <h4>Getting Started</h4>
              <p>
                Learn how to set up API keys, authentication, and make your
                first API call.
              </p>
              <p>Here are some sample requests and responses:</p>
              {/* Add sample API code examples */}
            </div>
            <div>
              <h4>API Endpoints</h4>
              <p>Detailed information about each API endpoint:</p>
              {/* Add endpoint tables or descriptions */}
            </div>
            <div>
              <h4>Error Codes</h4>
              <p>Explore the common error codes and their solutions.</p>
            </div>
            <div>
              <h4>Rate Limiting</h4>
              <p>
                Understand rate limits per pricing tier and how to manage them.
              </p>
            </div>
          </div>

          {/* User Guides */}
          <div className="user-guides">
            <h3>User Guides</h3>
            <div>
              <h4>How-To Articles</h4>
              <p>
                Follow step-by-step instructions to use key features like API
                key management, generating reports, etc.
              </p>
            </div>
            <div>
              <h4>Best Practices</h4>
              <p>
                Explore best practices for API design, security, and performance
                optimization.
              </p>
            </div>
            <div>
              <h4>Troubleshooting</h4>
              <p>Find solutions for common problems users encounter.</p>
            </div>
          </div>

          {/* Interactive API Explorer */}
          <div className="interactive-explorer">
            <h3>Interactive API Explorer</h3>
            <p>Test your API calls directly using our built-in tool.</p>
            {/* Add a simple console UI for users to test their API requests */}
          </div>
        </section>

        {/* Support Section */}
        <section className="support-section">
          <h2>Support</h2>

          {/* Support Channels */}
          <div className="support-channels">
            <h3>Support Channels</h3>
            <form className="contact-form">
              <h4>Contact Us</h4>
              <label>Name:</label>
              <input type="text" placeholder="Your name" />
              <label>Email:</label>
              <input type="email" placeholder="Your email" />
              <label>Subject:</label>
              <input type="text" placeholder="Subject" />
              <label>Message:</label>
              <textarea placeholder="Type your message here"></textarea>
              <label>Category:</label>
              <select>
                <option>General Inquiry</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Billing Support</option>
              </select>
              <button type="submit">Submit</button>
            </form>

            <div className="contact-details">
              <p>
                Email:{" "}
                <a href="mailto:support@example.com">support@example.com</a>
              </p>
              <p>
                Phone: <a href="tel:+123456789">+1 234 567 89</a>
              </p>
              <p>
                Live Chat: <button>Chat Now</button>
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="faq-section">
            <h3>FAQs</h3>
            <div>
              <h4>General Questions</h4>
              <p>Find answers to basic questions about the system.</p>
            </div>
            <div>
              <h4>Billing & Payments</h4>
              <p>Get help with pricing, billing cycles, and payment methods.</p>
            </div>
            <div>
              <h4>Technical Issues</h4>
              <p>
                Resolve common technical issues related to connectivity, API
                keys, etc.
              </p>
            </div>
            <div>
              <h4>Security & Compliance</h4>
              <p>
                Learn more about security protocols, data encryption, and
                compliance.
              </p>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="knowledge-base">
            <h3>Knowledge Base</h3>
            <input
              type="text"
              placeholder="Search articles, guides, or steps"
            />
            <div>
              <h4>Popular Articles</h4>
              {/* Display a list of frequently accessed articles */}
            </div>
          </div>
        </section>

        {/* System Status Section */}
        <section className="system-status">
          <h2>System Status</h2>
          <div className="status-dashboard">
            <p>All systems operational</p>
            <p>24h Uptime: 99.98%</p>
            <p>Last outage: 2 days ago</p>
            {/* Add a real-time status feed */}
          </div>
          <div className="maintenance-notice">
            <p>
              Scheduled maintenance on Sep 25, 2024. Expected downtime: 30 mins.
            </p>
          </div>
        </section>

        {/* Feedback & Feature Requests Section */}
        <section className="feedback-section">
          <h2>Feedback & Feature Requests</h2>
          <form className="feedback-form">
            <label>Rate your experience:</label>
            {/* Add a star rating component */}
            <textarea placeholder="Tell us how we can improve"></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
          <div className="feature-requests">
            <h3>Feature Requests</h3>
            {/* List of feature requests */}
            <p>Public roadmap and voting system for new features.</p>
          </div>
        </section>

        {/* Account Management Support Section */}
        <section className="account-management">
          <h2>Account Management Support</h2>
          <div>
            <h3>Billing & Payments</h3>
            <p>
              Manage your invoices, payment methods, and subscription plans.
            </p>
          </div>
          <div>
            <h3>Account Security</h3>
            <p>Set up MFA, manage API keys, and recover your account.</p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="support-footer">
        <div>
          <p>Legal & Compliance</p>
          <a href="/privacy-policy">Privacy Policy</a> |{" "}
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="social-links">
          {/* Add social media icons */}
          <a href="#">Twitter</a> | <a href="#">LinkedIn</a> |{" "}
          <a href="#">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Support;
