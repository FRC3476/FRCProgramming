# Making Your First Subsystem {#first-subsystem}

## What even is a subsystem? 

Subsystems are simply a way of breaking your robot down into it's main componenets, like how a car has the subsystems of the engine, drivebase, radio, etc. All of them make up the whole, but it's possible to deal with each individually. 

Basically, they're (sub)systems, each system does its own one task. A useful way of looking at subsystems is splitting each one into hardware and logic layers. So, when determining a subsystem, look at what **singular** task a thing is doing and the motors and sensors that go into making that thing do that one task. If it's not one task, you have to go more detailed. 

An example of this could be the Reefscape (2025) season. A lot of teams had an elevator and an endeffector that would rotate around a pivot. It might be tempting to say that there are only 2 subsystems, the elevator and endeffector. But really, there's 3 here; the pivot does a seperate function than the elevator and endeffector, it rotates. 

## Setting up your first subsytem {#setting-up-your-first-subsystem}
Setting up a subsystem is really simple. Create a subsystem folder inside of your default robot folder and then create your robot subsystem folder to place in your Java files.

![Picture of folder structure](../assets/beginner/first-subsystem/folder-structure.png)

In your subsystem folder, make 3 java files. I'll be calling the subsystem "Shooter" as an example, but you can name it whatever you want it to be.

1. <span style="color: #ff8147">Shooter.java</span>
3. <span style="color: #ff8147">ShooterIO.java</span>

### Code Breakdown

Let's go through what each file is supposed to do. 

The top most level, Shooter.java is where you place commands and other "high-level" controls. The higher the level, the farther it is from the hardware. 

The opposite of this would be ShooterIO.java, which is the class to directly controls the motor, hence the IO which stands for input output.

This structure might seem like a lot of boilerplate which it kinda is, but there are some good reasons for keeping this structure for all of your subsystems. 

First, we split the motor(s) and the subsystem in two as having logic on the hardware level creates very messy code and this messiness will lead to many bugs that if the logic and hardware were kept seperate would fix. 

Secondly, if there's any changes that need to be made, we only need to change the hardware level. If your team needs to swap out a Neo to a Kraken, you just can simply update the configuration of the hardware, everything else should work. 


