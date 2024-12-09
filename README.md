# NYAM-backend API Documentation

NYAM-backend is an API for the NYAM service, providing features for user management, food analysis, and food history tracking. This documentation includes all available endpoints with detailed descriptions, parameters, and example responses.

---

**baseURL:** `Ask Developer`

## 1. End-point: Register (Create Account)

### Method: POST

> ```
> {{baseURL}}/auth/register
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

```json
{
  "uid": "<Firebase Auth UID>",
  "fullname": "John Doe",
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 180,
  "weight": 75
}
```

### Description

Creates a new user account in the system.

- uid : The `uid` field is a unique identifier obtained from Firebase Authentication after a user successfully signs up or logs in. You can obtain the `uid` by using the Firebase Authentication SDK in your Android application.
- birthdate : fill with format `yyyy-mm-dd`.
- gender : 0 for male, 1 for female.
- allergy : Allergy can fill with no value, or more than one value.
  The `allergy` field supports the following values:  
  `gluten-free`, `dairy-free`, `egg-free`, `soy-free`, `wheat-free`, `fish-free`, `shellfish-free`, `tree-nut-free`, `peanut-free`.
- height : fill it with `integer` data type, and `centimeter (cm)` measurement standard.
- weight : fill it with `integer` data type, and `kilogram (kg)` measuerement standard.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 2. End-point: showUser

### Method: GET

> ```
> {{baseURL}}/user/:uid
> ```

### Description

Retrieves the profile data of a specified user.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 3. End-point: Update Profile

### Method: PUT

> ```
> {{baseURL}}/user/:uid
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

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

### Description

Updates the profile information of a specific user.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 4. End-point: Analyze Food (Image)

### Method: POST

> ```
> {{baseURL}}/analyze/:uid
> ```

### Body formdata

| Param | value                                          | Type |
| ----- | ---------------------------------------------- | ---- |
| file  | /C:/Users/AqilMFach/Downloads/download (5).jpg | file |

### Description

Uploads a food ingridients image for analysis. The response contains 5 food recomendation.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 5. End-point: Analyze Food (Text)

### Method: POST

> ```
> {{baseURL}}/analyze/text/:uid
> ```

### Body (**raw**)

```json
{
  "queryText": "ayam"
}
```

### Description

Uploads a food ingridients name for analysis. The response contains 5 food recomendation.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 6. End-point: Choose Food Index

### Method: POST

> ```
> {{baseURL}}/choose/food/:uid
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

```json
{
  "selectedIndex": 1
}
```

### Description

To choose one of several food recommendations from stage **4. Analyze Food (Image)** and **4. Analyze Food (Text)**.

- selectedIndex : Only accept number 0 to 4

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 7. End-point: List History

### Method: GET

> ```
> {{baseURL}}/history/food/:uid
> ```

### Description

Retrieves a list of all analyzed food history for the specified user.

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 8. End-point: History Detailed

### Method: GET

> ```
> {{baseURL}}/history/food/:uid/:index
> ```

### Description

Retrieves detailed information for a specific food history entry from step **7. List History**.

- :index : is index number from response **7. List History**

### Example Response

#### 200

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
