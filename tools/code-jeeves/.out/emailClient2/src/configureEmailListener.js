import { MailListener } from "mail-listener5";

/**
 * Configuration options for setting up the email listener.
 * @typedef {Object} EmailListenerConfig
 * @property {string} username - User email address.
 * @property {string} password - User email password.
 * @property {string} host - Email server host.
 * @property {number} port - Email server port.
 * @property {boolean} tls - Use TLS.
 * @property {string[]} mailbox - Mailbox to monitor. Defaults to "INBOX".
 * @property {number} fetchUnreadOnStart - Whether to fetch unread emails on start.
 */

/** @type {EmailListenerConfig} */
const defaultConfig = {
    username: process.env.EMAIL_USERNAME || "",
    password: process.env.EMAIL_PASSWORD || "",
    host: process.env.EMAIL_HOST || "",
    port: parseInt(process.env.EMAIL_PORT, 10) || 993,
    tls: process.env.EMAIL_TLS === "true",
    mailbox: process.env.EMAIL_MAILBOX ? process.env.EMAIL_MAILBOX.split(",") : ["INBOX"],
    fetchUnreadOnStart: process.env.EMAIL_FETCH_UNREAD_ON_START === "true",
};

/**
 * Configures and starts listening for incoming emails using the mail-listener5 package.
 * @param {Partial<EmailListenerConfig>} config - Optional configurations that override the default configurations.
 */
export function configureEmailListener(config = {}) {
    // Merge user provided config with default config
    const emailConfig = { ...defaultConfig, ...config };

    const mailListener = new MailListener({
        username: emailConfig.username,
        password: emailConfig.password,
        host: emailConfig.host,
        port: emailConfig.port,
        tls: emailConfig.tls,
        mailbox: emailConfig.mailbox,
        fetchUnreadOnStart: emailConfig.fetchUnreadOnStart,
        // Additional mail-listener5 config options can be set here if necessary
    });

    mailListener.start();

    // Email server event listeners can be added below as needed
    mailListener.on("server:connected", () => {
        console.log("Mail listener initialized and connected.");
    });

    mailListener.on("server:disconnected", () => {
        console.log("Mail listener disconnected. Attempting to reconnect...");
        mailListener.start(); // Attempt to reconnect
    });

    mailListener.on("error", (err) => {
        console.error("Mail listener encountered an error:", err);
    });

    // Example for handling incoming emails
    mailListener.on("mail", (mail, seqno, attributes) => {
        console.log("New email received:", mail.subject);
        // Further email processing logic goes here
    });

    // Note: The mailListener does not need to be returned or managed externally as it manages its own connection lifecycle events.
}
