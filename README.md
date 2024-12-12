# NYAM (Not Your Average Menu) - Cloud Computing Repository

Welcome to the **NYAM** Cloud Computing repository! This repository is part of the larger **NYAM** ecosystem and focuses on backend services and cloud infrastructure for managing nutrition analysis and food recommendations. Below is an overview of the architecture, folder structure, and instructions for contributing and running this repository.

---

## Cloud Architecture

![Cloud Architecture](https://github.com/NYAM-Food-App/Cloud-Computing/blob/main/CloudArchitecture.png)

### Key Components:

1. **Users**
   - Users interact with the application through their mobile devices.

2. **Main Backend**
   - **Edamam API**: Handles requests for food data.
   - **Cloud Run**: Hosts the backend services.
   - **Cloud Build**: Builds Docker images for deployment.
   - **Firebase**:
     - Firebase Authentication: Manages user authentication.
     - Firebase Firestore: Stores user data and preferences.

3. **Bucket Storage**
   - Stores food history images, ML models, and backend repositories.

4. **Machine Learning Service**
   - Hosted on **Cloud Run**.
   - Processes food images and provides nutritional analysis.

5. **Scheduler**
   - Includes **Cloud Scheduler**, **Cloud Pub/Sub**, and **Cloud Functions** to reset daily nutritional needs.

---

## Repository Structure

This repository is organized into three main folders:

### 1. `Cloud Function`
This folder contains cloud functions that handle scheduled tasks such as resetting daily nutrition data. 

Refer to the [Cloud Function README](https://github.com/NYAM-Food-App/Cloud-Computing/blob/main/Cloud%20Function/README.md) for detailed instructions.

### 2. `Machine Learning API`
This folder hosts the Machine Learning API for food image processing and nutritional analysis. The API loads ML models from cloud storage and processes requests for predictions.

Refer to the [Machine Learning API README](https://github.com/NYAM-Food-App/Cloud-Computing/blob/main/Machine%20Learning%20API/README.md) for setup and usage details.

### 3. `Main API`
This folder includes the main backend logic for handling API requests, interacting with Firebase, and managing food data from external APIs like Edamam.

Refer to the [Main API README](https://github.com/NYAM-Food-App/Cloud-Computing/blob/main/Main%20API/README.md) for more information.

---

## Prerequisites

- **Google Cloud Product (Or Another Cloud Provider)**: For deploying.
- **Docker**: For containerizing applications.
- **Firebase CLI**: For managing Firebase services.
- **Python 3.8+**: Required for running Python-based APIs and scripts.

---
