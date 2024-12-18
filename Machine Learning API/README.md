# Project: NYAM-ML-backend
---

**baseURL:** `Ask Developer`

---

## End-point: BMR Rate
### Method: POST
>```
>{{baseURL}}/bmr
>```
### Body (**raw**)

```json
{
    "gender" : "1",
    "height" : "170",
    "weight" : "70",
    "bmi" : "24"
}
```
### Example Response

#### 200 OK

```json
{
    "input": {
        "bmi": 24,
        "gender": 1,
        "height": 170,
        "weight": 70
    },
    "prediction": {
        "predicted_index": 2,
        "probabilities": [
            0.0002162219607271254,
            0.024528298527002335,
            0.8425167202949524,
            0.10370878130197525,
            0.02490144595503807,
            0.004128499422222376
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Food Classification
### Method: POST
>```
>{{baseURL}}/food
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|file|/C:/Users/AqilMFach/Downloads/download (9).jpg|file|

### Example Response

#### 200 OK
```json
{
    "all_probabilities": [
        0.001230693655088544,
        0.0003820494166575372,
        0.002172820270061493,
        0.0020544310100376606,
        0.004438373725861311,
        0.0009782604174688458,
        0.02700592763721943,
        0.07374405860900879,
        0.0026527047157287598,
        0.0008668507216498256,
        0.0018035381799563766,
        0.011023645289242268,
        0.0005313425208441913,
        0.8606715202331543,
        0.0013840891188010573,
        0.0017764846561476588,
        0.007283187471330166
    ],
    "predicted_class": "tempeh",
    "predicted_prob": 0.8606715202331543
}
```

#### 400 Bad Request
```json
{
    "message": "Prediksi kurang dari 65% kepercayaan. Silakan kirim ulang gambar."
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
