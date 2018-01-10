var config = {
  apiKey: "AIzaSyAcd1Itu9p6IF_xmRRVLo7Ro79Ek_YXGew",
  authDomain: "iread-47442.firebaseapp.com",
  databaseURL: "https://iread-47442.firebaseio.com",
  projectId: "iread-47442",
  storageBucket: "iread-47442.appspot.com",
  messagingSenderId: "816960626052"
};
firebase.initializeApp(config);

sessionActive();

$('#logout-js').on('click', logout);

function logout() {
  firebase.auth().signOut()
    .then(function (result) {
      console.log('Te has desconectado correctamente');
      location.href = "../";
    })
    .catch(function (error) {
      console.log(`Error ${error.code}: ${error.message}`)
    })
}

function sessionActive() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('sesion activa de newsfeed');
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      $('#name-js').text(name);
      $('#photoUrl-js').attr("src", photoUrl);
    } else {
      location.href = "../";
    }
  });
}