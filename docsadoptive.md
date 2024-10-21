
# API Documentation

## Table of Contents
- [End User Details](#end-user-details)
  - [Fetch All Users](#fetch-all-users)
  - [Signup](#signup)
  - [Sign In](#sign-in)
  - [Upload User Profile Image](#upload-user-profile-image)
- [Orphanage Details](#orphanage-details)
  - [Upload Orphanage Details](#upload-orphanage-details)
  - [Add Kid Details](#add-kid-details)
  - [Delete Orphanage](#delete-orphanage)
  - [Delete Kid Details](#delete-kid-details)
  - [View All Orphanages with Kids](#view-all-orphanages-with-kids)
- [Banner Management](#banner-management)
  - [Upload Banners](#upload-banners)
  - [Get Banners](#get-banners)

---

## End User Details

### Fetch All Users

- **Method:** `GET`
- **URL:** `http://localhost:3000/mammu`
- **Description:** Fetches all users.

#### Response Body

```json
{
    "info": "all users",
    "alldData": [
        {
            "_id": "66d412b838e91f0510389362",
            "userName": "hshshshsshshshhsdhhdhd@gmail.com",
            "email": "hdhdhdjd",
            "password": "$2a$10$QuSay6VOrhkoNMPThU6v6ek9C.YVIQkgbFRiDDKPxdkaqlweGx97m",
            "multiImg": [],
            "__v": 0,
            "profileImg": "https://res.cloudinary.com/dgm07yv9g/image/upload/v1725174480/uploads/oyoyicto5o3iodadpcdl.jpg"
        },
        {
            "_id": "66d41cef605914c85c8259fc",
            "userName": "gg",
            "email": "c",
            "password": "$2a$10$AxkrOh1gI348kmExsb1/8.Hb9V2NgjEAQ5ITQKsta1wUpELKN7rc6",
            "multiImg": [],
            "__v": 0
        }
    ]
}
```

---

### Signup

- **Method:** `POST`
- **URL:** `/signup`
- **Description:** Registers a new user.

#### Request Body

```json
{
    "email": "hagimaru@gmail.com",
    "name": "haggi",
    "password": "123456789"
}
```

#### Response Body

```json
{
    "profileImg": "add image",
    "message": "registered successful",
    "email": "hagimaru@gmail.com",
    "id": "67169bef920b912b4958cb68"
}
```

---

### Sign In

- **Method:** `POST`
- **URL:** `/signin`
- **Description:** Authenticates a user.

#### Request Body

```json
{
    "email": "hagimaru@gmail.com",
    "name": "haggi",
    "password": "123456789"
}
```

#### Response Body

```json
{
    "message": "login successful",
    "email": "hagimaru@gmail.com",
    "id": "67169bef920b912b4958cb68",
    "multiImage": [],
    "token": "you get token in production api, this is stage api"
}
```

---

### Upload User Profile Image

- **Method:** `POST`
- **URL:** `/upload/single`
- **Description:** Uploads a user's profile image.

#### Form Data

- **email:** User's email address.
- **profileImg:** Image file to upload.

#### Response Body

```json
{
    "message": "Profile image uploaded successfully",
    "imgurl": "https://res.cloudinary.com/dgm07yv9g/image/upload/v1729536141/uploads/idwhigko40cuk6qepw4h.png"
}
```

---

## Orphanage Details

### Upload Orphanage Details

- **Method:** `POST`
- **URL:** `http://localhost:3000/add/orphanage`
- **Description:** Adds a new orphanage.

#### Form Data

- **name:** Name of the orphanage.
- **address:** Address of the orphanage.
- **location:** Location details.
- **orpPhotos:** Image files of the orphanage.

#### Response Body

```json
{
    "info": "Orphanage saved successfully",
    "orphanage": {
        "name": "any name",
        "address": "any address",
        "location": "bsjhbjf",
        "orpPhotos": [
            "https://res.cloudinary.com/dgm07yv9g/image/upload/v1729535279/uploads/b8m3mwsdqkr3csf8ddg0.png"
        ],
        "kids": [],
        "_id": "67169d2fb7b7009c41c3d697",
        "__v": 0
    }
}
```

---

### Add Kid Details

- **Method:** `POST`
- **URL:** `/add/kid`
- **Description:** Adds a new kid to an orphanage.

#### Form Data

- **name:** Name of the kid.
- **age:** Age of the kid.
- **home:** Valid orphanage name.
- **kidPhoto:** Photo of the kid.

#### Response Body

```json
{
    "info": "Kid saved successfully",
    "kid": {
        "isAdopted": false,
        "name": "any name",
        "age": "20",
        "kidPhoto": [
            "https://res.cloudinary.com/dgm07yv9g/image/upload/v1729535618/uploads/tndlsiwmvoi4ukbntik3.png"
        ],
        "Videos": [],
        "home": "67169d2fb7b7009c41c3d697",
        "_id": "67169e82b7b7009c41c3d69a",
        "__v": 0
    }
}
```

---

### Delete Orphanage

- **Method:** `DELETE`
- **URL:** `/delete/orphanage`
- **Description:** Deletes an orphanage by name.

#### Request Body

```json
{
    "name": "Orphanage Name"
}
```

#### Response Body

```json
{
    "message": "deleted"
}
```

---

### Delete Kid Details

- **Method:** `DELETE`
- **URL:** `/delete/kid`
- **Description:** Deletes a kid by name.

#### Request Body

```json
{
    "name": "any name"
}
```

#### Response Body

```json
{
    "info": "deleted kid"
}
```

---

### View All Orphanages with Kids

- **Method:** `GET`
- **URL:** `http://localhost:3000/all/orphanages`
- **Description:** Retrieves all orphanages along with their kids' data.

#### Response Body

```json
{
    "_id": "66be0d1a6976ca034f53a01f",
    "name": "helloHome",
    "address": "in punjab",
    "location": "jalandhar",
    "orpPhotos": [
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1723731226/uploads/hraylfzfltx7xddu7anw.jpg",
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1723731226/uploads/bnt3sbnp6nselneheqgb.jpg",
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1723731226/uploads/omzsg9ywxsfl3621jhrb.jpg"
    ],
    "kids": [
        {
            "_id": "66c4b0d016a36922da1fd793",
            "isAdopted": false,
            "name": "dingo",
            "age": "69",
            "story": "my story",
            "gender": "hello world",
            "height": "male",
            "kidPhoto": [
                "https://res.cloudinary.com/dgm07yv9g/image/upload/v1724166351/uploads/kuh7f7xtacv22b31cqlx.jpg"
            ],
            "Videos": [],
            "home": "66be0d1a6976ca034f53a01f",
            "__v": 0
        },
        {
            "_id": "66c4b13116a36922da1fd797",
            "isAdopted": false,
            "name": "sonu aka threesome lover",
            "age": "69",
            "story": "bc mutt diya tha rat ko gharwalo ne nikal diya",
            "gender": "sonu hu",
            "height": "sonu hu",
            "kidPhoto": [
                "https://res.cloudinary.com/dgm07yv9g/image/upload/v1724166449/uploads/zc7vksaeoj6vj5hrlsoj.jpg"
            ],
            "Videos": [],
            "home": "66be0d1a6976ca034f53a01f",
            "__v": 0
        }
    ],
    "__v": 10,
    "totalKids": 10
}
```

---

## Banner Management

### Upload Banners

- **Method:** `POST`
- **URL:** `/upload/banner`
- **Description:** Uploads banner images.

#### Form Data

- **MainBanner:** Banner image file to upload.

#### Response Body

```json
{
    "message": "Banner image uploaded and appended successfully",
    "MainBanner": [
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1727677573/uploads/pwkqxyvbrnf8anofrjki.png",
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1727677582/uploads/gbkct7ncemudfucml0pa.png",
        "https://res.cloudinary.com/dgm07yv9g/image/upload/v1729536247/uploads/d0zezbenl9e8q7ifatcr.png"
    ]
}
```

---

### Get Banners

- **Method:** `GET`
- **URL:** `/banners`
- **Description:** Retrieves all banner images.

#### Response Body

```json
{
    "banners": [
        {
            "_id": "66fa448511050b1bef350cfd",
            "MainBanner": [
                "https://res.cloudinary.com/dgm07yv9g/image/upload/v1727677573/uploads/pwkqxyvbrnf8anofrjki.png",
                "https://res.cloudinary.com/dgm07yv9g/image/upload/v1727677582/uploads/gbkct7ncemudfucml0pa.png",
                "https://res.cloudinary.com/dgm07yv9g/image/upload/v1729536247/uploads/d0zezbenl9e8q7ifatcr.png"
            ],
            "__v": 2
        }
    ]
}
```

---

## Notes

- **Base URL:** Replace `http://localhost:3000` with your actual server URL if different.
- **Authentication:** Ensure to handle authentication tokens where necessary, especially for protected routes.
- **Image Uploads:** The URLs provided in responses are hosted on Cloudinary. Ensure your Cloudinary account details are correctly configured in your backend.

---
