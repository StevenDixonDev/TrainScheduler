$(document).ready(function(){
  console.log("よろしくね おねがいします。");
  console.log("はじめましょう。");
  console.log("I look forward to working with you​");
  console.log("Let us begin.");

  var firebaseConfig = {
    apiKey: "AIzaSyBUA3JHYkBzf2xl1xZLt3qmFnFUBymd1KM",
    authDomain: "trainapp-fda47.firebaseapp.com",
    databaseURL: "https://trainapp-fda47.firebaseio.com",
    projectId: "trainapp-fda47",
    storageBucket: "",
    messagingSenderId: "534099270836",
    appId: "1:534099270836:web:a8f5baea92c2d019"
  };

  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();
})