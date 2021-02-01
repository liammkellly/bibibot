#!/usr/bin/env node

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const mergeImg = require("merge-img");
const fs = require("fs");

var TilesArray =[];

function replaceGroupTiles(tile) {
  tile = tile.replace("'","call").replace("\"","stack");
  TilesArray.push(process.env.WORKING_PATH + "PNG/" + tile  + GroupColor + ".png");
  return tile + GroupColor + " ";
}

function replaceTiles(tilegroup, chan) {
  GroupColor = tilegroup.slice(-1);
  tilegroup = tilegroup.slice(0,-1);
  answer = tilegroup.replace(ree,replaceGroupTiles);
  
  return answer;
}

function deleteFile(ServeFile) {
  
    fs.unlink(ServeFile, console.log);
}

function sendAndClean(msgchannel,replyMsg, ServeFile) {
    msgchannel.send("Hand: " + replyMsg,{
            files: [
                ServeFile
            ]
    }).then(setTimeout(fs.unlink, 10000, ServeFile, console.log));
    
    //fs.unlink(ServeFile, console.log));
}


var re = /\d[\d'"]*[mpszx]/g;
var ree = /\d'*"*/g;
var GroupColor;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  
  if (msg.content.startsWith("/tiles")) {

    var Tiles = msg.content.replace("/tiles", "");
    replyMsg = Tiles.replace(re,replaceTiles);
    var ServeFile = process.env.WORKING_PATH + Math.random() + ".png";
    console.log(ServeFile);
    mergeImg(TilesArray,{align:"end"}).then((img) => {
    // Save image as file
    img.write(ServeFile, () => sendAndClean(msg.channel, replyMsg, ServeFile));
    });
    TilesArray =[];
  }
    
})
client.login(process.env.BOT_TOKEN)
