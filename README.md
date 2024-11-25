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
        "country": "string"
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

### **4. Forgot Password**

**Endpoint**:  
`POST /api/auth/forgot-password`

**Description**:  
Send password reset email.

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

---

### **5. Reset Password**

**Endpoint**:  
`PATCH /api/auth/reset-password`

**Description**:  
Reset user’s password.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Request Body**:

```json
{
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
`PATCH /api/users/{user-email}`

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
`GET /api/users/:email`

**Description**:  
Retrieve user details by email.

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
`GET /articles?page=<number>&limit=<number>`

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
`GET /articles/:article_id`

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
    "created_at": "timestamp"
}
```

---

## **<span style="color:#07e630;">User History</span>**

### **<span style="color:#03ab22;">Read History</span>**

#### **1. Add Read History**

**Endpoint**:  
`POST /users/:user-email/history/read`

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
`GET /users/:user-email/history/read`

**Description**:  
Retrieve a user's read histories.

**Response**:
status code: <span style="color:#03ab22;">200</span>

```json
[
    {
        "email": "string",
        "articleId": "number",
        "title": "string",
        "readAt": "timestamp",
        "readId": "string"
    },
    {
        "email": "string",
        "articleId": "number",
        "title": "string",
        "readAt": "timestamp",
        "readId": "string"
    }
]
```

---

#### **3. Delete Read History**

**Endpoint**:  
`DELETE /users/:user-email/history/read/:read-id`

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
`POST /users/:user-email/history/diagnosis`

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
`GET /users/:user-email/history/diagnosis`

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
        "email": "string",
        "diagId": "number",
        "imagePath": "string",
        "result": "string",
        "createdAt": "timestamp"
    },
    {
        "email": "string",
        "diagId": "number",
        "imagePath": "string",
        "result": "string",
        "createdAt": "timestamp"
    }
]
```

---

#### **3. Get a Diagnosis History By ID**

**Endpoint**:  
`Get /users/:user-email/history/diagnosis/:diag-id`

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
    "message": "Diagnosis history has been deleted successfully."
}
```

#### **4. Delete a diagnosis History**

**Endpoint**:  
`DELETE /users/:user-email/history/diagnosis/:diag-id`

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
    "message": "diagnosis history deleted successfully."
}
```
