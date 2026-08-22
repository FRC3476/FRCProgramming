# Commands

Before going onto the higher level parts of the program, we have to talk about commands.

## Command Structure

We have 4 main parts of the command structure:

1. Scheduler; This is the background loop that manages how commands are executed.
2. Commands; These are actions that a robot can do, they can be made up of multiple subsystems or one subsystem
3. Subsystems; Parts of your robot, mentioned in [first-subsystem](/beginner/first-subsystem)
4. Robot Container; Where you create subsystems and the triggers for commands

## Scheduler
The Scheduler (Command Scheduler) is a global loop that handles when to run a command, hence it's called a scheduler. Whenever a command is ran, it's added to the scheduler. By having a global loop that runs any action your robot can take, it reduces the amount of issues that occur with parallel commands as you must manually set parallelism. 

## Commands
Commands have 3 main sections to them:
1. Starting
2. Running
3. Ending

Starting a command is like telling a motor to use it's current position as 0 or telling a sensor the state it's in, things that should run once at the start of an action. The command scheduler looks at whatever is in here and runs it once and then moves onto the next step, running the command.

Running a command is basically what you want in a loop. Normally, this section is controlling a motor in what is known as a PID loop. This loop constantly runs until the motor hits the right position with the right tolerance and so the "running" section is extactly where we want it. 

Ending a command is also the same as starting a commnd. It's here to set any ending conditions we need to the command. 
> [!IMPORTANT]
> To end a command (unless it runs once, like setting something), you must include a end condition. In Commands V2, this looks like overriding the isFinished() function with a function returning the end boolean that you want. In Commands V3, this is just yielding the coroutine when your command is finished.

## Subsystems
Subsystems are already explained previously. There is one thing I didn't mention previously: 

> [!IMPORTANT] 
> Each subsystem can only run **ONE** command at a time.

This is so a subsystem can't do multiple things at once. If you're trying to do multiple things with one subsystem, you don't have one subsystem, you have multiple subsystems. 

## Robot Container
This is where your commands are triggered. WPILib uses triggers, essentially if statements. They can be linked like so:

```java
xbox.a().onTrue([insert your command object])
```


### Command Compositors
Writing out all of these sections each time is very tedious, and so WPILib gives us command builders for most applications (95% of all use cases). Here is a list and a brief description:

