# NYAM CLOUD FUNCTION

## Purpose

The Cloud Function is used to reset the `fulfilledNeeds` data for all user accounts stored in a Firebase Firestore database. This ensures that the daily needs tracking system is refreshed and ready for a new cycle.

## Functionality

- **Trigger**: The function is triggered using Google Cloud Scheduler via a Cloud Pub/Sub topic.
- **Process**: Upon activation, it accesses the Firestore database and resets the `fulfilledNeeds` field to its default state for every user account.
- **Scope**: Operates on all accounts present in the Firestore database.

## Folder Structure

```
Cloud Function/
├── index.js       # Main logic of the Cloud Function
├── package.json   # Dependency and script configuration
├── README.md      # Documentation
```

## File Descriptions

- **`index.js`**: Contains the core logic to reset the `fulfilledNeeds` data in Firestore.
- **`package.json`**: Manages dependencies required for the function, including any npm packages used.
- **`README.md`**: Provides documentation about the Cloud Function and its usage.

## Usage

### Prerequisites

To use this Cloud Function, ensure you have:
- Node.js installed on your system.
- Access to a cloud environment (e.g., Google Cloud Platform).
- Appropriate permissions to deploy and access Firestore.
- A Cloud Pub/Sub topic created and configured with Cloud Scheduler.

### Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Cloud Function
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Deployment
To deploy the Cloud Function, follow these steps:

1. Authenticate with your cloud provider.
2. Deploy the function using the appropriate CLI or web interface. For example, using Google Cloud Functions:
   ```bash
   gcloud functions deploy resetFulfilledNeeds \
       --runtime=nodejsXX \
       --trigger-topic=your-pubsub-topic-name \
       --entry-point=mainFunctionName
   ```

### Scheduling the Function
Use Google Cloud Scheduler to automate triggering the function:
1. Create a Cloud Scheduler job:
   ```bash
   gcloud scheduler jobs create pubsub daily-reset-job \
       --schedule="0 0 * * *" \
       --topic=your-pubsub-topic-name \
       --message-body="{}"
   ```
   This example schedules the function to run daily at midnight.

## Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License. See `LICENSE` for more details.

