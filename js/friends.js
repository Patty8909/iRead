var config = {
  apiKey: "AIzaSyAcd1Itu9p6IF_xmRRVLo7Ro79Ek_YXGew",
  authDomain: "iread-47442.firebaseapp.com",
  databaseURL: "https://iread-47442.firebaseio.com",
  projectId: "iread-47442",
  storageBucket: "iread-47442.appspot.com",
  messagingSenderId: "816960626052"
};
firebase.initializeApp(config);

alert('Amigo');
var db = firebaseAdmin.database();

var ref = db.ref("users");
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
});

// Get a reference to the database service


