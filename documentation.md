## 🚀1.  Stream (GetStream.io) Overview
(geforceabn120@gmail.com used)
Stream offers backend infrastructure and SDKs for integrating real-time chat, video, and audio calls into your applications.

💬 1. Stream Chat
🔹 Features:
1-on-1 and Group Chats
Threads, Reactions, Mentions
Typing indicators
Message history & search
Push notifications
Attachments (images, files, audio)

🔹 Supported Platforms:
Web (React, JavaScript)
Mobile (Flutter, React Native, Android, iOS)

🔹 Example Use Cases:
In-app chat for customer service
Social apps like Instagram DMs
Team collaboration apps

📞 2. Stream Calls (Video + Audio)
🔹 Overview:
Stream now supports video and audio calling via WebRTC under the product name Stream Video.

🔹 Key Features:
1-on-1 and Group Video Calls
Audio Calls (like voice-only)
Screen Sharing
Call Recording (Pro plans)
Custom UI via SDKs
Network Quality Detection
Participant Events (join, leave, mute, etc.)
Secure & Encrypted calls

🔹 SDKs Available:
JavaScript SDK for React/Web apps
Flutter SDK
React Native SDK
iOS & Android SDKs (Swift/Kotlin)

========================================================================================================

## ✅ 2. MongoDB Atlas
Purpose: Cloud-based NoSQL database service

🔹 What it does:
Stores your app’s user data, messages, login credentials, chat history, etc.
It’s scalable (you can increase capacity as your user base grows).
Provides high availability, security, and backups.

🔹 Why it's useful:
No need to manually set up database servers.
Easy integration with backend (Node.js, Express, etc.).
Offers a free tier with sufficient resources for dev/testing.
Built-in support for connection to cloud platforms like AWS, GCP, Azure.

🔹 Features:
Clusters (database instance you connect to).
Collections (like tables, where documents are stored).
Documents (JSON-like records).
Easy access via MongoDB URI (used in .env file).

===============================================================================================

## 3.) in mongoose schema we have to types of schema formation 
        --> 1.const userSchema = new mongoose.Schema({...here our schema definition});
        --> 2.const userSchema = new mongoose.Schema({..here our schema defination} , {timestamps: true})

    diff is that in 2nd format the data entry in the databse will be done with timestamps like the data 
    entry is done at 12:53:37 like this or something like this which helps in telling the data entry is with us from how much time.

========================================================================================================================

## 4.) 
 friends:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
 }
]

this is what i have used in databse Schema so what is its used???? --->> it is used for storing the relations in form of 
array of objectIds in the database. It helps in having the relation between the two tables in the database.

==================================================================================================================================

## 5.) To create a random profile_Pic_avatar as if the user has uploaded his image or dos not want to upload then you can 
generate the avatar png from the website """AVATAR PLACEHOLDER"""..

it helps in generating the avatar png;-'s using its API..

====================================================================================================================================


## 6.) We have used Stream Upserts in our code. What is it?
--> Upsert = Update + Insert
It means:
If a record (user, message, etc.) already exists, then update it.
If it doesn't exist, then create (insert) it.

Stream Upserts: Creating or updating user profiles on Stream's backend.
Ensures the user is always in sync between your system and Stream Chat.
It avoids duplicate users and ensures a consistent user profile.
Upstreamer() is probably a helper/wrapper function in your code.


=====================================================================================================================================


## 7.) In the frontend we have used Tailwind CSS and as a component Library we are using DAISY UI.

    DaisyUI is a Tailwind CSS component library that adds pre-built, styled UI components (like buttons, modals, alerts, dropdowns, etc.) using Tailwind utility classes. It's built on top of Tailwind CSS, making it easier and faster to build beautiful UIs without writing tons of custom styles.

    🧠 What is DaisyUI?
It's a plugin for Tailwind CSS.
It provides a collection of customizable, accessible, and responsive components.
All components are built with Tailwind classes, so they work seamlessly with your Tailwind config.
It supports dark mode, themes, and is highly customizable.

    🛠️ Why use DaisyUI?
Benefit	Description
🔧 Ready-made components	No need to build common UI elements from scratch (e.g., buttons, cards).
🎨 Theme support	Easily switch between multiple pre-defined themes (light, dark, etc.).
🕶 Dark mode built-in	Simple to enable dark mode for your app.
⚙ Works with Tailwind	Uses Tailwind classes, so no extra learning curve if you're using Tailwind.
🧩 Extendable and Custom	You can customize or extend its components easily.


=====================================================================================================================================


## 8.) 🧁 What is react-toastify (React "Toster")?
You probably meant react-toastify, a popular React notification library used to show non-blocking toast messages (like success alerts, errors, warnings, etc.).

✅ Why use react-toastify?
Easy to use
Auto-dismiss feature
Stylish and customizable
Works anywhere in your app
Supports dark mode, icons, progress bar, etc.



=============================================================================================================================================================================


## 9.) ✅ Axios – HTTP Client for API Requests
Purpose:
Used to make HTTP requests (GET, POST, PUT, DELETE) from your frontend (like React) to your backend or an external API.

Why use it?

Easy to use syntax.
Supports promises and async/await.
Automatically parses JSON response.
Allows custom headers, tokens, and error handling.


=====================================================================================================================================================


## 10.) Story Set :--
 it is a website for free images download and usage .

==================================================================================================


## 11.) lucide-react
Lucide React is a popular icon library that provides beautiful, customizable SVG icons as React components. It's a community-maintained fork of Feather Icons.

===========================================================================================================================================================================


## 12.) Working of Signup page :-


# 📋Complete User Creation Flow

## 1. User Clicks "Create Account" Button

```
Button clicked → form onSubmit event triggered
```

## 2. `handSignup` Function Executes

```javascript
const handSignup = (e) => {
  e.preventDefault();           // Prevents form default submission
  mutate(datacollect);         // Triggers the mutation with user data
}
```

## 3. `useMutation` Hook Executes

```javascript
const {mutate, isPending, error} = useMutation({
  mutationFn: async (userData) => {
    console.log('Sending data:', userData);
    // Makes HTTP POST request to backend
    const response = await axiosInstance.post("/auth/signup", datacollect);
    return response.data;
  },
  onSuccess: (data) => {
    console.log('Signup successful:', data);
    queryClient.invalidateQueries({ queryKey: ['authUser'] });
    navigate('/');  // Redirects to home page
  }
})
```

## 4. Frontend Sends HTTP Request

```
POST http://localhost:4000/auth/signup
Body: { name: "John", email: "john@email.com", password: "123456" }
```

## 5. Backend Route Handler Receives Request

```javascript
// In auth.routes.js
router.post('/signup', signupController);  // No auth middleware for signup
```

## 6. Signup Controller Executes

```javascript
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Step 6a: Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Step 6b: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Step 6c: Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Step 6d: Create user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Step 6e: Create user in Stream (for video calling)
    await createStreamUser(user);
    
    // Step 6f: Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    // Step 6g: Set cookie and send response
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ 
      message: "User created successfully", 
      user: { id: user._id, name: user.name, email: user.email }
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
```

## 7. Database Operations

```javascript
// Step 7a: MongoDB User Creation
const user = await User.create({
  name: "John",
  email: "john@email.com", 
  password: "hashedPassword123",
  createdAt: new Date()
});
// User saved in MongoDB with auto-generated _id
```

## 8. Stream User Creation

```javascript
// Step 8: Create user in Stream for video calling
const createStreamUser = async (user) => {
  try {
    await streamClient.upsertUser({
      id: user._id.toString(),
      name: user.name,
      email: user.email
    });
    console.log("Stream user created successfully");
  } catch (error) {
    console.error("Error creating stream user:", error);
    throw error; // This is causing your timeout errors
  }
};
```

## 9. Response Sent Back to Frontend

```
Status: 201 Created
Body: { 
  message: "User created successfully",
  user: { id: "64abc123", name: "John", email: "john@email.com" }
}
Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 10. Frontend Handles Success

```javascript
onSuccess: (data) => {
  console.log('Signup successful:', data);
  queryClient.invalidateQueries({ queryKey: ['authUser'] }); // Refresh auth state
  navigate('/'); // Redirect to home page
}
```

## 11. User Redirected to Home Page

```
Browser navigates to http://localhost:5173/
Auth state updated with new user info
```


=======================================================================================================================



## 13.) Loader Page :-  
### This page is just for the loading animation. It will be displayed when the user is waiting for the response from the server.
### It uses LoaderSinWheel icon form lucide react 


========================================================================================================================


## 14.) ZUTAND (THEME CHANGER)
### for changing themes we have used ZUTAND npm i zutand krke install kr lena then bass ek file and usme woh code add krdena google me zutand ki website pr jayega toh dhikhega woh wala , then u can use it like a hook , it will return a function which will change the theme of the app.

### just import taht file and switch themes



========================================================================================================================


### 15.) Deployement procdure to Render :-

1.) at VIDEO_CHAT_SCREEN_APP --> do npm init -y 
2.) goto backend packeage.json add script --> "start" ; "node src/server.js"
3.) goto VIDEO_CHAT_SCREEN_APP/package.json  under script add --> "build" : "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend"
4.) goto VIDEO_CHAT_SCREEN_APP and do --> npm run build 
5.) 