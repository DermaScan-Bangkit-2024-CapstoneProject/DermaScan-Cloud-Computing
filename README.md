# DermaScan Cloud-Computing

###### This repository contains the code for the DermaScan-Cloud-Computing project.

###### DermaScan Documentation - Capstone Project - C242-PR605

# **API Documentation**

## **Base URL**

```
https://localhost:3000
```

---

## **<span style="color:#07e630;">Authentication and User Management</span>**

### **1. Signup**

**Endpoint**:  
`POST /api/auth/signup`

**Description**:  
Register a new user.

**Request Body**:

```json
{
    "name": "string",
    "age": "number",
    "email": "string",
    "password": "string",
    "phone": "string",
    "city": "string",
    "country": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">201</span>

```json
{
    "message": "User Successfully Created"
}
```

---

### **2. Login**

**Endpoint**:  
`POST /api/auth/login`

**Description**:  
Authenticate user and generate a token.

**Request Body**:

```json
{
    "email": "string",
    "password": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Login Successfully",
    "data": {
        "name": "string",
        "age": "number",
        "email": "string",
        "phone": "string",
        "city": "string",
        "country": "string",
        "user_id": "string"
    },
    "token": "<jwt-token>"
}
```

---

### **3. Logout**

**Endpoint**:  
`POST /api/auth/logout`

**Description**:  
Log out a user and invalidate the token.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "User logged out successfully"
}
```

---

### **4. Forget Password**

##### A. Get Forget Password Token

**Endpoint**:  
`POST /api/auth/forget-password`

**Description**:  
Send verification token to user email.

**Request Body**:

```json
{
    "email": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Password reset link sent to email."
}
```

##### B. Change Forget Password

**Endpoint**:  
`PATCH /api/auth/forget-password`

**Request Body**:

```json
{
    "email": "string",
    "token": "string",
    "password": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Password successfully reset."
}
```

---

### **5. Reset Password**

**Endpoint**:

`PATCH /api/user/reset-password`

<!-- `PATCH /api/users/:user_id/reset-password` -->

**Description**:  
Reset user’s password.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Request Body**:

```json
{
    "user_id": "string",
    "oldPassword": "string",
    "newPassword": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Password reset successfully."
}
```

---

### **6. Update User Data**

**Endpoint**:  
`PATCH /api/users/:user_id`

**Description**:  
Update user profile data.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Request Body**:

```json
{
    "name": "string",
    "age": "number",
    "email": "string",
    "phone": "string",
    "city": "string",
    "country": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "User data updated successfully."
}
```

---

### **7. Get User**

**Endpoint**:  
`GET /api/users/:user_id`

**Description**:  
Retrieve user details by user id.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "name": "string",
    "email": "string",
    "age": "number",
    "phone": "string",
    "city": "string",
    "country": "string",
    "created_at": "timestamp"
}
```

---

## **<span style="color:#07e630;">Articles </span>**

### **1. Get All Articles**

**Endpoint**:  
`GET /api/articles?page=<number>&limit=<number>`

**Description**:  
Retrieve all articles.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "next": {
        "page": "number",
        "limit": "number"
    },
    "previous": {
        "page": "number",
        "limit": "number"
    },
    "resultDatas": [
        {
            "author:": "string",
            "title": "string",
            "content": "string",
            "article_id": "number",
            "theme": "string",
            "created_at": "timestamp"
        },
        {
            "author:": "string",
            "title": "string",
            "content": "string",
            "article_id": "number",
            "theme": "string",
            "created_at": "timestamp"
        }
    ]
}
```

---

### **2. Get Article by ID**

**Endpoint**:  
`GET /api/articles/:article_id`

**Description**:  
Retrieve an article by its ID.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "article_id": "number",
    "title": "string",
    "theme": "string",
    "content": "string",
    "author:": "string",
    "created_at": "timestamp",
    "is_added_to_history": "boolean"
}
```

---

### **3. Get Articles by Theme**

**Endpoint**:  
`GET /api/articles/theme/:article_theme?page=<number>&limit=<number>`

**Description**:  
Retrieve an article by its Theme, theme can be either "cancer"|"others"|"skin".

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "next": {
        "page": "number",
        "limit": "number"
    },
    "previous": {
        "page": "number",
        "limit": "number"
    },
    "resultDatas": [
        {
            "author:": "string",
            "title": "string",
            "content": "string",
            "article_id": "number",
            "theme": "string",
            "created_at": "timestamp"
        },
        {
            "author:": "string",
            "title": "string",
            "content": "string",
            "article_id": "number",
            "theme": "string",
            "created_at": "timestamp"
        }
    ]
}
```

---

## **<span style="color:#07e630;">User History</span>**

### **<span style="color:#03ab22;">Read History</span>**

#### **1. Add Read History**

**Endpoint**:  
`POST /api/users/:user_id/history/read`

**Description**:  
Add a read history record for a user.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Request Body**:

```json
{
    "article_id": "number"
}
```

**Response**:
status code: <span style="color:#03ab22;">201</span>

```json
{
    "message": "Read history added successfully."
}
```

---

#### **2. Get Read Histories**

**Endpoint**:  
`GET /api/users/:user_id/history/read`

**Description**:  
Retrieve a user's read histories.

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
[
    {
        "user_id": "string",
        "articleId": "number",
        "title": "string",
        "read_id": "timestamp",
        "read_at": "string"
    },
    {
        "user_id": "string",
        "articleId": "number",
        "title": "string",
        "read_id": "timestamp",
        "read_at": "string"
    }
]
```

---

#### **3. Delete Read History**

**Endpoint**:  
`DELETE /api/users/:user_id/history/read/:read_id`

**Description**:  
Delete a specific read history entry.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Read history deleted successfully."
}
```

---

### **<span style="color:#03ab22;">Diagnosis History</span>**

#### **1. Add a Diagnosis History**

**Endpoint**:  
`POST /api/users/:user_id/history/diagnosis`

**Description**:  
Add a diagnosis history record.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Request Body**:

```json
{
    "image": "image/image file",
    "result": "string"
}
```

**Response**:
status code: <span style="color:#03ab22;">201</span>

```json
{
    "message": "diagnosis history added successfully."
}
```

---

#### **2. Get All Diagnosis Histories**

**Endpoint**:  
`GET /api/users/:user_id/history/diagnosis`

**Description**:  
Retrieve a user's diagnosis histories.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
[
    {
        "user_id": "string",
        "diag_id": "number",
        "image_url": "string",
        "result": "string",
        "checked_at": "timestamp"
    },
    {
        "user_id": "string",
        "diag_id": "number",
        "image_url": "string",
        "result": "string",
        "checked_at": "timestamp"
    }
]
```

---

#### **3. Get a Diagnosis History By ID**

**Endpoint**:  
`Get /api/users/:user_id/history/diagnosis/:diag_id`

**Description**:  
Get a specific diagnosis history entry.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "user_id": "string",
    "diag_id": "number",
    "image_url": "string",
    "result": "string",
    "checked_at": "timestamp"
}
```

#### **4. Delete a diagnosis History**

**Endpoint**:  
`DELETE /api/users/:user_id/history/diagnosis/:diag_id`

**Description**:  
Delete a specific diagnosis history entry.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
{
    "message": "Diagnosis history deleted successfully."
}
```
