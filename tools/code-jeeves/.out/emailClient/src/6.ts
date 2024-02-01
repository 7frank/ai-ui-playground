

// Function to fetch emails from server
/**
 * Fetches emails from server
 * @param server - Server URL
 * @returns Promise - List of emails
 */
export function fetchEmails(server: string): Promise<string[]> {
    // Make API call to server
    return fetch(server)
        .then(response => {
            // Check if response is successful
            if (response.ok) {
                // Parse response as JSON and return emails
                return response.json();
            } else {
                // Throw error if response is not successful
                throw new Error("Error retrieving emails from server");
            }
        })
        .then(data => {
            // Extract emails from data and return
            return data.map(email => email.address);
        })
        .catch(error => {
            // Handle any errors and log them
            console.error(error);
        });
}
