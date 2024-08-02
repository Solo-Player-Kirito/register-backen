<h1> login user </h1>
route:url/signup
method: post
request body:
{
    "email" : string,
    "password":string
}
response :
{
    "email":"email",
    "password":encryptedpassword
}

<h1> signin <h1>

route:url/signin
method: post
request body:
{
"email" : string,
"password":string
}
response :
{
"email":"email",
"password":encryptedpassword
}

<h1> test route <h1>
route : register-backen.vercel.app
method : get
response body: hello world! routes
