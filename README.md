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

#### 201 Created

```json
{
  "message": "User registered successfully!",
  "user": {
    "fullname": "John Doe",
    "email": "aqilmf379@gmail.com",
    "profilePicture": null,
    "birthdate": "1990-01-01",
    "gender": 0,
    "allergy": ["gluten-free", "dairy-free"],
    "height": 180,
    "weight": 75,
    "bmi": 23.15,
    "dailyNeeds": {
      "calories": 1710,
      "carbs": 207,
      "fat": 48,
      "protein": 113
    },
    "fulfilledNeeds": {
      "calories": 0,
      "carbs": 0,
      "fat": 0,
      "protein": 0
    },
    "bmrRate": 2,
    "createdAt": "2024-12-09T11:25:22.400Z"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 2. End-point: showUser

### Method: GET

> ```
> {{baseURL}}/user/:uid
> ```

### Description

Retrieves the profile data of a specified user.

### Example Response

#### 200 OK

```json
{
  "fullname": "John Doe",
  "email": "aqilmf379@gmail.com",
  "profilePicture": null,
  "birthdate": "1990-01-01",
  "gender": 0,
  "allergy": ["gluten-free", "dairy-free"],
  "height": 180,
  "weight": 75,
  "bmi": 23.15,
  "dailyNeeds": {
    "calories": 1710,
    "carbs": 207,
    "fat": 48,
    "protein": 113
  },
  "fulfilledNeeds": {
    "calories": 0,
    "carbs": 0,
    "fat": 0,
    "protein": 0
  },
  "bmrRate": 2,
  "createdAt": "2024-12-09T11:25:22.400Z"
}
```

#### 404 Not Found

```json
{
  "message": "User not found"
}
```

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

#### 200 OK

```json
{
  "message": "User profile updated successfully!",
  "updatedData": {
    "fullname": "John Doe Updated",
    "birthdate": "1990-01-01",
    "gender": 0,
    "allergy": ["gluten-free", "dairy-free"],
    "height": 185,
    "weight": 80,
    "bmi": 23.37,
    "dailyNeeds": {
      "calories": 1791,
      "carbs": 215,
      "fat": 50,
      "protein": 120
    },
    "bmrRate": 2
  }
}
```

### 400 Bad Request

```json
{
  "message": "Missing required fields"
}
```

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

#### 200 OK

```json
{
  "message": "Prediction and recipe retrieval successful",
  "foodPrediction": {
    "predictedClass": "tempeh",
    "predictedProb": 0.86067134141922
  },
  "recipes": [
    {
      "foodname": "Sambal Tempeh with Lemon Basil",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/5ea/5ea9ea2d51127256ef91818694e6ea6f-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDpsB595TKxMDCitR6E9FIAvtm7vsWE0a3rPWRtTkooBQIhAMift2TROFtj6mFhJEVaeFNt5bwX8czzfpsLlB8tfsf1KrkFCHUQABoMMTg3MDE3MTUwOTg2IgygUUgNE%2FGC3kz4CtMqlgWN%2FYR%2Fhd%2BvhKDfFdsqpp71EGJSAOf1B4JGBCPMeeJ0cTv2EqYumpWyelb3r8az57j41sfEL%2BKzM8%2FODdyjcavxZi86v8xjvVJawg3AN%2BlcLd3aDbl%2FaAijV2lVNH1Xk6FePAHE110yBCnPMSy7Pgzni7IkfGdFT7y4%2FJSpFKIlyqgITtQrGZuZmpy3bbKNuouMdXOpuJqgB3NcvUzYMq1XhY3ce%2B%2FyLeUaw5kYEgPZ1AH2m5qaAuvRgXmsBU%2FRwEv4dk2mjivjOPvKDv6OxjWiktguFoGfmmKLqOT2aKmnEiBqIpCR%2B%2FJcyxyOD2vSdPzxLhDFgQbYmsM8%2BReocQS%2FjuKHhY1Ptul6%2BfzyyHuhFZoh1G%2F5KQW4cUYoNvM8bLsINPHsL6qbOlVqSDSrARTm%2FkEE5Mjg6xSwV6tmL5N58BTgrDafJ1Fluqf99l4qiKnO2B44w%2BMVwEZO2fLQ%2BQW9y0fbSYQGz%2BEW%2Bam5dy78RpZMF7Y%2BZIulONFB%2F553yyPKNbhIPjGKT5ifQb7jhZxvSl7k56w1PXUfESG4e5lYmJL3VpYnaW2nt1jUeL8CSLQh48G33kWNSzS0jvLzk3L4RpqcCXuWlkbiox3zk7Y0gsjG%2BLp%2B7abu75GZ2aJBBKVVeB16%2FaM17c0VJPP%2Fc77lE1r%2FrC6ipU%2FSLO%2Bojg3eG7hpB03Qmy74qyzEt4SlQIcP62qhDK65lhwE8dyojXKYrdfBs2rZrj5n3BILvIc0LorG8IMJk1o7vhb1UYdXNpZ%2Bhm2uebrak6C82kPqz5K9id0N9NIs8iPrWxg2FSnSgeya24p%2BaS3a21H8Uzov6hpwmZVyj8C2BIcZCbRZxjwo0AwV2S%2FCr5EGw6mKgEu5mCzsREjJlTCFtNu6BjqwAYR0ng0ws8VLibeptZjAswbKofj3V0hcjog4unP6OtkpVjpyBQ6E3ekY7j0Tx%2FaqrEmwyhfgH0Q5XvSpQTnSyKjwVJYCKcYz7G4Veq3eplg0xQPV4b8JvI3YaTMYB3gEqVohbNM1X4oB7D0CSpAZO6lZnsVvIUVh6qyXQvrhV3AZDL5ONo2XOWNYB1nemMzcOFgKAHetSlJ2xd0r3DwGaYjaFjcuQGYiVCZuNLlw9bjr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLUBXYSUX%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=49f3aa5ca9bb1806089dea7c412a82b97e1b5f10be6bc957c3f0ec4839bee30d",
      "source recipes": "Saveur",
      "how to cook": "https://www.saveur.com/recipes/sambal-tempeh-with-lemon-basil-recipe/",
      "ingredients": [
        "2 tbsp. sunflower oil, plus more for deep frying",
        "3 large garlic cloves, peeled",
        "8 green bird’s eye chiles, sliced",
        "One 1-inch piece of ginger, peeled and sliced",
        "1⁄2 tsp. kosher salt",
        "2 small makrut limes, halved",
        "2 1⁄2 cups fresh lemon basil leaves (or substitute Italian basil leaves)",
        "One 7-oz. block of tempeh, thinly sliced"
      ],
      "cuisineType": ["mediterranean"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 889.82,
        "fat": 51.39,
        "carbs": 78.18,
        "protein": 51.89
      }
    },
    {
      "foodname": "Sticky orange tempeh",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/e3f/e3f6d022b15ff05cfa13154a77065c03.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDpsB595TKxMDCitR6E9FIAvtm7vsWE0a3rPWRtTkooBQIhAMift2TROFtj6mFhJEVaeFNt5bwX8czzfpsLlB8tfsf1KrkFCHUQABoMMTg3MDE3MTUwOTg2IgygUUgNE%2FGC3kz4CtMqlgWN%2FYR%2Fhd%2BvhKDfFdsqpp71EGJSAOf1B4JGBCPMeeJ0cTv2EqYumpWyelb3r8az57j41sfEL%2BKzM8%2FODdyjcavxZi86v8xjvVJawg3AN%2BlcLd3aDbl%2FaAijV2lVNH1Xk6FePAHE110yBCnPMSy7Pgzni7IkfGdFT7y4%2FJSpFKIlyqgITtQrGZuZmpy3bbKNuouMdXOpuJqgB3NcvUzYMq1XhY3ce%2B%2FyLeUaw5kYEgPZ1AH2m5qaAuvRgXmsBU%2FRwEv4dk2mjivjOPvKDv6OxjWiktguFoGfmmKLqOT2aKmnEiBqIpCR%2B%2FJcyxyOD2vSdPzxLhDFgQbYmsM8%2BReocQS%2FjuKHhY1Ptul6%2BfzyyHuhFZoh1G%2F5KQW4cUYoNvM8bLsINPHsL6qbOlVqSDSrARTm%2FkEE5Mjg6xSwV6tmL5N58BTgrDafJ1Fluqf99l4qiKnO2B44w%2BMVwEZO2fLQ%2BQW9y0fbSYQGz%2BEW%2Bam5dy78RpZMF7Y%2BZIulONFB%2F553yyPKNbhIPjGKT5ifQb7jhZxvSl7k56w1PXUfESG4e5lYmJL3VpYnaW2nt1jUeL8CSLQh48G33kWNSzS0jvLzk3L4RpqcCXuWlkbiox3zk7Y0gsjG%2BLp%2B7abu75GZ2aJBBKVVeB16%2FaM17c0VJPP%2Fc77lE1r%2FrC6ipU%2FSLO%2Bojg3eG7hpB03Qmy74qyzEt4SlQIcP62qhDK65lhwE8dyojXKYrdfBs2rZrj5n3BILvIc0LorG8IMJk1o7vhb1UYdXNpZ%2Bhm2uebrak6C82kPqz5K9id0N9NIs8iPrWxg2FSnSgeya24p%2BaS3a21H8Uzov6hpwmZVyj8C2BIcZCbRZxjwo0AwV2S%2FCr5EGw6mKgEu5mCzsREjJlTCFtNu6BjqwAYR0ng0ws8VLibeptZjAswbKofj3V0hcjog4unP6OtkpVjpyBQ6E3ekY7j0Tx%2FaqrEmwyhfgH0Q5XvSpQTnSyKjwVJYCKcYz7G4Veq3eplg0xQPV4b8JvI3YaTMYB3gEqVohbNM1X4oB7D0CSpAZO6lZnsVvIUVh6qyXQvrhV3AZDL5ONo2XOWNYB1nemMzcOFgKAHetSlJ2xd0r3DwGaYjaFjcuQGYiVCZuNLlw9bjr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLUBXYSUX%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=49f7b08abcc1fdaabe15c8466ac8ccac1eb73949dd56d26268a4c5d811021f1e",
      "source recipes": "Hungry Hungry Hippie",
      "how to cook": "http://www.hungryhungryhippie.com/sticky-orange-tempeh/",
      "ingredients": [
        "1 block (8 oz.) tempeh, cubed (I used Lightlife’s organic flax)",
        "1/3 cup fresh pressed orange juice (I used both oranges & tangerines)",
        "1 tbsp maple syrup",
        "1 tbsp tamari",
        "1 tsp arrowroot"
      ],
      "cuisineType": ["chinese"],
      "mealType": ["snack"],
      "dishType": ["starter"],
      "fulfilledNeeds": {
        "calories": 537.07,
        "fat": 24.69,
        "carbs": 40.66,
        "protein": 48.62
      }
    },
    {
      "foodname": "Easy Baked Tempeh",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/0e8/0e877f3f68ddf6c46626a89717fa91f1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDpsB595TKxMDCitR6E9FIAvtm7vsWE0a3rPWRtTkooBQIhAMift2TROFtj6mFhJEVaeFNt5bwX8czzfpsLlB8tfsf1KrkFCHUQABoMMTg3MDE3MTUwOTg2IgygUUgNE%2FGC3kz4CtMqlgWN%2FYR%2Fhd%2BvhKDfFdsqpp71EGJSAOf1B4JGBCPMeeJ0cTv2EqYumpWyelb3r8az57j41sfEL%2BKzM8%2FODdyjcavxZi86v8xjvVJawg3AN%2BlcLd3aDbl%2FaAijV2lVNH1Xk6FePAHE110yBCnPMSy7Pgzni7IkfGdFT7y4%2FJSpFKIlyqgITtQrGZuZmpy3bbKNuouMdXOpuJqgB3NcvUzYMq1XhY3ce%2B%2FyLeUaw5kYEgPZ1AH2m5qaAuvRgXmsBU%2FRwEv4dk2mjivjOPvKDv6OxjWiktguFoGfmmKLqOT2aKmnEiBqIpCR%2B%2FJcyxyOD2vSdPzxLhDFgQbYmsM8%2BReocQS%2FjuKHhY1Ptul6%2BfzyyHuhFZoh1G%2F5KQW4cUYoNvM8bLsINPHsL6qbOlVqSDSrARTm%2FkEE5Mjg6xSwV6tmL5N58BTgrDafJ1Fluqf99l4qiKnO2B44w%2BMVwEZO2fLQ%2BQW9y0fbSYQGz%2BEW%2Bam5dy78RpZMF7Y%2BZIulONFB%2F553yyPKNbhIPjGKT5ifQb7jhZxvSl7k56w1PXUfESG4e5lYmJL3VpYnaW2nt1jUeL8CSLQh48G33kWNSzS0jvLzk3L4RpqcCXuWlkbiox3zk7Y0gsjG%2BLp%2B7abu75GZ2aJBBKVVeB16%2FaM17c0VJPP%2Fc77lE1r%2FrC6ipU%2FSLO%2Bojg3eG7hpB03Qmy74qyzEt4SlQIcP62qhDK65lhwE8dyojXKYrdfBs2rZrj5n3BILvIc0LorG8IMJk1o7vhb1UYdXNpZ%2Bhm2uebrak6C82kPqz5K9id0N9NIs8iPrWxg2FSnSgeya24p%2BaS3a21H8Uzov6hpwmZVyj8C2BIcZCbRZxjwo0AwV2S%2FCr5EGw6mKgEu5mCzsREjJlTCFtNu6BjqwAYR0ng0ws8VLibeptZjAswbKofj3V0hcjog4unP6OtkpVjpyBQ6E3ekY7j0Tx%2FaqrEmwyhfgH0Q5XvSpQTnSyKjwVJYCKcYz7G4Veq3eplg0xQPV4b8JvI3YaTMYB3gEqVohbNM1X4oB7D0CSpAZO6lZnsVvIUVh6qyXQvrhV3AZDL5ONo2XOWNYB1nemMzcOFgKAHetSlJ2xd0r3DwGaYjaFjcuQGYiVCZuNLlw9bjr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLUBXYSUX%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bbb312208e64165f7d052571d2fc4bb88612fdd5199156681e83c6fcd0132eb1",
      "source recipes": "Allrecipes",
      "how to cook": "https://www.allrecipes.com/recipe/55877/easy-baked-tempeh/",
      "ingredients": [
        "2 tablespoons sunflower seed oil",
        "2 tablespoons brewers' yeast",
        "1 tablespoon dried oregano",
        "1 tablespoon dried chives",
        "2 teaspoons chopped fresh marjoram",
        "2 teaspoons ground coriander",
        "1 teaspoon salt",
        "1 (8 ounce) package tempeh, cut into 1/2 inch squares"
      ],
      "cuisineType": ["mediterranean"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 783.8,
        "fat": 55.2,
        "carbs": 32.12,
        "protein": 56.7
      }
    },
    {
      "foodname": "Super Easy Fried Tofu and Tempeh",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/6fd/6fdf0e679fb14da2c760c3fe7e29154e-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDpsB595TKxMDCitR6E9FIAvtm7vsWE0a3rPWRtTkooBQIhAMift2TROFtj6mFhJEVaeFNt5bwX8czzfpsLlB8tfsf1KrkFCHUQABoMMTg3MDE3MTUwOTg2IgygUUgNE%2FGC3kz4CtMqlgWN%2FYR%2Fhd%2BvhKDfFdsqpp71EGJSAOf1B4JGBCPMeeJ0cTv2EqYumpWyelb3r8az57j41sfEL%2BKzM8%2FODdyjcavxZi86v8xjvVJawg3AN%2BlcLd3aDbl%2FaAijV2lVNH1Xk6FePAHE110yBCnPMSy7Pgzni7IkfGdFT7y4%2FJSpFKIlyqgITtQrGZuZmpy3bbKNuouMdXOpuJqgB3NcvUzYMq1XhY3ce%2B%2FyLeUaw5kYEgPZ1AH2m5qaAuvRgXmsBU%2FRwEv4dk2mjivjOPvKDv6OxjWiktguFoGfmmKLqOT2aKmnEiBqIpCR%2B%2FJcyxyOD2vSdPzxLhDFgQbYmsM8%2BReocQS%2FjuKHhY1Ptul6%2BfzyyHuhFZoh1G%2F5KQW4cUYoNvM8bLsINPHsL6qbOlVqSDSrARTm%2FkEE5Mjg6xSwV6tmL5N58BTgrDafJ1Fluqf99l4qiKnO2B44w%2BMVwEZO2fLQ%2BQW9y0fbSYQGz%2BEW%2Bam5dy78RpZMF7Y%2BZIulONFB%2F553yyPKNbhIPjGKT5ifQb7jhZxvSl7k56w1PXUfESG4e5lYmJL3VpYnaW2nt1jUeL8CSLQh48G33kWNSzS0jvLzk3L4RpqcCXuWlkbiox3zk7Y0gsjG%2BLp%2B7abu75GZ2aJBBKVVeB16%2FaM17c0VJPP%2Fc77lE1r%2FrC6ipU%2FSLO%2Bojg3eG7hpB03Qmy74qyzEt4SlQIcP62qhDK65lhwE8dyojXKYrdfBs2rZrj5n3BILvIc0LorG8IMJk1o7vhb1UYdXNpZ%2Bhm2uebrak6C82kPqz5K9id0N9NIs8iPrWxg2FSnSgeya24p%2BaS3a21H8Uzov6hpwmZVyj8C2BIcZCbRZxjwo0AwV2S%2FCr5EGw6mKgEu5mCzsREjJlTCFtNu6BjqwAYR0ng0ws8VLibeptZjAswbKofj3V0hcjog4unP6OtkpVjpyBQ6E3ekY7j0Tx%2FaqrEmwyhfgH0Q5XvSpQTnSyKjwVJYCKcYz7G4Veq3eplg0xQPV4b8JvI3YaTMYB3gEqVohbNM1X4oB7D0CSpAZO6lZnsVvIUVh6qyXQvrhV3AZDL5ONo2XOWNYB1nemMzcOFgKAHetSlJ2xd0r3DwGaYjaFjcuQGYiVCZuNLlw9bjr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLUBXYSUX%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=78fcafa8de78ebe169be4fbb14952dd3c7f478264f5910ae6fd564e09a793686",
      "source recipes": "indonesiankitchendiary.com",
      "how to cook": "https://indonesiankitchendiary.com/super-easy-fried-tofu-and-tempeh",
      "ingredients": [
        "250 gr tofu",
        "200 gr tempeh",
        "6 cloves garlic",
        "1 tbsp coriander",
        "1 tbsp salt",
        "1 cup water",
        "cooking oil for frying"
      ],
      "cuisineType": ["asian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["starter"],
      "fulfilledNeeds": {
        "calories": 1271.79,
        "fat": 106.66,
        "carbs": 31.11,
        "protein": 64.96
      }
    },
    {
      "foodname": "Tempeh Curry",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/ed7/ed7cb36850d2bb5368474e92d92acdf2-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDpsB595TKxMDCitR6E9FIAvtm7vsWE0a3rPWRtTkooBQIhAMift2TROFtj6mFhJEVaeFNt5bwX8czzfpsLlB8tfsf1KrkFCHUQABoMMTg3MDE3MTUwOTg2IgygUUgNE%2FGC3kz4CtMqlgWN%2FYR%2Fhd%2BvhKDfFdsqpp71EGJSAOf1B4JGBCPMeeJ0cTv2EqYumpWyelb3r8az57j41sfEL%2BKzM8%2FODdyjcavxZi86v8xjvVJawg3AN%2BlcLd3aDbl%2FaAijV2lVNH1Xk6FePAHE110yBCnPMSy7Pgzni7IkfGdFT7y4%2FJSpFKIlyqgITtQrGZuZmpy3bbKNuouMdXOpuJqgB3NcvUzYMq1XhY3ce%2B%2FyLeUaw5kYEgPZ1AH2m5qaAuvRgXmsBU%2FRwEv4dk2mjivjOPvKDv6OxjWiktguFoGfmmKLqOT2aKmnEiBqIpCR%2B%2FJcyxyOD2vSdPzxLhDFgQbYmsM8%2BReocQS%2FjuKHhY1Ptul6%2BfzyyHuhFZoh1G%2F5KQW4cUYoNvM8bLsINPHsL6qbOlVqSDSrARTm%2FkEE5Mjg6xSwV6tmL5N58BTgrDafJ1Fluqf99l4qiKnO2B44w%2BMVwEZO2fLQ%2BQW9y0fbSYQGz%2BEW%2Bam5dy78RpZMF7Y%2BZIulONFB%2F553yyPKNbhIPjGKT5ifQb7jhZxvSl7k56w1PXUfESG4e5lYmJL3VpYnaW2nt1jUeL8CSLQh48G33kWNSzS0jvLzk3L4RpqcCXuWlkbiox3zk7Y0gsjG%2BLp%2B7abu75GZ2aJBBKVVeB16%2FaM17c0VJPP%2Fc77lE1r%2FrC6ipU%2FSLO%2Bojg3eG7hpB03Qmy74qyzEt4SlQIcP62qhDK65lhwE8dyojXKYrdfBs2rZrj5n3BILvIc0LorG8IMJk1o7vhb1UYdXNpZ%2Bhm2uebrak6C82kPqz5K9id0N9NIs8iPrWxg2FSnSgeya24p%2BaS3a21H8Uzov6hpwmZVyj8C2BIcZCbRZxjwo0AwV2S%2FCr5EGw6mKgEu5mCzsREjJlTCFtNu6BjqwAYR0ng0ws8VLibeptZjAswbKofj3V0hcjog4unP6OtkpVjpyBQ6E3ekY7j0Tx%2FaqrEmwyhfgH0Q5XvSpQTnSyKjwVJYCKcYz7G4Veq3eplg0xQPV4b8JvI3YaTMYB3gEqVohbNM1X4oB7D0CSpAZO6lZnsVvIUVh6qyXQvrhV3AZDL5ONo2XOWNYB1nemMzcOFgKAHetSlJ2xd0r3DwGaYjaFjcuQGYiVCZuNLlw9bjr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLUBXYSUX%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=207afb5255dd87acd662f9ecd6c84655031eef17e797328372502f55c7116fca",
      "source recipes": "realposhmom.com",
      "how to cook": "http://realposhmom.com/tempeh-curry/",
      "ingredients": [
        "1 cup long-grain brown rice",
        "2 cups water",
        "1 (8 oz) package tempeh",
        "1 1/2 cup low-sodium vegetable broth",
        "1 medium yellow onion, chopped",
        "2 cloves garlic, finely chopped",
        "1 Tbsp freshly grated ginger",
        "1 Tbsp ground curry powder",
        "2 tsp ground cumin",
        "1 (13.5 oz) can light coconut milk",
        "1 large sweet potato, peeled and cut into 1/2-inch chunks",
        "1/2 lb green beans, trimmed and cut into 1-inch pieces",
        "1/4 cup chopped cilantro, divided",
        "1/4 tsp sea salt"
      ],
      "cuisineType": ["indian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 1733.82,
        "fat": 59.11,
        "carbs": 236.82,
        "protein": 70.53
      }
    }
  ]
}
```

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

#### 200 OK

```json
{
  "message": "Prediction and recipe retrieval successful",
  "foodPrediction": {
    "predictedClass": "ayam",
    "predictedProb": null
  },
  "recipes": [
    {
      "foodname": "Opor Ayam",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/bad/badaf8dc3cf952dc7f5f55361842cbb6-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCk%2BRasYLgCz7aG0zoOpcb3tKSajW2TdsROAWIh3ErHcgIgcZgSPlzmsxVt6UOH6lTLuTWhV7os2iQ9VS6o%2FhqSRt0quQUIdRAAGgwxODcwMTcxNTA5ODYiDAPU7yHNIM1Y%2BsqnsCqWBSqx04jEmKDRVe5iOY8uQ7oJ%2F4EUY3%2FSLN4KbHs1NlXHTTHSCzo3DHdoMUGbFqC%2F4JfuEl54qiqyUedRIDFoiBhE6dfAxLr%2BNQsipybjRvl8uQgsqxwmqHMAWTeypgN6tEM8ksvb%2Fu5%2B2tOqvyyw%2BhQhWaHD%2FJpxLu%2BUT%2FJ1LX67PXXyEAn6dhmUUphZQmoHgNnuDdFJklpYndw9xlvTsE142mZDu9a9PWc3F9WhusTHD6p%2BDyjy65O7It20YkrnE1SRRHJAa%2BmFKdrbQlcOP5yVt514e2rfkpCsbadaRU9RToTm6kNdgbee56qBwWxZGmg%2BJpxNox00hTNmetsSAKbn1tgZeW7C%2FFpZHwZebvjJFBRl6NgEbTgPwkzKnV48ZFIHIqEvIkSWl2sDWdU43rjbW484xjlGjNZUPT0KOwWzLd05GJGne92LoDC58l71JsJ7ggnjLvvZ8P3ZjuOwDfDUGeL1DJN9V2uwxJRgnhOnvy%2FjSgFGnOuWtJvgEFXW9NBbvyL%2BFmxdnTFbfpZIHZ0sChZHZoT2zn7l7nuUE8wd35kFuyEEhaSyBvrXLZaYD3VxHXF%2BBngsSub9lAAZ%2FTxeM7QCx26n09y%2BaKhyh0%2FxPX5N%2FXYX58agS7gN3eO3k%2BL2YEBAkFazuh%2FgfKfRKGjM7R7KGBIEnLylzsA%2BagetXnOtyv9MzGtz6Q79V7PdGQRPRXVt1mYLZcl1NyyUxU%2FG%2BQstjRnf%2FJebDKPzyYHFmWArLYHaRQEuJwmQDRSIlAutfMtm2CneHuWxwOa2h4Ho7upq3Fd%2BY8HP%2BaMy%2B92Pt%2BGJXlaPuOXxlzD78zmLGtEpsek9TjnUqU%2BAc9sliwjPgDwVmzQ2WmKq7OWmhP6bOYMujxMdMMu027oGOrEBT%2BFIcN0qXlB5SPp8duL2Rkij1%2BIYjOObgAt%2BGgzsoP%2B1W9WPQxiRBiuAr8hY7KHI1FqPGYpJy4jlW8ZSi6owiPsIiF5ODlE8%2BdzMMBhXpbNpps8Uv6MAKqPJaLH%2Bbb0pxhp9MKiw8mgTSvPaVN73tdv9feglfeOL81o%2FTn32wuzlKuXu9KTIoTzwSZW2WJ1IvVgRmOQdQLRHEV5DPfVwIerHy8k0f7PResmy%2Bs%2B7W80Q&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122830Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAOQQ6TMB%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7c6dd214f770076963b394a28448f9b7f274abf788a56c383a83e3866c6196b8",
      "source recipes": "food.com",
      "how to cook": "http://www.food.com/recipe/opor-ayam-478355",
      "ingredients": [
        "1 kg chicken piece",
        "8 hard-boiled eggs (optional)",
        "1 lime, juice only",
        "1 liter water",
        "400 ml coconut cream",
        "2 stalks lemongrass, bruised",
        "2 bay leaves",
        "5 kaffir lime leaves",
        "1 teaspoon white pepper, toasted",
        "2 tablespoons coriander seeds, toasted",
        "1⁄2 teaspoon cumin seed, toasted",
        "3 candle nuts (macadamia can be a good substitute )",
        "10 shallots",
        "5 garlic",
        "2 inches ginger",
        "2 inches galangal",
        "1 inch turmeric, roasted",
        "1 teaspoon salt (to taste )",
        "3 tablespoons cooking oil, for stir frying"
      ],
      "cuisineType": ["south east asian"],
      "mealType": ["lunch/dinner"],
      "dishType": null,
      "fulfilledNeeds": {
        "calories": 5158.82,
        "fat": 375.32,
        "carbs": 209.53,
        "protein": 268.91
      }
    },
    {
      "foodname": "Opor Ayam (Chicken in Coconut Milk)",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/1b9/1b9710dcd8c99ab6efea3c0e2f77d0db.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCk%2BRasYLgCz7aG0zoOpcb3tKSajW2TdsROAWIh3ErHcgIgcZgSPlzmsxVt6UOH6lTLuTWhV7os2iQ9VS6o%2FhqSRt0quQUIdRAAGgwxODcwMTcxNTA5ODYiDAPU7yHNIM1Y%2BsqnsCqWBSqx04jEmKDRVe5iOY8uQ7oJ%2F4EUY3%2FSLN4KbHs1NlXHTTHSCzo3DHdoMUGbFqC%2F4JfuEl54qiqyUedRIDFoiBhE6dfAxLr%2BNQsipybjRvl8uQgsqxwmqHMAWTeypgN6tEM8ksvb%2Fu5%2B2tOqvyyw%2BhQhWaHD%2FJpxLu%2BUT%2FJ1LX67PXXyEAn6dhmUUphZQmoHgNnuDdFJklpYndw9xlvTsE142mZDu9a9PWc3F9WhusTHD6p%2BDyjy65O7It20YkrnE1SRRHJAa%2BmFKdrbQlcOP5yVt514e2rfkpCsbadaRU9RToTm6kNdgbee56qBwWxZGmg%2BJpxNox00hTNmetsSAKbn1tgZeW7C%2FFpZHwZebvjJFBRl6NgEbTgPwkzKnV48ZFIHIqEvIkSWl2sDWdU43rjbW484xjlGjNZUPT0KOwWzLd05GJGne92LoDC58l71JsJ7ggnjLvvZ8P3ZjuOwDfDUGeL1DJN9V2uwxJRgnhOnvy%2FjSgFGnOuWtJvgEFXW9NBbvyL%2BFmxdnTFbfpZIHZ0sChZHZoT2zn7l7nuUE8wd35kFuyEEhaSyBvrXLZaYD3VxHXF%2BBngsSub9lAAZ%2FTxeM7QCx26n09y%2BaKhyh0%2FxPX5N%2FXYX58agS7gN3eO3k%2BL2YEBAkFazuh%2FgfKfRKGjM7R7KGBIEnLylzsA%2BagetXnOtyv9MzGtz6Q79V7PdGQRPRXVt1mYLZcl1NyyUxU%2FG%2BQstjRnf%2FJebDKPzyYHFmWArLYHaRQEuJwmQDRSIlAutfMtm2CneHuWxwOa2h4Ho7upq3Fd%2BY8HP%2BaMy%2B92Pt%2BGJXlaPuOXxlzD78zmLGtEpsek9TjnUqU%2BAc9sliwjPgDwVmzQ2WmKq7OWmhP6bOYMujxMdMMu027oGOrEBT%2BFIcN0qXlB5SPp8duL2Rkij1%2BIYjOObgAt%2BGgzsoP%2B1W9WPQxiRBiuAr8hY7KHI1FqPGYpJy4jlW8ZSi6owiPsIiF5ODlE8%2BdzMMBhXpbNpps8Uv6MAKqPJaLH%2Bbb0pxhp9MKiw8mgTSvPaVN73tdv9feglfeOL81o%2FTn32wuzlKuXu9KTIoTzwSZW2WJ1IvVgRmOQdQLRHEV5DPfVwIerHy8k0f7PResmy%2Bs%2B7W80Q&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122830Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAOQQ6TMB%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=015460ad9b4b8488fa6e8d693ccdfd1967eff38202988de143baf5475a72db9b",
      "source recipes": "Allrecipes",
      "how to cook": "https://www.allrecipes.com/recipe/264501/opor-ayam-chicken-in-coconut-milk/",
      "ingredients": [
        "1 (2 to 3 pound) chicken, cut into 8 pieces",
        "1 lemon, juiced",
        "4 candlenuts",
        "1 teaspoon ground coriander",
        "0.5 teaspoon cumin seeds",
        "7 shallots, peeled",
        "5 cloves garlic, peeled",
        "1 tablespoon chopped galangal",
        "0.5 tablespoon chopped ginger",
        "0.5 teaspoon white peppercorns",
        "0.5 teaspoon chopped fresh turmeric root",
        "3 tablespoons vegetable oil",
        "2 stalks lemongrass, bruised",
        "1 tablespoon tamarind juice",
        "5 makrut lime leaves",
        "3 bay leaves",
        "1 teaspoon salt",
        "0.5 teaspoon white sugar",
        "3.3333332538605 cups thin coconut milk",
        "1 cup thick coconut milk",
        "1 small bunch Thai basil",
        "1 (2.8 ounce) package fried shallots"
      ],
      "cuisineType": ["south east asian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 3818.39,
        "fat": 298.3,
        "carbs": 140.62,
        "protein": 174.08
      }
    },
    {
      "foodname": "Super Easy Homemade Chocolate Gummies recipes",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/7de/7de5a1ed57062873acbadfb9f04fe6cd?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCk%2BRasYLgCz7aG0zoOpcb3tKSajW2TdsROAWIh3ErHcgIgcZgSPlzmsxVt6UOH6lTLuTWhV7os2iQ9VS6o%2FhqSRt0quQUIdRAAGgwxODcwMTcxNTA5ODYiDAPU7yHNIM1Y%2BsqnsCqWBSqx04jEmKDRVe5iOY8uQ7oJ%2F4EUY3%2FSLN4KbHs1NlXHTTHSCzo3DHdoMUGbFqC%2F4JfuEl54qiqyUedRIDFoiBhE6dfAxLr%2BNQsipybjRvl8uQgsqxwmqHMAWTeypgN6tEM8ksvb%2Fu5%2B2tOqvyyw%2BhQhWaHD%2FJpxLu%2BUT%2FJ1LX67PXXyEAn6dhmUUphZQmoHgNnuDdFJklpYndw9xlvTsE142mZDu9a9PWc3F9WhusTHD6p%2BDyjy65O7It20YkrnE1SRRHJAa%2BmFKdrbQlcOP5yVt514e2rfkpCsbadaRU9RToTm6kNdgbee56qBwWxZGmg%2BJpxNox00hTNmetsSAKbn1tgZeW7C%2FFpZHwZebvjJFBRl6NgEbTgPwkzKnV48ZFIHIqEvIkSWl2sDWdU43rjbW484xjlGjNZUPT0KOwWzLd05GJGne92LoDC58l71JsJ7ggnjLvvZ8P3ZjuOwDfDUGeL1DJN9V2uwxJRgnhOnvy%2FjSgFGnOuWtJvgEFXW9NBbvyL%2BFmxdnTFbfpZIHZ0sChZHZoT2zn7l7nuUE8wd35kFuyEEhaSyBvrXLZaYD3VxHXF%2BBngsSub9lAAZ%2FTxeM7QCx26n09y%2BaKhyh0%2FxPX5N%2FXYX58agS7gN3eO3k%2BL2YEBAkFazuh%2FgfKfRKGjM7R7KGBIEnLylzsA%2BagetXnOtyv9MzGtz6Q79V7PdGQRPRXVt1mYLZcl1NyyUxU%2FG%2BQstjRnf%2FJebDKPzyYHFmWArLYHaRQEuJwmQDRSIlAutfMtm2CneHuWxwOa2h4Ho7upq3Fd%2BY8HP%2BaMy%2B92Pt%2BGJXlaPuOXxlzD78zmLGtEpsek9TjnUqU%2BAc9sliwjPgDwVmzQ2WmKq7OWmhP6bOYMujxMdMMu027oGOrEBT%2BFIcN0qXlB5SPp8duL2Rkij1%2BIYjOObgAt%2BGgzsoP%2B1W9WPQxiRBiuAr8hY7KHI1FqPGYpJy4jlW8ZSi6owiPsIiF5ODlE8%2BdzMMBhXpbNpps8Uv6MAKqPJaLH%2Bbb0pxhp9MKiw8mgTSvPaVN73tdv9feglfeOL81o%2FTn32wuzlKuXu9KTIoTzwSZW2WJ1IvVgRmOQdQLRHEV5DPfVwIerHy8k0f7PResmy%2Bs%2B7W80Q&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122830Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAOQQ6TMB%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5c4bb14c116ef75b16df108b00d439f7dceae673e82eb8f9034ec91dd7e72cf6",
      "source recipes": "domskitchen.co.nz",
      "how to cook": "http://domskitchen.co.nz/super-easy-homemade-chocolate-gummies/",
      "ingredients": [
        "270mls coconut milk (we use Ayam brand – this is one can)",
        "2 Tbsp maple syrup",
        "1 tsp vanilla extract",
        "2 1/2 Tbsp gelatin (we use Great Lakes Gelatin – red box)",
        "1 Tbsp raw cacao (or cocoa)"
      ],
      "cuisineType": ["mediterranean"],
      "mealType": ["snack"],
      "dishType": ["desserts"],
      "fulfilledNeeds": {
        "calories": 694.29,
        "fat": 55.72,
        "carbs": 37.7,
        "protein": 21.05
      }
    },
    {
      "foodname": "Sop Ayam - Indonesian Chicken Soup",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/a5a/a5a9e3b9d060a9d5305a4c1e6d86cb68-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCk%2BRasYLgCz7aG0zoOpcb3tKSajW2TdsROAWIh3ErHcgIgcZgSPlzmsxVt6UOH6lTLuTWhV7os2iQ9VS6o%2FhqSRt0quQUIdRAAGgwxODcwMTcxNTA5ODYiDAPU7yHNIM1Y%2BsqnsCqWBSqx04jEmKDRVe5iOY8uQ7oJ%2F4EUY3%2FSLN4KbHs1NlXHTTHSCzo3DHdoMUGbFqC%2F4JfuEl54qiqyUedRIDFoiBhE6dfAxLr%2BNQsipybjRvl8uQgsqxwmqHMAWTeypgN6tEM8ksvb%2Fu5%2B2tOqvyyw%2BhQhWaHD%2FJpxLu%2BUT%2FJ1LX67PXXyEAn6dhmUUphZQmoHgNnuDdFJklpYndw9xlvTsE142mZDu9a9PWc3F9WhusTHD6p%2BDyjy65O7It20YkrnE1SRRHJAa%2BmFKdrbQlcOP5yVt514e2rfkpCsbadaRU9RToTm6kNdgbee56qBwWxZGmg%2BJpxNox00hTNmetsSAKbn1tgZeW7C%2FFpZHwZebvjJFBRl6NgEbTgPwkzKnV48ZFIHIqEvIkSWl2sDWdU43rjbW484xjlGjNZUPT0KOwWzLd05GJGne92LoDC58l71JsJ7ggnjLvvZ8P3ZjuOwDfDUGeL1DJN9V2uwxJRgnhOnvy%2FjSgFGnOuWtJvgEFXW9NBbvyL%2BFmxdnTFbfpZIHZ0sChZHZoT2zn7l7nuUE8wd35kFuyEEhaSyBvrXLZaYD3VxHXF%2BBngsSub9lAAZ%2FTxeM7QCx26n09y%2BaKhyh0%2FxPX5N%2FXYX58agS7gN3eO3k%2BL2YEBAkFazuh%2FgfKfRKGjM7R7KGBIEnLylzsA%2BagetXnOtyv9MzGtz6Q79V7PdGQRPRXVt1mYLZcl1NyyUxU%2FG%2BQstjRnf%2FJebDKPzyYHFmWArLYHaRQEuJwmQDRSIlAutfMtm2CneHuWxwOa2h4Ho7upq3Fd%2BY8HP%2BaMy%2B92Pt%2BGJXlaPuOXxlzD78zmLGtEpsek9TjnUqU%2BAc9sliwjPgDwVmzQ2WmKq7OWmhP6bOYMujxMdMMu027oGOrEBT%2BFIcN0qXlB5SPp8duL2Rkij1%2BIYjOObgAt%2BGgzsoP%2B1W9WPQxiRBiuAr8hY7KHI1FqPGYpJy4jlW8ZSi6owiPsIiF5ODlE8%2BdzMMBhXpbNpps8Uv6MAKqPJaLH%2Bbb0pxhp9MKiw8mgTSvPaVN73tdv9feglfeOL81o%2FTn32wuzlKuXu9KTIoTzwSZW2WJ1IvVgRmOQdQLRHEV5DPfVwIerHy8k0f7PResmy%2Bs%2B7W80Q&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122830Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAOQQ6TMB%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ee3ef8bfaa479a2a37217301bd7117f91d97d171b696b5806306b751104e4c50",
      "source recipes": "dailycookingquest.com",
      "how to cook": "https://dailycookingquest.com/sop-ayam-indonesian-chicken-soup.html",
      "ingredients": [
        "1 free range chicken (Indonesian: ayam kampung), cut into 4 to 8 pieces",
        "1 inch ginger, bruised",
        "1 bunch of Chinese celery (Indonesian: daun seledri), knotted",
        "1.5 liter (6 cups) water",
        "2 tablespoon oil",
        "3 shallots (Indonesian: bawang merah), minced",
        "3 cloves garlic (Indonesian: bawang putih), minced",
        "1/2 teaspoon ground white pepper",
        "1/2 teaspoon ground nutmeg (Indonesian: bubuk pala)",
        "1 tablespoon sugar, or to taste",
        "2 teaspoon salt, or to taste",
        "200 gram carrot (Indonesian: wortel)",
        "100 gram cabbage (Indonesian: kol)",
        "100 gram green beans (Indonesian: buncis)",
        "1 scallions, thinly sliced"
      ],
      "cuisineType": ["south east asian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["soup"],
      "fulfilledNeeds": {
        "calories": 3203.16,
        "fat": 211.06,
        "carbs": 87.01,
        "protein": 235
      }
    },
    {
      "foodname": "AYAM™ Thai Prawn Red Curry",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/05e/05e3d1e691acc32759e3d8f90e512104-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCk%2BRasYLgCz7aG0zoOpcb3tKSajW2TdsROAWIh3ErHcgIgcZgSPlzmsxVt6UOH6lTLuTWhV7os2iQ9VS6o%2FhqSRt0quQUIdRAAGgwxODcwMTcxNTA5ODYiDAPU7yHNIM1Y%2BsqnsCqWBSqx04jEmKDRVe5iOY8uQ7oJ%2F4EUY3%2FSLN4KbHs1NlXHTTHSCzo3DHdoMUGbFqC%2F4JfuEl54qiqyUedRIDFoiBhE6dfAxLr%2BNQsipybjRvl8uQgsqxwmqHMAWTeypgN6tEM8ksvb%2Fu5%2B2tOqvyyw%2BhQhWaHD%2FJpxLu%2BUT%2FJ1LX67PXXyEAn6dhmUUphZQmoHgNnuDdFJklpYndw9xlvTsE142mZDu9a9PWc3F9WhusTHD6p%2BDyjy65O7It20YkrnE1SRRHJAa%2BmFKdrbQlcOP5yVt514e2rfkpCsbadaRU9RToTm6kNdgbee56qBwWxZGmg%2BJpxNox00hTNmetsSAKbn1tgZeW7C%2FFpZHwZebvjJFBRl6NgEbTgPwkzKnV48ZFIHIqEvIkSWl2sDWdU43rjbW484xjlGjNZUPT0KOwWzLd05GJGne92LoDC58l71JsJ7ggnjLvvZ8P3ZjuOwDfDUGeL1DJN9V2uwxJRgnhOnvy%2FjSgFGnOuWtJvgEFXW9NBbvyL%2BFmxdnTFbfpZIHZ0sChZHZoT2zn7l7nuUE8wd35kFuyEEhaSyBvrXLZaYD3VxHXF%2BBngsSub9lAAZ%2FTxeM7QCx26n09y%2BaKhyh0%2FxPX5N%2FXYX58agS7gN3eO3k%2BL2YEBAkFazuh%2FgfKfRKGjM7R7KGBIEnLylzsA%2BagetXnOtyv9MzGtz6Q79V7PdGQRPRXVt1mYLZcl1NyyUxU%2FG%2BQstjRnf%2FJebDKPzyYHFmWArLYHaRQEuJwmQDRSIlAutfMtm2CneHuWxwOa2h4Ho7upq3Fd%2BY8HP%2BaMy%2B92Pt%2BGJXlaPuOXxlzD78zmLGtEpsek9TjnUqU%2BAc9sliwjPgDwVmzQ2WmKq7OWmhP6bOYMujxMdMMu027oGOrEBT%2BFIcN0qXlB5SPp8duL2Rkij1%2BIYjOObgAt%2BGgzsoP%2B1W9WPQxiRBiuAr8hY7KHI1FqPGYpJy4jlW8ZSi6owiPsIiF5ODlE8%2BdzMMBhXpbNpps8Uv6MAKqPJaLH%2Bbb0pxhp9MKiw8mgTSvPaVN73tdv9feglfeOL81o%2FTn32wuzlKuXu9KTIoTzwSZW2WJ1IvVgRmOQdQLRHEV5DPfVwIerHy8k0f7PResmy%2Bs%2B7W80Q&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241209T122830Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAOQQ6TMB%2F20241209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0abf4074bbbd5e047bb4464134402ff9535ac2d393564622fa92585768983d53",
      "source recipes": "mouthsofmums.com.au",
      "how to cook": "https://mouthsofmums.com.au/recipe/ayam-thai-prawn-red-curry/",
      "ingredients": [
        "1 tbsp Olive Oil",
        "1 kg Medium Green Prawns, peeled, deveined, leaving tails intact",
        "3 tbsp AYAM™ Thai Red Curry Paste",
        "270ml AYAM™ Pure Coconut Cream",
        "2 tbsp Fresh Lime Juice",
        "1 tbsp Grated Palm Sugar",
        "2 Kaffir Lime Leaves (options)",
        "1/4 cup Water",
        "1/2 cup Fresh Coriander Leaves"
      ],
      "cuisineType": ["south east asian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 1838.36,
        "fat": 121.46,
        "carbs": 48.32,
        "protein": 148.84
      }
    }
  ]
}
```

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

#### 200 OK

```json
{
  "message": "Food selection successful and fulfilled needs updated",
  "selectedFood": {
    "foodname": "Opor Ayam (Chicken in Coconut Milk)",
    "source recipes": "Allrecipes",
    "how to cook": "https://www.allrecipes.com/recipe/264501/opor-ayam-chicken-in-coconut-milk/",
    "ingredients": [
      "1 (2 to 3 pound) chicken, cut into 8 pieces",
      "1 lemon, juiced",
      "4 candlenuts",
      "1 teaspoon ground coriander",
      "0.5 teaspoon cumin seeds",
      "7 shallots, peeled",
      "5 cloves garlic, peeled",
      "1 tablespoon chopped galangal",
      "0.5 tablespoon chopped ginger",
      "0.5 teaspoon white peppercorns",
      "0.5 teaspoon chopped fresh turmeric root",
      "3 tablespoons vegetable oil",
      "2 stalks lemongrass, bruised",
      "1 tablespoon tamarind juice",
      "5 makrut lime leaves",
      "3 bay leaves",
      "1 teaspoon salt",
      "0.5 teaspoon white sugar",
      "3.3333332538605 cups thin coconut milk",
      "1 cup thick coconut milk",
      "1 small bunch Thai basil",
      "1 (2.8 ounce) package fried shallots"
    ],
    "cuisineType": ["south east asian"],
    "mealType": ["lunch/dinner"],
    "dishType": ["main course"],
    "fulfilledNeeds": {
      "calories": 3818.39,
      "fat": 298.3,
      "carbs": 140.62,
      "protein": 174.08
    }
  },
  "updatedFulfilledNeeds": {
    "calories": 3818.39,
    "fat": 298.3,
    "carbs": 140.62,
    "protein": 174.08
  },
  "imageUrl": "https://storage.googleapis.com/nyamdev/imagesFood/W82AJqbULgU2nQg1mRUXrfFXVEu1-Opor Ayam (Chicken in Coconut Milk).jpg"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 7. End-point: List History

### Method: GET

> ```
> {{baseURL}}/history/food/:uid
> ```

### Description

Retrieves a list of all analyzed food history for the specified user.

### Example Response

#### 200 OK

```json
{
  "message": "Food history retrieved successfully",
  "foodHistory": [
    {
      "selectedFood": {
        "foodname": "Opor Ayam (Chicken in Coconut Milk)",
        "source recipes": "Allrecipes",
        "how to cook": "https://www.allrecipes.com/recipe/264501/opor-ayam-chicken-in-coconut-milk/",
        "ingredients": [
          "1 (2 to 3 pound) chicken, cut into 8 pieces",
          "1 lemon, juiced",
          "4 candlenuts",
          "1 teaspoon ground coriander",
          "0.5 teaspoon cumin seeds",
          "7 shallots, peeled",
          "5 cloves garlic, peeled",
          "1 tablespoon chopped galangal",
          "0.5 tablespoon chopped ginger",
          "0.5 teaspoon white peppercorns",
          "0.5 teaspoon chopped fresh turmeric root",
          "3 tablespoons vegetable oil",
          "2 stalks lemongrass, bruised",
          "1 tablespoon tamarind juice",
          "5 makrut lime leaves",
          "3 bay leaves",
          "1 teaspoon salt",
          "0.5 teaspoon white sugar",
          "3.3333332538605 cups thin coconut milk",
          "1 cup thick coconut milk",
          "1 small bunch Thai basil",
          "1 (2.8 ounce) package fried shallots"
        ],
        "cuisineType": ["south east asian"],
        "mealType": ["lunch/dinner"],
        "dishType": ["main course"],
        "fulfilledNeeds": {
          "calories": 3818.39,
          "fat": 298.3,
          "carbs": 140.62,
          "protein": 174.08
        }
      },
      "imageUrl": "https://storage.googleapis.com/nyamdev/imagesFood/W82AJqbULgU2nQg1mRUXrfFXVEu1-Opor Ayam (Chicken in Coconut Milk).jpg",
      "timestamp": {
        "_seconds": 1733747392,
        "_nanoseconds": 153000000
      }
    }
  ]
}
```

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

```json
{
  "message": "Food history detail retrieved successfully",
  "selectedHistory": {
    "selectedFood": {
      "foodname": "Opor Ayam (Chicken in Coconut Milk)",
      "source recipes": "Allrecipes",
      "how to cook": "https://www.allrecipes.com/recipe/264501/opor-ayam-chicken-in-coconut-milk/",
      "ingredients": [
        "1 (2 to 3 pound) chicken, cut into 8 pieces",
        "1 lemon, juiced",
        "4 candlenuts",
        "1 teaspoon ground coriander",
        "0.5 teaspoon cumin seeds",
        "7 shallots, peeled",
        "5 cloves garlic, peeled",
        "1 tablespoon chopped galangal",
        "0.5 tablespoon chopped ginger",
        "0.5 teaspoon white peppercorns",
        "0.5 teaspoon chopped fresh turmeric root",
        "3 tablespoons vegetable oil",
        "2 stalks lemongrass, bruised",
        "1 tablespoon tamarind juice",
        "5 makrut lime leaves",
        "3 bay leaves",
        "1 teaspoon salt",
        "0.5 teaspoon white sugar",
        "3.3333332538605 cups thin coconut milk",
        "1 cup thick coconut milk",
        "1 small bunch Thai basil",
        "1 (2.8 ounce) package fried shallots"
      ],
      "cuisineType": ["south east asian"],
      "mealType": ["lunch/dinner"],
      "dishType": ["main course"],
      "fulfilledNeeds": {
        "calories": 3818.39,
        "fat": 298.3,
        "carbs": 140.62,
        "protein": 174.08
      }
    },
    "imageUrl": "https://storage.googleapis.com/nyamdev/imagesFood/W82AJqbULgU2nQg1mRUXrfFXVEu1-Opor Ayam (Chicken in Coconut Milk).jpg",
    "timestamp": {
      "_seconds": 1733747392,
      "_nanoseconds": 153000000
    }
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
