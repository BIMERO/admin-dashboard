import React from "react";
import "./support.css";
import { TbSettings2 } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { faqs } from "./faqs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

const Support = () => {
  return (
    <div className="support-container">
      <header className="support-header">
        <div className="header">
          <h1>Documentation & Support</h1>
          <div className="overview-section">
            <h3>Overview</h3>
            <p>
              Welcome to the platform! Here you can find an introduction about
              the system, key functionalities, and quick links to the most used
              features.
            </p>
          </div>
        </div>
      </header>

      <main className="support-main">
        {/* Documentation Section */}

        <div className="documentation-section">
          <div className="documentation">
            <TbSettings2 />
            <div className="documentation-header">
              <h3>API Documentation</h3>
              <p>
                Learn how to set up API keys, authentication, and make your
                first API call.
              </p>
            </div>
          </div>
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Documentation</h3>
              <p>Detailed information about each API endpoint:</p>
            </div>
          </div>
        </div>

        <div className="documentation-section">
          <div className="documentation">
            <TbSettings2 />
            <div className="documentation-header">
              <h3>API Endpoints</h3>
              <p>Detailed information about each API endpoint</p>
            </div>
          </div>
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Error Codes</h3>
              <p>Explore the common error codes and their solutions.:</p>
            </div>
          </div>
        </div>

        <div className="documentation-section">
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Rate Limiting</h3>
              <p>
                Understand rate limits per pricing tier and how to manage them.
              </p>
            </div>
          </div>
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Interactive API Explorer</h3>
              <p>Test your API calls directly using our built-in tool.</p>
            </div>
          </div>
        </div>

        <div className="documentation-section">
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>User Guides</h3>
              <p>
                Follow step-by-step instructions to use key features like API
                key management, generating reports, etc.
              </p>
            </div>
          </div>
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Best Practices</h3>
              <p>
                Explore best practices for API design, security, and performance
                optimization.
              </p>
            </div>
          </div>
        </div>

        <div className="documentation-section">
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>User Guides</h3>
              <p>
                Follow step-by-step instructions to use key features like API
                key management, generating reports, etc.
              </p>
            </div>
          </div>
          <div className="documentation">
            <IoDocumentTextOutline />
            <div className="documentation-header">
              <h3>Troubleshooting</h3>
              <p>Find solutions for common problems users encounter.</p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <section className="support-section">
          <div className="support-channels">
            <h4>Contact Us</h4>
            <form className="contact-form">
              <div className="input-flex">
                <div className="inputs">
                  <label>Name:</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="inputs">
                  <label>Email:</label>
                  <input type="email" placeholder="Your email" />
                </div>
              </div>

              <div className="input-flex">
                <div className="inputs">
                  <label>Subject:</label>
                  <input type="text" placeholder="Subject" />
                </div>
                <div className="inputs">
                  <label>Category:</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Billing Support</option>
                  </select>
                </div>
              </div>

              <div className="input-flex">
                <div className="inputs">
                  <label>Message:</label>
                  <textarea
                    placeholder="Type your message here"
                    cols={10}
                    rows={5}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="header-btn"
                style={{ margin: "auto" }}
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        <div className="faq-section">
          <h3>FAQs</h3>
          <div>
            {faqs.map((val) => (
              <div className="faq" key={val.id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<IoIosArrowDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {val.question}
                  </AccordionSummary>
                  <AccordionDetails>{val.answer}</AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
