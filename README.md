# NYAM-backend API Documentation

NYAM-backend is an API for the NYAM service, providing features for user management, food analysis, and food history tracking. This documentation includes all available endpoints with detailed descriptions, parameters, and example responses.

---

## API Endpoints

**Servers:** `Ask Developer`

### 1. **Register (Create Account)**

**Method:** `POST`  
**URL:** `/auth/register`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "uid": "W82AJqbULgU2ghjgnQg1mRUXrfFXVEu1",
  "fullname": "Aqil MF",
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 180,
  "weight": 75
}
```

**Description:**  
Creates a new user account in the system.

- **About `uid`:**  
  The `uid` field is a unique identifier obtained from Firebase Authentication after a user successfully signs up or logs in using Firebase. Ensure you integrate your authentication process with Firebase to generate this `uid`.

Here is the updated example for obtaining the `uid` using Firebase in Kotlin for Android Studio:

### About `uid`:

The `uid` field is a unique identifier obtained from Firebase Authentication after a user successfully signs up or logs in. You can obtain the `uid` by using the Firebase Authentication SDK in your Android application. Below is an example of how to obtain the `uid` in Kotlin:

```kotlin
import com.google.firebase.auth.FirebaseAuth

val auth = FirebaseAuth.getInstance()

auth.addAuthStateListener { firebaseAuth ->
    val user = firebaseAuth.currentUser
    if (user != null) {
        // This is the `uid` you need to send to the backend
        val uid = user.uid
        println("User UID: $uid")
    }
}
```

In this example:
- The `FirebaseAuth.getInstance()` method initializes Firebase Authentication.
- The `addAuthStateListener` listens for authentication state changes, ensuring you get the `uid` once the user is signed in.
- `user.uid` retrieves the unique user ID which should be sent to the backend for account creation or updates.


This Kotlin code should be used within your Android app, where Firebase Authentication is initialized, and it retrieves the user's `uid` once they are logged in. You can send this `uid` to your backend as part of the user registration or profile update process.

Let me know if you need more help!

- **Accepted Values for `allergy`:**  
  The `allergy` field supports the following values:  
  `gluten-free`, `dairy-free`, `egg-free`, `soy-free`, `wheat-free`, `fish-free`, `shellfish-free`, `tree-nut-free`, `peanut-free`.

**Example Request (curl):**
```bash
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "uid": "W82AJqbULgU2nQfgg1mRUXrfFXVEu1",
  "fullname": "John Doe",
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 180,
  "weight": 75
}'
```

**Example Response:**
```json
{
  "message": "User registered successfully",
  "data": {
    "uid": "W82AJqbULgU2nQg1mRUXbnrfFXVEu1",
    "fullname": "Aqil MF"
  }
}
```

---

### 2. **Login**

**Method:** `POST`  
**URL:** `/auth/login`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "idToken": "W82AJqbULgU2nQg1mfgnRUXrfFXVEu1"
}
```

**Description:**  
Authenticates a user using their ID token and generates an access token for subsequent requests.

**Example Request (curl):**
```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "idToken": "W82AJqbULgU2nQg1gvnmRUXrfFXVEu1"
}'
```

**Example Response:**
```json
{
  "message": "Login successful",
  "token": "some.jwt.token"
}
```

---

### 3. **Get User Data**

**Method:** `GET`  
**URL:** `/user/:id`

**Path Parameters:**
- `id` (string): The unique identifier for the user.

**Description:**  
Retrieves the profile data of a specified user.

**Example Request (curl):**
```bash
curl --location 'http://localhost:3000/user/W82AJqbULgU2nQg1mRUXrfFXVEu1'
```

**Example Response:**
```json
{
  "uid": "W82AJqbULgU2nghkQg1mRUXrfFXVEu1",
  "fullname": "John Doe",
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 180,
  "weight": 75
}
```

---

### 4. **Update Profile**

**Method:** `PUT`  
**URL:** `/user/:id`

**Headers:**
- `Content-Type: application/json`

**Path Parameters:**
- `id` (string): The unique identifier for the user.

**Request Body:**
```json
{
  "fullname": "John Doe Updated",
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 185,
  "weight": 80
}
```

**Description:**  
Updates the profile information of a specific user.

**Example Response:**
```json
{
  "message": "Profile updated successfully"
}
```

---

### 5. **Analyze Food**

**Method:** `POST`  
**URL:** `/analyze/:id`

**Headers:**
- `Content-Type: multipart/form-data`

**Path Parameters:**
- `id` (string): The unique identifier for the user.

**Request Body (Form Data):**
- `file`: The image file of the food to be analyzed.

**Description:**  
Uploads a food image for analysis. The response contains the name of the food, calorie count, and allergen information.

**Example Response:**
```json
{
  "message": "Food analysis completed",
  "data": {
    "foodName": "Pizza",
    "calories": 285,
    "allergens": ["gluten", "dairy"]
  }
}
```

---

### 6. **Choose Food Index**

**Method:** `POST`  
**URL:** `/choose/food/:uid`  

**Description:**  
To choose one of several food recommendations from stage **5. Analyze Food**..

---

**Headers:**  
- `Content-Type: application/json`  

**Path Parameters:**  
- `uid` (string): The unique identifier for the user. This should be the `uid` obtained from Firebase Authentication.

---

**Request Body:**  
```json
{
  "foodIndex": 2
}
```

**Request Body Description:**  
- `foodIndex` (integer): Represents the index of the chosen food. This index typically corresponds to a specific food item in the user's recommendation or history list. Choose from 0-4.

---

**Example Request (curl):**  
```bash
curl --location 'http://localhost:3000/choose/food/W82AJqbULgU2nQg1mRUXrfFXVEu1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "foodIndex": 2
}'
```

---

**Example Response (Success):**  
**Status Code:** `200 OK`  
```json
{
  "message": "Food choice logged successfully",
  "data": {
    "uid": "W82AJqbULgU2nQg1mRUXrfFXVEu1",
    "chosenFoodIndex": 2
  }
}
```

---

**Error Responses:**

1. **If `uid` is invalid or not found:**  
**Status Code:** `404 Not Found`  
```json
{
  "error": true,
  "message": "User not found"
}
```

2. **If `foodIndex` is missing or invalid:**  
**Status Code:** `400 Bad Request`  
```json
{
  "error": true,
  "message": "Invalid or missing food index"
}
```

---

## Notes
- Ensure the `uid` corresponds to an authenticated user.
- The `foodIndex` should be validated to ensure it matches a valid index in the system. Choose from 0-1.
- Replace `localhost:3000` with the appropriate base URL in your production environment.

### 7. **List Food History**

**Method:** `GET`  
**URL:** `/history/food/:id`

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (optional)

**Path Parameters:**
- `id` (string): The unique identifier for the user.

**Description:**  
Retrieves a list of all analyzed food history for the specified user.

**Example Response:**
```json
[
  {
    "historyId": "1",
    "foodName": "Pizza",
    "date": "2024-01-01"
  },
  {
    "historyId": "2",
    "foodName": "Burger",
    "date": "2024-01-02"
  }
]
```

---

### 8. **Get Food History Detail**

**Method:** `GET`  
**URL:** `/history/food/:id/:historyId`

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (optional)

**Path Parameters:**
- `id` (string): The unique identifier for the user.
- `historyId` (string): The unique identifier for the history record.

**Description:**  
Retrieves detailed information for a specific food history entry.

**Example Response:**
```json
{
  "historyId": "2",
  "foodName": "Burger",
  "calories": 450,
  "date": "2024-01-02"
}
```

---

## Notes
- Ensure the server runs on port `3000` or adjust the base URL accordingly.
- Use proper authentication where required.
- Replace placeholder tokens and IDs with actual values for testing.
- The `uid` must be obtained from Firebase Authentication. After a user logs in or signs up, Firebase generates the `uid`. You can retrieve it using Firebase’s `getAuth()` method in the Firebase SDK as shown in the example above.
```

This version includes:
- **Clarification on obtaining the `uid` from Firebase.**
- **Accepted values for the `allergy` field**.
- More detailed request/response examples for each endpoint.

Let me know if you need further changes!
