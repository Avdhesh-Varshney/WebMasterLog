import React from 'react'
import './App.css'
import icon from '../assets/icon.png'
const App = () => {
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('generate');
    var verse = document.getElementById('verse');
  
    var verses = [
        "John 3:16: For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        "John 1:1: In the beginning was the Word, and the Word was with God, and the Word was God.",
        "John 14:6: Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
        "Matthew 28:19: Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
        "Romans 3:23: For all have sinned and fall short of the glory of God.",
        "Ephesians 2:8: For it is by grace you have been saved, through faith – and this is not from yourselves, it is the gift of God.",
        "Genesis 1:1: In the beginning God created the heavens and the earth.",
        "Acts 1:8: 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.'",
        "2 Timothy 3:16: All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.",
        "Romans 10:9: If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
        "Romans 6:23: For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
        "Acts 2:38: Peter replied, 'Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit.'",
        "John 1:12: Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.",
        "Romans 8:28: And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        "John 1:9: The true light that gives light to everyone was coming into the world.",
        "Genesis 1:26: Then God said, 'Let us make human beings in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground.'",
        "Romans 12:1: Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God – this is true worship.",
        "Romans 5:8: But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
        "Matthew 28:18: Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me.'",
        "John 3:3: Jesus replied, 'Very truly I tell you, no one can see the kingdom of God without being born again.'"
    ];
  
    button.addEventListener('click', function () {
        var randomIndex = Math.floor(Math.random() * verses.length);
        verse.textContent = verses[randomIndex];
    });
  });
  return (
    <div>
      <img src={icon} alt=""/>
      <h1>Random Bible Verse</h1>
      <button id="generate">Generate</button>
      <p id="verse">Click "Generate" to see a random Bible verse.</p>
    </div>
  )
}

export default App
