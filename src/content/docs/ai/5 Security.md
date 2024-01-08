---
title: Security
---


LLM and by extend AI-Models in general, are inherently insecure if given capabilities like browsing the internet, sending emails, executing tassk on the host os.

- [37C3 - NEW IMPORTANT INSTRUCTIONS](https://www.youtube.com/watch?v=k_aZW_vLN24&ab_channel=media.ccc.de)



- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OWASP Cheat Sheet Series |Index Top 10](https://cheatsheetseries.owasp.org/IndexTopTen.html)

Many of the vulnerabilities feel quite similar to what the 90s was about.
Although it is much harder to do [Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) for them.

One rule of thumb could be to:
- never trust the user input in such scenarios 
- isolate the model
- encapsulate extended functionality in APIs
   - and thus following best practice [OWASP API Security Top 10](https://cheatsheetseries.owasp.org/cheatsheets/Django_REST_Framework_Cheat_Sheet.html#owasp-api-security-top-10)
   
   






