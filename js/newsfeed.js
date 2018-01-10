var config = {
  apiKey: "AIzaSyAcd1Itu9p6IF_xmRRVLo7Ro79Ek_YXGew",
  authDomain: "iread-47442.firebaseapp.com",
  databaseURL: "https://iread-47442.firebaseio.com",
  projectId: "iread-47442",
  storageBucket: "iread-47442.appspot.com",
  messagingSenderId: "816960626052"
};
firebase.initializeApp(config);

//eventos
$('#submit-js').on('click', post);
$('#href-js').on('click', post);
$('#logout-js').on('click', logout);

sessionActive();
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
      photoUrl = user.photoURL;
      $('#name-js').text(name);
      $('#photoUrl-js').attr("src", photoUrl);
      console.log(user);
      writeUserData(user.uid, name, user.email, photoUrl)
    } else {
      location.href = "../";
    }
  });
}

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

function post(event) {
  event.preventDefault();
  var $content = $('#content-post-js').val();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      postUser(user.uid, $content);
      $('#content-post-js').val('');
      $('#content-post-js').focus();
    }
  });
}

function postUser(userId, content) {
  event.preventDefault();
  var postsRef = firebase.database().ref('users/' + userId).child("posts");
  var newPostRef = postsRef.push();
  newPostRef.set({
    content: content
  });
}

recoverUserPost();

function recoverUserPost() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var ref = firebase.database().ref('users/' + user.uid + '/' + 'posts');
      ref.orderByChild("content").on("child_added", function (snapshot) {
        $('#all-post-js').append('<div><p>' + user.displayName + '</p>' + '<p>' + snapshot.val().content + '</p')
      });
    }
  });
}